import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://basehub.org';

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getCollection('docs');
  return docs.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection>>[number] };

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(entry.data.title)}`,
    entry.data.description
      ? `description: ${JSON.stringify(entry.data.description)}`
      : null,
    `source: ${SITE}/${entry.id}/`,
    '---',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  const body = entry.body ?? '';

  return new Response(`${frontmatter}\n${body}\n`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'index, follow',
    },
  });
};
