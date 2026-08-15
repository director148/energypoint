#!/usr/bin/env node
/**
 * Re-encode public/images webp variants for Slow-4G delivery.
 * Masters: original .jpg/.png (preferred) or full .webp → 640/960/1200/1600.
 */
import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = path.resolve('public/images');
const WIDTHS = [640, 960, 1200, 1600];
const QUALITY_BY_WIDTH = { 640: 65, 960: 60, 1200: 55, 1600: 52 };
const SIZE_SUFFIX = /-(?:640|960|1200|1600)$/i;

const SKIP = new Set([
	'energy-point-logo.webp',
	'energy-point-logo-240.webp',
	'energy-point-logo-white.webp',
	'energy-point-logo-white-240.webp',
	'energy-point-logo.png',
	'seanz-logo-white.png',
	'seanz-logo-white.webp',
	'sigenergy-logo-white.png',
	'sigenergy-logo-white.webp',
	'ewrb-logo.png',
	'ewrb-logo.webp',
]);

function baseName(file) {
	return file
		.replace(/\.(png|jpe?g|webp)$/i, '')
		.replace(SIZE_SUFFIX, '');
}

function sourceScore(file) {
	if (/\.(jpe?g|png)$/i.test(file)) return 4;
	if (file.endsWith('.webp') && !SIZE_SUFFIX.test(file.replace(/\.webp$/i, ''))) return 3;
	if (/-(?:1600)\.webp$/i.test(file)) return 2;
	return 0;
}

async function main() {
	const files = await readdir(DIR);
	const sources = new Map();

	for (const file of files) {
		if (SKIP.has(file)) continue;
		// Ignore already-sized variants as masters (except as weak fallback)
		const full = path.join(DIR, file);
		const st = await stat(full);
		if (!st.isFile()) continue;

		const score = sourceScore(file);
		if (score === 0) continue;

		const base = baseName(file);
		const existing = sources.get(base);
		if (!existing || score > existing.score) {
			sources.set(base, { file, full, score });
		}
	}

	let wrote = 0;
	for (const [base, { full, file }] of sources) {
		const meta = await sharp(full).metadata();
		if (!meta.width) continue;

		for (const width of WIDTHS) {
			const quality = QUALITY_BY_WIDTH[width] ?? 68;
			const outName = `${base}-${width}.webp`;
			const outPath = path.join(DIR, outName);
			const before = await stat(outPath)
				.then((s) => s.size)
				.catch(() => 0);
			const buffer = await sharp(full)
				.resize({ width, withoutEnlargement: true })
				.webp({ quality, effort: 6 })
				.toBuffer();
			await writeFile(outPath, buffer);
			const after = buffer.length;
			const delta = before ? after - before : after;
			console.log(
				`${outName.padEnd(42)} ${(after / 1024).toFixed(1).padStart(7)} KiB` +
					(before ? ` (${delta >= 0 ? '+' : ''}${(delta / 1024).toFixed(1)} KiB)` : ' (new)') +
					` ← ${file} q${quality}`,
			);
			wrote += 1;
		}
	}
	console.log(`\nWrote ${wrote} files from ${sources.size} sources`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
