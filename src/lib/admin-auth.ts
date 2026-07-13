import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  hashAdminPassword,
  verifyAdminCredentialsFromConfig,
  verifyAdminPassword,
} from "@/src/lib/admin-auth-crypto";

const sessionCookieName = "rafael_admin_session";
const sessionLifetimeSeconds = 60 * 60 * 12;

function cleanEnvValue(value: string | undefined) {
  if (!value) {
    return value;
  }

  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function getAdminConfig() {
  const email = cleanEnvValue(process.env.ADMIN_LOGIN_EMAIL);
  const passwordHash = cleanEnvValue(process.env.ADMIN_PASSWORD_HASH);
  const sessionSecret = cleanEnvValue(process.env.ADMIN_SESSION_SECRET);

  if (!email || !passwordHash || !sessionSecret) {
    throw new Error(
      "Admin authentication environment variables are missing. Set ADMIN_LOGIN_EMAIL, ADMIN_PASSWORD_HASH, and ADMIN_SESSION_SECRET.",
    );
  }

  return {
    email: email.toLowerCase(),
    passwordHash,
    sessionSecret,
  };
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

type AdminSessionPayload = {
  email: string;
  exp: number;
};

export function verifyAdminCredentials(email: string, password: string) {
  const config = getAdminConfig();

  return verifyAdminCredentialsFromConfig({
    expectedEmail: config.email,
    expectedPasswordHash: config.passwordHash,
    email,
    password,
  });
}

export { hashAdminPassword, verifyAdminPassword };

function createSessionValue(payload: AdminSessionPayload, secret: string) {
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signValue(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

function parseSessionValue(token: string, secret: string): AdminSessionPayload | null {
  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload, secret);

  const provided = Buffer.from(providedSignature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");

  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;

    if (!payload.email || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function createAdminSession(email: string) {
  const { sessionSecret } = getAdminConfig();
  const cookieStore = await cookies();
  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + sessionLifetimeSeconds,
  };

  cookieStore.set(sessionCookieName, createSessionValue(payload, sessionSecret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetimeSeconds,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function getAdminSession() {
  let config;

  try {
    config = getAdminConfig();
  } catch {
    return null;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  return parseSessionValue(token, config.sessionSecret);
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminSession());
}
