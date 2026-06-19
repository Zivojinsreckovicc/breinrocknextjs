# Breinrock — Complete Site URL Inventory

Full list of legacy URLs for redirect planning when launching the new site.

**Total HTML pages:** 78
**Base domain (canonicals):** `https://breinrock.com`
**Sitemap domain:** `https://www.breinrock.com` (also handle `www` redirects)

---

## How URLs work today (`.htaccess`)

The live site normalizes URLs like this:

| Request | What happens |
|---------|----------------|
| `/page.html` | **301 redirect** → `/page` |
| `/page` | Serves `page.html` internally |
| `/` | Serves `index.html` |
| `/blog/` | Serves `blog/index.html` (directory) |
| Unknown path | **404** → `/404.html` |

**For redirects:** plan for **both** the `.html` and extensionless versions unless your new site picks one canonical form.

---

## Directory map

Every folder in the project and what it contains:

| Directory | Purpose |
|-------------|---------|
| `/blog/` | Blog index |
| `/blog/assets/` | Blog images and styles |
| `/blog/assets/what-is-baas/` | Assets for the BaaS blog post |
| `/blog/posts/` | Individual blog articles |
| `/documents/` | Downloadable PDFs |
| `/imgs/` | Site images, icons, team photos, product graphics |
| `/imgs/cardgifs/` | Animated card GIFs |
| `/imgs/cardgifs/compressed/` | Compressed card GIF variants |
| `/imgs/cardimages/` | Prepaid card mockup images |
| `/imgs/icons/` | UI icons |
| `/imgs/icons/breinrockawards/` | Award badge images |
| `/imgs/icons/corporateandpersonal/` | Account type icons |
| `/imgs/icons/foreignexchange/` | FX icons |
| `/imgs/icons/products-dropdown-icons/` | Nav dropdown icons |
| `/imgs/icons/socials/` | Social media icons |
| `/imgs/licenses/` | Regulatory licence badges |
| `/imgs/mainaboutimgs/` | About page imagery |
| `/imgs/mainaboutimgs/cardimgs/` | About page card images |
| `/imgs/news/` | News/blog thumbnail images |
| `/imgs/productimages/` | Product section GIFs/images |
| `/imgs/team/` | Team member photos |
| `/policies/` | Legal & compliance pages by region |
| `/policies/ca/` | Canada policy pages |
| `/policies/cz/` | Czech Republic policy pages |
| `/policies/uae/` | UAE policy pages |
| `/policies/uk/` | UK policy pages |

---

## All page URLs

Listed as **extensionless** (preferred live URL) plus **`.html` variant** for redirect coverage.

### Root — main site, landings, legal

