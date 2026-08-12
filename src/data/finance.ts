export const financeReviewed = '12 August 2026';

export const financeOptions = [
	{
		provider: 'Westpac',
		product: 'Greater Choices home loan',
		rate: '0% p.a.',
		limit: 'Up to $50,000',
		term: 'Five years',
		note: 'For eligible Westpac home-loan customers. Lending, equity and repayment criteria apply.',
		source: 'https://www.westpac.co.nz/home-loans-mortgages/options/greater-choices-home-loan/',
	},
	{
		provider: 'ANZ',
		product: 'Good Energy home loan top-up',
		rate: '1% p.a.',
		limit: 'Up to $80,000',
		term: 'Fixed for three years',
		note: 'For eligible ANZ home-loan customers. The standard floating rate applies after the special term.',
		source:
			'https://www.anz.co.nz/personal/home-loans-mortgages/loan-types/good-energy/',
	},
	{
		provider: 'ASB',
		product: 'Better Homes top-up',
		rate: '1% p.a.',
		limit: 'Up to $80,000',
		term: 'Fixed for three years',
		note: 'For eligible ASB home-loan customers financing qualifying energy-efficiency improvements.',
		source: 'https://www.asb.co.nz/home-loans-mortgages/better-homes-top-up.html',
	},
	{
		provider: 'BNZ',
		product: 'Green Home Loan top-up',
		rate: '1% p.a.',
		limit: 'Up to $80,000',
		term: 'Fixed for three years',
		note: 'Eligibility and lending criteria apply; confirm current rates and eligible products with BNZ.',
		source: 'https://www.bnz.co.nz/personal-banking/home-loans/green-home-loan-top-up',
	},
	{
		provider: 'Kiwibank',
		product: 'Sustainable Energy Loan',
		rate: 'Standard lending rate',
		limit: 'Based on lending approval',
		term: 'Contribution may apply',
		note: 'Eligible customers may receive a contribution toward qualifying renewable-energy systems.',
		source:
			'https://www.kiwibank.co.nz/personal-banking/home-loans/getting-a-home-loan/sustainable-energy-loan/',
	},
] as const;

export const financeBenefits = [
	{
		title: 'Preserve cash',
		copy: 'Spread the upfront investment while your system starts generating.',
	},
	{
		title: 'Match the plan',
		copy: 'Compare repayments with a conservative model of your energy use.',
	},
	{
		title: 'Build for later',
		copy: 'Consider batteries, EV charging and future demand in the first design.',
	},
] as const;

