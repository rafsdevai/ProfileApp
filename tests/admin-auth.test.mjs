import test from "node:test";
import assert from "node:assert/strict";

import {
  hashAdminPassword,
  verifyAdminCredentialsFromConfig,
  verifyAdminPassword,
} from "../src/lib/admin-auth-crypto.ts";

test("verifyAdminPassword accepts the original password and rejects a different one", () => {
  const hash = hashAdminPassword("super-secret-password");

  assert.equal(verifyAdminPassword("super-secret-password", hash), true);
  assert.equal(verifyAdminPassword("different-password", hash), false);
});

test("verifyAdminCredentials rejects unauthorized admin access", () => {
  const hash = hashAdminPassword("correct-password");

  assert.equal(
    verifyAdminCredentialsFromConfig({
      expectedEmail: "admin@rafaeldev.ro",
      expectedPasswordHash: hash,
      email: "admin@rafaeldev.ro",
      password: "wrong-password",
    }),
    false,
  );
  assert.equal(
    verifyAdminCredentialsFromConfig({
      expectedEmail: "admin@rafaeldev.ro",
      expectedPasswordHash: hash,
      email: "other@rafaeldev.ro",
      password: "correct-password",
    }),
    false,
  );
  assert.equal(
    verifyAdminCredentialsFromConfig({
      expectedEmail: "admin@rafaeldev.ro",
      expectedPasswordHash: hash,
      email: "admin@rafaeldev.ro",
      password: "correct-password",
    }),
    true,
  );
});

