#!/usr/bin/env python3
"""Render the sync-upstream PR body with per-page change lists.

Reads .upstream-state/diff.txt (a unified diff of the snapshot) and walks
src/content/docs/**/*.mdx looking for a `sources:` frontmatter array. Builds
the inverse map (upstream entry -> [site pages]) and emits a markdown body
listing what changed upstream and which site pages reference each entry.

Pages without `sources:` covering a changed entry get bucketed into an
"unmapped" section so a maintainer can decide where new content belongs.
"""
import os
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
DIFF = ROOT / ".upstream-state" / "diff.txt"
DOCS = ROOT / "src" / "content" / "docs"

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---", re.DOTALL)

# Maps a section header in snapshot.txt to the upstream slug we use in sources:.
SECTION_PREFIX = {
    "base/base": "base/base",
    "base/docs": "base/docs",
    "blog.base.dev": "blog.base.dev",
    "status.base.org": "status.base.org",
}


def parse_frontmatter(mdx_path: Path):
    text = mdx_path.read_text(encoding="utf-8", errors="replace")
    match = FRONTMATTER_RE.match(text)
    if not match:
        return None
    try:
        return yaml.safe_load(match.group(1)) or {}
    except yaml.YAMLError:
        return None


def build_inverse_map():
    inverse: dict[str, list[str]] = {}
    pages_with_sources = 0
    pages_without_sources = []
    for mdx in DOCS.rglob("*.mdx"):
        if any(part in {"node_modules", ".astro"} for part in mdx.parts):
            continue
        fm = parse_frontmatter(mdx)
        if fm is None:
            continue
        rel = mdx.relative_to(ROOT).as_posix()
        sources = fm.get("sources") or []
        if not sources:
            pages_without_sources.append(rel)
            continue
        pages_with_sources += 1
        for src in sources:
            inverse.setdefault(src, []).append(rel)
    return inverse, pages_with_sources, pages_without_sources


def parse_diff(diff_text: str):
    """Extract changed upstream entries from the unified diff of snapshot.txt.

    Returns a list of (kind, entry) tuples where kind is 'docs' (file hash
    change), 'rss' (item guid change), or 'unknown'. Section headers in the
    diff tell us which upstream the entry belongs to.
    """
    changes: list[tuple[str, str]] = []
    section = None
    for line in diff_text.splitlines():
        if line.startswith("### "):
            header = line[4:].strip()
            for prefix, slug in SECTION_PREFIX.items():
                if header.startswith(prefix):
                    section = slug
                    break
            else:
                section = None
            continue
        if not (line.startswith("+") or line.startswith("-")) or line.startswith("+++") or line.startswith("---"):
            continue
        body = line[1:].strip()
        if not body or not section:
            continue
        # docs row: "<sha1>  path/to/file.md"
        m = re.match(r"^[0-9a-f]{40}\s+(\S+)$", body)
        if m and section in {"base/base", "base/docs"}:
            entry = f"{section}:{m.group(1)}"
            changes.append(("docs", entry))
            continue
        # rss row: "<guid>\t<title>\t<pubDate>"
        if section in {"blog.base.dev", "status.base.org"} and "\t" in body:
            guid = body.split("\t", 1)[0]
            entry = f"{section}:guid={guid}"
            title = body.split("\t")[1] if body.count("\t") >= 1 else ""
            changes.append(("rss", f"{entry}\t{title}"))
            continue
    # Dedupe while preserving order
    seen = set()
    deduped = []
    for kind, entry in changes:
        if entry in seen:
            continue
        seen.add(entry)
        deduped.append((kind, entry))
    return deduped


def render(changes, inverse):
    lines = []
    lines.append("One or more upstream sources changed since the last sync.")
    lines.append("")
    if not changes:
        lines.append("_No per-entry diff produced (likely a first run). Inspect `.upstream-state/diff.txt` directly._")
        return "\n".join(lines)

    mapped = []
    unmapped = []
    for kind, entry in changes:
        key = entry.split("\t", 1)[0] if kind == "rss" else entry
        pages = inverse.get(key, [])
        if pages:
            mapped.append((kind, entry, pages))
        else:
            unmapped.append((kind, entry))

    if mapped:
        lines.append("## Changed upstream entries with mapped site pages")
        lines.append("")
        for kind, entry, pages in mapped:
            if kind == "rss":
                key, title = entry.split("\t", 1)
                lines.append(f"- **{key}** — {title}")
            else:
                lines.append(f"- **{entry}**")
            for page in sorted(pages):
                lines.append(f"  - `{page}`")
        lines.append("")

    if unmapped:
        lines.append("## Unmapped upstream entries")
        lines.append("")
        lines.append("These changed upstream but no site page declares them in `sources:`. A maintainer needs to decide whether to add a new page, update an existing one, or ignore.")
        lines.append("")
        for kind, entry in unmapped:
            if kind == "rss":
                key, title = entry.split("\t", 1)
                lines.append(f"- **{key}** — {title}")
            else:
                lines.append(f"- **{entry}**")
        lines.append("")

    lines.append("## How to action this PR")
    lines.append("")
    lines.append("1. For each mapped entry, re-read the upstream file/post and update the listed page(s), preserving every technical fact verbatim (addresses, RPC params, hex, code blocks, constants).")
    lines.append("2. For unmapped entries, either add a new page under `src/content/docs/` (with `sources:` set) or extend an existing page's `sources:` to claim it.")
    lines.append("3. Squash this PR with the content edits. Do not edit `.upstream-state/` manually.")
    lines.append("")
    lines.append("_Body generated by `.github/scripts/render-pr-body.py`._")
    return "\n".join(lines)


def main():
    diff_text = DIFF.read_text(encoding="utf-8") if DIFF.exists() else ""
    inverse, with_count, without_pages = build_inverse_map()
    changes = parse_diff(diff_text)
    body = render(changes, inverse)
    out = ROOT / ".upstream-state" / "pr-body.md"
    out.write_text(body, encoding="utf-8")
    print(f"rendered {out} — {len(changes)} changed entries, {with_count} pages with sources, {len(without_pages)} without", file=sys.stderr)


if __name__ == "__main__":
    main()
