#!/usr/bin/env node
/**
 * Lighthouse audit: all pages × viewports with Slow 4G throttling.
 * Lighthouse runs on Chromium only; pair with Playwright for Firefox/WebKit smoke.
 *
 * Requires a PRODUCTION preview (astro preview / wrangler pages dev), not `astro dev`.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

const BASE = (process.env.LH_BASE ?? 'http://127.0.0.1:4323').replace(/\/$/, '');
const CHROME_PATH =
	process.env.CHROME_PATH ??
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.resolve('lighthouse-results');

/** Lighthouse Slow 4G (mobile default): applied to every viewport per request */
const SLOW_4G = {
	rttMs: 150,
	throughputKbps: 1.6 * 1024,
	requestLatencyMs: 150 * 3.75,
	downloadThroughputKbps: 1.6 * 1024,
	uploadThroughputKbps: 750,
	cpuSlowdownMultiplier: 4,
};

const PAGES = [
	{ id: 'home', path: '/' },
	{ id: 'residential', path: '/residential/' },
	{ id: 'commercial', path: '/commercial/' },
	{ id: 'rural', path: '/rural/' },
	{ id: 'maintenance', path: '/maintenance/' },
	{ id: 'finance', path: '/finance/' },
	{ id: 'about-us', path: '/about-us/' },
	{ id: 'reviews', path: '/reviews/' },
	{ id: 'faqs', path: '/frequently-asked-questions/' },
	{ id: 'contact', path: '/contact/' },
	{ id: 'thank-you', path: '/thank-you/', noindex: true },
	{ id: '404', path: '/404.html', noindex: true },
];

const DEVICES = [
	{
		id: 'phone-sm',
		label: 'Phone S · 360×640',
		formFactor: 'mobile',
		screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false },
	},
	{
		id: 'phone',
		label: 'Phone · 412×915',
		formFactor: 'mobile',
		screenEmulation: { mobile: true, width: 412, height: 915, deviceScaleFactor: 2.625, disabled: false },
	},
	{
		id: 'tablet',
		label: 'Tablet · 768×1024',
		formFactor: 'mobile',
		screenEmulation: { mobile: true, width: 768, height: 1024, deviceScaleFactor: 2, disabled: false },
	},
	{
		id: 'laptop',
		label: 'Laptop · 1366×768',
		formFactor: 'desktop',
		screenEmulation: { mobile: false, width: 1366, height: 768, deviceScaleFactor: 1, disabled: false },
	},
	{
		id: 'desktop',
		label: 'Desktop · 1920×1080',
		formFactor: 'desktop',
		screenEmulation: { mobile: false, width: 1920, height: 1080, deviceScaleFactor: 1, disabled: false },
	},
];

function score(lhr, cat) {
	const value = lhr.categories?.[cat]?.score;
	return value == null ? null : Math.round(value * 100);
}

function metric(lhr, id) {
	const a = lhr.audits?.[id];
	if (!a) return null;
	return {
		score: a.score == null ? null : Math.round(a.score * 100),
		displayValue: a.displayValue ?? null,
		numericValue: a.numericValue ?? null,
	};
}

function failedAudits(lhr) {
	return Object.values(lhr.audits || {})
		.filter(
			(a) =>
				a.score !== null &&
				a.score < 1 &&
				a.scoreDisplayMode !== 'informative' &&
				a.scoreDisplayMode !== 'manual' &&
				a.scoreDisplayMode !== 'notApplicable',
		)
		.map((a) => {
			const rawItems = a.details?.items;
			const items = Array.isArray(rawItems)
				? rawItems.slice(0, 6).map((item) => {
						if (typeof item === 'string') return item;
						return {
							url: item.url ?? item.node?.snippet ?? item.source ?? null,
							label: item.label ?? item.node?.selector ?? item.statistic ?? null,
							wastedBytes: item.wastedBytes ?? null,
							wastedMs: item.wastedMs ?? null,
						};
					})
				: [];
			return {
				id: a.id,
				title: a.title,
				score: Math.round((a.score ?? 0) * 100),
				displayValue: a.displayValue ?? null,
				description: a.description?.slice(0, 240) ?? null,
				items,
			};
		})
		.sort((a, b) => a.score - b.score);
}

async function assertProductionPreview(base) {
	const res = await fetch(`${base}/`);
	if (!res.ok) throw new Error(`Preview not reachable at ${base}/ (${res.status})`);
	const html = await res.text();
	if (html.includes('@vite/client') || html.includes('astro-dev-toolbar')) {
		throw new Error(
			`${base} looks like \`astro dev\`. Run \`npm run build && npm run preview -- --host 127.0.0.1 --port 4323\` and set LH_BASE.`,
		);
	}
	const viteProbe = await fetch(`${base}/@vite/client`);
	if (viteProbe.ok) {
		throw new Error(`${base}/@vite/client is reachable — refusing to audit a Vite/dev server.`);
	}
}

