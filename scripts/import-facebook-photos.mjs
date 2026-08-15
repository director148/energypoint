#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const manifestPath = process.argv[2];
const outDir = path.resolve('public/images/social');
const originalDir = path.join(outDir, 'originals');
const widths = [640, 960, 1200];

if (!manifestPath) {
	console.error('Usage: node scripts/import-facebook-photos.mjs <cdp-json>');
	process.exit(1);
}

const raw = JSON.parse(await readFile(manifestPath, 'utf8'));
const items = raw.result?.value?.items ?? raw.items ?? [];

await mkdir(originalDir, { recursive: true });

const catalog = [];

for (const item of items) {
	const ext = item.src.includes('.png') ? 'png' : 'jpg';
	const originalPath = path.join(originalDir, `${item.id}.${ext}`);
	const response = await fetch(item.src, {
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
			Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
			Referer: 'https://www.facebook.com/',
		},
	});
	if (!response.ok) {
		catalog.push({ id: item.id, href: item.href, alt: item.alt, error: `${response.status}` });
		console.log(`FAIL ${item.id} ${response.status}`);
		continue;
	}
	const buffer = Buffer.from(await response.arrayBuffer());
	await writeFile(originalPath, buffer);

	const image = sharp(buffer).rotate();
	const trimmed = await image.trim({ threshold: 12 }).toBuffer();
	const meta = await sharp(trimmed).metadata();
	const variants = {};
	for (const width of widths) {
		const file = `fb-${item.id}-${width}.webp`;
		await sharp(trimmed)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: width <= 640 ? 72 : 62, effort: 6 })
			.toFile(path.join(outDir, file));
		variants[width] = `/images/social/${file}`;
	}

	catalog.push({
		id: item.id,
		href: item.href,
		alt: item.alt,
		width: meta.width,
		height: meta.height,
		original: `/images/social/originals/${item.id}.${ext}`,
		variants,
	});
	console.log(`OK   ${item.id} ${meta.width}x${meta.height}`);
}

await writeFile(path.join(outDir, 'catalog.json'), JSON.stringify(catalog, null, 2));
console.log(`\nWrote ${catalog.filter((item) => !item.error).length} of ${items.length} photos`);
