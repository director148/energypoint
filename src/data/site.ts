export const site = {
	name: 'Energy Point',
	url: 'https://solar.florul.com',
	phoneDisplay: '0800 102 211',
	phoneHref: 'tel:+64800102211',
	email: 'sales@energypoint.nz',
	region: 'Waikato, New Zealand',
	facebook: 'https://www.facebook.com/EnergyPointNZ',
	instagram: 'https://www.instagram.com/energypointnz/',
	description:
		'Personalised solar, battery and smart energy plans for Waikato homes, businesses and rural properties.',
} as const;

export const navigation = [
	{
		label: 'Residential',
		href: '/residential/',
		children: [
			{ label: 'Solar for homes', href: '/residential/' },
			{ label: 'Finance your system', href: '/finance/' },
			{ label: 'Your questions answered', href: '/frequently-asked-questions/' },
		],
	},
	{ label: 'Commercial', href: '/commercial/' },
	{ label: 'Rural', href: '/rural/' },
	{ label: 'Maintenance', href: '/maintenance/' },
	{ label: 'About us', href: '/about-us/' },
	{ label: 'Reviews', href: '/reviews/' },
] as const;

export const audiences = [
	{
		eyebrow: '01 — Home',
		title: 'Residential',
		copy: 'A home energy plan designed around how your household actually lives.',
		href: '/residential/',
		image: '/images/residential-hero-960.webp',
		alt: 'A Waikato home fitted with rooftop solar panels',
	},
	{
		eyebrow: '02 — Business',
		title: 'Commercial',
		copy: 'Turn daytime energy demand into a more controlled operating cost.',
		href: '/commercial/',
		image: '/images/home-detail-960.webp',
		alt: 'Solar panels supplying a commercial energy system',
	},
	{
		eyebrow: '03 — Land',
		title: 'Rural',
		copy: 'Hard-working solar for sheds, pumps, workshops and productive land.',
		href: '/rural/',
		image: '/images/rural-hero-960.webp',
		alt: 'A rural Waikato property with a ground-mounted solar array',
	},
] as const;

export const process = [
	{
		number: '01',
		title: 'Listen',
		copy: 'We visit your property, map your energy habits and understand what you want the system to achieve.',
		image: '/images/process-consultation-960.webp',
		alt: 'Energy Point consultation at a Waikato property',
	},
	{
		number: '02',
		title: 'Design',
		copy: 'Our technical design is shaped around your roof, usage profile, future plans and budget — never a template.',
		image: '/images/process-design-960.webp',
		alt: 'An Energy Point specialist planning a solar design',
	},
	{
		number: '03',
		title: 'Deliver',
		copy: 'Certified professionals install, commission and explain every part of your system with care.',
		image: '/images/process-installation-960.webp',
		alt: 'Professional solar panel installation',
	},
	{
		number: '04',
		title: 'Stay',
		copy: 'Monitoring, maintenance and honest advice keep your energy plan performing long after switch-on.',
		image: '/images/process-support-960.webp',
		alt: 'Ongoing solar system support and monitoring',
	},
] as const;

export const homeBenefits = [
	{
		title: 'Spend less',
		copy: 'Use more of the energy you generate and buy less from the grid.',
		icon: 'savings',
	},
	{
		title: 'Know more',
		copy: 'See how your property produces and uses power in real time.',
		icon: 'monitor',
	},
	{
		title: 'Plan ahead',
		copy: 'Build a system ready for batteries, EV charging and changing demand.',
		icon: 'future',
	},
	{
		title: 'Stay supported',
		copy: 'Get a local team for maintenance, upgrades and straight answers.',
		icon: 'support',
	},
] as const;

export const values = [
	{
		title: 'Energy-first thinking',
		copy: 'We design for performance and your usage profile — not a panel count.',
	},
	{
		title: 'Transparent advice',
		copy: 'Clear options, practical trade-offs and no sales pressure.',
	},
	{
		title: 'Quality that lasts',
		copy: 'Proven components selected for New Zealand conditions.',
	},
	{
		title: 'Long-term support',
		copy: 'Maintenance, monitoring and upgrades from a team that stays involved.',
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
		headline: 'The whole process was so easy.',
		quote:
			'From the first chat to the final install, the Energy Point team were awesome to deal with. They explained everything clearly and never pushed us into anything. Now we’re saving money and feel good knowing we’re using clean energy. Couldn’t be happier!',
		name: 'Emma & Josh',
		location: 'Cambridge',
		source: 'website',
		rating: 5,
	},
	{
		headline: 'Local legends – highly recommend!',
		quote:
			'We’d been thinking about solar for ages but didn’t know where to start. Energy Point made it simple. They really listened to what we needed and gave us options that made sense. It’s great to work with a local team that actually cares.',
		name: 'Tania R.',
		location: 'Hamilton',
		source: 'website',
		rating: 5,
	},
	{
		headline: 'Fantastic from start to finish.',
		quote:
			'We had our solar system installed last year by the team at Energy Point and they were fantastic from start to finish. They were great to deal with and designed a system that perfectly suited our energy use. The installation was tidy and professional, and Nick and the team managed the whole project seamlessly. We’re extremely happy with the result and would highly recommend Energy Point to anyone considering solar.',
		name: 'Lisa',
		source: 'google',
		rating: 5,
	},
	{
		headline: 'Excellent service, start to finish.',
		quote:
			'The team were fantastic to deal with from start to finish. They made all our options easy to understand and explained everything clearly, so we felt confident in our decision. The installation process was smooth and hassle-free, and they’ve continued to be incredibly helpful with any questions we’ve had since the install. We really appreciate the excellent service. Thanks so much!',
		name: 'Megan Bowen',
		source: 'google',
		rating: 5,
	},
	{
		quote:
			'They came out, looked at our property and built a system that works for our power use. The difference in our bills has been huge.',
		name: 'Mike & Leanne',
		location: 'Te Awamutu',
		source: 'website',
		rating: 5,
	},
	{
		quote:
			'No fluff, just good honest service. They explained everything in plain terms and had our system up and running in no time.',
		name: 'Shane B.',
		location: 'Morrinsville',
		source: 'website',
		rating: 5,
	},
] as const;

export const featuredReviews = reviews.slice(0, 4);

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

