/**
 * Cloudflare Pages Function: contact enquiry handler.
 * Env (Pages project → Settings → Variables):
 *   RESEND_API_KEY       required
 *   CONTACT_TO_EMAIL     optional (default sales@energypoint.nz)
 *   CONTACT_FROM_EMAIL   optional (verified Resend sender)
 */

import { validateContactFields } from '../_shared/contact-validation.js';

export async function onRequestPost(context) {
	const thankYou = new URL('/thank-you/', context.request.url).toString();

	let formData;
	try {
		formData = await context.request.formData();
	} catch {
		return new Response('Invalid form data.', { status: 400 });
	}

	// Honeypot: treat as success so bots get no signal.
	if (String(formData.get('bot-field') || '').trim()) {
		return Response.redirect(thankYou, 303);
	}

	const { values, errors, ok } = validateContactFields({
		audience: formData.get('audience'),
		goal: formData.get('goal'),
		name: formData.get('name'),
		phone: formData.get('phone'),
		email: formData.get('email'),
		location: formData.get('location'),
		address: formData.get('address'),
		message: formData.get('message'),
		subject: formData.get('subject'),
	});

	if (!ok) {
		const first = Object.values(errors)[0] || 'Please check the form and try again.';
		return new Response(first, { status: 400 });
	}

	const apiKey = context.env.RESEND_API_KEY;
	if (!apiKey) {
		return new Response('Enquiry delivery is not configured yet.', { status: 503 });
	}

	const to = context.env.CONTACT_TO_EMAIL || 'sales@energypoint.nz';
	const from =
		context.env.CONTACT_FROM_EMAIL || 'Energy Point Website <onboarding@resend.dev>';
	const subject = values.subject || 'New Energy Point consultation enquiry';

	const text = [
		`Audience: ${values.audience}`,
		`Goal: ${values.goal}`,
		`Name: ${values.name}`,
		`Phone: ${values.phone}`,
		`Email: ${values.email}`,
		`Location: ${values.location}`,
		values.address ? `Address: ${values.address}` : null,
		'',
		values.message,
	]
		.filter((line) => line !== null)
		.join('\n');

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from,
			to: [to],
			reply_to: values.email,
			subject: `${subject} (${values.audience})`,
			text,
		}),
	});

	if (!res.ok) {
		console.error('Resend error', await res.text());
		return new Response(
			'Could not send enquiry. Please call or email us directly.',
			{ status: 502 },
		);
	}

	return Response.redirect(thankYou, 303);
}
