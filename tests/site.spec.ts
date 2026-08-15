import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

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

/**
 * Retired URLs redirect via _redirects, which Cloudflare Pages serves but
 * `astro preview` ignores, so assert the rules rather than the response here.
 * Read the built copy so a rule that never reaches dist/ still fails.
 */
test('retired URLs redirect to meet the team', async () => {
	const redirects = await readFile('dist/_redirects', 'utf8');
	for (const from of ['/about-us', '/about-us/', '/people', '/people/']) {
		expect(redirects).toContain(`${from} /meet-the-team/ 301`);
	}
});

for (const route of routes) {
	test(`${route} renders a titled page`, async ({ page }) => {
		const response = await page.goto(route);
		expect(response?.ok()).toBeTruthy();
		await expect(page.locator('main h1')).toBeVisible();
		await expect(page).toHaveTitle(/Energy Point/);
		await expect(page.locator('main')).toHaveAttribute('id', 'main-content');
	});
}

test('how it works page covers the grid connection', async ({ page }) => {
	await page.goto('/how-it-works/');
	await expect(page.getByRole('heading', { name: 'How it works', exact: true })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Grid connection' })).toBeVisible();
	await expect(page.getByText('We handle everything')).toBeVisible();
});

test('mobile navigation exposes every primary journey', async ({ page, isMobile }) => {
	test.skip(!isMobile, 'Mobile navigation test');
	await page.goto('/');

	const toggle = page.locator('[data-menu-toggle]');
	await expect(toggle).toHaveAccessibleName('Open navigation menu');
	await toggle.click();

	await expect(toggle).toHaveAttribute('aria-expanded', 'true');
	const mobileNav = page.getByRole('navigation', { name: 'Mobile navigation' });
	await expect(mobileNav).toBeVisible();
	await expect(mobileNav.getByRole('link', { name: 'Residential', exact: true })).toBeVisible();
	await expect(mobileNav.getByRole('link', { name: 'Commercial', exact: true })).toBeVisible();
	await expect(mobileNav.getByRole('link', { name: 'Rural', exact: true })).toBeVisible();
	await expect(mobileNav.getByRole('link', { name: 'How it works', exact: true })).toBeVisible();

	await page.keyboard.press('Escape');
	await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('meet the team names the owners, lead installer and inspector', async ({ page }) => {
	await page.goto('/meet-the-team/');
	await expect(page.getByRole('heading', { name: 'Nick Davies' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Sam Andersen' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Sheamus Bronson' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Alan Gellert' })).toBeVisible();
});

test('SEANZ page covers member benefits and the public listing', async ({ page }) => {
	await page.goto('/seanz/');
	await expect(page.getByRole('heading', { name: 'SEANZ', exact: true })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Why a SEANZ installer' })).toBeVisible();
	await expect(page.getByRole('img', { name: 'SEANZ, Sustainable Energy Association of New Zealand' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'The bank pathway' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'View our SEANZ listing' })).toHaveAttribute(
		'href',
		'https://www.seanz.org.nz/50438',
	);
});

test('reviews page moves through a carousel', async ({ page }) => {
	await page.goto('/reviews/');
	const region = page.getByRole('region', { name: 'Customer reviews' });
	await expect(region).toBeVisible();
	await expect(region.getByRole('heading', { name: 'The whole process was so easy' })).toBeVisible();

	await page.getByRole('button', { name: 'Next review' }).click();
	await expect(region.getByRole('heading', { name: 'Local legends: highly recommend!' })).toBeInViewport();
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

test('FAQ audience filter shows matching questions', async ({ page }) => {
	await page.goto('/frequently-asked-questions/');
	const rural = page.getByRole('button', { name: 'Rural' });
	const commercial = page.getByRole('button', { name: 'Commercial' });

	await rural.click();
	await expect(rural).toHaveAttribute('aria-pressed', 'true');
	await expect(page).toHaveURL(/audience=rural/);
	await expect(page.getByText('Is ground-mounted solar an option on a farm?')).toBeVisible();
	await expect(page.getByText('Can solar work on a commercial roof or multiple buildings?')).toBeHidden();

	await commercial.click();
	await expect(page.getByText('Can solar work on a commercial roof or multiple buildings?')).toBeVisible();
	await expect(page.getByText('Is ground-mounted solar an option on a farm?')).toBeHidden();
});

test('address lookup shows NZ suggestions when the Pages function is missing', async ({
	page,
}) => {
	await page.route('https://photon.komoot.io/api/**', async (route) => {
		await route.fulfill({
			contentType: 'application/json',
			body: JSON.stringify({
				features: [
					{
						properties: {
							countrycode: 'NZ',
							housenumber: '12',
							street: 'Victoria Street',
							city: 'Hamilton',
							state: 'Waikato',
							postcode: '3204',
							type: 'house',
						},
					},
				],
			}),
		});
	});

	await page.goto('/contact/');
	await page.locator('#address').fill('12 Victoria');
	await expect(page.getByRole('option', { name: /12 Victoria Street/ })).toBeVisible();
});

test('contact form posts to the Cloudflare handler and validates required fields', async ({
	page,
}) => {
	await page.goto('/contact/?audience=Rural');

	const form = page.locator('form[name="energy-plan"]');
	await expect(form).toHaveAttribute('action', '/api/contact');
	await expect(form).toHaveAttribute('enctype', 'multipart/form-data');
	await expect(page.locator('select[name="audience"]')).toHaveValue('Rural');
	await expect(page.locator('input[name="uploads"]')).toHaveAttribute('type', 'file');
	await expect(page.locator('input[name="uploads"]')).toHaveAttribute('multiple', '');
	await expect(page.locator('input[name="uploads"]')).not.toHaveAttribute('required');
	await expect(page.locator('input[name="bill"]')).toHaveCount(0);
	await expect(page.locator('input[name="usage"]')).toHaveCount(0);
	await expect(page.locator('input[name="photos"]')).toHaveCount(0);
	await expect(page.locator('ol.next-steps')).toContainText('Within one working day');

	await page.getByRole('button', { name: 'Submit' }).click();
	await expect(page).toHaveURL(/\/contact/);
	const invalidFields = page.locator('form[name="energy-plan"] :invalid');
	expect(await invalidFields.count()).toBeGreaterThan(0);
});

test('contact form does not dump HTML error pages into the uploads field', async ({ page }) => {
	await page.route('**/api/contact', async (route) => {
		await route.fulfill({
			status: 404,
			contentType: 'text/html; charset=utf-8',
			body: '<!DOCTYPE html><html lang="en-NZ"><head><meta charset="UTF-8"><title>Not found</title></head><body><h1>Not found</h1></body></html>',
		});
	});

	await page.goto('/contact/');
	await page.locator('#firstName').fill('Jordan');
	await page.locator('#lastName').fill('Taylor');
	await page.locator('#phone').fill('0211234567');
	await page.locator('#email').fill('jordan@example.com');
	await page.locator('#address').fill('12 Victoria Street, Hamilton');
	await page.locator('#audience').selectOption('Residential');
	await page.locator('#goal').selectOption('Reduce electricity costs');
	await page.locator('#authority').selectOption('I own the property');
	await page.locator('#preferredTime').selectOption('Morning');

	await page.getByRole('button', { name: 'Submit' }).click();

	const formError = page.locator('[data-form-error]');
	await expect(formError).toBeVisible();
	await expect(formError).toHaveText('Could not send enquiry. Please try again.');
	await expect(formError).not.toContainText('DOCTYPE');
	await expect(formError).not.toContainText('<html');
	const box = await formError.boundingBox();
	expect(box?.height ?? 9999).toBeLessThan(120);
	await expect(page.locator('[data-error-for="uploads"]')).toBeHidden();
	await expect(page.locator('main')).not.toContainText('<!DOCTYPE');
});

test('contact form never shows internal delivery setup errors', async ({ page }) => {
	await page.route('**/api/contact', async (route) => {
		await route.fulfill({
			status: 503,
			contentType: 'text/plain; charset=utf-8',
			body: 'Enquiry delivery is not configured yet.',
		});
	});

	await page.goto('/contact/');
	await page.locator('#firstName').fill('Jordan');
	await page.locator('#lastName').fill('Taylor');
	await page.locator('#phone').fill('0211234567');
	await page.locator('#email').fill('jordan@example.com');
	await page.locator('#address').fill('12 Victoria Street, Hamilton');
	await page.locator('#audience').selectOption('Residential');
	await page.locator('#goal').selectOption('Reduce electricity costs');
	await page.locator('#authority').selectOption('I own the property');
	await page.locator('#preferredTime').selectOption('Morning');

	await page.getByRole('button', { name: 'Submit' }).click();

	const formError = page.locator('[data-form-error]');
	await expect(formError).toBeVisible();
	await expect(formError).toHaveText('Could not send enquiry. Please try again.');
	await expect(page.locator('main')).not.toContainText('not configured');
	await expect(page.locator('[data-error-for="uploads"]')).toBeHidden();
});

test('legal pages include a dated policy and on-page navigation', async ({ page }) => {
	await page.goto('/privacy/');
	await expect(page.locator('main h1')).toHaveText('Privacy policy');
	await expect(page.getByText(/Last updated 15 August 2026/)).toBeVisible();
	await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'Your rights' })).toBeVisible();
	await expect(page.locator('main')).toContainText('Privacy Act 2020');

	await page.goto('/cookies/');
	await expect(page.locator('main')).toContainText('We do not run Google Analytics');

	await page.goto('/accessibility/');
	await expect(page.locator('main h1')).toHaveText('Accessibility statement');
	await expect(page.locator('main')).toContainText('Human Rights Act 1993');
	await expect(page.locator('main')).toContainText('WCAG');
});

/** Companies Register: ENERGY POINT LIMITED, incorporated 5 December 2024. */
test('legal pages name the registered company', async ({ page }) => {
	for (const route of ['/privacy/', '/terms/']) {
		await page.goto(route);
		const main = page.locator('main');
		await expect(main).toContainText('Energy Point Limited');
		await expect(main).toContainText('company number 9297401');
		await expect(main).toContainText('NZBN 9429052495519');
	}
});

test('footer exposes legal pages from the homepage', async ({ page }) => {
	await page.goto('/');
	const legal = page.getByRole('navigation', { name: 'Legal' });
	await expect(legal.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy/');
	await expect(legal.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms/');
	await expect(legal.getByRole('link', { name: 'Cookies' })).toHaveAttribute('href', '/cookies/');
	await expect(legal.getByRole('link', { name: 'Disclaimer' })).toHaveAttribute('href', '/disclaimer/');
	await expect(legal.getByRole('link', { name: 'Accessibility' })).toHaveAttribute('href', '/accessibility/');
	await expect(page.getByRole('navigation', { name: 'Partners' }).getByRole('link', { name: 'SEANZ member' })).toHaveAttribute(
		'href',
		'/seanz/',
	);
	await expect(page.getByRole('navigation', { name: 'Partners' }).getByRole('link', { name: 'Sigenergy' })).toHaveAttribute(
		'href',
		'https://www.sigenergy.com/au/',
	);
	await expect(
		page.getByRole('navigation', { name: 'Partners' }).getByRole('link', { name: 'Electrical Workers Registration Board' }),
	).toHaveAttribute(
		'href',
		'https://kete.mbie.govt.nz/EW/EWPRSearch/practitioner/?id=228928f3-b042-df11-917a-005056ae567f',
	);
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

