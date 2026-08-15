/** Serve site images from the energy-point R2 bucket. */

export async function onRequestGet(context) {
	/* A [[path]] catch-all gives an array of segments, so join rather than stringify. */
	const parts = context.params.path;
	const raw = Array.isArray(parts) ? parts.join('/') : String(parts || '');
	if (!raw || raw.split('/').includes('..')) {
		return new Response('Not found.', { status: 404 });
	}

	const key = `images/${raw}`;
	const bucket = context.env.MEDIA;
	if (!bucket) {
		return new Response('Media store is not configured.', { status: 500 });
	}

	const object = await bucket.get(key);
	if (!object) {
		return new Response('Not found.', { status: 404 });
	}

	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set('etag', object.httpEtag);
	if (!headers.has('Cache-Control')) {
		headers.set('Cache-Control', 'public, max-age=31536000');
	}

	return new Response(object.body, { headers });
}
