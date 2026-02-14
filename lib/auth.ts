const encoder = new TextEncoder();

export const AUTH_COOKIE_NAME = "auth";
const AUTH_PAYLOAD = "v1";

function getEnvOrThrow(name: "SITE_PASSWORD" | "SESSION_SECRET"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

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

async function sign(message: string): Promise<string> {
  const secret = getEnvOrThrow("SESSION_SECRET");
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(new Uint8Array(signature));
}

export function isValidPassword(input: string): boolean {
  const expectedPassword = getEnvOrThrow("SITE_PASSWORD");
  return input === expectedPassword;
}

export async function buildAuthCookieValue(): Promise<string> {
  const sitePassword = getEnvOrThrow("SITE_PASSWORD");
  const sig = await sign(`${AUTH_PAYLOAD}:${sitePassword}`);
  return `${AUTH_PAYLOAD}.${sig}`;
}

export async function isValidAuthCookie(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) {
    return false;
  }

  const [payload, providedSig] = cookieValue.split(".");
  if (!payload || !providedSig || payload !== AUTH_PAYLOAD) {
    return false;
  }

  const sitePassword = getEnvOrThrow("SITE_PASSWORD");
  const expectedSig = await sign(`${payload}:${sitePassword}`);
  return timingSafeEqualText(providedSig, expectedSig);
}