| File | Extensionless URL | `.html` URL |
|------|-------------------|-------------|
| `404.html` | `https://breinrock.com/404` | `https://breinrock.com/404.html` |
| `about.html` | `https://breinrock.com/about` | `https://breinrock.com/about.html` |
| `accounts.html` | `https://breinrock.com/accounts` | `https://breinrock.com/accounts.html` |
| `baas.html` | `https://breinrock.com/baas` | `https://breinrock.com/baas.html` |
| `bpn-international.html` | `https://breinrock.com/bpn-international` | `https://breinrock.com/bpn-international.html` |
| `breinrock-payment-network.html` | `https://breinrock.com/breinrock-payment-network` | `https://breinrock.com/breinrock-payment-network.html` |
| `business-account-1.html` | `https://breinrock.com/business-account-1` | `https://breinrock.com/business-account-1.html` |
| `business-account-2.html` | `https://breinrock.com/business-account-2` | `https://breinrock.com/business-account-2.html` |
| `business-account-3.html` | `https://breinrock.com/business-account-3` | `https://breinrock.com/business-account-3.html` |
| `careers.html` | `https://breinrock.com/careers` | `https://breinrock.com/careers.html` |
| `contact.html` | `https://breinrock.com/contact` | `https://breinrock.com/contact.html` |
| `cookiepolicy.html` | `https://breinrock.com/cookiepolicy` | `https://breinrock.com/cookiepolicy.html` |
| `corporate-iban-1.html` | `https://breinrock.com/corporate-iban-1` | `https://breinrock.com/corporate-iban-1.html` |
| `corporate-iban-2.html` | `https://breinrock.com/corporate-iban-2` | `https://breinrock.com/corporate-iban-2.html` |
| `corporate-iban-3.html` | `https://breinrock.com/corporate-iban-3` | `https://breinrock.com/corporate-iban-3.html` |
| `foreign-exchange-1.html` | `https://breinrock.com/foreign-exchange-1` | `https://breinrock.com/foreign-exchange-1.html` |
| `foreign-exchange-2.html` | `https://breinrock.com/foreign-exchange-2` | `https://breinrock.com/foreign-exchange-2.html` |
| `foreign-exchange-3.html` | `https://breinrock.com/foreign-exchange-3` | `https://breinrock.com/foreign-exchange-3.html` |
| `foreign-exchange.html` | `https://breinrock.com/foreign-exchange` | `https://breinrock.com/foreign-exchange.html` |
| `index.html` | `https://breinrock.com/` | `https://breinrock.com/index.html` |
| `job-details.html` | `https://breinrock.com/job-details` | `https://breinrock.com/job-details.html` |
| `landing.html` | `https://breinrock.com/landing` | `https://breinrock.com/landing.html` |
| `legal.html` | `https://breinrock.com/legal` | `https://breinrock.com/legal.html` |
| `local-payments-1.html` | `https://breinrock.com/local-payments-1` | `https://breinrock.com/local-payments-1.html` |
| `local-payments-2.html` | `https://breinrock.com/local-payments-2` | `https://breinrock.com/local-payments-2.html` |
| `local-payments-3.html` | `https://breinrock.com/local-payments-3` | `https://breinrock.com/local-payments-3.html` |
| `local-payouts-1.html` | `https://breinrock.com/local-payouts-1` | `https://breinrock.com/local-payouts-1.html` |
| `local-payouts-2.html` | `https://breinrock.com/local-payouts-2` | `https://breinrock.com/local-payouts-2.html` |
| `local-payouts-3.html` | `https://breinrock.com/local-payouts-3` | `https://breinrock.com/local-payouts-3.html` |
| `multi-currency-account-1.html` | `https://breinrock.com/multi-currency-account-1` | `https://breinrock.com/multi-currency-account-1.html` |
| `multi-currency-account-2.html` | `https://breinrock.com/multi-currency-account-2` | `https://breinrock.com/multi-currency-account-2.html` |
| `multi-currency-account-3.html` | `https://breinrock.com/multi-currency-account-3` | `https://breinrock.com/multi-currency-account-3.html` |
| `prepaid-cards.html` | `https://breinrock.com/prepaid-cards` | `https://breinrock.com/prepaid-cards.html` |
| `privacypolicy.html` | `https://breinrock.com/privacypolicy` | `https://breinrock.com/privacypolicy.html` |
| `products.html` | `https://breinrock.com/products` | `https://breinrock.com/products.html` |
| `terms-of-use.html` | `https://breinrock.com/terms-of-use` | `https://breinrock.com/terms-of-use.html` |
| `thankyou.html` | `https://breinrock.com/thankyou` | `https://breinrock.com/thankyou.html` |
| `welcome-1.html` | `https://breinrock.com/welcome-1` | `https://breinrock.com/welcome-1.html` |
| `welcome-2.html` | `https://breinrock.com/welcome-2` | `https://breinrock.com/welcome-2.html` |
| `welcome.html` | `https://breinrock.com/welcome` | `https://breinrock.com/welcome.html` |

### Blog index

| File | Extensionless URL | `.html` URL |
|------|-------------------|-------------|
| `blog/index.html` | `https://breinrock.com/blog/` | `https://breinrock.com/blog/index.html` |

### Blog posts

