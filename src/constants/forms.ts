/** Client-safe form constants (no secrets — those live in server env vars). */

/** Where successful form submissions redirect. */
export const THANK_YOU_PATH = "/thank-you";

/** reCAPTCHA v3 site key — public, used to load the client script. */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

/**
 * Web3Forms access key. Public by design — it only routes submissions to the
 * inbox configured on the Web3Forms dashboard and is meant to be used directly
 * from the browser. The free plan only accepts client-side submissions, so the
 * contact and demo forms POST to Web3Forms straight from the browser.
 */
export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
