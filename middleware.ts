import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get locale from cookie or headers
  const locale =
    request.cookies.get("locale")?.value ||
    request.headers.get("accept-language")?.split(",")[0]?.split("-")[0] ||
    "en";

  // Add locale to headers so it can be accessed by server components
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