| File | Extensionless URL | `.html` URL |
|------|-------------------|-------------|
| `blog/posts/baas-news.html` | `https://breinrock.com/blog/posts/baas-news` | `https://breinrock.com/blog/posts/baas-news.html` |
| `blog/posts/crossborder-advantages.html` | `https://breinrock.com/blog/posts/crossborder-advantages` | `https://breinrock.com/blog/posts/crossborder-advantages.html` |
| `blog/posts/fintech-ai.html` | `https://breinrock.com/blog/posts/fintech-ai` | `https://breinrock.com/blog/posts/fintech-ai.html` |
| `blog/posts/local-payments-evolving.html` | `https://breinrock.com/blog/posts/local-payments-evolving` | `https://breinrock.com/blog/posts/local-payments-evolving.html` |
| `blog/posts/local-rails-vs-swift-payments.html` | `https://breinrock.com/blog/posts/local-rails-vs-swift-payments` | `https://breinrock.com/blog/posts/local-rails-vs-swift-payments.html` |
| `blog/posts/multycurrency-account.html` | `https://breinrock.com/blog/posts/multycurrency-account` | `https://breinrock.com/blog/posts/multycurrency-account.html` |
| `blog/posts/neobank-considerations.html` | `https://breinrock.com/blog/posts/neobank-considerations` | `https://breinrock.com/blog/posts/neobank-considerations.html` |
| `blog/posts/realestate-investing.html` | `https://breinrock.com/blog/posts/realestate-investing` | `https://breinrock.com/blog/posts/realestate-investing.html` |
| `blog/posts/what-is-baas.html` | `https://breinrock.com/blog/posts/what-is-baas` | `https://breinrock.com/blog/posts/what-is-baas.html` |

### Policies — Canada (`/policies/ca/`)

| File | Extensionless URL | `.html` URL |
|------|-------------------|-------------|
| `policies/ca/ca-disclaimer.html` | `https://breinrock.com/policies/ca/ca-disclaimer` | `https://breinrock.com/policies/ca/ca-disclaimer.html` |
| `policies/ca/ca-termsandconditions.html` | `https://breinrock.com/policies/ca/ca-termsandconditions` | `https://breinrock.com/policies/ca/ca-termsandconditions.html` |
| `policies/ca/ca-termsofservice.html` | `https://breinrock.com/policies/ca/ca-termsofservice` | `https://breinrock.com/policies/ca/ca-termsofservice.html` |

### Policies — Czech Republic (`/policies/cz/`)

| File | Extensionless URL | `.html` URL |
|------|-------------------|-------------|
| `policies/cz/cz-account-cancellation.html` | `https://breinrock.com/policies/cz/cz-account-cancellation` | `https://breinrock.com/policies/cz/cz-account-cancellation.html` |
| `policies/cz/cz-account-opening.html` | `https://breinrock.com/policies/cz/cz-account-opening` | `https://breinrock.com/policies/cz/cz-account-opening.html` |
| `policies/cz/cz-aml.html` | `https://breinrock.com/policies/cz/cz-aml` | `https://breinrock.com/policies/cz/cz-aml.html` |
| `policies/cz/cz-client-payments.html` | `https://breinrock.com/policies/cz/cz-client-payments` | `https://breinrock.com/policies/cz/cz-client-payments.html` |
| `policies/cz/cz-client-rights.html` | `https://breinrock.com/policies/cz/cz-client-rights` | `https://breinrock.com/policies/cz/cz-client-rights.html` |
| `policies/cz/cz-complaints.html` | `https://breinrock.com/policies/cz/cz-complaints` | `https://breinrock.com/policies/cz/cz-complaints.html` |
| `policies/cz/cz-data-protection.html` | `https://breinrock.com/policies/cz/cz-data-protection` | `https://breinrock.com/policies/cz/cz-data-protection.html` |
| `policies/cz/cz-final-provisions.html` | `https://breinrock.com/policies/cz/cz-final-provisions` | `https://breinrock.com/policies/cz/cz-final-provisions.html` |
| `policies/cz/cz-general-terms.html` | `https://breinrock.com/policies/cz/cz-general-terms` | `https://breinrock.com/policies/cz/cz-general-terms.html` |
| `policies/cz/cz-payment-management.html` | `https://breinrock.com/policies/cz/cz-payment-management` | `https://breinrock.com/policies/cz/cz-payment-management.html` |
| `policies/cz/cz-precontractual-info.html` | `https://breinrock.com/policies/cz/cz-precontractual-info` | `https://breinrock.com/policies/cz/cz-precontractual-info.html` |
| `policies/cz/cz-prohibited-activities.html` | `https://breinrock.com/policies/cz/cz-prohibited-activities` | `https://breinrock.com/policies/cz/cz-prohibited-activities.html` |
| `policies/cz/cz-provider-rights.html` | `https://breinrock.com/policies/cz/cz-provider-rights` | `https://breinrock.com/policies/cz/cz-provider-rights.html` |
| `policies/cz/cz-service-availability.html` | `https://breinrock.com/policies/cz/cz-service-availability` | `https://breinrock.com/policies/cz/cz-service-availability.html` |
| `policies/cz/cz-topups-info.html` | `https://breinrock.com/policies/cz/cz-topups-info` | `https://breinrock.com/policies/cz/cz-topups-info.html` |

