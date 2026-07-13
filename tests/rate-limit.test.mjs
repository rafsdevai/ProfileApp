import test from "node:test";
import assert from "node:assert/strict";

import {
  consumeRateLimit,
  resetRateLimit,
  retryAfterSeconds,
} from "../src/lib/rate-limit.ts";

test("consumeRateLimit blocks requests after the configured limit", () => {
  const namespace = "test-rate-limit";
  const identifier = "127.0.0.1";

  resetRateLimit(namespace, identifier);

  const first = consumeRateLimit({
    namespace,
    identifier,
    limit: 2,
    windowMs: 60_000,
  });
  const second = consumeRateLimit({
    namespace,
    identifier,
    limit: 2,
    windowMs: 60_000,
  });
  const third = consumeRateLimit({
    namespace,
    identifier,
    limit: 2,
    windowMs: 60_000,
  });

  assert.equal(first.allowed, true);
  assert.equal(second.allowed, true);
  assert.equal(third.allowed, false);
  assert.equal(third.remaining, 0);
  assert.ok(retryAfterSeconds(third.retryAfterMs) >= 1);

  resetRateLimit(namespace, identifier);
});
