import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://basehub.org';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');

  const sorted = [...docs].sort((a, b) => a.id.localeCompare(b.id));

  const parts: string[] = [
    '# BaseHub — full content',
    '',
    `> The go-to technical resource for Base Chain. Concatenated, paraphrased, agent-friendly. ${sorted.length} pages.`,
    '',
    `Source: ${SITE}`,
    `Index: ${SITE}/llms.txt`,
    '',
    '---',
    '',
  ];

  for (const entry of sorted) {
    const url = `${SITE}/${entry.id}/`;
    const title = entry.data.title;
    const description = entry.data.description ?? '';

    parts.push(`# ${title}`);
    parts.push('');
    parts.push(`Source: ${url}`);
    if (description) parts.push(`Description: ${description}`);
    parts.push('');
    parts.push(entry.body ?? '');
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  return new Response(parts.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