### Policies — UAE (`/policies/uae/`)

| File | Extensionless URL | `.html` URL |
|------|-------------------|-------------|
| `policies/uae/client-money-disclosure.html` | `https://breinrock.com/policies/uae/client-money-disclosure` | `https://breinrock.com/policies/uae/client-money-disclosure.html` |
| `policies/uae/uae-complaints.html` | `https://breinrock.com/policies/uae/uae-complaints` | `https://breinrock.com/policies/uae/uae-complaints.html` |
| `policies/uae/uae-payments-terms.html` | `https://breinrock.com/policies/uae/uae-payments-terms` | `https://breinrock.com/policies/uae/uae-payments-terms.html` |

### Policies — UK (`/policies/uk/`)

| File | Extensionless URL | `.html` URL |
|------|-------------------|-------------|
| `policies/uk/pushpayment.html` | `https://breinrock.com/policies/uk/pushpayment` | `https://breinrock.com/policies/uk/pushpayment.html` |
| `policies/uk/uk-complaints-log.html` | `https://breinrock.com/policies/uk/uk-complaints-log` | `https://breinrock.com/policies/uk/uk-complaints-log.html` |
| `policies/uk/uk-complaints.html` | `https://breinrock.com/policies/uk/uk-complaints` | `https://breinrock.com/policies/uk/uk-complaints.html` |
| `policies/uk/uk-contact.html` | `https://breinrock.com/policies/uk/uk-contact` | `https://breinrock.com/policies/uk/uk-contact.html` |
| `policies/uk/uk-disclaimers.html` | `https://breinrock.com/policies/uk/uk-disclaimers` | `https://breinrock.com/policies/uk/uk-disclaimers.html` |
| `policies/uk/uk-money-protection.html` | `https://breinrock.com/policies/uk/uk-money-protection` | `https://breinrock.com/policies/uk/uk-money-protection.html` |
| `policies/uk/uk-vulnerability.html` | `https://breinrock.com/policies/uk/uk-vulnerability` | `https://breinrock.com/policies/uk/uk-vulnerability.html` |

---

## Dynamic / query-string URLs

| URL | Notes |
|-----|-------|
| `https://breinrock.com/job-details?id=python-support-engineer` | Job detail page (from `careers.js`) |
| `https://breinrock.com/job-details.html?id=python-support-engineer` | Same page, `.html` variant |
| `https://breinrock.com/careers#open-positions` | Careers anchor link |

Add a redirect rule for **any** `job-details` URL with `?id=` query params when jobs move to new URLs.

---

## Blog — legacy path mismatches

Some blog posts have **canonical/OG URLs** pointing to `/blog/post-name.html` but the real file lives at `/blog/posts/post-name.html`. Redirect both old paths to the new location.

