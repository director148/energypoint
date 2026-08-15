// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { onRequestGet as addressSearch } from './functions/api/address-search.js';
import { onRequestPost as contactPost } from './functions/api/contact.js';

const readRequestBody = (req) =>
	new Promise((resolve, reject) => {
		const chunks = [];
		req.on('data', (chunk) => chunks.push(chunk));
		req.on('end', () => resolve(Buffer.concat(chunks)));
		req.on('error', reject);
	});

/** Serve selected Cloudflare Pages Functions during `astro dev`. */
function pagesFunctionDev(path, handler, methods = ['GET']) {
	return {
		name: `pages-function-dev:${path}`,
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const pathname = (req.url || '').split('?')[0];
				if (pathname !== path) {
					next();
					return;
				}

				const method = req.method || 'GET';
				if (!methods.includes(method)) {
					res.statusCode = 405;
					res.setHeader('Content-Type', 'text/plain; charset=utf-8');
					res.end('Method not allowed.');
					return;
				}

				try {
					const origin = `http://${req.headers.host || '127.0.0.1'}`;
					const headers = new Headers();
					for (const [key, value] of Object.entries(req.headers)) {
						if (value == null) continue;
						headers.set(key, Array.isArray(value) ? value.join(', ') : String(value));
					}

					const body =
						method === 'GET' || method === 'HEAD' ? undefined : await readRequestBody(req);

					const response = await handler({
						request: new Request(new URL(req.url || path, origin), {
							method,
							headers,
							body,
						}),
						env: process.env,
					});
					res.statusCode = response.status;
					response.headers.forEach((value, key) => {
						res.setHeader(key, value);
					});
					if (!res.getHeader('content-type')) {
						res.setHeader('Content-Type', 'text/plain; charset=utf-8');
					}
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
			filter: (page) =>
				page !== 'https://solar.florul.com/thank-you/' &&
				page !== 'https://solar.florul.com/email-preview/',
		}),
	],
	build: {
		format: 'directory',
	},
	vite: {
		plugins: [
			pagesFunctionDev('/api/address-search', addressSearch, ['GET']),
			pagesFunctionDev('/api/contact', contactPost, ['POST']),
		],
	},
});
