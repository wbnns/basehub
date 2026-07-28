import type { APIRoute } from 'astro';
import { getChangelog } from '../lib/changelog';

const SITE = 'https://basehub.org';

const absolute = (href?: string) =>
  href ? (href.startsWith('http') ? href : `${SITE}${href}`) : null;

export const GET: APIRoute = async () => {
  const entries = getChangelog().map((entry) => ({
    date: entry.date,
    kind: entry.kind,
    title: entry.title,
    summary: entry.summary,
    url: absolute(entry.href),
  }));

  const body = JSON.stringify(
    {
      site: 'BaseHub',
      url: SITE,
      feed: 'changelog',
      description:
        'Updates to BaseHub and notable Base network and protocol changes, newest first. Markdown version at /changelog.md.',
      generated_at: new Date().toISOString(),
      entry_count: entries.length,
      entries,
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
