# Breinrock — Marketing Website

Next.js marketing site for [Breinrock](https://www.breinrock.com): product pages, blog, legal policies, Google Ads landing pages, and lead capture. Sanity CMS powers blog posts and jurisdiction-specific policies. The Sanity Studio lives in a **separate repo/folder** (`../studio`).

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Sanity** (`next-sanity`) for blog + policies
- **TypeScript** (strict)

## Monorepo layout

```txt
BREINROCKNEXTJS/
  breinrock/     ← this site (Next.js)
  studio/        ← Sanity Studio (separate deployment)
```

## Getting started

```bash
cd breinrock
npm install
cp .env.example .env.local   # fill in secrets — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env.local`. Key values:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_*` | Sanity project connection |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (e.g. `https://www.breinrock.com`) |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads tag (site-wide) |
| `NEXT_PUBLIC_GA4_ID` | GA4 (selected pages only) |
| `WEB3FORMS_ACCESS_KEY` | Server-only — contact + demo form email delivery |
| `MAKE_DEMO_WEBHOOK` / `MAKE_WELCOME_WEBHOOK` | Server-only — Make.com lead capture |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA site key (public) |
| `RECAPTCHA_SECRET_KEY` | Optional server-side reCAPTCHA verification |
| `MAILCHIMP_*` | Newsletter embedded forms (see `.env.example`) |
| `CURATOR_API_KEY` / `CURATOR_FEED_ID` | LinkedIn feed on `/blog` (server-side) |

See also `TRACKING-AND-WEBHOOKS-GUIDE.md` for analytics and conversion events.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build (static + ISR routes) |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Project structure

```txt
src/
  app/                    App Router pages
    (landing)/[slug]/     Google Ads landings at /{slug} (no /landing prefix)
    blog/[slug]/
    policies/[country]/[slug]/
    products/...
  components/
    layout/               Navbar, Footer, LandingNavbar
    sections/             Reusable page sections
    landing/              Demo popup + landing shell
    ui/                   Buttons, Reveal, etc.
  data/                   Static content + landing page copy
  sanity/                 Client, queries, fetch helpers
  lib/                    SEO, forms, utilities
  constants/              Links, tracking IDs, form config
```

## Routes (overview)

| Route | Notes |
|-------|-------|
| `/` | Homepage |
| `/about`, `/contact`, `/accounts`, `/careers` | Marketing pages |
| `/products` + `/products/*` | Product detail pages |
| `/blog`, `/blog/[slug]` | Blog (Sanity) |
| `/policies`, `/policies/[country]`, `/policies/[country]/[slug]` | Legal (Sanity) |
| `/[slug]` | 22 Google Ads landing pages (`src/data/landings.ts`) |
| `/thank-you` | Form confirmation (noindex) |

Legacy URL migration: ~100+ permanent 301 redirects in `legacy-redirects.ts` (wired from `next.config.ts`). Covers all 78 legacy HTML pages from `SITE-URLS.md` — landings, marketing pages, renamed products, blog `/posts/` paths, policy slug/country changes, and legal hub redirects. **Not in app:** `www` ↔ apex (configure at DNS/CDN), static assets under `/documents/` if paths change.

## Auth links

Log in and sign up always point to the external eBanking portal — never internal routes:

- Sign in: `https://ebank.breinrock.com/signIn`
- Sign up: `https://ebank.breinrock.com/signUp`

Use `SIGN_IN_URL` / `SIGN_UP_URL` from `src/constants/links.ts`.

## Landing pages

- Copy and slugs: `src/data/landings.ts`
- Shared template: `src/app/(landing)/[slug]/page.tsx`
- **Landing nav** uses `LandingNavbar` with a “Get In Touch” button that opens the demo popup (conversion tracking via `dataLayer`)
- Main site pages use `Navbar` with Log In / Sign Up

## Documentation

| File | Contents |
|------|----------|
| `AGENTS.md` | AI / contributor conventions |
| `SITE-URLS.md` | Full legacy URL inventory (redirect source of truth) |
| `SEO-GUIDE.md` | Legacy + target SEO reference |
| `TRACKING-AND-WEBHOOKS-GUIDE.md` | Google Ads, GA4, Make.com, Web3Forms |
| `../verdict.md` | Production readiness audit |

## Deploy

Build output is a standard Next.js app:

```bash
npm run build
npm run start
```

Set all env vars in your hosting provider. Ensure `NEXT_PUBLIC_SITE_URL` matches the live domain (including `www` if used). Configure www ↔ apex redirects at DNS/CDN level.
