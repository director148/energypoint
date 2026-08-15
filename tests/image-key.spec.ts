import { expect, test } from '@playwright/test';
import { buildImageKey } from '../functions/_shared/image-key.js';

/**
 * Pure logic behind functions/images/[[path]].js. `astro preview` does not run
 * Pages Functions, so this is the only place the routing is covered.
 */

test('joins the segments a [[path]] catch-all passes in', () => {
	// The regression: String(['social', 'x.webp']) yields 'social,x.webp' and
	// every image in a subfolder missed the bucket.
	expect(buildImageKey(['social', 'fb-1.webp'])).toBe('images/social/fb-1.webp');
	expect(buildImageKey(['social', 'originals', '123.jpg'])).toBe(
		'images/social/originals/123.jpg',
	);
});

test('handles a single top level segment', () => {
	expect(buildImageKey(['home-hero-1200.webp'])).toBe('images/home-hero-1200.webp');
});

test('accepts a plain string path', () => {
	expect(buildImageKey('social/fb-1.webp')).toBe('images/social/fb-1.webp');
	expect(buildImageKey('home-hero.webp')).toBe('images/home-hero.webp');
});

test('refuses paths that escape the images prefix', () => {
	expect(buildImageKey(['..', 'wrangler.toml'])).toBeNull();
	expect(buildImageKey(['social', '..', '..', 'secrets'])).toBeNull();
	expect(buildImageKey('../wrangler.toml')).toBeNull();
	expect(buildImageKey(['.', 'home-hero.webp'])).toBeNull();
});

test('refuses an empty path', () => {
	expect(buildImageKey([])).toBeNull();
	expect(buildImageKey('')).toBeNull();
	expect(buildImageKey(undefined)).toBeNull();
	expect(buildImageKey(null)).toBeNull();
});

test('ignores empty segments from stray slashes', () => {
	expect(buildImageKey(['social', '', 'fb-1.webp'])).toBe('images/social/fb-1.webp');
	expect(buildImageKey('social//fb-1.webp')).toBe('images/social/fb-1.webp');
});
