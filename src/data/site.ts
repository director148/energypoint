export const site = {
	name: 'Energy Point',
	url: 'https://solar.florul.com',
	phoneDisplay: '0800 102 211',
	phoneHref: 'tel:+64800102211',
	email: 'sales@energypoint.nz',
	region: 'Waikato, New Zealand',
	hours: '9am - 5pm, Monday - Friday',
	facebook: 'https://www.facebook.com/EnergyPointNZ',
	instagram: 'https://www.instagram.com/energypointnz/',
	description:
		'Solar, battery and energy plans for Waikato homes, businesses and rural properties. Locally owned. People first.',
} as const;

export const navigation = [
	{ label: 'Residential', href: '/residential/' },
	{ label: 'Commercial', href: '/commercial/' },
	{ label: 'Rural', href: '/rural/' },
	{ label: 'Maintenance', href: '/maintenance/' },
	{ label: 'How it works', href: '/how-it-works/' },
	{ label: 'Finance', href: '/finance/' },
	{ label: 'FAQs', href: '/frequently-asked-questions/' },
	{ label: 'Meet the team', href: '/meet-the-team/' },
	{ label: 'Reviews', href: '/reviews/' },
] as const;

export const audiences = [
	{
		title: 'Residential',
		href: '/residential/',
		image: '/images/residential-hero-960.webp',
		alt: 'A Waikato home fitted with rooftop solar panels',
	},
	{
		title: 'Commercial',
		href: '/commercial/',
		image: '/images/commercial-hero-960.webp',
		alt: 'Solar panels supplying a commercial energy system',
	},
	{
		title: 'Rural',
		href: '/rural/',
		image: '/images/rural-hero-960.webp',
		alt: 'A rural Waikato property with a ground-mounted solar array',
	},
] as const;

export const process = [
	{
		id: 'visit',
		number: '01',
		title: 'Listen to your needs',
		timing: 'The visit, no pitch',
		copy: 'We come to your property, walk the roof or the land and go through your energy bill. You talk. We listen. The aim is a plan that fits how you actually use power, not a kit off the shelf.',
		points: [
			'Roof, sheds, shading, switchboard and how the place runs day to day.',
			'What you want next: lower bills, a battery, an EV or room to grow.',
			'You get a clear picture of options. No pressure to sign on the day.',
		],
		image: '/images/process-consultation-960.webp',
		alt: 'Energy Point consultation at a Waikato property',
	},
	{
		id: 'design',
		number: '02',
		title: 'Designed in-house',
		timing: 'Custom to your property',
		copy: 'Our own people size the system around your usage, the structure, export limits and budget. Hardware comes second. The design has to earn its place on your roof.',
		points: [
			'Panel layout, inverter, cabling and any battery or charger, modelled to the site.',
			'Trade-offs spelled out: size, cost, export and what can wait.',
			'A proposal you can take to a lender, a partner or a quiet evening at the table.',
		],
		image: '/images/process-design-960.webp',
		alt: 'An Energy Point specialist planning a solar design',
	},
	{
		id: 'install',
		number: '03',
		title: 'Our own installers',
		timing: 'Often 1 to 3 days for a house',
		copy: 'Energy Point people on the roof, not a hired crew who disappear. They fit the array, wire the inverter, commission the system and walk you through it before they leave.',
		points: [
			'Access, scaffolding and any power isolation planned with you first.',
			'Most homes are done in 1 to 3 days once gear and approvals are ready.',
			'Farms and commercial sites are staged around stock, vehicles and trading hours.',
		],
		image: '/images/process-installation-960.webp',
		alt: 'Professional solar panel installation',
	},
	{
		id: 'grid',
		number: '04',
		title: 'Grid connection',
		timing: 'We handle everything',
		copy: 'Panels on the roof are only half the job. Surplus power has to be allowed onto the network, measured and credited. We handle the paperwork, chase the meter and get you on the app so you can see what the system is doing.',
		points: [
			'Network application so export is approved for your lines company.',
			'Import/export meter if the existing meter cannot measure what you send back.',
			'Monitoring set up on your phone. Generation, use and export in one place.',
		],
		image: '/images/social/fb-122159651738654298-960.webp',
		alt: 'Inverter, isolators and battery storage connected at a Waikato home',
	},
	{
		id: 'support',
		number: '05',
		title: 'Support that lasts',
		timing: 'The same local team',
		copy: 'Switch-on is the start. Monitoring, maintenance, repairs and honest advice keep the system earning. You call the people who designed and installed it.',
		points: [
			'We watch performance and help when something looks off.',
			'Maintenance and upgrades from the same Waikato crew.',
			'Batteries, EV chargers and extra panels when you are ready.',
		],
		image: '/images/process-support-960.webp',
		alt: 'Cleaning solar panels on a Waikato roof',
	},
] as const;

