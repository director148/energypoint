# Energy Point

Cinematic multi-page marketing site for Energy Point, built with Astro and deployed on
Cloudflare Pages (`solar.florul.com`).

## Local development

1. Run `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:4321`.

Use `npm run check` for Astro/TypeScript diagnostics, `npm run build` for the production build,
and `npm test` for Playwright route and interaction smoke tests.

To send real enquiry emails locally, add `RESEND_API_KEY` to `.dev.vars` and run `npm run preview:cf`. Without that key, `astro dev` still accepts a valid form and opens the thank-you page.

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

Site images live in the public R2 bucket `energy-point` (binding `MEDIA`). Pages serve them at `/images/*`. Contact-form photos and documents live in the private bucket `energypoint-enquiry-photos` (binding `ENQUIRY_PHOTOS`) and expire after 30 days. Do not enable a public r2.dev URL or custom domain on the enquiry bucket. Leave `R2_PUBLIC_BASE_URL` unset.

Create the buckets once, upload site images and apply the enquiry lifecycle:

```bash
npx wrangler r2 bucket create energy-point --location oc --profile=florul
npx wrangler r2 bucket create energypoint-enquiry-photos --profile=florul
npm run r2:sync
npm run r2:lifecycle
```

The GitHub deploy workflow syncs `public/images` to `energy-point`, deploys Pages without bundling those files and reapplies `r2-lifecycle.json` on the enquiry bucket. The API token needs **Account → Workers R2 Storage → Edit** in addition to Pages Edit.

Manual deploy:

```bash
npm run deploy
```
