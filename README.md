# BaseHub

Reference for agents on Base. Every documentation page is reachable as raw Markdown by appending `.md` to its URL, plus dedicated endpoints for AI agent ingestion.

Live at **[basehub.org](https://basehub.org)**.

## Agent endpoints

- `/llms.txt` — page index in the [llms.txt](https://llmstxt.org/) format
- `/llms-full.txt` — the full Markdown corpus in a single file
- `/api/pages.json` — JSON manifest of every page, plus the URLs of the agent feeds and mirrors
- `/feeds/blog.xml` — build-time mirror of the [Base engineering blog](https://blog.base.dev) RSS
- `/feeds/status.xml` — build-time mirror of the [Base statuspage](https://base-l2.statuspage.io) RSS
- `<page>.md` — raw Markdown for any individual page (e.g. `/api-reference/eth/eth_blocknumber.md`)

## MCP server

The [`@wbnns/base-mcp`](https://www.npmjs.com/package/@wbnns/base-mcp) package exposes BaseHub to Claude Desktop, Cursor, and other stdio MCP clients via two tools (`search_basehub_docs`, `get_basehub_page`).

```json
{
  "mcpServers": {
    "basehub": {
      "command": "npx",
      "args": ["-y", "@wbnns/base-mcp"]
    }
  }
}
```

See [`mcp/README.md`](mcp/README.md) for details.

## Local development

Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build to dist/
```

## Architecture

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) static site, deployed to GitHub Pages
- 178 docs pages under `src/content/docs/`, organized into 13 sections
- Generated endpoints live as Astro routes in `src/pages/` (the `.txt`, `.json`, and `.xml` files)
- Deployed via `.github/workflows/deploy.yml` on every push to `main`, plus a daily cron at 10:37 UTC so the mirrored RSS feeds stay fresh

## Upstream sync

The `.github/workflows/sync-upstream.yml` workflow runs daily at 09:17 UTC and snapshots four upstream sources:

- [`base/base`](https://github.com/base/base) — the Rust node implementation and protocol specs
- [`base/docs`](https://github.com/base/docs) — the user-facing Base documentation
- The Base engineering blog (RSS)
- The Base statuspage (RSS)

It diffs against the committed `.upstream-state/last-sync.txt` and opens a PR on `chore/upstream-sync` listing the changed entries along with the BaseHub pages that reference them (via each page's `sources:` frontmatter array). A maintainer reviews and edits the affected pages.

## License

[MIT](LICENSE).
