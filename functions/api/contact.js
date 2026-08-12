/**
 * Cloudflare Pages Function — contact enquiry handler.
 * Env (Pages project → Settings → Variables):
 *   RESEND_API_KEY       required
 *   CONTACT_TO_EMAIL     optional (default sales@energypoint.nz)
 *   CONTACT_FROM_EMAIL   optional (verified Resend sender)
 */

const REQUIRED = ['audience', 'goal', 'name', 'phone', 'email', 'location', 'message'];

export async function onRequestPost(context) {
	const thankYou = new URL('/thank-you/', context.request.url).toString();

	let formData;
	try {
		formData = await context.request.formData();
	} catch {
		return new Response('Invalid form data.', { status: 400 });
	}

	// Honeypot — treat as success so bots get no signal.
	if (String(formData.get('bot-field') || '').trim()) {
		return Response.redirect(thankYou, 303);
	}

	const values = Object.fromEntries(
		REQUIRED.map((key) => [key, String(formData.get(key) || '').trim()]),
	);

	if (REQUIRED.some((key) => !values[key])) {
		return new Response('Please complete all required fields.', { status: 400 });
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		return new Response('Please provide a valid email address.', { status: 400 });
	}

	const apiKey = context.env.RESEND_API_KEY;
	if (!apiKey) {
		return new Response('Enquiry delivery is not configured yet.', { status: 503 });
	}

	const to = context.env.CONTACT_TO_EMAIL || 'sales@energypoint.nz';
	const from =
		context.env.CONTACT_FROM_EMAIL || 'Energy Point Website <onboarding@resend.dev>';
	const address = String(formData.get('address') || '').trim();
	const subject = String(
		formData.get('subject') || 'New Energy Point consultation enquiry',
	).trim();

	const text = [
		`Audience: ${values.audience}`,
		`Goal: ${values.goal}`,
		`Name: ${values.name}`,
		`Phone: ${values.phone}`,
		`Email: ${values.email}`,
		`Location: ${values.location}`,
		address ? `Address: ${address}` : null,
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
