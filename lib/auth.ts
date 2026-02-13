export const SESSION_COOKIE_NAME = "valentine_session";

function getEnvOrThrow(name: "SITE_PASSWORD" | "SESSION_SECRET"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const encoder = new TextEncoder();

function timingSafeEqualText(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function deriveSessionValue(): Promise<string> {
  const secret = getEnvOrThrow("SESSION_SECRET");
  const password = getEnvOrThrow("SITE_PASSWORD");

  // Stable token: HMAC(secret, site_password) using Web Crypto (Edge-compatible).
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(password));
  return toHex(new Uint8Array(signature));
}

export function isValidPassword(input: string): boolean {
  const expectedPassword = getEnvOrThrow("SITE_PASSWORD");
  return input === expectedPassword;
}

export async function isValidSessionCookie(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) {
    return false;
  }

  const expected = await deriveSessionValue();
  return timingSafeEqualText(cookieValue, expected);
}
