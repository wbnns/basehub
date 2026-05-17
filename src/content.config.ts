import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Upstream files this page is derived from, used by .github/workflows/sync-upstream.yml
				// to surface per-page change lists when upstream content moves. Format:
				// "<upstream>:<path>" where upstream is one of base/base, base/docs,
				// blog.base.dev, status.base.org. RSS guids use "blog.base.dev:guid=<id>" or
				// "status.base.org:guid=<url>".
				sources: z.array(z.string()).optional(),
			}),
		}),
	}),
};
