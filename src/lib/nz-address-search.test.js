import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	isSearchableAddressQuery,
	normaliseAddressQuery,
	photonSearchUrl,
	searchNzAddresses,
	suggestionsFromPhoton,
} from './nz-address-search.js';

describe('normaliseAddressQuery', () => {
	it('trims, collapses spaces and caps length', () => {
		assert.equal(normaliseAddressQuery('  12   Victoria  '), '12 Victoria');
		assert.equal(normaliseAddressQuery('x'.repeat(90)).length, 80);
	});
});

describe('isSearchableAddressQuery', () => {
	it('rejects short or unsafe queries', () => {
		assert.equal(isSearchableAddressQuery('12'), false);
		assert.equal(isSearchableAddressQuery('12 Victoria'), true);
		assert.equal(isSearchableAddressQuery('12 Victoria<script>'), false);
	});
});

describe('photonSearchUrl', () => {
	it('biases to the Waikato and clips to NZ', () => {
		const url = new URL(photonSearchUrl('12 Victoria'));
		assert.equal(url.searchParams.get('q'), '12 Victoria');
		assert.equal(url.searchParams.get('lat'), '-37.787');
		assert.equal(url.searchParams.get('lon'), '175.282');
		assert.equal(url.searchParams.get('bbox'), '166.2,-47.4,178.8,-34.3');
	});
});

describe('suggestionsFromPhoton', () => {
	it('keeps NZ houses first and drops other countries', () => {
		const labels = suggestionsFromPhoton({
			features: [
				{
					properties: {
						countrycode: 'CA',
						housenumber: '12',
						street: 'Victoria Street',
						city: 'Hamilton',
						type: 'house',
					},
				},
				{
					properties: {
						countrycode: 'NZ',
						name: 'Hamilton',
						state: 'Waikato',
						type: 'city',
					},
				},
				{
					properties: {
						countrycode: 'nz',
						housenumber: '12',
						street: 'Victoria Street',
						city: 'Hamilton',
						state: 'Waikato',
						postcode: '3204',
						type: 'house',
					},
				},
			],
		});

		assert.deepEqual(labels, [
			'12 Victoria Street, Hamilton 3204, Waikato',
			'Hamilton, Waikato',
		]);
	});
});

describe('searchNzAddresses', () => {
	it('returns an empty list for a short query without fetching', async () => {
		const labels = await searchNzAddresses('12', () => {
			throw new Error('should not fetch');
		});
		assert.deepEqual(labels, []);
	});

	it('maps a Photon payload through the shared formatter', async () => {
		const labels = await searchNzAddresses('12 Victoria', async () => ({
			ok: true,
			json: async () => ({
				features: [
					{
						properties: {
							countrycode: 'NZ',
							housenumber: '12',
							street: 'Victoria Street',
							city: 'Hamilton',
							state: 'Waikato',
							postcode: '3204',
							type: 'house',
						},
					},
				],
			}),
		}));

		assert.deepEqual(labels, ['12 Victoria Street, Hamilton 3204, Waikato']);
	});
});
