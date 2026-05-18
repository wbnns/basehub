import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://basehub.org';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const pages = docs
    .map((entry) => ({
      slug: entry.id,
      title: entry.data.title,
      description: entry.data.description ?? null,
      url: `${SITE}/${entry.id}/`,
      markdown: `${SITE}/${entry.id}.md`,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const body = JSON.stringify(
    {
      site: 'BaseHub',
      url: SITE,
      description:
        'BaseHub — reference for agents on Base. Every page is reachable as raw Markdown by appending .md to the URL. Also exposes /llms.txt (page index), /llms-full.txt (full corpus), and the @wbnns/base-mcp server.',
      generated_at: new Date().toISOString(),
      page_count: pages.length,
      llms_index: `${SITE}/llms.txt`,
      llms_full: `${SITE}/llms-full.txt`,
      feeds: [
        {
          name: 'eng blog mirror',
          url: `${SITE}/feeds/blog.xml`,
          upstream: 'https://api.paragraph.com/blogs/rss/@blog.base.dev',
          type: 'application/rss+xml',
        },
        {
          name: 'network status mirror',
          url: `${SITE}/feeds/status.xml`,
          upstream: 'https://base-l2.statuspage.io/history.rss',
          type: 'application/rss+xml',
        },
      ],
      pages,
    },
    null,
    2,
  );

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
