# Contributing to BaseHub

Thanks for taking the time. BaseHub is small and the contribution surface is narrow: most changes are documentation paraphrases tracked against upstream sources, plus the occasional site improvement.

## What goes where

- `src/content/docs/**/*.mdx` — the docs themselves. Frontmatter is the Starlight schema plus an optional `sources:` array listing the upstream files a page paraphrases (see `src/content.config.ts`).
- `src/pages/` — non-MDX routes (`llms.txt`, `llms-full.txt`, `api/pages.json`, `feeds/*.xml`, `404.astro`, the homepage).
- `src/components/`, `src/styles/` — site chrome.
- `.github/workflows/` — `deploy.yml` (push + daily cron at 00:00 UTC), `sync-upstream.yml` (daily at 09:17 UTC), `ci.yml` (per-PR build check).
- `.github/scripts/` — Python helpers used by `sync-upstream.yml`.
- `mcp/` — the [`@wbnns/base-mcp`](https://www.npmjs.com/package/@wbnns/base-mcp) package source.
- `scripts/` — one-off Node scripts (e.g. `generate-og.mjs` for the OG image).

## Working on docs

1. Find the page under `src/content/docs/`.
2. If the page has a `sources:` array, the listed upstream files are the source of truth for technical facts — addresses, RPC params, hex, code blocks, constants must match upstream verbatim. The narrative around them can be edited in BaseHub's voice.
3. If the page has no `sources:` and there's a corresponding upstream file in `base/base`, `base/docs`, the engineering blog, or the statuspage, please add the `sources:` entry while you're in there. Format: `"<repo>:<path>"` for git sources, `"blog.base.dev:guid=<id>"` / `"status.base.org:guid=<url>"` for RSS items.
4. Run `npm run dev` and check the page renders.

## Working on site code

```bash
npm install
npm run dev      # http://localhost:4321 with HMR
npm run build    # production build into dist/
npx astro check  # type check
```

Node 20+ required.

## Submitting changes

- Branch from `main`.
- One concern per PR. A docs paraphrase and a workflow change should be two PRs.
- Don't edit `.upstream-state/` by hand — it's maintained by the sync workflow.
- Don't bump the version in `mcp/package.json` unless you're publishing; `@wbnns/base-mcp` releases are coordinated separately.

## Upstream sync PRs

Every morning the sync workflow opens or updates a PR on `chore/upstream-sync` when one of the four upstream sources has changed. The PR body lists the changed upstream entries grouped under the BaseHub pages that reference them.

To resolve one:

1. Read the listed pages and the changed upstream files side-by-side.
2. Update affected MDX pages.
3. For any entries in the "Unmapped upstream entries" section, decide whether they belong on an existing page (and add to that page's `sources:`) or warrant a new page.
4. Squash the PR with your edits.

## License

By contributing you agree your contribution is licensed under the [MIT License](LICENSE).
