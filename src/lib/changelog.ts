import raw from '../data/changelog.ndjson?raw';

export type ChangelogKind = 'site' | 'network';

export interface ChangelogEntry {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** 'site' — a change to BaseHub itself; 'network' — a notable Base network/protocol change. */
  kind: ChangelogKind;
  title: string;
  summary: string;
  /** Optional link: internal doc path or upstream URL. */
  href?: string;
}

// Parse the NDJSON source of truth once, at build time, newest-first.
// The file is maintained newest-first by the basehub-sync worker; the sort
// is a belt-and-braces guarantee (V8's sort is stable, so equal-date order is
// preserved from file order).
const entries: ChangelogEntry[] = raw
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .map((line) => JSON.parse(line) as ChangelogEntry)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

/** All changelog entries, newest-first. */
export function getChangelog(): ChangelogEntry[] {
  return entries;
}

/** The n most recent entries, newest-first. */
export function getRecent(n: number): ChangelogEntry[] {
  return entries.slice(0, n);
}
