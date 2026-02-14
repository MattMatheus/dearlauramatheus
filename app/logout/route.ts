import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

function buildLogoutResponse(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0
  });
  return response;
}

export async function GET(request: Request) {
  return buildLogoutResponse(request);
}

export async function POST(request: Request) {
  return buildLogoutResponse(request);
}
