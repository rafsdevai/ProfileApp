export const COOKIE_CONSENT_STORAGE_KEY = "rafaeldev_cookie_consent";
export const COOKIE_CONSENT_VERSION = "2026-07-15";

export type CookieConsentCategory = "analytics" | "marketing" | "preferences";

export type CookieConsentPreferences = Record<CookieConsentCategory, boolean>;

export type StoredCookieConsent = {
  version: string;
  timestamp: string;
  categories: CookieConsentPreferences;
};

export const defaultCookieConsentPreferences: CookieConsentPreferences = {
  analytics: false,
  marketing: false,
  preferences: false,
};

export const activeOptionalCookieCategories: CookieConsentCategory[] = ["analytics", "marketing"];

export const knownNonEssentialCookies = [
  "_vercel_insights",
  "_ga",
  "_ga_*",
  "_gid",
  "_gat",
  "_gcl_au",
  "_fbp",
  "_fbc",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function createStoredCookieConsent(
  categories: Partial<CookieConsentPreferences>,
): StoredCookieConsent {
  return {
    version: COOKIE_CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: {
      ...defaultCookieConsentPreferences,
      ...categories,
    },
  };
}

export function parseStoredCookieConsent(value: string | null): StoredCookieConsent | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;

    if (!isRecord(parsed) || typeof parsed.version !== "string" || typeof parsed.timestamp !== "string") {
      return null;
    }

    const categories = isRecord(parsed.categories) ? parsed.categories : {};

    return {
      version: parsed.version,
      timestamp: parsed.timestamp,
      categories: {
        analytics: categories.analytics === true,
        marketing: categories.marketing === true,
        preferences: categories.preferences === true,
      },
    };
  } catch {
    return null;
  }
}

export function hasCurrentCookieConsentVersion(consent: StoredCookieConsent | null) {
  return consent?.version === COOKIE_CONSENT_VERSION;
}

export function readStoredCookieConsent() {
  if (typeof window === "undefined") {
    return null;
  }

  return parseStoredCookieConsent(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
}

export function writeStoredCookieConsent(consent: StoredCookieConsent) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(consent));
}

export function deleteCookieConsentRecord() {
  window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
}

function deleteCookieByName(name: string) {
  const hostname = window.location.hostname;
  const hostParts = hostname.split(".");
  const domains = new Set<string | undefined>([
    undefined,
    hostname,
    hostParts.length > 1 ? `.${hostParts.slice(-2).join(".")}` : undefined,
  ]);

  for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ""}`;
  }
}

export function deleteKnownNonEssentialCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map((entry) => entry.trim().split("=")[0])
    .filter(Boolean);

  for (const knownCookie of knownNonEssentialCookies) {
    if (knownCookie.includes("*")) {
      const prefix = knownCookie.replace("*", "");

      for (const cookieName of cookieNames) {
        if (cookieName.startsWith(prefix)) {
          deleteCookieByName(cookieName);
        }
      }

      continue;
    }

    deleteCookieByName(knownCookie);
  }
}

export function stopNonEssentialTracking() {
  if (typeof window === "undefined") {
    return;
  }

  deleteKnownNonEssentialCookies();
}
