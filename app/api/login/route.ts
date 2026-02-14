import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, buildAuthCookieValue, isValidPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const passwordValue = formData?.get("password");
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!password || !isValidPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const cookieValue = await buildAuthCookieValue();
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: cookieValue,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}
