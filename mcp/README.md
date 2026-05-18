# basehub-mcp

A Model Context Protocol (MCP) server that exposes BaseHub — the reference for agents on Base — to AI clients. Backed by the public endpoints on `basehub.org` (no scraping, no API key).

## Tools

- `search_basehub_docs({ query, limit? })` — ranked search across every BaseHub page. Returns title, description, canonical URL, and raw-Markdown URL.
- `get_basehub_page({ slug })` — fetch the full Markdown source of a single page (e.g. `introduction/why-base`, `api-reference/eth/eth_getlogs`).

## Use with Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "basehub": {
      "command": "npx",
      "args": ["-y", "basehub-mcp"]
    }
  }
}
```

Restart Claude Desktop. The two tools appear under the `basehub` server.

## Use with Cursor / other stdio MCP clients

Point any stdio-based MCP client at `npx -y basehub-mcp`.

## Run from source

```bash
git clone https://github.com/wbnns/basehub.git
cd basehub/mcp
npm install
node server.js
```

Then in your MCP client config, swap `npx -y basehub-mcp` for `node /absolute/path/to/basehub/mcp/server.js`.

## Configuration

- `BASEHUB_SITE` — origin to query (default `https://basehub.org`). Useful for hitting a preview deployment.

## How it works

The server hits two public endpoints on `basehub.org`:

- `/api/pages.json` — the full page index (cached for 10 minutes per process).
- `/{slug}.md` — raw Markdown for any page, with frontmatter intact.

Every BaseHub page exposes `.md` access; this server is a thin convenience wrapper for clients that prefer tool calls over raw HTTP.
