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
  **Account → Cloudflare Pages → Edit**

Required Cloudflare Pages env vars (for the contact form):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (optional, defaults to `sales@energypoint.nz`)
- `CONTACT_FROM_EMAIL` (optional; must be a verified Resend sender)

Manual deploy:

```bash
npm run deploy
```
