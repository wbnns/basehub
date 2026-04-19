# BaseHub MCP server

A Model Context Protocol (MCP) server that exposes the BaseHub documentation corpus to AI agents. Backed by the public BaseHub endpoints — no scraping, no API key.

## Tools

- `search_basehub_docs({ query, limit? })` — ranked search across all 110+ pages. Returns title, description, canonical URL, and raw-markdown URL.
- `get_basehub_page({ slug })` — fetch the full Markdown source of a single page (e.g. `introduction/why-base`, `api-reference/eth/eth_getlogs`).

## Install

```bash
cd mcp
npm install
```

## Run with Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "basehub": {
      "command": "node",
      "args": ["/absolute/path/to/basehub/mcp/server.js"]
    }
  }
}
```

Restart Claude Desktop. The two tools appear under the BaseHub server.

## Run with Cursor / other MCP clients

Point any stdio-based MCP client at `node /path/to/basehub/mcp/server.js`.

## Configuration

- `BASEHUB_SITE` — origin to query (default `https://basehub.org`). Useful for hitting a preview deployment.

## How it works

The server hits two public endpoints on `basehub.org`:

- `/api/pages.json` — the full page index (cached for 10 minutes per process).
- `/{slug}.md` — raw Markdown for any page, with frontmatter intact.

Every BaseHub page exposes `.md` access; the MCP server is a thin convenience wrapper for clients that prefer tool calls over raw HTTP.
