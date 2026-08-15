import { site } from './site';

export const legalUpdated = '15 August 2026';
export const legalUpdatedIso = '2026-08-15';

export const legalPages = [
	{ label: 'Privacy', href: '/privacy/' },
	{ label: 'Terms', href: '/terms/' },
	{ label: 'Cookies', href: '/cookies/' },
	{ label: 'Disclaimer', href: '/disclaimer/' },
] as const;

export type LegalBlock =
	| { type: 'p'; html: string }
	| { type: 'ul'; items: string[] };

export type LegalSection = {
	id: string;
	title: string;
	blocks: LegalBlock[];
};

export type LegalDocument = {
	href: string;
	title: string;
	eyebrow: string;
	description: string;
	intro: string;
	sections: LegalSection[];
};

const contactHtml = `Email <a href="mailto:${site.email}">${site.email}</a> or call <a href="${site.phoneHref}">${site.phoneDisplay}</a>. ${site.hours}. ${site.region}.`;

export const privacy: LegalDocument = {
	href: '/privacy/',
	title: 'Privacy policy',
	eyebrow: 'Legal',
	description:
		'How Energy Point collects, uses and stores personal information under the New Zealand Privacy Act 2020.',
	intro:
		'How we handle the details you give us. Written for the Privacy Act 2020. We do not sell your information.',
	sections: [
		{
			id: 'who-we-are',
			title: 'Who we are',
			blocks: [
				{
					type: 'p',
					html: `Energy Point is a locally owned solar and energy business in the Waikato, New Zealand. This policy covers this website and the enquiries, calls and emails we receive through it.`,
				},
				{
					type: 'p',
					html: `If anything here is unclear, ${contactHtml}`,
				},
			],
		},
		{
			id: 'what-we-collect',
			title: 'What we collect',
			blocks: [
				{
					type: 'p',
					html: 'When you send an enquiry we collect the fields on the form:',
				},
				{
					type: 'ul',
					items: [
						'Property type and main goal',
						'First name and last name',
						'Phone number',
						'Email address',
						'Property address',
						'Latest energy bill, 12-month power report or property photos',
						'Your message',
					],
				},
				{
					type: 'p',
					html: 'Our hosting and security provider may also log technical information such as IP address, browser type and the pages requested. That is ordinary website operation, not a marketing profile.',
				},
				{
					type: 'p',
					html: 'We do not run advertising or analytics cookies on this website. See the <a href="/cookies/">cookie policy</a> for what may still be set by hosting or the address lookup on the contact form.',
				},
			],
		},
		{
			id: 'how-we-collect-it',
			title: 'How we collect it',
			blocks: [
				{
					type: 'ul',
					items: [
						'Directly from you through the contact form, email, phone or social media',
						'The address text you type, if you use the address search on the contact form',
						'Automatically from Cloudflare as part of serving and protecting the site',
					],
				},
				{
					type: 'p',
					html: 'If you do not want address suggestions, type the address yourself. Suggestions come from OpenStreetMap and only run when you type in that field.',
				},
			],
		},
		{
			id: 'why-we-collect-it',
			title: 'Why we collect it',
			blocks: [
				{
					type: 'p',
					html: 'We use this information to:',
				},
				{
					type: 'ul',
					items: [
						'Respond to your enquiry and arrange a visit or follow-up',
						'Understand the property and model usage from your bill, 12-month power report and photos',
						'Deliver the enquiry to our sales inbox',
						'Keep the website secure and working',
						'Meet legal, insurance or accounting obligations',
					],
				},
				{
					type: 'p',
					html: 'Sending the form is a request for us to contact you about that enquiry. We do not add you to an unrelated marketing list and we do not sell your details.',
				},
			],
		},
		{
			id: 'who-we-share-it-with',
			title: 'Who we share it with',
			blocks: [
				{
					type: 'p',
					html: 'We share information only as needed to run the business:',
				},
				{
					type: 'ul',
					items: [
						'Resend, to deliver enquiry emails to our inbox',
						'Cloudflare, to host the website and store enquiry uploads (bills, power reports and photos)',
						'OpenStreetMap, to suggest New Zealand addresses when you use that field',
						'Professional advisers, insurers or regulators if the law requires it',
						'A supplier or installer only if they need the detail to quote or complete work you have asked for',
					],
				},
				{
					type: 'p',
					html: 'Some of these providers store or process information outside New Zealand. We use them because they are needed to run the website and deliver enquiries.',
				},
			],
		},
		{
			id: 'photos',
			title: 'Uploads',
			blocks: [
				{
					type: 'p',
					html: 'You can attach a latest energy bill, a 12-month power report or property photos so we can model usage before a visit. Uploads are optional. We store these files privately and delete them after 30 days.',
				},
				{
					type: 'p',
					html: 'Do not upload files that are not yours to share or photos of other people without their permission.',
				},
			],
		},
		{
			id: 'how-long-we-keep-it',
			title: 'How long we keep it',
			blocks: [
				{
					type: 'ul',
					items: [
						'Enquiry emails and the details in them: as long as we need them to handle your request, then for a reasonable business and legal record',
						'Bills, power reports and photos: 30 days, then deleted',
						'Hosting and security logs: according to the provider\'s normal retention',
					],
				},
			],
		},
		{
			id: 'your-rights',
			title: 'Your rights',
			blocks: [
				{
					type: 'p',
					html: 'Under the Privacy Act 2020 you can ask us to:',
				},
				{
					type: 'ul',
					items: [
						'Confirm whether we hold personal information about you',
						'Access that information',
						'Correct it if it is wrong',
					],
				},
				{
					type: 'p',
					html: `To make a request, ${contactHtml} We may need to confirm it is you before we release information.`,
				},
				{
					type: 'p',
					html: 'If you are not satisfied with how we handle your information, you can complain to the <a href="https://www.privacy.org.nz" target="_blank" rel="noreferrer">Office of the Privacy Commissioner</a>.',
				},
			],
		},
		{
			id: 'security',
			title: 'Security',
			blocks: [
				{
					type: 'p',
					html: 'We take reasonable steps to protect personal information, including HTTPS, a honeypot on the form, file-type checks on uploads and private storage for bills, power reports and photos. No website is perfectly secure. If you think there has been a breach involving your information, contact us straight away.',
				},
			],
		},
		{
			id: 'children',
			title: 'Children',
			blocks: [
				{
					type: 'p',
					html: 'This website is aimed at adults making decisions about a property. We do not knowingly collect information from children.',
				},
			],
		},
		{
			id: 'changes',
			title: 'Changes',
			blocks: [
				{
					type: 'p',
					html: `We may update this policy when our practices or the law change. The date at the top of the page is the current version.`,
				},
			],
		},
		{
			id: 'contact',
			title: 'Contact',
			blocks: [
				{
					type: 'p',
					html: `Energy Point. ${contactHtml}`,
				},
			],
		},
	],
};

