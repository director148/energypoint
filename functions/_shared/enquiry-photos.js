/** Validate and store enquiry photos in R2.
 *  Bucket lifecycle (r2-lifecycle.json) deletes objects after 30 days.
 */

export const PHOTO_LIMITS = {
	maxCount: 6,
	maxBytes: 2 * 1024 * 1024,
};

export function sniffImage(bytes) {
	if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
		return { type: 'image/jpeg', ext: 'jpg' };
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

export async function storeEnquiryPhotos(env, files) {
	const bucket = env.ENQUIRY_PHOTOS;
	const stored = [];

	if (!bucket || !files.length) return stored;

	const stamp = new Date().toISOString().slice(0, 10);
	const id = crypto.randomUUID();
	let index = 0;

	for (const file of files) {
		if (!(file instanceof File) || !file.size) continue;
		if (file.size > PHOTO_LIMITS.maxBytes) continue;

		const bytes = new Uint8Array(await file.arrayBuffer());
		const kind = sniffImage(bytes);
		if (!kind) continue;

		index += 1;
		const key = `enquiries/${stamp}/${id}/${String(index).padStart(2, '0')}.${kind.ext}`;

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
		stored.push(base ? `${base}/${key}` : key);

		if (index >= PHOTO_LIMITS.maxCount) break;
	}

	return stored;
}
