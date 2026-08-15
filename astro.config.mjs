// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { onRequestGet as addressSearch } from './functions/api/address-search.js';

/** Serve selected Cloudflare Pages Functions during `astro dev`. */
function pagesFunctionDev(path, handler) {
	return {
		name: `pages-function-dev:${path}`,
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const pathname = (req.url || '').split('?')[0];
				if (pathname !== path) {
					next();
					return;
				}

				if (req.method !== 'GET') {
					res.statusCode = 405;
					res.end();
					return;
				}

				try {
					const response = await handler({
						request: new Request(new URL(req.url || path, 'http://127.0.0.1'), {
							method: 'GET',
						}),
					});
					res.statusCode = response.status;
					response.headers.forEach((value, key) => {
						res.setHeader(key, value);
					});
					res.end(Buffer.from(await response.arrayBuffer()));
				} catch (error) {
					next(error);
				}
			});
		},
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://solar.florul.com',
	output: 'static',
	integrations: [
		sitemap({
			filter: (page) => page !== 'https://solar.florul.com/thank-you/',
		}),
	],
	build: {
		format: 'directory',
	},
	vite: {
		plugins: [pagesFunctionDev('/api/address-search', addressSearch)],
	},
});
