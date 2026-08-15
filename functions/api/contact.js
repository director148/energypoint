/**
 * Cloudflare Pages Function: contact enquiry handler.
 * Env (Pages project → Settings → Variables):
 *   RESEND_API_KEY       required
 *   CONTACT_TO_EMAIL     optional (default director@florul.co.uk while testing)
 *   CONTACT_FROM_EMAIL   optional (verified Resend sender)
 *   R2_PUBLIC_BASE_URL   leave unset: enquiry bucket is private
 * R2 binding: ENQUIRY_PHOTOS (bucket energypoint-enquiry-photos)
 */

import { validateContactFields } from '../_shared/contact-validation.js';
import {
	customerConfirmationEmail,
	officeEnquiryEmail,
} from '../_shared/enquiry-emails.js';
import { storeEnquiryUploads } from '../_shared/enquiry-photos.js';

function isLocalRequest(request) {
	try {
		const host = new URL(request.url).hostname;
		return host === 'localhost' || host === '127.0.0.1' || host === '::1';
	} catch {
		return false;
	}
}

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
		preferredTime: formData.get('preferredTime'),
		authority: formData.get('authority'),
		monthlyBill: formData.get('monthlyBill'),
		firstName: formData.get('firstName'),
		lastName: formData.get('lastName'),
		name: formData.get('name'),
		phone: formData.get('phone'),
		email: formData.get('email'),
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
		if (isLocalRequest(context.request)) {
			return Response.redirect(thankYou, 303);
		}
		console.error('RESEND_API_KEY is not set');
		return new Response('Could not send enquiry. Please try again.', { status: 503 });
	}

	const to = context.env.CONTACT_TO_EMAIL || 'director@florul.co.uk';
	const from =
		context.env.CONTACT_FROM_EMAIL || 'Energy Point Website <onboarding@resend.dev>';

	const incoming = [
		...formData.getAll('uploads'),
		...formData.getAll('photos'),
		formData.get('bill'),
		formData.get('usage'),
	].filter((file) => file instanceof File && file.size);

	let uploadLines = [];
	let attachments = [];
	try {
		const stored = await storeEnquiryUploads(context.env, incoming);
		attachments = stored.attachments;
		uploadLines = stored.names.length
			? ['', 'Uploads attached:', ...stored.names.map((name) => `- ${name}`)]
			: ['', 'Uploads: none.'];
	} catch (error) {
		console.error('R2 upload store error', error);
		if (error instanceof Error && error.message === 'UPLOAD_TOO_LARGE') {
			return new Response(
				'A file was too large to store. Try a smaller photo, bill or usage file.',
				{ status: 400 },
			);
		}
		uploadLines = ['', 'Uploads: could not be stored.'];
	}

	const officeMail = officeEnquiryEmail({ values, uploadLines });
	const customerMail = customerConfirmationEmail({
		firstName: values.firstName,
		audience: values.audience,
	});

	const sendEmail = (payload) =>
		fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

	const res = await sendEmail({
		from,
		to: [to],
		reply_to: values.email,
		subject: officeMail.subject,
		text: officeMail.text,
		html: officeMail.html,
		attachments: attachments.length ? attachments : undefined,
	});

	if (!res.ok) {
		console.error('Resend error', await res.text());
		return new Response(
			'Could not send enquiry. Please call or email us directly.',
			{ status: 502 },
		);
	}

	const confirm = await sendEmail({
		from,
		to: [values.email],
		reply_to: to,
		subject: customerMail.subject,
		text: customerMail.text,
		html: customerMail.html,
	});

	if (!confirm.ok) {
		console.error('Resend confirmation error', await confirm.text());
	}

	return Response.redirect(thankYou, 303);
}
