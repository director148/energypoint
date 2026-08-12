# Energy Point

Cinematic multi-page marketing site for Energy Point, built with Astro and deployed on Netlify.

## Local development

1. Run `npm install`.
2. Run `npm run dev`.
3. Open `http://localhost:4321`.

Use `npm run check` for Astro/TypeScript diagnostics, `npm run build` for the production build,
and `npm test` for Playwright route and interaction smoke tests.

## Content

Shared business details, FAQs, finance products and repeated content live in `src/data`. Review
`CONTENT_REVIEW.md` before production launch; it records claims and permissions that require owner
confirmation.

## Netlify

The site is fully static. Netlify builds `dist` using `npm run build`. The contact page uses a
build-detected form named `energy-plan`; enable form detection and configure submission
notifications in the Netlify project UI.