async function main() {
	await assertProductionPreview(BASE);
	await mkdir(OUT_DIR, { recursive: true });
	const chrome = await launch({
		chromePath: CHROME_PATH,
		chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
	});

	const results = [];
	const started = Date.now();
	const total = PAGES.length * DEVICES.length;
	let i = 0;

	try {
		for (const page of PAGES) {
			for (const device of DEVICES) {
				i += 1;
				const url = BASE + page.path;
				process.stderr.write(`[${i}/${total}] ${page.id} · ${device.id} · slow-4G … `);
				try {
					const options = {
						logLevel: 'error',
						output: 'json',
						onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
						port: chrome.port,
						formFactor: device.formFactor,
						screenEmulation: device.screenEmulation,
						throttlingMethod: 'simulate',
						throttling: SLOW_4G,
						maxWaitForLoad: 60000,
					};

					const runnerResult = await lighthouse(url, options);
					const lhr = runnerResult.lhr;
					const fails = failedAudits(lhr);
					const row = {
						page: page.id,
						path: page.path,
						noindex: Boolean(page.noindex),
						device: device.id,
						deviceLabel: device.label,
						formFactor: device.formFactor,
						viewport: `${device.screenEmulation.width}x${device.screenEmulation.height}`,
						throttling: 'slow-4G',
						scores: {
							performance: score(lhr, 'performance'),
							accessibility: score(lhr, 'accessibility'),
							bestPractices: score(lhr, 'best-practices'),
							seo: score(lhr, 'seo'),
						},
						metrics: {
							fcp: metric(lhr, 'first-contentful-paint'),
							lcp: metric(lhr, 'largest-contentful-paint'),
							tbt: metric(lhr, 'total-blocking-time'),
							cls: metric(lhr, 'cumulative-layout-shift'),
							si: metric(lhr, 'speed-index'),
							tti: metric(lhr, 'interactive'),
						},
						failedAudits: fails.slice(0, 12),
					};
					results.push(row);

					if (row.scores.performance < 90 || fails.some((f) => f.score === 0)) {
						const detailPath = path.join(OUT_DIR, `${page.id}__${device.id}.json`);
						await writeFile(
							detailPath,
							JSON.stringify(
								{
									url,
									scores: row.scores,
									failedAudits: fails,
									audits: Object.fromEntries(
										fails.map((f) => [f.id, lhr.audits[f.id]]),
									),
								},
								null,
								2,
							),
						);
					}

					process.stderr.write(
						`P${row.scores.performance} A${row.scores.accessibility} BP${row.scores.bestPractices} SEO${row.scores.seo}\n`,
					);
				} catch (err) {
					results.push({
						page: page.id,
						path: page.path,
						device: device.id,
						deviceLabel: device.label,
						error: String(err.message || err),
					});
					process.stderr.write(`ERROR ${err.message}\n`);
				}
			}
		}
	} finally {
		await chrome.kill();
	}

	const ok = results.filter((r) => !r.error && r.scores?.performance != null);
	const indexable = ok.filter((r) => !r.noindex);
	const auditCounts = {};
	for (const row of ok) {
		for (const a of row.failedAudits ?? []) {
			auditCounts[a.id] ??= { id: a.id, title: a.title, count: 0, minScore: 100, pages: new Set() };
			auditCounts[a.id].count += 1;
			auditCounts[a.id].minScore = Math.min(auditCounts[a.id].minScore, a.score);
			auditCounts[a.id].pages.add(`${row.page}@${row.device}`);
		}
	}

	const nums = (rows, key) => rows.map((r) => r.scores[key]).filter((n) => typeof n === 'number');

	const summary = {
		base: BASE,
		generatedAt: new Date().toISOString(),
		durationMs: Date.now() - started,
		throttling: 'slow-4G',
		note: 'Lighthouse is Chromium-only. Use Playwright for Firefox/WebKit smoke. thank-you/404 are noindex (SEO mins exclude them).',
		pageCount: PAGES.length,
		deviceCount: DEVICES.length,
		runCount: results.length,
		okCount: ok.length,
		errorCount: results.filter((r) => r.error).length,
		scoreMins: {
			performance: nums(ok, 'performance').length ? Math.min(...nums(ok, 'performance')) : null,
			accessibility: nums(ok, 'accessibility').length ? Math.min(...nums(ok, 'accessibility')) : null,
			bestPractices: nums(ok, 'bestPractices').length ? Math.min(...nums(ok, 'bestPractices')) : null,
			seo: nums(indexable, 'seo').length ? Math.min(...nums(indexable, 'seo')) : null,
		},
		worstPerformance: [...ok]
			.sort((a, b) => a.scores.performance - b.scores.performance)
			.slice(0, 10)
			.map((r) => ({
				page: r.page,
				device: r.device,
				performance: r.scores.performance,
				lcp: r.metrics.lcp?.displayValue,
				failed: (r.failedAudits ?? []).slice(0, 5).map((a) => a.id),
			})),
		topFailedAudits: Object.values(auditCounts)
			.map((a) => ({
				id: a.id,
				title: a.title,
				count: a.count,
				minScore: a.minScore,
				examples: [...a.pages].slice(0, 5),
			}))
			.sort((a, b) => b.count - a.count || a.minScore - b.minScore)
			.slice(0, 20),
		devices: DEVICES.map((d) => ({ id: d.id, label: d.label, formFactor: d.formFactor })),
		pages: PAGES,
		results,
	};

	const outFile = path.join(OUT_DIR, 'summary.json');
	await writeFile(outFile, JSON.stringify(summary, null, 2));
	process.stderr.write(`\nWrote ${outFile}\n`);
	console.log(
		JSON.stringify({
			outFile,
			base: BASE,
			runCount: results.length,
			okCount: summary.okCount,
			scoreMins: summary.scoreMins,
			topFailedAudits: summary.topFailedAudits.slice(0, 8),
			durationMs: summary.durationMs,
		}),
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
