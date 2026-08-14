# Energy Point

Cinematic multi-page marketing site for Energy Point, built with Astro and deployed on
Cloudflare Pages (`solar.florul.com`).

## Local development

1. Run `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:4321`.

Use `npm run check` for Astro/TypeScript diagnostics, `npm run build` for the production build,
and `npm test` for Playwright route and interaction smoke tests.

To exercise the contact API locally: `npm run preview:cf` (Wrangler Pages + Functions).

## Content

Shared business details, FAQs, finance products and repeated content live in `src/data`. Review
`CONTENT_REVIEW.md` before production launch; it records claims and permissions that require owner
confirmation.

## Deploy

Pushes to `main` auto-deploy via GitHub Actions (`.github/workflows/deploy-pages.yml`) to the
Cloudflare Pages project `energypoint`.

Required GitHub repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`: create at https://dash.cloudflare.com/profile/api-tokens with
  **Account → Cloudflare Pages → Edit** and **Account → Workers R2 Storage → Edit**

Required Cloudflare Pages env vars (for the contact form):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (optional, defaults to `sales@energypoint.nz`)
- `CONTACT_FROM_EMAIL` (optional; must be a verified Resend sender)
- `PUBLIC_ADDRESSFINDER_KEY` (optional NZ AddressFinder licence key; demo key used if unset)
- `R2_PUBLIC_BASE_URL` (optional public base URL for enquiry photos; email includes object keys if unset)

Enquiry photos upload to the R2 bucket `energypoint-enquiry-photos` (binding `ENQUIRY_PHOTOS` in `wrangler.toml`). Create it once, then apply the 30-day deletion policy:

```bash
npx wrangler r2 bucket create energypoint-enquiry-photos --profile=florul
npm run r2:lifecycle
```

The GitHub deploy workflow reapplies `r2-lifecycle.json` on each production deploy. The API token needs **Account → Workers R2 Storage → Edit** in addition to Pages Edit.

Manual deploy:

```bash
npm run deploy
```
