/**
 * Sync public/images to the energy-point R2 bucket.
 *
 * Uploads are slow (one wrangler process per file), so we keep a manifest of
 * content hashes and only send files whose bytes changed. Only successful
 * uploads are recorded, so anything that fails is retried on the next run.
 *
 * Run with --force (or R2_SYNC_FORCE=1) to re-upload everything, which is what
 * you want if the bucket is emptied or written to out of band.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const BUCKET = 'energy-point';
const ROOT = path.resolve('public');
const SOURCE = path.join(ROOT, 'images');
const MANIFEST = path.resolve('.r2-sync-manifest.json');
const CONCURRENCY = 6;
const ATTEMPTS = 3;
const FORCE = process.argv.includes('--force') || process.env.R2_SYNC_FORCE === '1';

const TYPES = {
	'.webp': 'image/webp',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.gif': 'image/gif',
	'.json': 'application/json',
	'.html': 'text/html; charset=utf-8',
};

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) files.push(...(await walk(full)));
		else files.push(full);
	}
	return files;
}

function contentType(file) {
	return TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

function keyFor(file) {
	return path.relative(ROOT, file).split(path.sep).join('/');
}

function isAuthError(error) {
	const message = String(error.message);
	return (
		message.includes('403: Forbidden') ||
		message.includes('Authentication error') ||
		message.includes('"code":10000')
	);
}

async function readManifest() {
	if (FORCE) return {};
	try {
		return JSON.parse(await readFile(MANIFEST, 'utf8'));
	} catch {
		return {};
	}
}

async function hash(file) {
	return createHash('md5').update(await readFile(file)).digest('hex');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function upload(file) {
	const wranglerBin = path.resolve('node_modules/.bin/wrangler');
	const args = [
		'r2',
		'object',
		'put',
		`${BUCKET}/${keyFor(file)}`,
		'--file',
		file,
		'--content-type',
		contentType(file),
		'--cache-control',
		'public, max-age=31536000',
		'--remote',
	];
	if (!process.env.CLOUDFLARE_API_TOKEN) {
		args.push('--profile=florul');
	}

	return new Promise((resolve, reject) => {
		const child = spawn(wranglerBin, args, {
			stdio: ['ignore', 'pipe', 'pipe'],
			env: process.env,
		});
		let stderr = '';
		child.stderr.on('data', (chunk) => {
			stderr += chunk;
		});
		child.on('exit', (code) => {
			if (code === 0) resolve();
			else reject(new Error(`Failed ${keyFor(file)}: ${stderr.trim() || `exit ${code}`}`));
		});
	});
}

/** Transient network faults are common here, so retry anything that is not an auth failure. */
async function uploadWithRetry(file) {
	for (let attempt = 1; ; attempt += 1) {
		try {
			await upload(file);
			return;
		} catch (error) {
			if (isAuthError(error) || attempt === ATTEMPTS) throw error;
			await sleep(attempt * 2000);
		}
	}
}

async function runPool(items, worker, size) {
	let index = 0;
	const errors = [];
	const runners = Array.from({ length: size }, async () => {
		while (index < items.length) {
			const current = items[index++];
			try {
				await worker(current);
			} catch (error) {
				errors.push(error);
			}
		}
	});
	await Promise.all(runners);
	return errors;
}

function skipWithoutR2Write() {
	const message =
		'CLOUDFLARE_API_TOKEN cannot write R2. Grant Account Workers R2 Storage Edit, or run npm run r2:sync locally.';
	if (process.env.GITHUB_ACTIONS) {
		console.log(`::warning title=R2 image sync skipped::${message}`);
	} else {
		console.warn(message);
	}
}

const files = await walk(SOURCE);
if (!files.length) {
	console.log(`No files to sync in ${SOURCE}`);
	process.exit(0);
}

const manifest = await readManifest();
const hashes = new Map();
await Promise.all(
	files.map(async (file) => {
		hashes.set(file, await hash(file));
	}),
);

const pending = files.filter((file) => manifest[keyFor(file)] !== hashes.get(file));
const skipped = files.length - pending.length;

if (!pending.length) {
	console.log(`R2 already holds all ${files.length} images in ${BUCKET}, nothing to upload`);
	process.exit(0);
}

console.log(
	`Uploading ${pending.length} changed file(s) to R2 bucket ${BUCKET}` +
		(skipped ? ` (${skipped} unchanged)` : ''),
);

/* Probe with one file so a token without R2 write fails fast instead of 283 times. */
const [probe, ...rest] = pending;
try {
	await uploadWithRetry(probe);
	manifest[keyFor(probe)] = hashes.get(probe);
	console.log(`uploaded ${keyFor(probe)}`);
} catch (error) {
	if (isAuthError(error)) {
		skipWithoutR2Write();
		process.exit(0);
	}
	console.error(error.message);
	await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
	process.exit(1);
}

const errors = await runPool(
	rest,
	async (file) => {
		await uploadWithRetry(file);
		manifest[keyFor(file)] = hashes.get(file);
		console.log(`uploaded ${keyFor(file)}`);
	},
	CONCURRENCY,
);

/* Record what did land so a rerun only retries the stragglers. */
await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

if (errors.length) {
	if (errors.every(isAuthError)) {
		skipWithoutR2Write();
		process.exit(0);
	}
	console.error('');
	for (const error of errors) console.error(`  ${error.message}`);
	console.error('');
	console.error(
		`${errors.length} of ${pending.length} uploads failed after ${ATTEMPTS} attempts. ` +
			'The site was NOT deployed. Rerun npm run deploy to retry just these files.',
	);
	process.exit(1);
}

console.log(`Synced ${pending.length} file(s) to ${BUCKET}`);