| Wrong / legacy path | Correct path |
|---------------------|--------------|
| `https://breinrock.com/blog/baas-news.html` | `https://breinrock.com/blog/posts/baas-news.html` |
| `https://breinrock.com/blog/crossborder-advantages.html` | `https://breinrock.com/blog/posts/crossborder-advantages.html` |
| `https://breinrock.com/blog/fintech-ai.html` | `https://breinrock.com/blog/posts/fintech-ai.html` |
| `https://breinrock.com/blog/local-payments-evolving.html` | `https://breinrock.com/blog/posts/local-payments-evolving.html` |
| `https://breinrock.com/blog/multycurrency-account.html` | `https://breinrock.com/blog/posts/multycurrency-account.html` |
| `https://breinrock.com/blog/neobank-considerations.html` | `https://breinrock.com/blog/posts/neobank-considerations.html` |
| `https://breinrock.com/blog/realestate-investing.html` | `https://breinrock.com/blog/posts/realestate-investing.html` |

These two posts already use the correct `/blog/posts/` path:

- `https://breinrock.com/blog/posts/local-rails-vs-swift-payments`
- `https://breinrock.com/blog/posts/what-is-baas`

---

## Broken or referenced URLs (no file exists)

These paths are linked or documented but **have no HTML file** in the repo. Check if they 404 today and add redirects.

| Referenced URL | Where referenced | Likely redirect target |
|----------------|----------------|------------------------|
| `https://breinrock.com/blog.html` | Blog post footers, `llms.txt` | `https://breinrock.com/blog/` |
| `https://breinrock.com/news-pages/` | `llms.txt` | Unknown — verify in analytics |

---

## Root & utility files

| URL | File |
|-----|------|
| `https://breinrock.com/sitemap.xml` | `sitemap.xml` |
| `https://breinrock.com/robots.txt` | `robots.txt` |
| `https://breinrock.com/llms.txt` | `llms.txt` |
| `https://breinrock.com/.htaccess` | `.htaccess` |
| `https://breinrock.com/documents/evidenceofcover.pdf` | `documents/evidenceofcover.pdf` |

---

## Static asset directories

Not HTML pages, but linked from site content. If asset paths change in the new site, set up redirects or update all references.

- `/blog/assets/` — 10 files
- `/blog/assets/what-is-baas/` — 1 files
- `/documents/` — 1 files
- `/imgs/` — 101 files
- `/imgs/cardgifs/` — 4 files
- `/imgs/cardgifs/compressed/` — 4 files
- `/imgs/cardimages/` — 3 files
- `/imgs/icons/` — 47 files
- `/imgs/icons/breinrockawards/` — 5 files
- `/imgs/icons/corporateandpersonal/` — 4 files
- `/imgs/icons/foreignexchange/` — 6 files
- `/imgs/icons/products-dropdown-icons/` — 9 files
- `/imgs/icons/socials/` — 3 files
- `/imgs/licenses/` — 6 files
- `/imgs/mainaboutimgs/` — 4 files
- `/imgs/mainaboutimgs/cardimgs/` — 4 files
- `/imgs/news/` — 0 files
- `/imgs/productimages/` — 5 files
- `/imgs/team/` — 19 files

Key downloadable asset:

- `https://breinrock.com/documents/evidenceofcover.pdf`

---

## Full flat URL list (extensionless, copy-paste)

All page URLs in one list for redirect spreadsheets:

