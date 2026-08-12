import { expect, test } from '@playwright/test';

const routes = [
	'/',
	'/residential/',
	'/commercial/',
	'/rural/',
	'/finance/',
	'/maintenance/',
	'/about-us/',
	'/reviews/',
	'/frequently-asked-questions/',
	'/contact/',
	'/thank-you/',
];

for (const route of routes) {
	test(`${route} renders a titled page`, async ({ page }) => {
		const response = await page.goto(route);
		expect(response?.ok()).toBeTruthy();
		await expect(page.locator('main h1')).toBeVisible();
		await expect(page).toHaveTitle(/Energy Point/);
		await expect(page.locator('main')).toHaveAttribute('id', 'main-content');
	});
}

test('mobile navigation exposes every primary journey', async ({ page, isMobile }) => {
	test.skip(!isMobile, 'Mobile navigation test');
	await page.goto('/');

	const toggle = page.locator('[data-menu-toggle]');
	await expect(toggle).toHaveAccessibleName('Open navigation menu');
	await toggle.click();

	await expect(toggle).toHaveAttribute('aria-expanded', 'true');
	await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Residential', exact: true })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Commercial', exact: true })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Rural', exact: true })).toBeVisible();

	await page.keyboard.press('Escape');
	await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('FAQ search filters answers', async ({ page }) => {
	await page.goto('/frequently-asked-questions/');
	const search = page.getByRole('searchbox', { name: 'Search solar questions' });

	await search.fill('battery');
	const visibleQuestions = page.locator('[data-faq-item]:visible');
	await expect(visibleQuestions).not.toHaveCount(0);
	await expect(visibleQuestions.first()).toContainText(/battery|storage/i);

	await search.fill('phrase-with-no-answer');
	await expect(page.locator('[data-faq-empty]')).toBeVisible();
});

test('contact form posts to the Cloudflare handler and validates required fields', async ({
	page,
}) => {
	await page.goto('/contact/?audience=Rural');

	const form = page.locator('form[name="energy-plan"]');
	await expect(form).toHaveAttribute('action', '/api/contact');
	await expect(page.locator('select[name="audience"]')).toHaveValue('Rural');

	await page.getByRole('button', { name: 'Send my enquiry' }).click();
	await expect(page).toHaveURL(/\/contact/);
	const invalidFields = page.locator('form[name="energy-plan"] :invalid');
	expect(await invalidFields.count()).toBeGreaterThan(0);
});

test('all internal links on the homepage resolve', async ({ page, request }) => {
	await page.goto('/');
	const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
		Array.from(new Set(links.map((link) => (link as HTMLAnchorElement).getAttribute('href'))))
			.filter((href): href is string => Boolean(href))
			.map((href) => href.split('?')[0]),
	);

	for (const href of hrefs) {
		const response = await request.get(href);
		expect(response.ok(), `${href} should resolve`).toBeTruthy();
	}
});

