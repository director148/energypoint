/** Shared contact-form validation for Cloudflare Pages Functions. */

export const LIMITS = {
	firstName: 20,
	lastName: 20,
	phone: 32,
	email: 150,
	address: 120,
	message: 1000,
	subject: 120,
	monthlyBill: 5,
};

const SAFE_TEXT = /^[\p{L}\p{N}\s.,'’/#&\-()+@:+]+$/u;
const NAME_PART = /^\p{L}[\p{L}\-]{0,19}$/u;
const EMAIL =
	/^[a-z0-9](?:[a-z0-9._%+-]{0,62}[a-z0-9])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/;
const ADDRESS = /^[\p{L}\p{N}\s.,'’/#&\-]{5,120}$/u;

export function sanitisePhone(value) {
	return String(value || '')
		.replace(/[^\d+()-]/g, '')
		.replace(/(?!^)\+/g, '')
		.slice(0, 32);
}

export function cleanPhone(value) {
	let digits = sanitisePhone(value).replace(/[^\d+]/g, '');

	if (digits.startsWith('0064')) digits = `+64${digits.slice(4)}`;
	if (digits.startsWith('64') && digits.length >= 10) digits = `+${digits}`;
	if (digits.startsWith('+64')) digits = `0${digits.slice(3)}`;

	return digits.replace(/\D/g, '');
}

export function isValidPhone(value) {
	const raw = sanitisePhone(value).replace(/[^\d+]/g, '');
	const digits = raw.replace(/\D/g, '');
	if (digits.length > (raw.startsWith('00') ? 17 : 15)) return false;
	if (/^\+[1-9]\d{7,14}$/.test(raw) || /^00[1-9]\d{7,14}$/.test(raw)) return true;

	const local = cleanPhone(value);
	return (
		/^02\d{7,9}$/.test(local) ||
		/^0[34679]\d{7}$/.test(local) ||
		/^0800\d{6,7}$/.test(local) ||
		/^0508\d{6}$/.test(local)
	);
}

export function sanitiseName(value) {
	const cleaned = String(value || '')
		.normalize('NFKC')
		.replace(/[^\p{L}-]/gu, '')
		.replace(/-{2,}/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 20);

	if (!cleaned) return '';

	return cleaned
		.toLowerCase()
		.replace(/(^|-)(\p{L})/gu, (_, edge, letter) => edge + letter.toUpperCase());
}

export function titleCaseName(value) {
	return sanitiseName(value);
}

export function sanitiseEmail(value) {
	return String(value || '')
		.normalize('NFKC')
		.replace(/\s+/g, '')
		.replace(/[^A-Za-z0-9.@_%+-]/g, '')
		.toLowerCase()
		.slice(0, 150);
}

export function isValidEmail(value) {
	const email = sanitiseEmail(value);
	if (!email || email.length > 150) return false;
	if (email.includes('..')) return false;
	if ((email.match(/@/g) || []).length !== 1) return false;
	return EMAIL.test(email) && /\.[a-z]{2,}$/.test(email);
}

export function validateContactFields(raw) {
	const errors = {};
	const values = {
		audience: String(raw.audience || '').trim(),
		goal: String(raw.goal || '').trim(),
		firstName: sanitiseName(raw.firstName || String(raw.name || '').split(/\s+/)[0] || ''),
		lastName: sanitiseName(
			raw.lastName || String(raw.name || '').split(/\s+/).slice(1).join(' ') || '',
		),
		phone: sanitisePhone(raw.phone),
		email: sanitiseEmail(raw.email),
		address: String(raw.address || '').trim().replace(/\s+/g, ' '),
		message: String(raw.message || '').trim().replace(/\s+/g, ' '),
		subject: String(raw.subject || '').trim(),
		preferredTime: String(raw.preferredTime || '').trim(),
		authority: String(raw.authority || '').trim(),
		monthlyBill: String(raw.monthlyBill || '').replace(/\D/g, '').slice(0, LIMITS.monthlyBill),
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
	const preferredTimes = new Set(['Morning', 'Afternoon', 'Either']);
	const authorities = new Set([
		'I own the property',
		'I act for the owner',
		'This is a business',
		'I am exploring',
	]);

	if (!audiences.has(values.audience)) errors.audience = 'Choose a property type.';
	if (!goals.has(values.goal)) errors.goal = 'Choose a main goal.';
	if (!preferredTimes.has(values.preferredTime)) errors.preferredTime = 'Choose a time that suits.';
	if (!authorities.has(values.authority)) errors.authority = 'Tell us your role.';
	if (values.monthlyBill && Number(values.monthlyBill) > 10 ** LIMITS.monthlyBill - 1) {
		errors.monthlyBill = 'Enter a typical monthly amount or leave this blank.';
	}

	values.name = [values.firstName, values.lastName].filter(Boolean).join(' ');

	if (!values.firstName || values.firstName.length < 2) errors.firstName = 'Enter your first name.';
	else if (values.firstName.length > LIMITS.firstName) {
		errors.firstName = `First name must be ${LIMITS.firstName} characters or fewer.`;
	} else if (!NAME_PART.test(values.firstName)) {
		errors.firstName = 'Use letters only.';
	}

	if (!values.lastName || values.lastName.length < 2) errors.lastName = 'Enter your last name.';
	else if (values.lastName.length > LIMITS.lastName) {
		errors.lastName = `Last name must be ${LIMITS.lastName} characters or fewer.`;
	} else if (!NAME_PART.test(values.lastName)) {
		errors.lastName = 'Use letters only.';
	}

	if (!values.phone) errors.phone = 'Enter a phone number.';
	else if (values.phone.length > LIMITS.phone) errors.phone = `Phone must be ${LIMITS.phone} characters or fewer.`;
	else if (!isValidPhone(values.phone)) {
		errors.phone = 'Enter a local or international number, such as 021 123 4567 or +61 412 345 678.';
	}

	if (!values.email) errors.email = 'Enter an email address.';
	else if (values.email.length > LIMITS.email) {
		errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
	} else if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.';

	if (!values.address) errors.address = 'Enter the property address.';
	else if (values.address.length > LIMITS.address) {
		errors.address = `Address must be ${LIMITS.address} characters or fewer.`;
	} else if (!ADDRESS.test(values.address)) {
		errors.address = 'Use a normal street address without special symbols.';
	}

	if (values.message) {
		if (values.message.length < 10) {
			errors.message = 'Tell us a little more (at least 10 characters) or leave this blank.';
		} else if (values.message.length > LIMITS.message) {
			errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
		} else if (!SAFE_TEXT.test(values.message)) {
			errors.message = 'Remove unusual symbols from your message.';
		}
	}

	if (values.subject && (values.subject.length > LIMITS.subject || !SAFE_TEXT.test(values.subject))) {
		errors.subject = 'Subject looks invalid.';
	}

	return { values, errors, ok: Object.keys(errors).length === 0 };
}
