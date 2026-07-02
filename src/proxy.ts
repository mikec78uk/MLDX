import { NextRequest, NextResponse } from "next/server";

/**
 * Simple Basic Auth gate for password-protecting Vercel preview/production
 * deployments during usability testing. Inactive (no-op) whenever
 * SITE_PASSWORD is unset, so local development is never gated.
 */
export function proxy(request: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) return NextResponse.next();

  const siteUsername = process.env.SITE_USERNAME ?? "preview";
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const [user, pass] = atob(authHeader.slice(6)).split(":");
    if (user === siteUsername && pass === sitePassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="MLDX Prototype"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
