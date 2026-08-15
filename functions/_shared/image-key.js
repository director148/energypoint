/**
 * Build the R2 key for an /images/* request.
 *
 * A [[path]] catch-all hands the handler an array of path segments, so this has
 * to join them. Stringifying the array instead produces a comma joined key and
 * every nested image misses the bucket.
 *
 * Returns null when the path is empty or tries to escape the images prefix.
 */
export function buildImageKey(pathParam) {
	const raw = Array.isArray(pathParam) ? pathParam.join('/') : String(pathParam ?? '');
	const segments = raw.split('/').filter(Boolean);
	if (!segments.length) return null;
	if (segments.some((segment) => segment === '..' || segment === '.')) return null;
	return `images/${segments.join('/')}`;
}
