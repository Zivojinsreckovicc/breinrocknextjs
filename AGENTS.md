<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

DO NOT KILL OR START DEVELOPMENT SERVERS. DONT WASTE TOKENS CHECKING THE OUTCOME THE USER WILL TELL YOU IF SOMETHING IS WRONG VISUALLY

## Project Context

This project is a modern fintech website built with Next.js.

The project contains two main folders:

```txt
/project-root
  /breinrock
    Next.js website codebase

  /studio
    Sanity Studio CMS
```

The `breinrock` folder contains the actual website.

The `studio` folder contains the Sanity CMS setup.

Blog content and policy pages must be controllable through Sanity.

Do not hardcode blog posts or policy page content inside the Next.js codebase unless it is static fallback content.

---

## Design Direction

The visual style is modern fintech.

The website should feel:

- Premium
- Clean
- Trustworthy
- Minimal
- Corporate but not boring
- Conversion-focused
- Modern SaaS / fintech inspired

Avoid cheap startup templates.

Avoid generic gradients everywhere.

Avoid childish illustrations.

Avoid overdesigned sections that hurt clarity.

The color palette is already defined.

Buttons are already defined inside:

```txt
components/ui
```

Do not recreate the design system unless absolutely necessary.

Use existing colors, buttons, UI primitives, spacing logic, and component patterns.

---

## Codebase Scalability

Code must be maximally scalable.

Folder and file structure should support a large website with many pages.

Use smart routing patterns when needed:

```txt
[slug]
[category]
[...slug]
```

Use dynamic routes for content-driven pages such as:

```txt
/blog/[slug]
/policies/[country]/[slug]
/(landing)/[slug]          → served at /{slug} (Google Ads landings)
```

Landing page slugs and hero copy live in `src/data/landings.ts`. The `(landing)` route group has no URL prefix — e.g. `corporate-iban-1` is `/corporate-iban-1`, not `/landing/corporate-iban-1`.

Landing pages use `LandingNavbar` (Get In Touch → demo popup with conversion tracking). All other pages get `Navbar` from `app/(site)/layout.tsx` (Log In / Sign Up). See `src/components/layout/LandingNavbar.tsx` and `src/components/landing/LandingShell.tsx`.

Avoid creating messy one-off page files when a scalable dynamic structure is better.

Prefer clean separation between:

```txt
app
components
components/ui
components/sections
components/layout
lib
sanity
types
constants
data
```

Do not dump everything into one file.

Do not create giant components.

Split sections into reusable, readable components.

---

## Componentization Rules

Components should be:

- Small
- Reusable
- Clearly named
- Easy to move
- Easy to maintain
- Not overly abstracted

Create section components for major page blocks.

Create UI components only when they are genuinely reusable.

Avoid duplicated markup across pages.

Avoid fake scalability where every tiny element becomes its own pointless component.

Use composition properly.

---

## Sanity CMS Rules

Sanity Studio lives in the `studio` folder.

The main website lives in the `breinrock` folder.

Blog and policy content must come from Sanity.

Sanity schemas should support:

- Blog posts
- Blog categories
- Authors if needed
- Policy pages
- SEO fields
- Slugs
- Published dates
- Rich text content
- Meta title
- Meta description
- Open Graph image

The Next.js website should fetch Sanity content cleanly through a dedicated Sanity client/helper layer.

Do not scatter Sanity queries randomly across components.

Keep Sanity queries organized.

---

## SEO Guidelines

SEO matters.

Performance is not the focus of this document, but SEO structure is mandatory.

Every public page should have proper metadata.

Use strong:

- Page titles
- Meta descriptions
- Canonical URLs where relevant
- Open Graph titles
- Open Graph descriptions
- Open Graph images where relevant
- Twitter card metadata if useful

Use clean semantic HTML.

Only one `h1` per page.

Use heading hierarchy properly:

```txt
h1
h2
h3
h4
```

Do not skip heading levels randomly.

Do not use headings just for styling.

Use descriptive section structure.

Use internal linking where useful.

Blog posts should include proper metadata from Sanity.

Policy pages should also have proper metadata from Sanity.

Dynamic routes must generate metadata based on CMS content.

Use clean, readable URLs.

Avoid ugly slugs.

Avoid duplicate pages targeting the same intent.

Use descriptive alt text for meaningful images.

Decorative images can have empty alt text.

---

## Content Rules

Content should be clear, direct, and fintech-appropriate.

Avoid vague startup fluff.

Avoid phrases like:

```txt
revolutionary
game-changing
seamless solutions
unlock your potential
```

Prefer clear financial language.

Copy should communicate:

- Trust
- Security
- Simplicity
- International payments
- Business value
- Speed
- Control
- Transparency

Do not make unsupported regulatory claims.

Do not invent compliance claims.

Do not invent features.

If content is missing, structure the section properly and leave clean placeholders.

---

## Page Structure Guidelines

Pages should be built from reusable sections.

Typical structure:

```txt
Hero
Trust indicators
Main value proposition
Feature sections
Use cases
Process / how it works
CTA section
FAQ
Footer
```

Do not force every page into the same layout.

Use the structure that fits the intent of the page.

Fintech pages should feel serious and polished.

Every important page should have a clear CTA.

---

## Routing Guidelines

Use App Router conventions.

Keep routes clean and scalable.

Example structure:

```txt
app/
  layout.tsx              → root shell (footer, analytics)

  (site)/
    layout.tsx            → main Navbar
    page.tsx
    blog/
    policies/
    products/
    ...

  (landing)/
    [slug]/
      page.tsx            → /{slug} (Google Ads landings)
```

Use `[slug]` and `[...slug]` only where they genuinely improve scalability.

Do not overcomplicate routing.

---

## Authentication Links

Authentication is handled by the external Breinrock eBanking portal, not by this
marketing site.

- All **Log In** links must point to `https://ebank.breinrock.com/signIn`.
- All **Sign Up** / **Get Started** (sign-up) links must point to `https://ebank.breinrock.com/signUp`.

Do not create internal `/login` or `/signup` routes, and do not link auth actions
to internal paths.

Use the shared constants in `src/constants/links.ts` (`SIGN_IN_URL`, `SIGN_UP_URL`)
for every auth link — never hardcode these URLs in components.

---

## Styling Guidelines

Use the existing styling system.

Typography uses **Montserrat** (local variable font via `src/fonts/`). Eyebrow labels use Georgia (`font-eyebrow`).

Respect the already defined color palette.

Respect existing button styles in `components/ui`.

Do not introduce random colors.

Do not introduce inconsistent spacing.

Do not mix multiple visual systems.

Use modern fintech spacing:

- Large whitespace
- Clear typography
- Strong contrast
- Clean sections
- Minimal noise

Avoid clutter.

---

## Final Rule

Build this like a real scalable fintech website, not a quick demo.

Every file should have a reason to exist.

Every component should be easy to understand.

Every route should be future-proof.

Every CMS-driven page should be cleanly connected to Sanity.

Do not create messy code that works today but becomes painful after 20 pages.

---

## Additional documentation

| File | Purpose |
|------|---------|
| `README.md` | Setup, scripts, routes, env vars |
| `SEO-GUIDE.md` | SEO reference (legacy HTML + targets) |
| `TRACKING-AND-WEBHOOKS-GUIDE.md` | Google Ads, GA4, Make.com, Web3Forms |
| `../verdict.md` | Production readiness audit |
