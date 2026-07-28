import type { APIRoute } from 'astro';
import { getChangelog } from '../lib/changelog';

const SITE = 'https://basehub.org';

const absolute = (href?: string) =>
  href ? (href.startsWith('http') ? href : `${SITE}${href}`) : null;

export const GET: APIRoute = async () => {
  const entries = getChangelog();

  const lines: string[] = [
    '# BaseHub Changelog',
    '',
    '> Updates to BaseHub and notable Base network and protocol changes, newest first.',
    '',
    'Entries are tagged `Site` (a change to BaseHub itself) or `Network` (a notable Base network or protocol change). A JSON version of this feed is at `/changelog.json`.',
    '',
  ];

  let currentYear = '';
  for (const entry of entries) {
    const year = entry.date.slice(0, 4);
    if (year !== currentYear) {
      currentYear = year;
      lines.push(`## ${year}`, '');
    }
    const label = entry.kind === 'site' ? 'Site' : 'Network';
    const url = absolute(entry.href);
    const title = url ? `[${entry.title}](${url})` : entry.title;
    lines.push(`### ${entry.date} — ${label} — ${title}`, '', entry.summary, '');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
