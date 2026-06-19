/** Client-safe form constants (no secrets — those live in server env vars). */

/** Where successful form submissions redirect. */
export const THANK_YOU_PATH = "/thank-you";

/** reCAPTCHA v3 site key — public, used to load the client script. */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";
