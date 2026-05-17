#!/usr/bin/env python3
"""One-shot: inject `sources:` arrays into MDX frontmatter from JSON mappings.

Reads /tmp/sources-*.json (produced by the per-section research agents),
aggregates by page path, and rewrites src/content/docs/**/*.mdx frontmatter
to include a `sources:` field. Pages with empty sources are left untouched.
"""
import glob
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)


def load_mappings():
    page_to_sources: dict[str, list[str]] = {}
    for f in sorted(glob.glob("/tmp/sources-*.json")):
        data = json.load(open(f))
        for entry in data["mappings"]:
            sources = entry.get("sources") or []
            if not sources:
                continue
            page = entry["page"]
            if page in page_to_sources:
                print(f"WARN: duplicate mapping for {page}, merging", file=sys.stderr)
                page_to_sources[page] = list(dict.fromkeys(page_to_sources[page] + sources))
            else:
                page_to_sources[page] = sources
    return page_to_sources


def rewrite(page_path: Path, sources: list[str]):
    text = page_path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        print(f"SKIP: no frontmatter in {page_path}", file=sys.stderr)
        return False
    fm = yaml.safe_load(m.group(1)) or {}
    body = m.group(2)
    fm["sources"] = sources
    new_fm = yaml.safe_dump(fm, default_flow_style=False, sort_keys=False, allow_unicode=True, width=999999)
    new_text = f"---\n{new_fm}---\n{body}"
    if new_text == text:
        return False
    page_path.write_text(new_text, encoding="utf-8")
    return True


def main():
    mappings = load_mappings()
    print(f"loaded {len(mappings)} page mappings", file=sys.stderr)
    written = 0
    for page, sources in sorted(mappings.items()):
        path = ROOT / page
        if not path.exists():
            print(f"WARN: page does not exist: {page}", file=sys.stderr)
            continue
        if rewrite(path, sources):
            written += 1
    print(f"updated {written} MDX files", file=sys.stderr)


if __name__ == "__main__":
    main()
