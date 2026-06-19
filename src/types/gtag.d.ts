// Global typings for the gtag.js (Google Ads / Analytics) runtime injected by
// the analytics components. See src/components/analytics.

export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