```
https://breinrock.com/
https://breinrock.com/404
https://breinrock.com/about
https://breinrock.com/accounts
https://breinrock.com/baas
https://breinrock.com/blog/
https://breinrock.com/blog/posts/baas-news
https://breinrock.com/blog/posts/crossborder-advantages
https://breinrock.com/blog/posts/fintech-ai
https://breinrock.com/blog/posts/local-payments-evolving
https://breinrock.com/blog/posts/local-rails-vs-swift-payments
https://breinrock.com/blog/posts/multycurrency-account
https://breinrock.com/blog/posts/neobank-considerations
https://breinrock.com/blog/posts/realestate-investing
https://breinrock.com/blog/posts/what-is-baas
https://breinrock.com/bpn-international
https://breinrock.com/breinrock-payment-network
https://breinrock.com/business-account-1
https://breinrock.com/business-account-2
https://breinrock.com/business-account-3
https://breinrock.com/careers
https://breinrock.com/contact
https://breinrock.com/cookiepolicy
https://breinrock.com/corporate-iban-1
https://breinrock.com/corporate-iban-2
https://breinrock.com/corporate-iban-3
https://breinrock.com/foreign-exchange-1
https://breinrock.com/foreign-exchange-2
https://breinrock.com/foreign-exchange-3
https://breinrock.com/foreign-exchange
https://breinrock.com/job-details
https://breinrock.com/landing
https://breinrock.com/legal
https://breinrock.com/local-payments-1
https://breinrock.com/local-payments-2
https://breinrock.com/local-payments-3
https://breinrock.com/local-payouts-1
https://breinrock.com/local-payouts-2
https://breinrock.com/local-payouts-3
https://breinrock.com/multi-currency-account-1
https://breinrock.com/multi-currency-account-2
https://breinrock.com/multi-currency-account-3
https://breinrock.com/policies/ca/ca-disclaimer
https://breinrock.com/policies/ca/ca-termsandconditions
https://breinrock.com/policies/ca/ca-termsofservice
https://breinrock.com/policies/cz/cz-account-cancellation
https://breinrock.com/policies/cz/cz-account-opening
https://breinrock.com/policies/cz/cz-aml
https://breinrock.com/policies/cz/cz-client-payments
https://breinrock.com/policies/cz/cz-client-rights
https://breinrock.com/policies/cz/cz-complaints
https://breinrock.com/policies/cz/cz-data-protection
https://breinrock.com/policies/cz/cz-final-provisions
https://breinrock.com/policies/cz/cz-general-terms
https://breinrock.com/policies/cz/cz-payment-management
https://breinrock.com/policies/cz/cz-precontractual-info
https://breinrock.com/policies/cz/cz-prohibited-activities
https://breinrock.com/policies/cz/cz-provider-rights
https://breinrock.com/policies/cz/cz-service-availability
https://breinrock.com/policies/cz/cz-topups-info
https://breinrock.com/policies/uae/client-money-disclosure
https://breinrock.com/policies/uae/uae-complaints
https://breinrock.com/policies/uae/uae-payments-terms
https://breinrock.com/policies/uk/pushpayment
https://breinrock.com/policies/uk/uk-complaints-log
https://breinrock.com/policies/uk/uk-complaints
https://breinrock.com/policies/uk/uk-contact
https://breinrock.com/policies/uk/uk-disclaimers
https://breinrock.com/policies/uk/uk-money-protection
https://breinrock.com/policies/uk/uk-vulnerability
https://breinrock.com/prepaid-cards
https://breinrock.com/privacypolicy
https://breinrock.com/products
https://breinrock.com/terms-of-use
https://breinrock.com/thankyou
https://breinrock.com/welcome-1
https://breinrock.com/welcome-2
https://breinrock.com/welcome
```

---

## Sitemap URLs (`sitemap.xml`)

77 URLs in sitemap (may use `www` and mixed `.html` / extensionless forms):

