export type AreaAudience = 'residential' | 'commercial' | 'rural';

export type Area = {
	slug: string;
	name: string;
	searchName: string;
	intro: string;
	lede: string;
	summary: string;
	image: string;
	alt: string;
	position: string;
	audiences: readonly AreaAudience[];
	points: readonly { title: string; copy: string }[];
};

export const areas: readonly Area[] = [
	{
		slug: 'hamilton',
		name: 'Hamilton',
		searchName: 'Hamilton',
		intro: 'City roofs and busy sites.<br />A local solar company.',
		lede: 'Energy Point is a solar installer for Hamilton homes, businesses and the suburbs around the city. We drive from Morrinsville, walk the property and leave a plan.',
		summary: 'City homes, suburbs and businesses on WEL Networks.',
		image: '/images/finance-hero.jpg',
		alt: 'A Hamilton-area home with a solar energy system',
		position: 'center 45%',
		audiences: ['residential', 'commercial', 'rural'],
		points: [
			{
				title: 'Suburbs and the town belt',
				copy: 'Rototuna, Flagstaff, Chartwell, Glenview and the older streets closer in. We look at the roof, the shade and the bill, not a kit sized for a different house.',
			},
			{
				title: 'Daytime business load',
				copy: 'Shops, workshops and warehouses that use power while the sun is up. We model the hours the site actually runs.',
			},
			{
				title: 'WEL Networks paperwork',
				copy: 'Hamilton sits on WEL Networks. We handle the connection application and the import/export meter so surplus can be credited.',
			},
			{
				title: 'The same crew after',
				copy: 'A Waikato team, not a national call centre. Questions after switch-on go to the people who designed and installed it.',
			},
		],
	},
	{
		slug: 'cambridge',
		name: 'Cambridge',
		searchName: 'Cambridge',
		intro: 'Town houses and lifestyle blocks.<br />Then leave a plan.',
		lede: 'Energy Point is a solar company for Cambridge homes and the lifestyle blocks on the edge of town. We visit the property, go through the bill and design around how you use power.',
		summary: 'Town houses, new builds and lifestyle blocks toward Karapiro.',
		image: '/images/residential-hero.jpg',
		alt: 'Rooftop solar on a Waikato home near Cambridge',
		position: 'center 48%',
		audiences: ['residential', 'rural'],
		points: [
			{
				title: 'Villas and new builds',
				copy: 'Older iron, tile and newer membrane all need different mounting. We do not treat every Cambridge roof as the same job.',
			},
			{
				title: 'Karapiro and the edge',
				copy: 'Lifestyle blocks and larger sections toward the lake. Room for a battery, an EV or a ground array if the roof is the wrong way.',
			},
			{
				title: 'Powerco connection',
				copy: 'Cambridge is on the Powerco network. We handle the export application and chase the meter so you can see generation and use.',
			},
			{
				title: 'Customers already here',
				copy: 'Cambridge is one of the towns our reviews come from. The visit is the same: no pressure to sign on the day.',
			},
		],
	},
	{
		slug: 'te-awamutu',
		name: 'Te Awamutu',
		searchName: 'Te Awamutu',
		intro: 'Town, dairy and the belt around it.<br />Designed to the bill.',
		lede: 'Energy Point is a solar installer for Te Awamutu houses, businesses and the farms around town. We start with how the property uses power through the year.',
		summary: 'Town, dairy and rural properties on the Powerco network.',
		image: '/images/rural-hero.png',
		alt: 'Solar on a rural property near Te Awamutu',
		position: 'center 48%',
		audiences: ['residential', 'commercial', 'rural'],
		points: [
			{
				title: 'Town and the farm gate',
				copy: 'A house in town is a different job to a dairy or a workshop on the belt. We size for the load you actually run.',
			},
			{
				title: 'Seasonal peaks',
				copy: 'Pumps, sheds and winter use change the bill. We model the months that cost money, not a suburban summer story.',
			},
			{
				title: 'Powerco paperwork',
				copy: 'Te Awamutu sits on Powerco. We handle the network application so export is approved and measured.',
			},
			{
				title: 'Local after switch-on',
				copy: 'Morrinsville is a short drive. The same people come back for a check, a repair or the next upgrade.',
			},
		],
	},
	{
		slug: 'morrinsville',
		name: 'Morrinsville',
		searchName: 'Morrinsville',
		intro: 'This is home ground.<br />The office is on Anderson Street.',
		lede: 'Energy Point is a Morrinsville solar company. The registered office is 71 Anderson Street. We design, install and support systems for the town, the farms and the lifestyle blocks around it.',
		summary: 'Home base. Town, dairy and lifestyle blocks around the office.',
		image: '/images/about-us-hero.jpg',
		alt: 'Energy Point, a Morrinsville solar company',
		position: 'center 42%',
		audiences: ['residential', 'commercial', 'rural'],
		points: [
			{
				title: 'Based here',
				copy: 'Energy Point Limited is registered in Morrinsville. You are not calling a franchise queue in another city.',
			},
			{
				title: 'Town and dairy',
				copy: 'Houses on the streets, shops on the main road and farms on the belt. The visit matches the property, not a Hamilton template.',
			},
			{
				title: 'Powerco connection',
				copy: 'Morrinsville is on Powerco. We handle the export application, the meter and the app before we leave.',
			},
			{
				title: 'Short drive back',
				copy: 'Maintenance, a fault or a later battery. The crew that installed it is still down the road.',
			},
		],
	},
	{
		slug: 'raglan',
		name: 'Raglan',
		searchName: 'Raglan',
		intro: 'Coast, hills and salt air.<br />Designed for the site.',
		lede: 'Energy Point is a solar installer for Raglan homes and the hills behind the harbour. Coastal wind, salt and shading change the design. We visit before we size anything.',
		summary: 'Coastal homes and hillside sites on WEL Networks.',
		image: '/images/home-hero.jpg',
		alt: 'A Waikato coastal property suited to solar',
		position: 'center 48%',
		audiences: ['residential', 'rural'],
		points: [
			{
				title: 'Salt, wind and hills',
				copy: 'Harbour weather and hillside shade are not a Waikato plains job. Mounting, cable runs and panel layout have to match the site.',
			},
			{
				title: 'Permanent or weekend',
				copy: 'A full-time house and a bach use power differently. We design around the weeks you are actually there.',
			},
			{
				title: 'WEL Networks',
				copy: 'Raglan sits on WEL Networks. We handle the connection paperwork so export is allowed and measured.',
			},
			{
				title: 'Still a Waikato crew',
				copy: 'We drive out from Morrinsville. After switch-on you call the same team, not a contractor who was in town for a week.',
			},
		],
	},
	{
		slug: 'matamata',
		name: 'Matamata',
		searchName: 'Matamata',
		intro: 'Town, tourism and farm load.<br />Sized to the property.',
		lede: 'Energy Point is a solar company for Matamata homes, businesses and the farms around the Kaimai foothills. We walk the roof or the land and design around the bill.',
		summary: 'Town, visitor businesses and farms toward the Kaimai.',
		image: '/images/rural-hero.png',
		alt: 'A Matamata-area property with room for solar',
		position: 'center 50%',
		audiences: ['residential', 'commercial', 'rural'],
		points: [
			{
				title: 'Town and the belt',
				copy: 'A house in Matamata, a motel or a dairy down the road. Each has a different daytime load. We model the one you run.',
			},
			{
				title: 'Sheds and ground mount',
				copy: 'Clear shed roof or open land can beat a shaded house roof. We say so if that is the better array.',
			},
			{
				title: 'Powerco application',
				copy: 'Matamata is on Powerco. We handle the network documents and the meter so surplus can be credited.',
			},
			{
				title: 'Close enough to stay',
				copy: 'A straight run from Morrinsville. Support after switch-on is the same local crew.',
			},
		],
	},
	{
		slug: 'huntly',
		name: 'Huntly',
		searchName: 'Huntly',
		intro: 'River town and industry.<br />A plan for the load.',
		lede: 'Energy Point is a solar installer for Huntly homes, businesses and the rural properties along the river. We look at the hours you use power, then leave a plan.',
		summary: 'Homes, industry and river-side properties on WEL Networks.',
		image: '/images/commercial-hero.jpg',
		alt: 'A commercial energy system suited to a Huntly-area site',
		position: 'center 35%',
		audiences: ['residential', 'commercial', 'rural'],
		points: [
			{
				title: 'Houses and plant',
				copy: 'A family roof and a workshop or yard that runs in daylight are different jobs. We size to the site, not a single template.',
			},
			{
				title: 'WEL Networks',
				copy: 'Huntly sits on WEL Networks. We handle the connection application and flag export limits before the design is locked.',
			},
			{
				title: 'River and rural',
				copy: 'Properties toward Ohinewai, Taupiri and the farms off the highway. Longer runs and three-phase are common. We survey that first.',
			},
			{
				title: 'Local aftercare',
				copy: 'North of Hamilton, still Waikato. The same people answer when something looks off on the app.',
			},
		],
	},
	{
		slug: 'te-aroha',
		name: 'Te Aroha',
		searchName: 'Te Aroha',
		intro: 'Mountain shade and farm sun.<br />We check the site first.',
		lede: 'Energy Point is a solar company for Te Aroha homes and the farms between the mountain and Morrinsville. Some roofs sit in the hill shadow. We visit before we promise generation.',
		summary: 'Town and farms between Te Aroha maunga and Morrinsville.',
		image: '/images/rural-hero.png',
		alt: 'Rural land near Te Aroha suited to a solar array',
		position: 'center 48%',
		audiences: ['residential', 'rural'],
		points: [
			{
				title: 'The mountain matters',
				copy: 'Te Aroha maunga shades some sites in the afternoon. We look at that on the visit rather than selling a north-facing story that is not true here.',
			},
			{
				title: 'Town and the Hauraki belt',
				copy: 'A house in town or a block toward Waitoa and Morrinsville. Ground mount is on the table if the roof is the wrong way.',
			},
			{
				title: 'Powerco connection',
				copy: 'Te Aroha is on Powerco. We handle the export application so the system can send surplus back.',
			},
			{
				title: 'Next town over',
				copy: 'Morrinsville is close. Install, inspection and later support stay with the same Waikato crew.',
			},
		],
	},
	{
		slug: 'ngaruawahia',
		name: 'Ngāruawāhia',
		searchName: 'Ngaruawahia',
		intro: 'River town between two cities.<br />Designed to the property.',
		lede: 'Energy Point is a solar installer for Ngāruawāhia (Ngaruawahia) homes and the rural properties toward Hopuhopu and Taupiri. We visit, go through the bill and leave a plan.',
		summary: 'River-town homes and rural blocks on WEL Networks.',
		image: '/images/home-hero.jpg',
		alt: 'A Waikato home on a property Energy Point can design for',
		position: 'center 48%',
		audiences: ['residential', 'rural'],
		points: [
			{
				title: 'Between Hamilton and Huntly',
				copy: 'Close enough that a Hamilton-sized kit is tempting. The house or the block still needs its own design.',
			},
			{
				title: 'River and rural',
				copy: 'Town sections, marae-side streets and farms off the highway. We survey shade, the board and how the place runs.',
			},
			{
				title: 'WEL Networks paperwork',
				copy: 'Ngāruawāhia sits on WEL Networks. We handle the connection steps so export is approved and metered.',
			},
			{
				title: 'A Waikato team',
				copy: 'We drive from Morrinsville. After switch-on you are not handed to a national queue.',
			},
		],
	},
	{
		slug: 'tamahere',
		name: 'Tamahere',
		searchName: 'Tamahere',
		intro: 'Lifestyle blocks and large roofs.<br />Room to get it right.',
		lede: 'Energy Point is a solar installer for Tamahere lifestyle blocks and the larger homes between Hamilton and Cambridge. More roof, more land and often more load. We design around that.',
		summary: 'Lifestyle blocks between Hamilton and Cambridge.',
		image: '/images/rural-hero.png',
		alt: 'A Tamahere-style lifestyle block with room for solar',
		position: 'center 40%',
		audiences: ['residential', 'rural'],
		points: [
			{
				title: 'Blocks, not town sections',
				copy: 'Larger roofs, sleepouts, sheds and often an EV on the way. We talk about what comes next so the inverter is not a dead end.',
			},
			{
				title: 'Land if the roof is wrong',
				copy: 'A ground array can beat a shaded or north-poor roof. We say so if the land is the better place for the panels.',
			},
			{
				title: 'Network application',
				copy: 'Tamahere sits on the WEL Networks side of the Hamilton fringe. We handle the export paperwork with the lines company.',
			},
			{
				title: 'Between two towns',
				copy: 'Hamilton one way, Cambridge the other. The crew is still Morrinsville-based and still answers after switch-on.',
			},
		],
	},
	{
		slug: 'te-kauwhata',
		name: 'Te Kauwhata',
		searchName: 'Te Kauwhata',
		intro: 'Lakes, vines and new streets.<br />A plan for the property.',
		lede: 'Energy Point is a solar company for Te Kauwhata homes, vineyards and the blocks toward the lakes. Northern Waikato, still a local visit from Morrinsville.',
		summary: 'Lakeside homes, vines and new streets in northern Waikato.',
		image: '/images/rural-hero.png',
		alt: 'Open Waikato land suited to solar near Te Kauwhata',
		position: 'center 48%',
		audiences: ['residential', 'rural'],
		points: [
			{
				title: 'New streets and older blocks',
				copy: 'Growth around the lakes and established houses on larger sections. We size to the bill, not the suburb brochure.',
			},
			{
				title: 'Vines and rural load',
				copy: 'Sheds, pumps and seasonal work change the year. We model those months rather than a city usage pattern.',
			},
			{
				title: 'WEL Networks',
				copy: 'Te Kauwhata sits on WEL Networks. We handle the connection application so export is allowed.',
			},
			{
				title: 'North, still Waikato',
				copy: 'A longer drive than Cambridge. We still come out, still install with our own crew and still answer after.',
			},
		],
	},
	{
		slug: 'putaruru',
		name: 'Putaruru',
		searchName: 'Putaruru',
		intro: 'South Waikato town and farms.<br />We still come out.',
		lede: 'Energy Point is a solar installer for Putaruru homes and the farms toward Tirau and Tokoroa. South Waikato is a longer run. The visit, the design and the aftercare are the same.',
		summary: 'South Waikato town and farms toward Tirau and Tokoroa.',
		image: '/images/rural-hero.png',
		alt: 'A South Waikato rural property with space for solar',
		position: 'center 50%',
		audiences: ['residential', 'rural'],
		points: [
			{
				title: 'Town and timber country',
				copy: 'A house in Putaruru or a block toward the pines. Shed roofs and ground arrays are often the better generation space.',
			},
			{
				title: 'Seasonal farm load',
				copy: 'We design around the months that drive the bill, not a Hamilton suburb profile.',
			},
			{
				title: 'Powerco paperwork',
				copy: 'Putaruru is on Powerco. We handle the network application and the meter so you can see what the system does.',
			},
			{
				title: 'Worth the drive',
				copy: 'If the property fits, we come. If the run or the network limit makes a poor job, we say so.',
			},
		],
	},
] as const;

