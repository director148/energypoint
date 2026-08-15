# Energy Point launch content review

The rebuild intentionally avoids inventing project counts, savings figures or case studies. Before
production launch, the site owner should confirm the following migrated business content.

## Approval required

- Permission to reuse the current Energy Point logo and photography copied from `energypoint.nz`.
- Customer names, locations, wording and permission for the four migrated testimonials.
- The exact product and workmanship warranties offered with every current system package.
- The official Instagram profile URL.
- Whether Energy Point is currently a member of any industry association that should be shown.
- Names, roles and photography on the People page (Nick Davies, Sam Andersen, crew photos). Confirm wording and that job photos may sit next to named bios.
- Replace the commercial hero if a tighter or higher-resolution business install becomes available. The current crop is the after frame from the before/after collage.

## Time-sensitive information

- Finance content was reviewed on 12 August 2026. Recheck every lender link, rate, limit,
  promotional period and eligibility condition before launch and on a recurring schedule.
- New Zealand had no active nationwide residential rooftop-solar rebate at the review date.
  Election proposals must not be presented as available government support.
- Any future savings claim must be supported by a clearly defined usage profile, tariff, export
  rate, system design and modelling method.

## Legal pages

- Confirm the registered legal name, NZBN and postal address if those should appear on
  the privacy policy. The pages currently use the trading name Energy Point and the
  public phone and email only.
- Have a lawyer review privacy, terms, cookies and disclaimer before launch if formal
  sign-off is required. The copy matches how this site actually works (contact form,
  Resend, Cloudflare photo storage, OpenStreetMap address search, no analytics cookies).
- If analytics or advertising cookies are added later, update the cookie policy and
  privacy policy before those tools go live.

## Form launch checklist

- Create a [Resend](https://resend.com) API key and add `RESEND_API_KEY` to the Cloudflare Pages
  project (Settings → Variables and Secrets).
- Optionally set `CONTACT_TO_EMAIL` (default `sales@energypoint.nz`) and a verified
  `CONTACT_FROM_EMAIL`.
- Submit a real test enquiry from the deployed site and confirm the email arrives.
