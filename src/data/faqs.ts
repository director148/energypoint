export type Faq = {
	question: string;
	answer: string;
};

export type FaqGroup = {
	id: string;
	label: string;
	items: Faq[];
};

export const faqGroups: FaqGroup[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			{
				question: 'What are the benefits of installing solar at my property?',
				answer:
					'Solar can reduce the electricity you buy from the grid, make energy costs more predictable and prepare your property for batteries or EV charging. The result depends on your roof, daytime use, system size and electricity plan, which is why we start with your real usage data.',
			},
			{
				question: 'How does solar power work?',
				answer:
					'Panels convert sunlight into direct-current electricity. An inverter converts it into the alternating-current electricity your property uses. You use solar energy first; surplus can charge a battery or be exported to the grid, subject to your retailer and network connection.',
			},
			{
				question: 'How much could I save?',
				answer:
					'There is no honest one-size-fits-all number. Savings vary with your daytime demand, electricity tariff, export rate, system design and financing. We model those inputs before recommending a system so you can judge the expected return for your property.',
			},
			{
				question: 'Are government solar rebates available in New Zealand?',
				answer:
					'As of August 2026, there is no active nationwide government rebate for residential rooftop solar in New Zealand. Some banks offer discounted green lending and policy settings can change, so we check current options with you rather than promising a rebate that does not exist.',
			},
			{
				question: 'Will solar work on cloudy Waikato days?',
				answer:
					'Yes. Panels still generate in diffuse light, although output is lower than on a clear day. Annual modelling accounts for local weather and seasonal variation rather than assuming perfect sunshine.',
			},
		],
	},
	{
		id: 'installation',
		label: 'Design & installation',
		items: [
			{
				question: 'How long does installation take?',
				answer:
					'Many residential installations are completed in one to three days once design, approvals and equipment are ready. Larger commercial, rural or ground-mounted systems take longer. Your proposal includes the expected programme.',
			},
			{
				question: 'Will installation disrupt my home or operation?',
				answer:
					'We plan isolation and access with you before work starts. Most residential work causes limited disruption; business and farm projects are staged around critical operations wherever practical.',
			},
			{
				question: 'Do you handle network applications and paperwork?',
				answer:
					'Yes. We coordinate the technical documentation and connection steps required for your project, and explain anything that needs your approval or information.',
			},
			{
				question: 'How are panels mounted?',
				answer:
					'The mounting system is selected for the roof material, structure, wind zone and panel layout. Ground-mounted systems are engineered for the site and positioned for access, generation and farm operations.',
			},
			{
				question: 'Can I add a battery or more panels later?',
				answer:
					'Often, yes. We discuss likely future demand at design stage so inverter capacity, switchboard work and physical layout do not unnecessarily limit later upgrades.',
			},
		],
	},
	{
		id: 'finance',
		label: 'Finance',
		items: [
			{
				question: 'What does a system cost?',
				answer:
					'Cost depends on system size, site access, switchboard work, mounting, storage and monitoring. We provide an itemised proposal after understanding the property and your goals.',
			},
			{
				question: 'What finance options are available?',
				answer:
					'Several New Zealand banks offer green home-loan top-ups for eligible customers, and other consumer or business finance may be available. Rates and criteria change, so review the current lender terms and get independent financial advice before committing.',
			},
			{
				question: 'Are there hidden costs?',
				answer:
					'Our proposal states what is included, any assumptions, and any known work outside scope. If site conditions reveal a required change, we discuss it before additional work proceeds.',
			},
			{
				question: 'How do I compare finance with energy savings?',
				answer:
					'Compare repayments, fees and the post-promotional interest rate against conservative generation and usage assumptions. We can supply the technical inputs; a lender or adviser should confirm what finance is suitable for you.',
			},
		],
	},
	{
		id: 'care',
		label: 'Care & warranty',
		items: [
			{
				question: 'What maintenance does a solar system need?',
				answer:
					'Good systems are low maintenance, not no maintenance. Monitoring, visual checks, safe cleaning when needed and periodic electrical inspection help catch shading, damage or performance changes early.',
			},
			{
				question: 'Do you service systems installed by someone else?',
				answer:
					'Yes. We can assess, maintain and repair many systems regardless of who installed them, subject to safe access and component availability.',
			},
			{
				question: 'What warranties are included?',
				answer:
					'Warranty terms depend on the exact panels, inverter, battery and workmanship in your proposal. Current Energy Point packages may include long product warranties, but the signed proposal and manufacturer documents are the source of truth.',
			},
			{
				question: 'How do I monitor performance?',
				answer:
					'Most modern systems include an app or web portal showing generation and system status. We set it up at handover and can investigate alerts or unexplained drops in output.',
			},
			{
				question: 'What if a storm damages the system?',
				answer:
					'Make the site safe, contact your insurer and call us. We can inspect the system, isolate damaged equipment where required and provide information for repair planning. Cover depends on your policy and product warranty terms.',
			},
		],
	},
];

export const featuredFaqs = [
	faqGroups[0].items[0],
	faqGroups[0].items[1],
	faqGroups[0].items[2],
	faqGroups[0].items[3],
	faqGroups[3].items[0],
];