export const nearbyPlaces = [
	'Gordonton',
	'Matangi',
	'Newstead',
	'Eureka',
	'Tauwhare',
	'Walton',
	'Waitoa',
	'Tahuna',
	'Ohaupo',
	'Pirongia',
	'Kihikihi',
	'Horotiu',
	'Tirau',
	'Tokoroa',
	'Thames',
	'Paeroa',
	'Ngatea',
	'Taupiri',
	'Ohinewai',
] as const;

export const areaFaqs = [
	{
		question: 'Which towns do you cover?',
		answer:
			'Energy Point is a Waikato solar company based in Morrinsville. We install for homes, businesses and farms in Hamilton, Cambridge, Te Awamutu, Morrinsville, Raglan, Matamata, Huntly, Te Aroha, Ngāruawāhia, Tamahere, Te Kauwhata, Putaruru and the properties between. Ask if you are just outside that.',
	},
	{
		question: 'Do you install solar in Hamilton?',
		answer:
			'Yes. Energy Point is a solar installer for Hamilton homes, businesses and the suburbs around the city, including Rototuna, Flagstaff, Chartwell and Glenview. We drive from Morrinsville, handle the WEL Networks application and stay on after switch-on.',
	},
	{
		question: 'Are you a local solar company or a national franchise?',
		answer:
			'Local. Energy Point Limited is registered in Morrinsville. The people who visit, design and install are the Waikato crew. You are not handed to a hired team that disappears.',
	},
	{
		question: 'Do you cover farms and lifestyle blocks as well as towns?',
		answer:
			'Yes. Rural and lifestyle work is a core part of the job: sheds, ground arrays, pumps and seasonal load. The rural page and the town pages set out how that visit works.',
	},
	{
		question: 'What if I am just outside the Waikato?',
		answer:
			'Ask. Thames, Paeroa, Tokoroa and similar neighbouring towns are often a yes. If the drive or the network makes a poor job, we will say so rather than stretch for the work.',
	},
] as const;

export const audienceHrefs: Record<AreaAudience, string> = {
	residential: '/residential/',
	commercial: '/commercial/',
	rural: '/rural/',
};

export const audienceLabels: Record<AreaAudience, string> = {
	residential: 'Residential',
	commercial: 'Commercial',
	rural: 'Rural',
};

export function areaBySlug(slug: string): Area | undefined {
	return areas.find((area) => area.slug === slug);
}