export const terms: LegalDocument = {
	href: '/terms/',
	title: 'Terms of service',
	eyebrow: 'Legal',
	description:
		'Terms for using the Energy Point website. Installation work is covered by your signed proposal, not these pages.',
	intro:
		'These terms cover use of this website. A solar, battery or maintenance job is covered by the signed proposal, not by browsing these pages.',
	sections: [
		{
			id: 'agreement',
			title: 'Using this website',
			blocks: [
				{
					type: 'p',
					html: 'If you do not agree with these terms, do not use the website. Continued use means you accept them.',
				},
				{
					type: 'p',
					html: `Energy Point is based in the Waikato, New Zealand. ${contactHtml}`,
				},
			],
		},
		{
			id: 'acceptable-use',
			title: 'Acceptable use',
			blocks: [
				{
					type: 'p',
					html: 'You may browse the site for information about our work. You must not:',
				},
				{
					type: 'ul',
					items: [
						'Try to break, overload or probe the site',
						'Submit false, abusive or automated enquiries',
						'Copy the site to run a competing service',
						'Use our content, logo or photos without permission',
					],
				},
				{
					type: 'p',
					html: 'The contact form is for genuine enquiries about a property in or near the Waikato. We may ignore or delete submissions that look like spam.',
				},
			],
		},
		{
			id: 'website-content',
			title: 'Website content',
			blocks: [
				{
					type: 'p',
					html: 'Pages are general information for New Zealand readers, written for Waikato homes, businesses and rural properties. They are not:',
				},
				{
					type: 'ul',
					items: [
						'A quote or an offer you can accept by browsing',
						'Financial, legal or tax advice',
						'A guarantee of savings, generation or payback',
					],
				},
				{
					type: 'p',
					html: 'Finance pages describe third-party bank products. Those lenders set their own rates, limits and rules. Confirm everything with the lender. Energy Point does not provide financial advice.',
				},
				{
					type: 'p',
					html: 'A system we design for you is described in a written proposal. That document, plus any manufacturer warranties you receive, is the source of truth for price, scope, programme and warranty. See the <a href="/disclaimer/">disclaimer</a> for more on savings, finance and photos.',
				},
			],
		},
		{
			id: 'intellectual-property',
			title: 'Intellectual property',
			blocks: [
				{
					type: 'p',
					html: 'The Energy Point name, logo, text, photographs and design belong to Energy Point or our licensors. You may share a page link. You may not copy the site or reuse photos in advertising without written permission.',
				},
			],
		},
		{
			id: 'reviews',
			title: 'Customer reviews',
			blocks: [
				{
					type: 'p',
					html: 'Reviews on this site were given by customers and published with the wording we received, aside from light editing for length or clarity. They are individual experiences, not a promise of the same result.',
				},
			],
		},
		{
			id: 'enquiries',
			title: 'Enquiries',
			blocks: [
				{
					type: 'p',
					html: 'Sending a form asks us to contact you about that enquiry. It does not create a contract to supply goods or services. See the <a href="/privacy/">privacy policy</a> for how we handle your details.',
				},
			],
		},
		{
			id: 'liability',
			title: 'Liability',
			blocks: [
				{
					type: 'p',
					html: 'To the extent New Zealand law allows:',
				},
				{
					type: 'ul',
					items: [
						'We are not liable for loss caused by using or being unable to use this website',
						'We are not liable for third-party websites we link to, including banks and social media',
						'Website content may be updated or contain errors. We will correct material mistakes when we find them',
					],
				},
				{
					type: 'p',
					html: 'Nothing in these terms limits rights you have under the Consumer Guarantees Act 1993, the Fair Trading Act 1986 or other law that cannot be excluded.',
				},
			],
		},
		{
			id: 'governing-law',
			title: 'Governing law',
			blocks: [
				{
					type: 'p',
					html: 'These terms are governed by the laws of New Zealand. The New Zealand courts have jurisdiction.',
				},
			],
		},
		{
			id: 'changes',
			title: 'Changes',
			blocks: [
				{
					type: 'p',
					html: 'We may update these terms. The date at the top is the current version. Continued use of the site after a change means you accept the updated terms.',
				},
			],
		},
	],
};

