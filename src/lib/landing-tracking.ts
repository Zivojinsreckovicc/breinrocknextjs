/** Push Google Ads / GTM conversion events after a successful demo form submit. */
export function pushDemoConversion(payload: {
  name: string;
  email: string;
  industry: string;
  company_size: string;
}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submission",
    form_type: "demo_request",
    form_name: "Demo Popup Form",
    name: payload.name,
    email: payload.email,
    industry: payload.industry,
    company_size: payload.company_size,
  });
  window.dataLayer.push({
    event: "conversion",
    conversion_type: "demo_request",
  });
}
