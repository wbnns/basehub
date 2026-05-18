import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://basehub.org';

const SECTION_TITLES: Record<string, string> = {
  introduction: 'Introduction',
  network: 'Network',
  flashblocks: 'Flashblocks',
  'api-reference': 'API Reference',
  'integration-guides': 'Integration Guides',
  'getting-started': 'Run a Node',
  'node-operations': 'Node Operations',
  architecture: 'Architecture',
  crates: 'Crate Reference',
  binaries: 'Binaries',
  specifications: 'Specifications',
  security: 'Security',
};

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const grouped = new Map<string, { title: string; description: string; url: string }[]>();
  for (const entry of docs) {
    const slug = entry.id;
    const section = slug.split('/')[0] ?? 'other';
    const url = `${SITE}/${slug}/`;
    const title = entry.data.title;
    const description =
      entry.data.description ?? '';
    if (!grouped.has(section)) grouped.set(section, []);
    grouped.get(section)!.push({ title, description, url });
  }

  for (const list of grouped.values()) list.sort((a, b) => a.title.localeCompare(b.title));

  const sectionOrder = [
    'introduction',
    'network',
    'flashblocks',
    'api-reference',
    'integration-guides',
    'getting-started',
    'node-operations',
    'architecture',
    'crates',
    'binaries',
    'specifications',
    'security',
  ];

  const sortedSections = [
    ...sectionOrder.filter((s) => grouped.has(s)),
    ...[...grouped.keys()].filter((s) => !sectionOrder.includes(s)).sort(),
  ];

  const lines: string[] = [
    '# BaseHub',
    '',
    '> BaseHub — reference for agents on Base. Every page is reachable as raw Markdown by appending .md to the URL.',
    '',
    'BaseHub is the reference for agents on Base. Every page below is available as raw Markdown by appending `.md` to the URL (e.g. `/introduction/why-base.md`). The full corpus is at `/llms-full.txt`, a JSON index of all pages is at `/api/pages.json`, the MCP server is published at `https://www.npmjs.com/package/@wbnns/base-mcp`, and live activity feeds are mirrored at `/feeds/blog.xml` (engineering blog) and `/feeds/status.xml` (network status).',
    '',
  ];

  for (const section of sortedSections) {
    const entries = grouped.get(section)!;
    const heading = SECTION_TITLES[section] ?? section.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    lines.push(`## ${heading}`);
    lines.push('');
    for (const { title, description, url } of entries) {
      const desc = description ? `: ${description}` : '';
      lines.push(`- [${title}](${url})${desc}`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
