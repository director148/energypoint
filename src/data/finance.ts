export const financeReviewed = '15 August 2026';

export const financeOptions = [
	{
		provider: 'Westpac',
		logo: '/images/banks/westpac.png',
		product: 'Greater Choices home loan',
		rate: '0% p.a.',
		limit: 'Up to $50,000',
		term: 'Five years',
		note: 'For eligible Westpac home-loan customers. Lending, equity and repayment criteria apply.',
		source: 'https://www.westpac.co.nz/home-loans-mortgages/options/greater-choices-home-loan/',
	},
	{
		provider: 'ANZ',
		logo: '/images/banks/anz.png',
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
		logo: '/images/banks/asb.png',
		product: 'Better Homes top-up',
		rate: '1% p.a.',
		limit: 'Up to $80,000',
		term: 'Fixed for three years',
		note: 'For eligible ASB home-loan customers financing qualifying energy-efficiency improvements.',
		source: 'https://www.asb.co.nz/home-loans-mortgages/better-homes-top-up.html',
	},
	{
		provider: 'BNZ',
		logo: '/images/banks/bnz.png',
		product: 'Better Future home loan top-up',
		rate: '1% p.a.',
		limit: 'Up to $80,000',
		term: 'Fixed for three years',
		note: 'Eligibility and lending criteria apply; confirm current rates and eligible products with BNZ.',
		source: 'https://www.bnz.co.nz/personal-banking/home-loans/manage-your-loan/top-ups/better-future-home-loan-top-ups',
	},
	{
		provider: 'Kiwibank',
		logo: '/images/banks/kiwibank.png',
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
		title: 'Keep the cash',
		copy: 'Spread the cost instead of paying the system in one hit.',
	},
	{
		title: 'Start generating',
		copy: 'The system can earn while you repay the lending.',
	},
	{
		title: 'Use the mortgage',
		copy: 'Eligible home-loan customers can top up with the bank they already have.',
	},
	{
		title: 'Compare the numbers',
		copy: 'Set repayments against a conservative model of how you use power.',
	},
	{
		title: 'Leave room to grow',
		copy: 'Design for a battery, EV charging or more panels later.',
	},
	{
		title: 'We prepare the plan',
		copy: 'You take a clear proposal to the lender. We stay on the specs if they ask.',
	},
] as const;

