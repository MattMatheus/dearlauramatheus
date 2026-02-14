import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, isValidAuthCookie } from "@/lib/auth";

const PUBLIC_PATHS = new Set(["/login", "/api/login"]);

function isStaticAsset(pathname: string): boolean {
  return pathname.startsWith("/_next") || pathname === "/favicon.ico" || /\.[a-zA-Z0-9]+$/.test(pathname);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (await isValidAuthCookie(cookie)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/:path*"]
};
