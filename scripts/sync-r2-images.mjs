import { readdir, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const BUCKET = 'energy-point';
const ROOT = path.resolve('public');
const SOURCE = path.join(ROOT, 'images');
const CONCURRENCY = 6;

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

function put(file) {
	const key = path.relative(ROOT, file).split(path.sep).join('/');
	const wranglerBin = path.resolve('node_modules/.bin/wrangler');
	const args = [
		'r2',
		'object',
		'put',
		`${BUCKET}/${key}`,
		'--file',
		file,
		'--content-type',
		contentType(file),
		'--cache-control',
		'public, max-age=31536000',
		'--remote',
	];
	if (process.env.CLOUDFLARE_ACCOUNT_ID) {
		args.push('--account-id', process.env.CLOUDFLARE_ACCOUNT_ID);
	}
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
			if (code === 0) resolve(key);
			else reject(new Error(`Failed ${key}: ${stderr.trim() || `exit ${code}`}`));
		});
	});
}

async function runPool(items, worker, size) {
	let index = 0;
	const errors = [];
	const runners = Array.from({ length: size }, async () => {
		while (index < items.length) {
			const current = items[index++];
			try {
				const key = await worker(current);
				console.log(`uploaded ${key}`);
			} catch (error) {
				errors.push(error);
				console.error(error.message);
			}
		}
	});
	await Promise.all(runners);
	return errors;
}

const files = await walk(SOURCE);
console.log(`Uploading ${files.length} files to R2 bucket ${BUCKET}`);
const errors = await runPool(files, put, CONCURRENCY);
if (errors.length) {
	console.error(`${errors.length} uploads failed`);
	process.exit(1);
}
console.log(`Synced ${files.length} files to ${BUCKET}`);