export const cookies: LegalDocument = {
	href: '/cookies/',
	title: 'Cookie policy',
	eyebrow: 'Legal',
	description:
		'Energy Point does not use advertising or analytics cookies. This page explains what hosting and the contact form may still set.',
	intro:
		'We do not use advertising or analytics cookies. This page explains the few tools that may still run so the site and contact form work.',
	sections: [
		{
			id: 'what-cookies-are',
			title: 'What cookies are',
			blocks: [
				{
					type: 'p',
					html: 'A cookie is a small text file a website can store in your browser. Similar tools include local storage and request logs. Some are essential. Others are used for advertising or analytics. We do not use those.',
				},
			],
		},
		{
			id: 'what-this-site-uses',
			title: 'What this site uses',
			blocks: [
				{
					type: 'p',
					html: 'We do not set advertising cookies. We do not run Google Analytics, a Meta Pixel or similar tracking.',
				},
				{
					type: 'p',
					html: 'The site may still involve:',
				},
				{
					type: 'ul',
					items: [
						'Essential hosting and security cookies from Cloudflare, which serve the pages and help block abuse',
						'Session data the browser needs to submit the contact form',
						'Address suggestions on the contact form, fetched through our own site from OpenStreetMap. That lookup does not set advertising cookies.',
					],
				},
				{
					type: 'p',
					html: 'If you never type in the address field, the address search does not run.',
				},
			],
		},
		{
			id: 'your-choices',
			title: 'Your choices',
			blocks: [
				{
					type: 'p',
					html: `You can block or delete cookies in your browser settings. Blocking all cookies may affect form submission or security checks. You can still ${contactHtml}`,
				},
				{
					type: 'p',
					html: 'We do not show a cookie banner because we do not use optional tracking cookies. If we add analytics later, we will update this page and, where required, ask before setting non-essential cookies.',
				},
			],
		},
		{
			id: 'personal-information',
			title: 'Personal information',
			blocks: [
				{
					type: 'p',
					html: 'If a cookie or log identifies you, the <a href="/privacy/">privacy policy</a> applies. The Privacy Act 2020 covers personal information, including information collected through cookies.',
				},
			],
		},
	],
};

