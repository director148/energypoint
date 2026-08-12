/** Shared contact-form validation for Cloudflare Pages Functions. */

export const LIMITS = {
	name: 80,
	phone: 20,
	email: 150,
	location: 80,
	address: 120,
	message: 1000,
	subject: 120,
};

const SAFE_TEXT = /^[\p{L}\p{N}\s.,'’/#&\-()+@:+]+$/u;
const NAME = /^[\p{L}][\p{L}\s'’-]{0,78}$/u;
const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const LOCATION = /^[\p{L}\p{N}\s.,'’\-]{2,80}$/u;
const ADDRESS = /^[\p{L}\p{N}\s.,'’/#&\-]{5,120}$/u;

export function cleanPhone(value) {
	return String(value || '').replace(/[\s().-]/g, '');
}

export function isValidPhone(value) {
	const cleaned = cleanPhone(value);
	if (/^\+[1-9]\d{7,14}$/.test(cleaned)) return true;
	if (/^0\d{7,10}$/.test(cleaned)) return true;
	if (/^[1-9]\d{7,14}$/.test(cleaned)) return true;
	return false;
}

export function titleCaseName(value) {
	return String(value || '')
		.trim()
		.replace(/\s+/g, ' ')
		.replace(/[^\p{L}\s'’-]/gu, '')
		.replace(/(^|[\s'’-])(\p{L})/gu, (_, edge, letter) => edge + letter.toUpperCase());
}

export function validateContactFields(raw) {
	const errors = {};
	const values = {
		audience: String(raw.audience || '').trim(),
		goal: String(raw.goal || '').trim(),
		name: titleCaseName(raw.name),
		phone: String(raw.phone || '').trim(),
		email: String(raw.email || '').trim().toLowerCase(),
		location: String(raw.location || '').trim().replace(/\s+/g, ' '),
		address: String(raw.address || '').trim().replace(/\s+/g, ' '),
		message: String(raw.message || '').trim().replace(/\s+/g, ' '),
		subject: String(raw.subject || '').trim(),
	};

	const audiences = new Set(['Residential', 'Commercial', 'Rural']);
	const goals = new Set([
		'Reduce electricity costs',
		'Add energy resilience',
		'Plan a new build',
		'Battery or EV readiness',
		'Maintenance or servicing',
		'Not sure yet',
	]);

	if (!audiences.has(values.audience)) errors.audience = 'Choose a property type.';
	if (!goals.has(values.goal)) errors.goal = 'Choose a main goal.';

	if (!values.name || values.name.length < 2) errors.name = 'Enter your name.';
	else if (values.name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
	else if (!NAME.test(values.name)) errors.name = 'Use letters, spaces, hyphens or apostrophes only.';

	if (!values.phone) errors.phone = 'Enter a phone number.';
	else if (values.phone.length > LIMITS.phone) errors.phone = `Phone must be ${LIMITS.phone} characters or fewer.`;
	else if (!isValidPhone(values.phone)) {
		errors.phone = 'Use a NZ number (e.g. 021 123 4567) or international format (+64...).';
	}

	if (!values.email) errors.email = 'Enter an email address.';
	else if (values.email.length > LIMITS.email) {
		errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
	} else if (!EMAIL.test(values.email)) errors.email = 'Enter a valid email address.';

	if (!values.location) errors.location = 'Enter a town or postcode.';
	else if (!LOCATION.test(values.location)) {
		errors.location = 'Use letters, numbers, spaces or hyphens only.';
	}

	if (values.address) {
		if (values.address.length > LIMITS.address) {
			errors.address = `Address must be ${LIMITS.address} characters or fewer.`;
		} else if (!ADDRESS.test(values.address)) {
			errors.address = 'Use a normal street address without special symbols.';
		}
	}

	if (!values.message || values.message.length < 10) {
		errors.message = 'Tell us a little more (at least 10 characters).';
	} else if (values.message.length > LIMITS.message) {
		errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
	} else if (!SAFE_TEXT.test(values.message)) {
		errors.message = 'Remove unusual symbols from your message.';
	}

	if (values.subject && (values.subject.length > LIMITS.subject || !SAFE_TEXT.test(values.subject))) {
		errors.subject = 'Subject looks invalid.';
	}

	return { values, errors, ok: Object.keys(errors).length === 0 };
}
