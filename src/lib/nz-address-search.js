/**
 * NZ address suggestions via Photon (OpenStreetMap).
 * Used by the Cloudflare function and by the contact form when that API is missing.
 */

const WAIKATO = { lat: '-37.787', lon: '175.282' };
const SAFE_QUERY = /^[\p{L}\p{N}\s.,'’/#&()-]+$/u;
const NZ_BBOX = '166.2,-47.4,178.8,-34.3';

export function normaliseAddressQuery(raw) {
	return String(raw || '')
		.trim()
		.replace(/\s+/g, ' ')
		.slice(0, 80);
}

export function isSearchableAddressQuery(query) {
	return query.length >= 3 && SAFE_QUERY.test(query);
}

export function photonSearchUrl(query) {
	const photon = new URL('https://photon.komoot.io/api/');
	photon.searchParams.set('q', query);
	photon.searchParams.set('limit', '16');
	photon.searchParams.set('lang', 'en');
	photon.searchParams.set('lat', WAIKATO.lat);
	photon.searchParams.set('lon', WAIKATO.lon);
	photon.searchParams.set('location_bias_scale', '0.45');
	photon.searchParams.set('bbox', NZ_BBOX);
	return photon.toString();
}

function formatSuggestion(props) {
	const street = [props.housenumber, props.street || props.name].filter(Boolean).join(' ').trim();
	const locality = props.district || props.suburb || props.locality || '';
	const city = props.city && props.city !== locality ? props.city : props.city || props.county || '';
	const region = props.state && props.state !== city ? props.state : '';
	const postcode = props.postcode || '';
	const place = [city, postcode].filter(Boolean).join(' ');

	return [...new Set([street, locality, place, region].filter(Boolean))].join(', ');
}

function rank(props) {
	if (props.type === 'house' || props.housenumber) return 0;
	if (props.type === 'street' || props.osm_key === 'highway') return 1;
	return 2;
}

export function suggestionsFromPhoton(payload) {
	const seen = new Set();

	return (payload?.features || [])
		.map((feature) => feature?.properties || {})
		.filter((props) => String(props.countrycode || '').toUpperCase() === 'NZ')
		.sort((a, b) => rank(a) - rank(b))
		.map((props) => formatSuggestion(props))
		.filter((label) => {
			if (!label || label.length < 5 || seen.has(label)) return false;
			seen.add(label);
			return true;
		})
		.slice(0, 8);
}

export async function searchNzAddresses(query, fetchFn = fetch) {
	const normalised = normaliseAddressQuery(query);
	if (!isSearchableAddressQuery(normalised)) return [];

	const response = await fetchFn(photonSearchUrl(normalised), {
		headers: {
			Accept: 'application/json',
			'User-Agent': 'EnergyPoint/1.0 (https://solar.florul.com; sales@energypoint.nz)',
		},
	});
	if (!response.ok) throw new Error('Photon request failed');
	return suggestionsFromPhoton(await response.json());
}