export const disclaimer: LegalDocument = {
	href: '/disclaimer/',
	title: 'Website disclaimer',
	eyebrow: 'Legal',
	description:
		'Energy Point website information is general. Savings, finance and warranties depend on your property and the signed proposal.',
	intro:
		'This website is general information about Energy Point and energy work in the Waikato. It is not a substitute for a site visit, a written proposal or independent advice.',
	sections: [
		{
			id: 'performance',
			title: 'Performance and savings',
			blocks: [
				{
					type: 'p',
					html: 'Generation, bill savings and payback depend on your roof or ground area, shading, usage pattern, electricity plan, export rate, system size and how you use power after install. Figures on this site, if any, are examples or modelled ranges, not a guarantee. We will not invent a savings number to win the job.',
				},
			],
		},
		{
			id: 'finance',
			title: 'Finance and rebates',
			blocks: [
				{
					type: 'p',
					html: 'Bank products named on the <a href="/finance/">finance page</a> are offered by those lenders, not by Energy Point. Rates, limits and eligibility change. As of August 2026 there is no nationwide government rebate for residential rooftop solar in New Zealand. Election policies are proposals, not current entitlements. Get independent financial advice before you borrow.',
				},
			],
		},
		{
			id: 'warranties',
			title: 'Warranties',
			blocks: [
				{
					type: 'p',
					html: 'Warranty cover depends on the panels, inverter, battery and workmanship in your signed proposal and the manufacturer documents that come with the equipment. Website summaries are a guide only.',
				},
			],
		},
		{
			id: 'photographs',
			title: 'Photographs',
			blocks: [
				{
					type: 'p',
					html: 'Photos show real Energy Point work or typical installations. They are not a promise that your property will look the same or use the same equipment.',
				},
			],
		},
		{
			id: 'third-party-sites',
			title: 'Third-party sites',
			blocks: [
				{
					type: 'p',
					html: 'Links to banks, social media or other websites are for convenience. We are not responsible for their content or privacy practices.',
				},
			],
		},
		{
			id: 'consumer-law',
			title: 'Consumer law',
			blocks: [
				{
					type: 'p',
					html: 'Nothing on this site limits rights you have under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.',
				},
			],
		},
		{
			id: 'corrections',
			title: 'If something looks wrong',
			blocks: [
				{
					type: 'p',
					html: `${contactHtml} We would rather correct a page than leave a misleading line up.`,
				},
			],
		},
	],
};

export const legalDocuments = [privacy, terms, cookies, disclaimer] as const;
