/**
 * NZ address suggestions via Photon (OpenStreetMap).
 * No API key, trial or paid plan.
 */

import { searchNzAddresses } from '../../src/lib/nz-address-search.js';

export async function onRequestGet(context) {
	try {
		const url = new URL(context.request.url);
		const suggestions = await searchNzAddresses(url.searchParams.get('q') || '');
		return Response.json(
			{ suggestions },
			{
				headers: {
					'Cache-Control': suggestions.length ? 'public, max-age=120' : 'no-store',
				},
			},
		);
	} catch {
		return Response.json({ suggestions: [] }, { status: 502 });
	}
}
