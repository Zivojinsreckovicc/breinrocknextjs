import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://curator-assets.b-cdn.net https://cdn.curator.io",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com",
  "frame-src https://www.google.com",
  "base-uri 'self'",
  "form-action 'self' https://breinrock.us14.list-manage.com",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );
  response.headers.set("Content-Security-Policy", CONTENT_SECURITY_POLICY);

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|imgs/|.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|pdf|txt|xml)$).*)",
  ],
};