```
https://www.breinrock.com
https://www.breinrock.com/about.html
https://www.breinrock.com/accounts.html
https://www.breinrock.com/baas.html
https://www.breinrock.com/blog/index.html
https://www.breinrock.com/bpn-international.html
https://www.breinrock.com/breinrock-payment-network.html
https://www.breinrock.com/business-account-1.html
https://www.breinrock.com/business-account-2.html
https://www.breinrock.com/business-account-3.html
https://www.breinrock.com/contact.html
https://www.breinrock.com/careers.html
https://www.breinrock.com/cookiepolicy.html
https://www.breinrock.com/corporate-iban-1.html
https://www.breinrock.com/corporate-iban-2.html
https://www.breinrock.com/corporate-iban-3.html
https://www.breinrock.com/foreign-exchange-1.html
https://www.breinrock.com/foreign-exchange-2.html
https://www.breinrock.com/foreign-exchange-3.html
https://www.breinrock.com/foreign-exchange.html
https://www.breinrock.com/landing.html
https://www.breinrock.com/legal.html
https://www.breinrock.com/local-payments-1.html
https://www.breinrock.com/local-payments-2.html
https://www.breinrock.com/local-payments-3.html
https://www.breinrock.com/local-payouts-1.html
https://www.breinrock.com/local-payouts-2.html
https://www.breinrock.com/local-payouts-3.html
https://www.breinrock.com/multi-currency-account-1.html
https://www.breinrock.com/multi-currency-account-2.html
https://www.breinrock.com/multi-currency-account-3.html
https://www.breinrock.com/prepaid-cards.html
https://www.breinrock.com/privacypolicy.html
https://www.breinrock.com/products.html
https://www.breinrock.com/terms-of-use.html
https://www.breinrock.com/thankyou.html
https://www.breinrock.com/welcome.html
https://www.breinrock.com/welcome-1.html
https://www.breinrock.com/welcome-2.html
https://www.breinrock.com/job-details.html?id=python-support-engineer
https://www.breinrock.com/blog/posts/baas-news.html
https://www.breinrock.com/blog/posts/crossborder-advantages.html
https://www.breinrock.com/blog/posts/fintech-ai.html
https://www.breinrock.com/blog/posts/local-payments-evolving.html
https://www.breinrock.com/blog/posts/local-rails-vs-swift-payments.html
https://www.breinrock.com/blog/posts/multycurrency-account.html
https://www.breinrock.com/blog/posts/neobank-considerations.html
https://www.breinrock.com/blog/posts/realestate-investing.html
https://www.breinrock.com/blog/posts/what-is-baas.html
https://www.breinrock.com/policies/ca/ca-disclaimer.html
https://www.breinrock.com/policies/ca/ca-termsandconditions.html
https://www.breinrock.com/policies/ca/ca-termsofservice.html
https://www.breinrock.com/policies/cz/cz-account-cancellation.html
https://www.breinrock.com/policies/cz/cz-account-opening.html
https://www.breinrock.com/policies/cz/cz-aml.html
https://www.breinrock.com/policies/cz/cz-client-payments.html
https://www.breinrock.com/policies/cz/cz-client-rights.html
https://www.breinrock.com/policies/cz/cz-complaints.html
https://www.breinrock.com/policies/cz/cz-data-protection.html
https://www.breinrock.com/policies/cz/cz-final-provisions.html
https://www.breinrock.com/policies/cz/cz-general-terms.html
https://www.breinrock.com/policies/cz/cz-payment-management.html
https://www.breinrock.com/policies/cz/cz-precontractual-info.html
https://www.breinrock.com/policies/cz/cz-prohibited-activities.html
https://www.breinrock.com/policies/cz/cz-provider-rights.html
https://www.breinrock.com/policies/cz/cz-service-availability.html
https://www.breinrock.com/policies/cz/cz-topups-info.html
https://www.breinrock.com/policies/uae/client-money-disclosure.html
https://www.breinrock.com/policies/uae/uae-complaints.html
https://www.breinrock.com/policies/uae/uae-payments-terms.html
https://www.breinrock.com/policies/uk/pushpayment.html
https://www.breinrock.com/policies/uk/uk-complaints-log.html
https://www.breinrock.com/policies/uk/uk-complaints.html
https://www.breinrock.com/policies/uk/uk-contact.html
https://www.breinrock.com/policies/uk/uk-disclaimers.html
https://www.breinrock.com/policies/uk/uk-money-protection.html
https://www.breinrock.com/policies/uk/uk-vulnerability.html
```

*Generated from codebase — June 2026*

