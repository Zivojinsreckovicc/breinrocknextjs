# Breinrock — Tracking Tags & Make.com Webhooks Guide

Simple reference for how Google Ads, Google Analytics, and Make.com webhooks are set up across the site.

---

## Quick overview

| What | ID / env var | Purpose |
|------|----------|---------|
| **Google Ads** | `NEXT_PUBLIC_GOOGLE_ADS_ID` (`AW-17816976579`) | Tracks visitors on almost every page |
| **Google Analytics 4** | `NEXT_PUBLIC_GA4_ID` (`G-WW6R5ZQT5V`) | Tracks visitors on main marketing pages only |
| **Make.com — Demo leads** | `MAKE_DEMO_WEBHOOK` (server env) | Sends demo form leads (name, email, page) |
| **Make.com — Welcome/referral** | `MAKE_WELCOME_WEBHOOK` (server env) | Sends welcome form leads (name, email, ref) |

---

## Google Ads tag

**Tag:** `AW-17816976579`

**What it does:** Loads on page visit. Counts traffic and supports Google Ads remarketing/conversion setup.

**Where:** In the `<head>` of nearly every HTML page — homepage, product pages, blog, policies, landing pages, thank-you page, etc.

**Pages with Google Ads only (no Analytics):**

- `index.html`
- `landing.html`
- All Google Ads landing page variants (see list below)
- `thankyou.html`
- `careers.html`, `job-details.html`
- `blog/posts/*.html` (individual blog posts)
- All `policies/` pages
- `cookiepolicy.html`, `privacypolicy.html`, `terms-of-use.html`, `legal.html`
- `breinrock-payment-network.html`, `bpn-international.html`
- `404.html`

**Conversion tracking:** There is no direct `gtag('event', 'conversion', ...)` call in the code. Instead, successful demo form submissions push events to `dataLayer` (see below), which Google Ads can pick up if configured in Google Tag Manager.

---

## Google Analytics 4 tag

**Tag:** `G-WW6R5ZQT5V`

**What it does:** Standard GA4 pageview and session tracking on selected main site pages.

**Pages that use both Google Ads AND Analytics:**

| Page | Notes |
|------|-------|
| `about.html` | Main about page |
| `accounts.html` | Accounts overview |
| `baas.html` | Banking-as-a-Service |
| `blog/index.html` | Blog listing |
| `contact.html` | Contact page |
| `foreign-exchange.html` | FX product page |
| `prepaid-cards.html` | Prepaid cards page |
| `products.html` | Products overview |

All other pages use Google Ads (`AW-17816976579`) only.

---

## DataLayer events (form conversions)

When a **demo popup form** submits successfully, the page pushes two events to `window.dataLayer`:

### 1. `form_submission`

```json
{
  "event": "form_submission",
  "form_type": "demo_request",
  "form_name": "Demo Popup Form",
  "name": "...",
  "email": "...",
  "industry": "...",
  "company_size": "..."
}
```

### 2. `conversion`

```json
{
  "event": "conversion",
  "conversion_type": "demo_request"
}
```

**What happens after:** User is redirected to `thankyou.html` (after ~1.5 seconds).

**Pages that fire these events:**

| Page group | Files |
|------------|-------|
| Business account landings | `business-account-1.html`, `business-account-2.html`, `business-account-3.html` |
| Corporate IBAN landings | `corporate-iban-1.html`, `corporate-iban-2.html`, `corporate-iban-3.html` |
| Foreign exchange landings | `foreign-exchange-1.html`, `foreign-exchange-2.html`, `foreign-exchange-3.html` |
| Local payments landings | `local-payments-1.html`, `local-payments-2.html`, `local-payments-3.html` |
| Local payouts landings | `local-payouts-1.html`, `local-payouts-2.html`, `local-payouts-3.html` |
| Multi-currency account landings | `multi-currency-account-1.html`, `multi-currency-account-2.html`, `multi-currency-account-3.html` |
| Welcome landings | `welcome-1.html`, `welcome-2.html`, `welcome.html` |
| General landing | `landing.html` |

**Pages that do NOT fire conversion events:**

- `careers.html`, `job-details.html` — contact form only, no dataLayer conversion
- `contact.html` — contact form only
- `thankyou.html` — confirmation page only (Google Ads tag loads, no conversion event on load)

---

## Make.com webhooks

Webhook URLs are **server-only** env vars (`MAKE_DEMO_WEBHOOK`, `MAKE_WELCOME_WEBHOOK`). The browser posts to `/api/forms/demo`; the server forwards leads to Make.com and Web3Forms.

