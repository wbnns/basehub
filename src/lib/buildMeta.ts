import { execSync } from 'node:child_process';

const iso = (() => {
  try {
    return execSync('git log -1 --format=%cI HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return new Date().toISOString();
  }
})();

const d = new Date(iso);
const pad = (n: number) => String(n).padStart(2, '0');

export const lastUpdatedIso = iso;
export const lastUpdatedDisplay = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
