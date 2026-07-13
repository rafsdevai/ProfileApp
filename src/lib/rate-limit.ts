const DEFAULT_IDENTIFIER = "unknown";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitEntry>;

type ConsumeRateLimitOptions = {
  namespace: string;
  identifier: string;
  limit: number;
  windowMs: number;
};

type ConsumeRateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
  resetAt: number;
};

declare global {
  var __rafaelDevRateLimitStore__: RateLimitStore | undefined;
}

function getRateLimitStore() {
  if (!globalThis.__rafaelDevRateLimitStore__) {
    globalThis.__rafaelDevRateLimitStore__ = new Map<string, RateLimitEntry>();
  }

  return globalThis.__rafaelDevRateLimitStore__;
}

function buildKey(namespace: string, identifier: string) {
  return `${namespace}:${identifier || DEFAULT_IDENTIFIER}`;
}

function cleanupExpiredEntries(store: RateLimitStore, now: number) {
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function consumeRateLimit({
  namespace,
  identifier,
  limit,
  windowMs,
}: ConsumeRateLimitOptions): ConsumeRateLimitResult {
  const now = Date.now();
  const store = getRateLimitStore();

  cleanupExpiredEntries(store, now);

  const key = buildKey(namespace, identifier);
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    const nextEntry = {
      count: 1,
      resetAt: now + windowMs,
    };

    store.set(key, nextEntry);

    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      retryAfterMs: windowMs,
      resetAt: nextEntry.resetAt,
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: Math.max(0, current.resetAt - now),
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    retryAfterMs: Math.max(0, current.resetAt - now),
    resetAt: current.resetAt,
  };
}

export function resetRateLimit(namespace: string, identifier: string) {
  const store = getRateLimitStore();
  store.delete(buildKey(namespace, identifier));
}

export function getClientIpFromHeaders(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();

    if (firstIp) {
      return firstIp;
    }
  }

  const realIp = headers.get("x-real-ip")?.trim();

  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = headers.get("cf-connecting-ip")?.trim();

  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return DEFAULT_IDENTIFIER;
}

export function retryAfterSeconds(retryAfterMs: number) {
  return Math.max(1, Math.ceil(retryAfterMs / 1000));
}
