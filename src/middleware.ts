import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function applySecurityHeaders(
	response: NextResponse,
	nonce: string,
): NextResponse {
	const scriptSrcDirectives = [
		"'self'",
		`'nonce-${nonce}'`,
	];

	const cspHeader = `
    default-src 'self' https://*.mapbox.com;
    script-src ${scriptSrcDirectives.join(" ")};
    connect-src 'self' https://*.mapbox.com https://api.mapbox.com https://events.mapbox.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.mapbox.com;
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

export function middleware(request: NextRequest) {
	const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	const response = NextResponse.next({ request: { headers: requestHeaders } });
	return applySecurityHeaders(response, nonce);
}

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
