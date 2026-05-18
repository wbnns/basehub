#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const SITE = process.env.BASEHUB_SITE ?? 'https://basehub.org';
const INDEX_URL = `${SITE}/api/pages.json`;

let cache = { fetchedAt: 0, pages: [] };
const CACHE_TTL_MS = 10 * 60 * 1000;

async function loadIndex() {
  const now = Date.now();
  if (cache.pages.length && now - cache.fetchedAt < CACHE_TTL_MS) return cache.pages;
  const res = await fetch(INDEX_URL, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`Failed to load BaseHub index: ${res.status} ${res.statusText}`);
  const data = await res.json();
  cache = { fetchedAt: now, pages: Array.isArray(data.pages) ? data.pages : [] };
  return cache.pages;
}

function scorePage(page, terms) {
  const haystack = `${page.title} ${page.description ?? ''} ${page.slug}`.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (!term) continue;
    if (page.title.toLowerCase().includes(term)) score += 5;
    if ((page.description ?? '').toLowerCase().includes(term)) score += 2;
    if (page.slug.toLowerCase().includes(term)) score += 3;
    if (haystack.includes(term)) score += 1;
  }
  return score;
}

async function searchDocs({ query, limit = 10 }) {
  const pages = await loadIndex();
  const terms = String(query ?? '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (!terms.length) return pages.slice(0, limit);
  const ranked = pages
    .map((page) => ({ page, score: scorePage(page, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.page);
  return ranked;
}

async function getPage({ slug }) {
  const cleaned = String(slug ?? '').replace(/^\/+|\/+$/g, '');
  if (!cleaned) throw new Error('slug is required');
  const url = `${SITE}/${cleaned}.md`;
  const res = await fetch(url, { headers: { accept: 'text/markdown' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  return { slug: cleaned, url, markdown: await res.text() };
}

const server = new Server(
  { name: 'basehub-mcp', version: '0.1.0' },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'search_basehub_docs',
      description:
        'Search BaseHub — the technical reference for Base Chain (network, RPC APIs, Flashblocks, node operation, the Rust client). Returns ranked pages with title, description, URL, and raw-markdown URL.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Free-text search query' },
          limit: { type: 'number', description: 'Max results (default 10)', default: 10 },
        },
        required: ['query'],
      },
    },
    {
      name: 'get_basehub_page',
      description:
        'Fetch the raw Markdown of a single BaseHub page by slug (e.g. "introduction/why-base", "api-reference/eth/eth_getlogs"). Returns the full markdown source with frontmatter.',
      inputSchema: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'Page slug, no leading slash, no .md suffix',
          },
        },
        required: ['slug'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    if (name === 'search_basehub_docs') {
      const results = await searchDocs(args ?? {});
      return {
        content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
      };
    }
    if (name === 'get_basehub_page') {
      const page = await getPage(args ?? {});
      return {
        content: [
          { type: 'text', text: `# ${page.url}\n\n${page.markdown}` },
        ],
      };
    }
    throw new Error(`Unknown tool: ${name}`);
  } catch (err) {
    return {
      isError: true,
      content: [{ type: 'text', text: err instanceof Error ? err.message : String(err) }],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
