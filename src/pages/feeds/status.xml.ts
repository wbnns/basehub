import type { APIRoute } from 'astro';

const UPSTREAM = 'https://base-l2.statuspage.io/history.rss';

export const GET: APIRoute = async () => {
  try {
    const res = await fetch(UPSTREAM, {
      headers: {
        'user-agent': 'basehub-feed-mirror/1.0 (+https://basehub.org)',
        accept: 'application/rss+xml,application/xml,text/xml',
      },
    });
    if (!res.ok) throw new Error(`upstream ${res.status} ${res.statusText}`);
    const body = await res.text();
    return new Response(body, {
      headers: {
        'content-type': 'application/rss+xml; charset=utf-8',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.warn(`[feeds/status] upstream fetch failed: ${message}`);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Base Status — Incident History (upstream unavailable)</title>
    <link>https://base-l2.statuspage.io</link>
    <description>Mirror is empty because the upstream feed was unreachable at build time. See ${UPSTREAM} for the live source.</description>
  </channel>
</rss>
`,
      { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } },
    );
  }
};
