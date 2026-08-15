import { expect, test } from '@playwright/test';

/**
 * Cross-browser smoke: Chromium / Firefox / WebKit.
 * Lighthouse itself is Chromium-only; this catches engine-specific render/console issues.
 */
const routes = [
	'/',
	'/residential/',
	'/commercial/',
	'/rural/',
	'/how-it-works/',
	'/finance/',
	'/maintenance/',
	'/meet-the-team/',
	'/seanz/',
	'/reviews/',
	'/frequently-asked-questions/',
	'/contact/',
	'/thank-you/',
	'/privacy/',
	'/terms/',
	'/cookies/',
	'/disclaimer/',
	'/accessibility/',
];

for (const route of routes) {
	test(`${route} loads without console errors`, async ({ page, browserName }) => {
		const errors: string[] = [];
		page.on('pageerror', (err) => errors.push(String(err)));
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});

		const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
		expect(response, `${browserName} ${route}`).not.toBeNull();
		expect(response!.ok() || response!.status() === 404, `${browserName} ${route} status`).toBeTruthy();
		await expect(page.locator('main h1')).toBeVisible();
		await expect(page.locator('.brand img')).toBeVisible();

		const critical = errors.filter(
			(e) =>
				!e.includes('favicon') &&
				!e.includes('net::ERR_') &&
				!/Download the React DevTools/i.test(e),
		);
		expect(critical, `${browserName} ${route} console: ${critical.join(' | ')}`).toEqual([]);
	});
}

test('homepage logo and nav are visible at phone width', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	const logo = page.locator('.brand img');
	await expect(logo).toBeVisible();
	await expect(logo).toHaveAttribute('src', /energy-point-logo-white/);
	await expect(page.locator('[data-menu-toggle]')).toBeVisible();
});
