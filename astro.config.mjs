// @ts-check
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { onRequestGet as addressSearch } from './functions/api/address-search.js';
import { onRequestPost as contactPost } from './functions/api/contact.js';

function loadDevVars() {
	const file = resolve('.dev.vars');
	if (!existsSync(file)) return {};
	const env = {};
	for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq < 1) continue;
		const key = trimmed.slice(0, eq).trim();
		let value = trimmed.slice(eq + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		env[key] = value;
	}
	return env;
}

const readRequestBody = (req) =>
	new Promise((resolve, reject) => {
		const chunks = [];
		req.on('data', (chunk) => chunks.push(chunk));
		req.on('end', () => resolve(Buffer.concat(chunks)));
		req.on('error', reject);
	});

/** Serve selected Cloudflare Pages Functions during `astro dev` and `astro preview`. */
function pagesFunctionDev(path, handler, methods = ['GET']) {
	const middleware = async (req, res, next) => {
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

			const body = method === 'GET' || method === 'HEAD' ? undefined : await readRequestBody(req);

			const response = await handler({
				request: new Request(new URL(req.url || path, origin), {
					method,
					headers,
					body,
				}),
				env: { ...loadDevVars(), ...process.env },
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
	};

	return {
		name: `pages-function-dev:${path}`,
		configureServer(server) {
			server.middlewares.use(middleware);
		},
		configurePreviewServer(server) {
			server.middlewares.use(middleware);
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