Make.com receives lead data **before** the form is sent to Web3Forms (email delivery). If the webhook fails, the form still submits to Web3Forms.

### Webhook 1 — Demo lead capture (most landing pages)

**Env:** `MAKE_DEMO_WEBHOOK`

**Payload sent:**

```json
{
  "name": "User name",
  "email": "user@email.com",
  "page": "foreign-exchange-1.html"
}
```

The `page` field is the filename of the landing page the user submitted from.

**Used on these pages:**

| Campaign / product | Landing pages |
|--------------------|---------------|
| Business account | `business-account-1.html`, `business-account-2.html`, `business-account-3.html` |
| Corporate IBAN | `corporate-iban-1.html`, `corporate-iban-2.html`, `corporate-iban-3.html` |
| Foreign exchange | `foreign-exchange-1.html`, `foreign-exchange-2.html`, `foreign-exchange-3.html` |
| Local payments | `local-payments-1.html`, `local-payments-2.html`, `local-payments-3.html` |
| Local payouts | `local-payouts-1.html`, `local-payouts-2.html`, `local-payouts-3.html` |
| Multi-currency account | `multi-currency-account-1.html`, `multi-currency-account-2.html`, `multi-currency-account-3.html` |
| Welcome (variants 1 & 2) | `welcome-1.html`, `welcome-2.html` |

---

### Webhook 2 — Welcome / referral page

**Env:** `MAKE_WELCOME_WEBHOOK`

**Payload sent:**

```json
{
  "name": "User name",
  "email": "user@email.com",
  "ref": "value-from-url-ref-param"
}
```

The `ref` value comes from the URL query string, e.g. `welcome.html?ref=partner-name`.

**Used on:**

| Page | Notes |
|------|-------|
| `welcome.html` | Main welcome/referral landing page |

---

### Pages with forms but NO Make.com webhook

| Page | Form goes to | Conversion events? |
|------|--------------|-------------------|
| `landing.html` | Web3Forms only | Yes (`form_submission` + `conversion`) |
| `careers.html` | Web3Forms only | No |
| `job-details.html` | Web3Forms only | No |
| `contact.html` | Web3Forms only | No |

---

## Form submission flow (landing pages with Make.com)

```
User fills demo form
        ↓
reCAPTCHA token (client)
        ↓
POST → /api/forms/demo (server)
        ↓
Server → Make.com webhook (lead data)
        ↓
Server → Web3Forms (full form + email notification)
        ↓
Client pushes dataLayer events (form_submission + conversion)
        ↓
Redirect → /thank-you
```

---

## Related services (not Make.com)

| Service | Used for |
|---------|----------|
| **Web3Forms** (`api.web3forms.com`) | Email delivery — called from `/api/forms/*` Route Handlers |
| **reCAPTCHA** (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + optional `RECAPTCHA_SECRET_KEY`) | Spam protection on demo and contact forms |

---

## Page index — tags at a glance

| Page | Google Ads `AW-17816976579` | Analytics `G-WW6R5ZQT5V` | Make.com webhook | Conversion events |
|------|:---:|:---:|:---:|:---:|
| `index.html` | ✓ | | | |
| `about.html` | ✓ | ✓ | | |
| `accounts.html` | ✓ | ✓ | | |
| `baas.html` | ✓ | ✓ | | |
| `products.html` | ✓ | ✓ | | |
| `contact.html` | ✓ | ✓ | | |
| `foreign-exchange.html` | ✓ | ✓ | | |
| `prepaid-cards.html` | ✓ | ✓ | | |
| `blog/index.html` | ✓ | ✓ | | |
| `landing.html` | ✓ | | | ✓ |
| `thankyou.html` | ✓ | | | |
| `welcome.html` | ✓ | | Referral webhook | ✓ |
| `welcome-1.html`, `welcome-2.html` | ✓ | | Demo webhook | ✓ |
| `business-account-*.html` (×3) | ✓ | | Demo webhook | ✓ |
| `corporate-iban-*.html` (×3) | ✓ | | Demo webhook | ✓ |
| `foreign-exchange-*.html` (×3) | ✓ | | Demo webhook | ✓ |
| `local-payments-*.html` (×3) | ✓ | | Demo webhook | ✓ |
| `local-payouts-*.html` (×3) | ✓ | | Demo webhook | ✓ |
| `multi-currency-account-*.html` (×3) | ✓ | | Demo webhook | ✓ |
| `careers.html`, `job-details.html` | ✓ | | | |
| Blog posts, policies, legal pages | ✓ | | | |

---

*Last updated from codebase scan — June 2026*