export const homeBenefits = [
	{
		title: 'Lower bills',
		copy: 'Use more of the energy you generate and buy less from the grid.',
		image: '/images/home-hero.jpg',
		alt: 'Solar installation on a Waikato home',
		position: 'center 48%',
	},
	{
		title: 'See it working',
		copy: 'See how your property produces and uses power in real time.',
		image: '/images/process-design.jpg',
		alt: 'Energy system monitoring and design in progress',
		position: 'center 40%',
	},
	{
		title: 'Ready for next',
		copy: 'Build a system ready for batteries, EV charging and changing demand.',
		image: '/images/home-detail.png',
		alt: 'Solar panels on a property ready for future upgrades',
		position: 'center 40%',
	},
	{
		title: 'Still here after',
		copy: 'Get a local team for maintenance, upgrades and straight answers.',
		image: '/images/process-support.jpg',
		alt: 'Local technician maintaining a solar installation',
		position: 'center 55%',
	},
] as const;

export type Review = {
	headline?: string;
	quote: string;
	name: string;
	location?: string;
	source?: 'google' | 'website';
	rating?: 5;
};

export const reviews: readonly Review[] = [
	{
		headline: 'The whole process was so easy',
		quote:
			'From the first chat to the final install, the Energy Point team were awesome to deal with. They explained everything clearly and never pushed us into anything. Now we’re saving money and feel good knowing we’re using clean energy. Couldn’t be happier!',
		name: 'Emma & Josh',
		location: 'Cambridge',
		source: 'website',
		rating: 5,
	},
	{
		headline: 'Local legends: highly recommend!',
		quote:
			'We’d been thinking about solar for ages but didn’t know where to start. Energy Point made it simple. They really listened to what we needed and gave us options that made sense. It’s great to work with a local team that actually cares.',
		name: 'Tania R.',
		location: 'Hamilton',
		source: 'website',
		rating: 5,
	},
	{
		headline: 'Fantastic from start to finish',
		quote:
			'We had our solar system installed last year by the team at Energy Point and they were fantastic from start to finish. They were great to deal with and designed a system that perfectly suited our energy use. The installation was tidy and professional and Nick and the team managed the whole project seamlessly. We’re extremely happy with the result and would highly recommend Energy Point to anyone considering solar.',
		name: 'Lisa',
		source: 'google',
		rating: 5,
	},
	{
		headline: 'Excellent service, start to finish',
		quote:
			'The team were fantastic to deal with from start to finish. They made all our options easy to understand and explained everything clearly, so we felt confident in our decision. The installation process was smooth and hassle-free and they’ve continued to be incredibly helpful with any questions we’ve had since the install. We really appreciate the excellent service. Thanks so much!',
		name: 'Megan Bowen',
		source: 'google',
		rating: 5,
	},
	{
		headline: 'The difference in our bills has been huge',
		quote:
			'They came out, looked at our property and built a system that works for our power use. The difference in our bills has been huge.',
		name: 'Mike & Leanne',
		location: 'Te Awamutu',
		source: 'website',
		rating: 5,
	},
	{
		headline: 'No fluff, just good honest service',
		quote:
			'No fluff, just good honest service. They explained everything in plain terms and had our system up and running in no time.',
		name: 'Shane B.',
		location: 'Morrinsville',
		source: 'website',
		rating: 5,
	},
	{
		headline: 'Impressive attention to detail',
		quote:
			'Their workmanship was high quality, with impressive attention to detail throughout the installation.',
		name: 'Bruce',
		location: 'Waikato',
		source: 'website',
		rating: 5,
	},
] as const;

export const people = [
	{
		name: 'Nick Davies',
		role: 'Co-owner',
		copy: 'He visits the property, explains the options in plain English and stays in the job until handover.',
		image: '/images/process-consultation.jpg',
		alt: 'Energy Point meeting a Waikato homeowner on site',
		position: 'center 28%',
		positionMobile: '82% 30%',
	},
	{
		name: 'Sam Andersen',
		role: 'Co-owner',
		copy: 'Operations, compliance and getting the work done. Waikato based, so the plan does not disappear into a national call centre.',
	},
	{
		name: 'The crew',
		role: 'Install and aftercare',
		copy: 'Certified people on the roof, then the same local team for monitoring, maintenance and the next upgrade.',
		image: '/images/team-photo.jpg',
		alt: 'The Energy Point crew together in the Waikato',
		position: 'center 78%',
	},
] as const;

export const afterInstall = [
	{
		number: '01',
		title: 'You own it',
		copy: 'The system is yours. We do not lock you into a lease that vanishes if a national operator folds.',
	},
	{
		number: '02',
		title: 'See it working',
		copy: 'Monitoring so you can see generation and use. If something looks off, you call people who already know the job.',
	},
	{
		number: '03',
		title: 'We still answer',
		copy: 'Questions after switch-on go to the same Waikato team, not a franchise queue.',
	},
	{
		number: '04',
		title: 'Next, when you are ready',
		copy: 'Batteries, EV charging, more panels or a check. Start at maintenance if the system is already up.',
	},
] as const;

export const testimonials = {
	residential: reviews
		.filter((review) => review.name === 'Emma & Josh' || review.name === 'Tania R.')
		.map((review) => ({
			quote: review.headline ?? review.quote,
			name: review.name,
			location: review.location ?? '',
		})),
	rural: reviews
		.filter((review) => review.name === 'Mike & Leanne' || review.name === 'Shane B.')
		.map((review) => ({
			quote: review.quote,
			name: review.name,
			location: review.location ?? '',
		})),
} as const;

