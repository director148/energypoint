/** Serve site images from the energy-point R2 bucket. */

export async function onRequestGet(context) {
	const raw = String(context.params.path || '');
	if (!raw || raw.includes('..')) {
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
