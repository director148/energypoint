export const faqAudiences = ['residential', 'commercial', 'rural'] as const;

export type FaqAudience = (typeof faqAudiences)[number];

export type FaqVariantKey = 'all' | FaqAudience;

export type FaqCopy = {
	question: string;
	answer: string;
};

export type Faq = {
	variants: Record<FaqVariantKey, FaqCopy>;
};

export type FaqGroup = {
	id: string;
	label: string;
	items: Faq[];
};

export function faqCopy(item: Faq, key: FaqVariantKey = 'all'): FaqCopy {
	return item.variants[key];
}

const faq = (variants: Faq['variants']): Faq => ({ variants });

export const faqGroups: FaqGroup[] = [
	{
		id: 'general',
		label: 'General',
		items: [
			faq({
				all: {
					question: 'What are the benefits of installing solar at my property?',
					answer:
						'Solar can cut the electricity you buy from the grid, make energy costs more predictable and prepare the property for batteries or EV charging. The result depends on the roof or land, daytime use, system size and electricity plan, which is why we start with real usage data.',
				},
				residential: {
					question: 'What are the benefits of solar on my house?',
					answer:
						'Solar can lower the household power bill, make costs more predictable and get the house ready for a battery or EV charger. The result depends on the roof, how you use power during the day, system size and your retailer plan. We start with the bill, not a generic kit.',
				},
				commercial: {
					question: 'What are the benefits of solar for the business?',
					answer:
						'Solar can lower operating costs, hedge against rising tariffs and supply daytime power when the site is busy. The result depends on load profile, roof or land, export limits and your electricity contract. We model the hours the business actually runs.',
				},
				rural: {
					question: 'What are the benefits of solar on the farm?',
					answer:
						'Solar can cut farm power costs, cover pumps and sheds in daylight hours and reduce exposure to tariff rises. The result depends on seasonal loads, roof or ground space, cable runs and the retailer plan. We start with how the property actually uses power.',
				},
			}),
			faq({
				all: {
					question: 'How does solar power work?',
					answer:
						'Panels convert sunlight into direct-current electricity. An inverter converts it into the alternating-current electricity the property uses. You use solar first; surplus can charge a battery or be exported to the grid, subject to your retailer and network connection.',
				},
				residential: {
					question: 'How does solar work on a house?',
					answer:
						'Panels on the roof turn sunlight into DC electricity. An inverter turns that into the AC power the house uses. The home uses solar first. Surplus can charge a battery or go to the grid, depending on your retailer and network connection.',
				},
				commercial: {
					question: 'How does solar work on a business site?',
					answer:
						'Arrays on the roof or land produce DC electricity. Inverters convert it to the AC the site uses. The business uses solar first during operating hours. Surplus can charge a battery, support EV charging or export, subject to retailer and network limits.',
				},
				rural: {
					question: 'How does solar work on a farm?',
					answer:
						'Panels on sheds, roofs or a ground array produce DC electricity. An inverter converts it to the AC the farm uses. Pumps, dairies and workshops use solar first. Surplus can charge a battery or export, subject to your retailer and network connection.',
				},
			}),
			faq({
				all: {
					question: 'How much could I save?',
					answer:
						'There is no honest one-size-fits-all number. Savings vary with daytime demand, tariff, export rate, system design and financing. We model those inputs before recommending a system so you can judge the expected return for the property.',
				},
				residential: {
					question: 'How much could the house save?',
					answer:
						'There is no honest household average. Savings depend on daytime use, your tariff, export rate, roof design and how you fund it. We model the bill and the roof before recommending a system, so you can judge the return for this house.',
				},
				commercial: {
					question: 'How much could the business save?',
					answer:
						'There is no honest one-size figure. Savings depend on operating hours, tariff structure, export limits, system size and financing. We model load and generation so you can judge the return against the way the site actually uses power.',
				},
				rural: {
					question: 'How much could the farm save?',
					answer:
						'There is no honest one-size figure. Savings depend on seasonal loads, irrigation or dairy demand, tariff, export rate and system design. We model the months that drive the bill, not a suburban usage pattern.',
				},
			}),
			faq({
				all: {
					question: 'Are government solar rebates available in New Zealand?',
					answer:
						'As of August 2026 there is no nationwide government rebate for rooftop solar in New Zealand. Some banks offer discounted green lending and policy settings can change, so we check current options with you rather than promising a rebate that does not exist.',
				},
				residential: {
					question: 'Are there government rebates for home solar?',
					answer:
						'As of August 2026 there is no active nationwide government rebate for residential rooftop solar in New Zealand. Some banks offer discounted green home-loan top-ups. Policy can change, so we check what is current rather than promising a rebate that does not exist.',
				},
				commercial: {
					question: 'Are there government rebates for business solar?',
					answer:
						'As of August 2026 there is no nationwide rebate that simply pays for commercial rooftop solar. Some businesses look at depreciation, financing or other schemes with their accountant. We do not treat a household rebate story as if it applies to the site.',
				},
				rural: {
					question: 'Are there government rebates for farm solar?',
					answer:
						'As of August 2026 there is no nationwide rebate that covers farm or lifestyle-block solar as a standard entitlement. Some banks offer green lending and other rural programmes can change. We check what is current rather than promising a rebate that does not exist.',
				},
			}),
			faq({
				all: {
					question: 'Will solar work on cloudy Waikato days?',
					answer:
						'Yes. Panels still generate in diffuse light, although output is lower than on a clear day. Annual modelling accounts for local weather and seasonal variation rather than assuming perfect sunshine.',
				},
				residential: {
					question: 'Will home solar work on cloudy Waikato days?',
					answer:
						'Yes. The house still generates in diffuse light, just less than on a clear day. We model a Waikato year, including winter, rather than selling a summer-only story.',
				},
				commercial: {
					question: 'Will business solar work on cloudy Waikato days?',
					answer:
						'Yes. The site still generates in diffuse light, with lower output than a clear day. We model annual Waikato weather against operating hours, not a perfect-sunshine assumption.',
				},
				rural: {
					question: 'Will farm solar work on cloudy Waikato days?',
					answer:
						'Yes. Sheds and ground arrays still generate in diffuse light, with lower output than a clear day. Annual modelling includes Waikato weather and the seasons that drive farm load.',
				},
			}),
			faq({
				all: {
					question: 'Where do you install solar?',
					answer:
						'Energy Point is a Waikato solar company based in Morrinsville. We install for homes, businesses and farms in Hamilton, Cambridge, Te Awamutu, Morrinsville, Raglan, Matamata, Huntly, Te Aroha, Ngāruawāhia, Tamahere, Te Kauwhata, Putaruru and the properties between. See the areas we cover page or ask if you are just outside that.',
				},
				residential: {
					question: 'Do you install home solar in my town?',
					answer:
						'If you are in the Waikato, most likely yes. Energy Point is a Morrinsville solar company covering Hamilton, Cambridge, Te Awamutu, Raglan, Matamata, Huntly, Te Aroha, Ngāruawāhia, Tamahere and the towns and blocks between. The areas we cover page lists them. Ask if you are on the edge.',
				},
				commercial: {
					question: 'Do you install commercial solar in my town?',
					answer:
						'Yes across the Waikato. We design for Hamilton and Cambridge businesses as well as town and rural sites in Te Awamutu, Morrinsville, Matamata, Huntly and further south or north if the load makes sense. See areas we cover or send the site address.',
				},
				rural: {
					question: 'Do you install farm solar in my area?',
					answer:
						'Yes. Farms and lifestyle blocks around Morrinsville, Te Awamutu, Matamata, Te Aroha, Tamahere, Putaruru and the rest of the Waikato are a core part of the work. Ground arrays and shed roofs are on the table. See areas we cover or ask.',
				},
			}),
		],
	},
	{
		id: 'installation',
		label: 'Design & installation',
		items: [
			faq({
				all: {
					question: 'Is the electrical work licensed?',
					answer:
						'Yes. Solar and battery installs are prescribed electrical work. Licensed people do the wiring. Alan Gellert inspects our jobs and is listed as EWRB I 254535 on the public register.',
				},
				residential: {
					question: 'Is the electrical work on my house licensed?',
					answer:
						'Yes. A home solar or battery job is prescribed electrical work. Licensed people do the wiring. Alan Gellert inspects our jobs and is listed as EWRB I 254535, so you can look him up before we visit.',
				},
				commercial: {
					question: 'Is the electrical work on a business site licensed?',
					answer:
						'Yes. Commercial solar and battery work is prescribed electrical work. Licensed people do the wiring. Alan Gellert inspects our jobs and is listed as EWRB I 254535 on the public register.',
				},
				rural: {
					question: 'Is the electrical work on a farm licensed?',
					answer:
						'Yes. Farm solar and battery work is prescribed electrical work. Licensed people do the wiring. Alan Gellert inspects our jobs and is listed as EWRB I 254535 on the public register.',
				},
			}),
			faq({
				all: {
					question: 'How long does installation take?',
					answer:
						'Many residential installations are completed in one to three days once design, approvals and equipment are ready. Larger commercial, rural or ground-mounted systems take longer. Your proposal includes the expected programme.',
				},
				residential: {
					question: 'How long does a home installation take?',
					answer:
						'Many house installations are completed in one to three days once design, approvals and equipment are ready. The proposal sets out the expected programme for your roof.',
				},
				commercial: {
					question: 'How long does a commercial installation take?',
					answer:
						'Business sites take longer than a house. Roof area, switchboard work, access, after-hours constraints and network approvals all affect the programme. The proposal includes the expected staging so operations can plan around it.',
				},
				rural: {
					question: 'How long does a farm installation take?',
					answer:
						'Farm jobs often take longer than a house, especially with multiple sheds, ground mounts, long cable runs or three-phase work. The proposal includes the expected programme around stock, vehicles and seasonal work.',
				},
			}),
			faq({
				all: {
					question: 'Will installation disrupt my home or operation?',
					answer:
						'We plan isolation and access with you before work starts. Most residential work causes limited disruption. Business and farm projects are staged around critical operations wherever practical.',
				},
				residential: {
					question: 'Will installation disrupt the house?',
					answer:
						'We plan access and any power isolation with you before work starts. Most home jobs cause limited disruption: scaffolding, roof time and a planned shutdown for the electrical connection.',
				},
				commercial: {
					question: 'Will installation disrupt the business?',
					answer:
						'We plan isolation, vehicle access and work hours with you before we start. Jobs are staged around trading or production wherever practical, including after-hours connection if the site needs it.',
				},
				rural: {
					question: 'Will installation disrupt the farm?',
					answer:
						'We plan access, isolation and array placement around stock, vehicles and milking or irrigation. Work is staged around critical farm operations wherever practical, not dropped in on a suburban timetable.',
				},
			}),
			faq({
				all: {
					question: 'Can solar work across more than one building?',
					answer:
						'Yes. We design around roof condition, export limits, daytime demand and any staged rollout across houses, commercial buildings or sheds. The aim is a system that fits the site, not a single-roof template.',
				},
				residential: {
					question: 'Can solar cover a house plus a garage or sleepout?',
					answer:
						'Sometimes. We look at which roof performs, cable runs, switchboard capacity and export limits. A garage or sleepout can be useful generation space if the main roof is shaded or the wrong way.',
				},
				commercial: {
					question: 'Can solar work on a commercial roof or multiple buildings?',
					answer:
						'Yes. We design around roof condition, export limits, daytime demand and any staged rollout across sites. The aim is a system that supports operations, not a house-sized layout scaled up.',
				},
				rural: {
					question: 'Can solar cover more than one shed?',
					answer:
						'Yes. Farms often split generation across implement sheds, dairies or a workshop. We design around roof condition, cable runs, pumps and any staged rollout, rather than forcing everything onto one building.',
				},
			}),
			faq({
				all: {
					question: 'Is ground-mounted solar an option?',
					answer:
						'Often, yes. Ground-mounted arrays can suit farms, lifestyle blocks or sites where roof space, orientation or access is limited. We position arrays around vehicles, stock and how the land is used.',
				},
				residential: {
					question: 'Is ground-mounted solar an option at home?',
					answer:
						'Sometimes, especially on a lifestyle block or a house with a poor roof. We look at land, shading, council rules and access before recommending a ground array over the roof.',
				},
				commercial: {
					question: 'Is ground-mounted solar an option for the business?',
					answer:
						'Sometimes. Carparks, unused land or a poor roof can suit a ground array. We weigh generation, vehicle movement, visual impact and network constraints before recommending it.',
				},
				rural: {
					question: 'Is ground-mounted solar an option on a farm?',
					answer:
						'Often, yes. Ground arrays can suit sheds, dairy, irrigation or properties where roof space, orientation or access is limited. We position them around stock, vehicles and existing farm work rather than fighting the site.',
				},
			}),
			faq({
				all: {
					question: 'Do you handle network applications and paperwork?',
					answer:
						'Yes. We coordinate the technical documentation and connection steps required for the project and explain anything that needs your approval or information.',
				},
				residential: {
					question: 'Do you handle the network paperwork for a house?',
					answer:
						'Yes. We coordinate the connection application and technical documents for a residential system and we tell you what the retailer or network needs from you.',
				},
				commercial: {
					question: 'Do you handle network applications for a business site?',
					answer:
						'Yes. Commercial connections often need more network detail, export limits and staged approvals. We coordinate that documentation and flag anything that needs the business to sign or supply.',
				},
				rural: {
					question: 'Do you handle network paperwork for a farm?',
					answer:
						'Yes. Rural connections can involve longer runs, three-phase supply and export constraints. We coordinate the technical documents and explain what the network needs from you.',
				},
			}),
			faq({
				all: {
					question: 'How are panels mounted?',
					answer:
						'The mounting system is selected for the roof material, structure, wind zone and panel layout. Ground-mounted systems are engineered for the site and positioned for access, generation and how the land is used.',
				},
				residential: {
					question: 'How are panels mounted on a house?',
					answer:
						'The rails and fixings are chosen for the roof material, structure, wind zone and layout. We do not treat iron, tile and membrane as the same job.',
				},
				commercial: {
					question: 'How are panels mounted on a commercial roof?',
					answer:
						'Mounting is chosen for the roof type, structure, wind zone, warranty conditions and maintenance access. Large roofs need a layout the business can still work around.',
				},
				rural: {
					question: 'How are panels mounted on sheds or the land?',
					answer:
						'Shed roofs use a mounting system matched to the cladding, structure and wind zone. Ground arrays are engineered for the site and placed for access, generation and farm operations.',
				},
			}),
			faq({
				all: {
					question: 'Can I add a battery or more panels later?',
					answer:
						'Often, yes. We discuss likely future demand at design stage so inverter capacity, switchboard work and physical layout do not unnecessarily limit later upgrades.',
				},
				residential: {
					question: 'Can I add a home battery or more panels later?',
					answer:
						'Often, yes. We talk about EV charging, a battery or more panels at design stage so the inverter, switchboard and roof layout do not box the house in later.',
				},
				commercial: {
					question: 'Can the business add a battery, EV charging or more panels later?',
					answer:
						'Often, yes. We discuss fleet charging, storage and staged arrays at design so inverter capacity, switchboard work and roof or land layout can grow with the site.',
				},
				rural: {
					question: 'Can the farm add a battery or more panels later?',
					answer:
						'Often, yes. We discuss pumps, seasonal peaks and storage at design so inverter capacity, switchboard work and array space can take a later upgrade.',
				},
			}),
			faq({
				all: {
					question: 'What inverter do you install?',
					answer:
						'We typically install Sigenergy. The stack combines the inverter, battery and energy management so the system can time when you use, store and export power. See the Sigenergy page for how the AI, peak and off-peak timing and two-way EV charging work.',
				},
				residential: {
					question: 'What inverter do you put on a house?',
					answer:
						'We typically install Sigenergy. One stack for the inverter, battery and the brain that times charge and export. See the Sigenergy page for AI timing, peak and off-peak use and two-way EV charging.',
				},
				commercial: {
					question: 'What inverter do you put on a business site?',
					answer:
						'We typically install Sigenergy. The stack can scale, time charge and export against the site tariff and take an EV DC charger later. See the Sigenergy page for how the hardware works.',
				},
				rural: {
					question: 'What inverter do you put on a farm?',
					answer:
						'We typically install Sigenergy. The stack can time charge and export around seasonal loads and grow when you add batteries or an EV charger. See the Sigenergy page for how the hardware works.',
				},
			}),
		],
	},
	{
		id: 'finance',
		label: 'Finance',
		items: [
			faq({
				all: {
					question: 'What does a system cost?',
					answer:
						'Cost depends on system size, site access, switchboard work, mounting, storage and monitoring. We provide an itemised proposal after understanding the property and your goals.',
				},
				residential: {
					question: 'What does a home system cost?',
					answer:
						'Cost depends on panel count, roof access, switchboard work, mounting, a battery if you want one and monitoring. We itemise the proposal after seeing the house and the bill.',
				},
				commercial: {
					question: 'What does a commercial system cost?',
					answer:
						'Cost depends on array size, roof or ground works, switchboard and network upgrades, access, storage and monitoring. We itemise the proposal after modelling the site load, not a household kit price.',
				},
				rural: {
					question: 'What does a farm system cost?',
					answer:
						'Cost depends on array size, sheds or ground mounts, cable runs, switchboard work, three-phase needs, storage and monitoring. We itemise the proposal after walking the property.',
				},
			}),
			faq({
				all: {
					question: 'What finance options are available?',
					answer:
						'Several New Zealand banks offer green home-loan top-ups for eligible customers and other consumer or business finance may be available. Rates and criteria change, so review the current lender terms and get independent financial advice before committing.',
				},
				residential: {
					question: 'What finance options are there for home solar?',
					answer:
						'Several New Zealand banks offer green home-loan top-ups for eligible customers. Other consumer finance may also be available. Rates and criteria change, so check current lender terms and get independent advice before you commit.',
				},
				commercial: {
					question: 'What finance options are there for business solar?',
					answer:
						'Commercial projects may use business lending, cash or a mix, depending on the company. Green home-loan products are for eligible household customers, not a substitute for business advice. Review current lender terms with your accountant or adviser.',
				},
				rural: {
					question: 'What finance options are there for farm solar?',
					answer:
						'Farms and lifestyle blocks may use a green home-loan top-up if they qualify or rural and business lending. Products and criteria differ. Check current lender terms and get independent advice before you commit.',
				},
			}),
			faq({
				all: {
					question: 'Is solar a household cost or a business decision?',
					answer:
						'It depends on the property. Homes often look at bill savings and lending. Businesses and farms often weigh daytime load, cashflow and tax treatment. We supply the generation and usage model. Your accountant or adviser should confirm how to fund it.',
				},
				residential: {
					question: 'Should I pay cash or use the mortgage?',
					answer:
						'That is a household finance decision. Some people use savings, others a green home-loan top-up if they qualify. We supply the system numbers. A lender or adviser should confirm what is suitable for you.',
				},
				commercial: {
					question: 'Can a business treat solar as an operating or capital decision?',
					answer:
						'Many commercial projects are assessed against daytime load, tariff structure and cashflow rather than a household payback story. We supply the generation and usage model. Your accountant or adviser should confirm the tax and financing treatment that applies.',
				},
				rural: {
					question: 'Is farm solar a household cost or a business cost?',
					answer:
						'It depends how the property is structured. Lifestyle blocks may look like a home. Working farms often treat it against operating load and cashflow. We supply the generation model. Your accountant or adviser should confirm the treatment that applies.',
				},
			}),
			faq({
				all: {
					question: 'Does the electrical setup change with the property type?',
					answer:
						'Yes. Houses, businesses and farms have different switchboards, phases, cable runs and loads. We survey those constraints first so inverter choice, mounting and electrical work match the site, not a single template.',
				},
				residential: {
					question: 'Will the house need switchboard work?',
					answer:
						'Often some electrical work is needed: space, protection, metering or a board that is due for an upgrade. We inspect that before the proposal so the price reflects the house, not a best-case board.',
				},
				commercial: {
					question: 'Does a business site need a different electrical setup?',
					answer:
						'Often, yes. Three-phase supply, larger boards, export limits and after-hours isolation are common. We survey those constraints first so the inverter and electrical work match the site, not a house template.',
				},
				rural: {
					question: 'Does rural solar need a different electrical setup?',
					answer:
						'Farms and lifestyle blocks often have longer cable runs, multiple sheds, pumps or three-phase supply. We survey those constraints first so inverter choice, mounting and switchboard work match the property, not a suburban template.',
				},
			}),
			faq({
				all: {
					question: 'Are there hidden costs?',
					answer:
						'Our proposal states what is included, any assumptions and any known work outside scope. If site conditions reveal a required change, we discuss it before additional work proceeds.',
				},
				residential: {
					question: 'Are there hidden costs on a home job?',
					answer:
						'The proposal states what is included, assumptions and any known extras such as switchboard work or access. If the roof or board reveals a required change, we discuss it before extra work proceeds.',
				},
				commercial: {
					question: 'Are there hidden costs on a commercial job?',
					answer:
						'The proposal states inclusions, assumptions and known extras such as network upgrades or after-hours work. If the roof, board or export limit forces a change, we discuss it before extra work proceeds.',
				},
				rural: {
					question: 'Are there hidden costs on a farm job?',
					answer:
						'The proposal states inclusions, assumptions and known extras such as long cable runs or ground works. If the site forces a change, we discuss it before extra work proceeds.',
				},
			}),
			faq({
				all: {
					question: 'How do I compare finance with energy savings?',
					answer:
						'Compare repayments, fees and the post-promotional interest rate against conservative generation and usage assumptions. We can supply the technical inputs. A lender or adviser should confirm what finance is suitable for you.',
				},
				residential: {
					question: 'How do I compare a home loan with the power bill savings?',
					answer:
						'Compare repayments, fees and the rate after any promotional period against a conservative model of how the house uses power. We supply the generation numbers. A lender or adviser should confirm the finance.',
				},
				commercial: {
					question: 'How does the business compare finance with energy savings?',
					answer:
						'Compare repayments, fees and interest against conservative generation and the site load, including operating hours. We supply the technical inputs. Your accountant or adviser should confirm what finance fits the business.',
				},
				rural: {
					question: 'How do I compare farm lending with energy savings?',
					answer:
						'Compare repayments, fees and interest against a conservative model of seasonal farm load, not a suburban bill. We supply the generation numbers. A lender or adviser should confirm the finance.',
				},
			}),
		],
	},
	{
		id: 'care',
		label: 'Care & warranty',
		items: [
			faq({
				all: {
					question: 'What maintenance does a solar system need?',
					answer:
						'Good systems are low maintenance, not no maintenance. Monitoring, visual checks, safe cleaning when needed and periodic electrical inspection help catch shading, damage or performance changes early.',
				},
				residential: {
					question: 'What maintenance does a home system need?',
					answer:
						'A house system is low maintenance, not no maintenance. Watch the app, glance at the roof, clean safely if it needs it and book an electrical check if output drops or something looks wrong.',
				},
				commercial: {
					question: 'What maintenance does a commercial system need?',
					answer:
						'Business arrays still need monitoring, visual checks, safe cleaning and periodic electrical inspection. Catching shading, soiling or a failing inverter early protects output and the warranty position.',
				},
				rural: {
					question: 'What maintenance does a farm system need?',
					answer:
						'Farm systems still need monitoring, visual checks and periodic inspection. Dust, birds, stock and machinery are extra wear. Catching damage or a drop in output early matters more when the array is out on the property.',
				},
			}),
			faq({
				all: {
					question: 'Do you service systems installed by someone else?',
					answer:
						'Yes. We can assess, maintain and repair many systems regardless of who installed them, subject to safe access and component availability.',
				},
				residential: {
					question: 'Do you service a house system someone else installed?',
					answer:
						'Yes. We can assess, maintain and repair many home systems regardless of who put them up, subject to safe roof access and parts still being available.',
				},
				commercial: {
					question: 'Do you service a business system someone else installed?',
					answer:
						'Yes. We can assess, maintain and repair many commercial systems regardless of who installed them, subject to safe access, shutdown windows and component availability.',
				},
				rural: {
					question: 'Do you service a farm system someone else installed?',
					answer:
						'Yes. We can assess, maintain and repair many farm and lifestyle-block systems regardless of who installed them, subject to safe access and parts still being available.',
				},
			}),
			faq({
				all: {
					question: 'What warranties are included?',
					answer:
						'Warranty terms depend on the exact panels, inverter, battery and workmanship in your proposal. Current Energy Point packages may include long product warranties, but the signed proposal and manufacturer documents are the source of truth.',
				},
				residential: {
					question: 'What warranties come with a home system?',
					answer:
						'Terms depend on the panels, inverter, battery and workmanship in your proposal. Current packages may include long product warranties. The signed proposal and manufacturer documents are the source of truth for the house.',
				},
				commercial: {
					question: 'What warranties come with a commercial system?',
					answer:
						'Terms depend on the panels, inverters, any battery and workmanship in the proposal. Commercial layouts can use different products to a house. The signed proposal and manufacturer documents are the source of truth.',
				},
				rural: {
					question: 'What warranties come with a farm system?',
					answer:
						'Terms depend on the panels, inverter, any battery and workmanship in the proposal. Ground-mounted and shed systems can differ from a house package. The signed proposal and manufacturer documents are the source of truth.',
				},
			}),
			faq({
				all: {
					question: 'How do I monitor performance?',
					answer:
						'Most modern systems include an app or web portal showing generation and system status. We set it up at handover and can investigate alerts or unexplained drops in output.',
				},
				residential: {
					question: 'How do I monitor the house system?',
					answer:
						'Most home systems include an app showing generation and status. We set it up at handover. If the numbers drop or an alert appears, call us and we will look into it.',
				},
				commercial: {
					question: 'How does the business monitor performance?',
					answer:
						'Most commercial systems include a portal showing generation, status and often multiple inverters. We set it up at handover and can investigate alerts or an unexplained drop in site output.',
				},
				rural: {
					question: 'How do I monitor a farm system?',
					answer:
						'Most farm systems include an app or portal showing generation and status, including arrays that sit away from the house. We set it up at handover and can investigate alerts or a drop in output.',
				},
			}),
			faq({
				all: {
					question: 'What if a storm damages the system?',
					answer:
						'Make the site safe, contact your insurer and call us. We can inspect the system, isolate damaged equipment where required and provide information for repair planning. Cover depends on your policy and product warranty terms.',
				},
				residential: {
					question: 'What if a storm damages the house system?',
					answer:
						'Keep clear of damaged equipment, contact your insurer and call us. We can inspect the roof array, isolate it if needed and help plan the repair. Cover depends on your policy and product warranties.',
				},
				commercial: {
					question: 'What if a storm damages the business system?',
					answer:
						'Make the site safe, contact the insurer and call us. We can inspect, isolate damaged equipment and support repair planning around operations. Cover depends on the policy and product warranties.',
				},
				rural: {
					question: 'What if a storm damages the farm system?',
					answer:
						'Make the area safe, contact the insurer and call us. We can inspect sheds or ground arrays, isolate damaged equipment and help plan the repair around farm work. Cover depends on your policy and product warranties.',
				},
			}),
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
