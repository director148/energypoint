/** Validate and store enquiry photos in R2.
 *  Bucket lifecycle (r2-lifecycle.json) deletes objects after 30 days.
 */

export const PHOTO_LIMITS = {
	maxCount: 20,
	maxBytes: 2 * 1024 * 1024,
};

export const DOCUMENT_LIMITS = {
	billBytes: 8 * 1024 * 1024,
	usageBytes: 5 * 1024 * 1024,
};

export function sniffImage(bytes) {
	if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
		return { type: 'image/jpeg', ext: 'jpg' };
	}

	if (
		bytes.length >= 8 &&
		bytes[0] === 0x89 &&
		bytes[1] === 0x50 &&
		bytes[2] === 0x4e &&
		bytes[3] === 0x47
	) {
		return { type: 'image/png', ext: 'png' };
	}

	if (
		bytes.length >= 12 &&
		bytes[0] === 0x52 &&
		bytes[1] === 0x49 &&
		bytes[2] === 0x46 &&
		bytes[3] === 0x46 &&
		bytes[8] === 0x57 &&
		bytes[9] === 0x45 &&
		bytes[10] === 0x42 &&
		bytes[11] === 0x50
	) {
		return { type: 'image/webp', ext: 'webp' };
	}

	return null;
}

export function sniffPdf(bytes) {
	if (
		bytes.length >= 4 &&
		bytes[0] === 0x25 &&
		bytes[1] === 0x50 &&
		bytes[2] === 0x44 &&
		bytes[3] === 0x46
	) {
		return { type: 'application/pdf', ext: 'pdf' };
	}

	return null;
}

export function sniffCsv(bytes) {
	if (!bytes.length) return null;

	const sample = bytes.subarray(0, Math.min(bytes.length, 1024));
	if (sample.some((value) => value === 0)) return null;

	return { type: 'text/csv', ext: 'csv' };
}

export function sniffSpreadsheet(bytes, fileName = '') {
	const name = String(fileName).toLowerCase();

	if (
		bytes.length >= 8 &&
		bytes[0] === 0xd0 &&
		bytes[1] === 0xcf &&
		bytes[2] === 0x11 &&
		bytes[3] === 0xe0
	) {
		return { type: 'application/vnd.ms-excel', ext: 'xls' };
	}

	const isZip =
		bytes.length >= 4 &&
		bytes[0] === 0x50 &&
		bytes[1] === 0x4b &&
		(bytes[2] === 0x03 || bytes[2] === 0x05 || bytes[2] === 0x07);

	if (!isZip) return null;

	if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
		return {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			ext: 'xlsx',
		};
	}

	const text = new TextDecoder('latin1').decode(bytes.subarray(0, Math.min(bytes.length, 8192)));
	if (text.includes('xl/') || text.includes('spreadsheetml')) {
		return {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			ext: 'xlsx',
		};
	}

	return null;
}

export function sniffUpload(bytes, fileName = '') {
	return sniffImage(bytes) || sniffPdf(bytes) || sniffSpreadsheet(bytes, fileName) || sniffCsv(bytes);
}

async function putEnquiryFile(env, bytes, kind, label) {
	const bucket = env.ENQUIRY_PHOTOS;
	if (!bucket) return null;

	const stamp = new Date().toISOString().slice(0, 10);
	const id = crypto.randomUUID();
	const key = `enquiries/${stamp}/${id}/${label}.${kind.ext}`;

	await bucket.put(key, bytes, {
		httpMetadata: {
			contentType: kind.type,
			cacheControl: 'private, max-age=2592000',
		},
		customMetadata: {
			retention: '30-days',
		},
	});

	const base = String(env.R2_PUBLIC_BASE_URL || '').replace(/\/$/, '');
	return base ? `${base}/${key}` : key;
}

export async function storeEnquiryDocument(env, file, label) {
	if (!(file instanceof File) || !file.size) return null;

	const maxBytes = label === 'usage' ? DOCUMENT_LIMITS.usageBytes : DOCUMENT_LIMITS.billBytes;
	if (file.size > maxBytes) return null;

	const bytes = new Uint8Array(await file.arrayBuffer());
	const kind =
		label === 'usage'
			? sniffSpreadsheet(bytes, file.name) || sniffCsv(bytes)
			: sniffPdf(bytes) || sniffImage(bytes);
	if (!kind) return null;

	return putEnquiryFile(env, bytes, kind, label);
}

function safeFileName(fileName, ext, index) {
	const raw = String(fileName || `upload-${index + 1}`);
	const trimmed = raw.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
	const base = trimmed || `upload-${index + 1}`;
	return base.toLowerCase().endsWith(`.${ext}`) ? base : `${base}.${ext}`;
}

function toBase64(bytes) {
	let binary = '';
	const chunk = 0x8000;
	for (let i = 0; i < bytes.length; i += chunk) {
		binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	}
	return btoa(binary);
}

export async function storeEnquiryUploads(env, files) {
	const attachments = [];
	const names = [];
	if (!files.length) return { attachments, names };

	const stamp = new Date().toISOString().slice(0, 10);
	const id = crypto.randomUUID();
	const queue = [];

	for (const file of files) {
		if (!(file instanceof File) || !file.size) continue;

		const bytes = new Uint8Array(await file.arrayBuffer());
		const kind = sniffUpload(bytes, file.name);
		if (!kind) continue;

		const maxBytes =
			kind.ext === 'csv'
				? DOCUMENT_LIMITS.usageBytes
				: kind.ext === 'jpg' || kind.ext === 'png' || kind.ext === 'webp'
					? PHOTO_LIMITS.maxBytes
					: DOCUMENT_LIMITS.billBytes;
		if (file.size > maxBytes) {
			throw new Error('UPLOAD_TOO_LARGE');
		}

		queue.push({ bytes, kind, fileName: file.name });
		if (queue.length >= PHOTO_LIMITS.maxCount + 4) break;
	}

	const bucket = env.ENQUIRY_PHOTOS;

	for (const [index, item] of queue.entries()) {
		const filename = safeFileName(item.fileName, item.kind.ext, index);
		names.push(filename);
		attachments.push({
			filename,
			content: toBase64(item.bytes),
			content_type: item.kind.type,
		});

		if (!bucket) continue;

		const key = `enquiries/${stamp}/${id}/${String(index + 1).padStart(2, '0')}.${item.kind.ext}`;

		await bucket.put(key, item.bytes, {
			httpMetadata: {
				contentType: item.kind.type,
				cacheControl: 'private, max-age=2592000',
			},
			customMetadata: {
				retention: '30-days',
			},
		});
	}

	return { attachments, names };
}

export async function storeEnquiryPhotos(env, files) {
	return storeEnquiryUploads(env, files);
}
