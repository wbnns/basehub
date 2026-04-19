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
        'The go-to technical resource for Base Chain. Network reference, RPC APIs, Flashblocks, node operation, and the open-source Rust client.',
      generated_at: new Date().toISOString(),
      page_count: pages.length,
      llms_index: `${SITE}/llms.txt`,
      llms_full: `${SITE}/llms-full.txt`,
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
