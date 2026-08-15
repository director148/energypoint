const INK = '#10130f';
const CREAM = '#f3f0e7';
const PAPER = '#fbfaf6';
const MUTED = '#5f675e';
const MOSS = '#5f703c';

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

const SITE_URL = 'https://solar.florul.com';

const HERO_STRIPS = {
	Residential: {
		src: '/images/residential-hero.jpg',
		alt: 'A Waikato home with rooftop solar',
	},
	Commercial: {
		src: '/images/commercial-hero.jpg',
		alt: 'Solar supplying a commercial energy system',
	},
	Rural: {
		src: '/images/rural-hero.png',
		alt: 'Solar on a rural Waikato property',
	},
	Maintenance: {
		src: '/images/maintenance-hero.jpg',
		alt: 'An Energy Point maintenance visit',
	},
};

function wrapEmail({ preheader, inner, origin = SITE_URL, strip }) {
	const base = String(origin || SITE_URL).replace(/\/$/, '');
	const logo = `${base}/images/energy-point-logo-white-240.png`;
	const stripHtml = strip
		? `<tr>
<td style="padding:0;font-size:0;line-height:0;">
<img src="${escapeHtml(`${base}${strip.src}`)}" alt="${escapeHtml(strip.alt)}" width="560" height="168" style="display:block;width:100%;max-width:560px;height:168px;object-fit:cover;border:0;" />
</td>
</tr>`
		: '';

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light only" />
<title>Energy Point</title>
</head>
<body style="margin:0;padding:0;background:${CREAM};color:${INK};font-family:Avenir Next,Avenir,Helvetica Neue,Helvetica,Arial,sans-serif;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};">
<tr>
<td align="center" style="padding:32px 16px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:100%;max-width:560px;background:${PAPER};border:1px solid rgba(16,19,15,0.14);border-radius:12px;overflow:hidden;">
<tr>
<td style="background:${INK};padding:18px 24px;">
<table role="presentation" cellpadding="0" cellspacing="0">
<tr>
<td style="padding-right:14px;vertical-align:middle;">
<a href="https://energypoint.nz" style="text-decoration:none;border:0;">
<img src="${escapeHtml(logo)}" alt="Energy Point" width="52" height="32" style="display:block;border:0;outline:none;width:52px;height:auto;" />
</a>
</td>
<td style="vertical-align:middle;">
<p style="margin:0;color:${CREAM};font-family:Iowan Old Style,Palatino Linotype,Book Antiqua,Georgia,serif;font-size:22px;letter-spacing:0.02em;">Energy Point</p>
<p style="margin:6px 0 0;color:${CREAM};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.72;">Waikato solar and batteries</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="padding:28px;">
${inner}
</td>
</tr>
${stripHtml}
<tr>
<td style="padding:18px 28px 28px;color:${MUTED};font-size:13px;line-height:1.5;">
Energy Point · Waikato, New Zealand
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

export function customerConfirmationEmail({ firstName, audience, origin }) {
	const name = firstName || 'there';
	const propertyType = propertyTypeLabel(audience);
	const strip = HERO_STRIPS[propertyType] || {
		src: '/images/home-hero.jpg',
		alt: 'An Energy Point solar installation',
	};
	const text = [
		`Hi ${name},`,
		'',
		'Thanks for booking a visit with Energy Point. We have your enquiry and will call within one working day.',
		'',
		'Please reply to this email with your latest electric bill. A photo or PDF is fine. We can start without it if you do not have it yet.',
		'',
		'Energy Point',
		'0800 102 211',
	].join('\n');

	const html = wrapEmail({
		origin,
		strip,
		preheader: 'We have your enquiry. Reply with your latest electric bill if you can.',
		inner: `
<p style="margin:0 0 16px;font-family:Iowan Old Style,Palatino Linotype,Book Antiqua,Georgia,serif;font-size:26px;line-height:1.25;color:${INK};">Hi ${escapeHtml(name)},</p>
<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:${INK};">Thanks for booking a visit with Energy Point. We have your enquiry and will call within one working day.</p>
<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:${INK};">Please reply to this email with your latest electric bill. A photo or PDF is fine. We can start without it if you do not have it yet.</p>
<p style="margin:0;font-size:16px;line-height:1.65;color:${MOSS};">Energy Point<br /><a href="tel:+64800102211" style="color:${MOSS};text-decoration:none;">0800 102 211</a></p>
`,
	});

	return {
		subject: 'Energy Point | We have your solar enquiry',
		text,
		html,
	};
}

function propertyTypeLabel(audience) {
	const key = String(audience || '').trim().toLowerCase();
	const labels = {
		home: 'Residential',
		residential: 'Residential',
		commercial: 'Commercial',
		rural: 'Rural',
		maintenance: 'Maintenance',
	};
	return labels[key] || String(audience || '').trim();
}

function telHref(phone) {
	const raw = String(phone || '').replace(/[^\d+]/g, '');
	if (raw.startsWith('+')) return `tel:${raw}`;
	if (raw.startsWith('00')) return `tel:+${raw.slice(2)}`;
	if (raw.startsWith('0')) return `tel:+64${raw.slice(1)}`;
	return raw ? `tel:${raw}` : '';
}

function mapsHref(address) {
	const query = String(address || '').trim();
	if (!query) return '';
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function officeEnquiryEmail({ values, uploadLines, origin }) {
	const propertyType = propertyTypeLabel(values.audience);
	const rows = [
		['Name', values.name],
		['Phone', values.phone],
		['Email address', values.email],
		['Address', values.address],
		['Property type', propertyType],
		['Authority', values.authority],
		['Best time', values.preferredTime],
		['Monthly bill', values.monthlyBill ? `$${values.monthlyBill}` : 'Not given'],
		['Goal', values.goal],
		['Notes', values.message || '(No extra note.)'],
	];

	const text = [...rows.map(([label, value]) => `${label}: ${value}`), ...uploadLines].join('\n');

	const detailRows = rows
		.map(([label, value]) => {
			const safe = escapeHtml(value);
			const href =
				label === 'Phone'
					? telHref(value)
					: label === 'Address'
						? mapsHref(value)
						: label === 'Email address'
							? `mailto:${value}`
							: '';
			const display = href
				? `<a href="${escapeHtml(href)}" style="color:${INK};text-decoration:none;">${safe}</a>`
				: safe;
			return `
<tr>
<td style="padding:8px 0;border-bottom:1px solid rgba(16,19,15,0.12);color:${MUTED};font-size:13px;width:38%;">${escapeHtml(label)}</td>
<td style="padding:8px 0;border-bottom:1px solid rgba(16,19,15,0.12);color:${INK};font-size:15px;">${display}</td>
</tr>`;
		})
		.join('');

	const uploads = uploadLines
		.filter((line) => line)
		.map((line) => escapeHtml(line).replace(/^- /, ''))
		.join('<br />');

	const html = wrapEmail({
		origin,
		preheader: `New enquiry from ${values.name || 'the website'}`,
		inner: `
<p style="margin:0 0 18px;font-family:Iowan Old Style,Palatino Linotype,Book Antiqua,Georgia,serif;font-size:24px;line-height:1.25;color:${INK};">New consultation enquiry</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows}</table>
<p style="margin:20px 0 0;font-size:13px;line-height:1.55;color:${MUTED};">${uploads}</p>
`,
	});

	return {
		subject: `${values.name} | New solar enquiry (${propertyType})`,
		text,
		html,
	};
}

export function previewEnquiryEmails(origin) {
	const sample = {
		audience: 'Residential',
		goal: 'Lower power bills',
		preferredTime: 'Morning',
		authority: 'I own the property',
		monthlyBill: '280',
		name: 'Alex Taylor',
		firstName: 'Alex',
		phone: '021 000 0000',
		email: 'alex@example.com',
		address: '12 Sample Street, Hamilton',
		message: 'Roof is north facing. Happy to start with a visit.',
	};

	return {
		customer: customerConfirmationEmail({
			firstName: sample.firstName,
			audience: sample.audience,
			origin,
		}),
		office: officeEnquiryEmail({
			values: sample,
			uploadLines: ['', 'Uploads attached:', '- roof.jpg'],
			origin,
		}),
	};
}
