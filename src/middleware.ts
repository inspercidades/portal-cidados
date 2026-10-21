import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isHabitacaoStoryEnabled, isHabitacaoStoryPath } from "@/lib/features";
import { isProductionHostname } from "@/lib/seo";

function applySecurityHeaders(
  response: NextResponse,
  nonce: string,
): NextResponse {
  const scriptSrcDirectives = [
    "'self'",
    `'nonce-${nonce}'`,
    "https://www.googletagmanager.com",
    "https://www.clarity.ms",
    "https://scripts.clarity.ms",
    // Hash do inline script criado internamente pelo clarity.js.
    "'sha256-J9cZHZf5nVZbsm7Pqxc8RsURv1AIXkMgbhfrZvoOs/A='",
  ];

  const cspHeader = `
    default-src 'self' https://*.mapbox.com;
    script-src ${scriptSrcDirectives.join(" ")};
    connect-src 'self' https://*.mapbox.com https://api.mapbox.com https://events.mapbox.com https://www.google-analytics.com https://analytics.google.com https://*.clarity.ms;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.mapbox.com https://www.google-analytics.com https://*.clarity.ms;
    font-src 'self' data: https://fonts.gstatic.com;
    media-src 'self' data: blob:;
    worker-src 'self' blob:;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const cspValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  response.headers.set("x-nonce", nonce);
  response.headers.set("Content-Security-Policy", cspValue);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );

  return response;
}

function finish(response: NextResponse, nonce: string, host: string) {
  applySecurityHeaders(response, nonce);
  // Só o host institucional deve ser indexado. Vercel (*.vercel.app),
  // localhost e qualquer outro host recebem noindex no header (independente
  // do NEXT_PUBLIC_SITE_URL do build).
  if (!isProductionHostname(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  const host = request.headers.get("host") ?? "";

  if (
    !isHabitacaoStoryEnabled() &&
    isHabitacaoStoryPath(request.nextUrl.pathname)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/404";
    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    return finish(response, nonce, host);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  return finish(response, nonce, host);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
