import test from "node:test";
import assert from "node:assert/strict";

import {
  calculateCommissionAmount,
  createPartnerToken,
  decryptPartnerToken,
  hashPartnerToken,
  resolveCommissionStatus,
  validateLeadSubmission,
} from "../src/lib/partner-program.ts";

process.env.PARTNER_TOKEN_ENCRYPTION_KEY =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

test("createPartnerToken generates a verifiable token", () => {
  const token = createPartnerToken();

  assert.equal(hashPartnerToken(token.rawToken), token.tokenHash);
  assert.equal(decryptPartnerToken(token.tokenEncrypted), token.rawToken);
  assert.equal(token.tokenLastFour, token.rawToken.slice(-4));
});

test("validateLeadSubmission rejects missing required fields", () => {
  const result = validateLeadSubmission({
    companyName: "",
    contactName: "",
    email: "wrong",
    phone: "",
    website: "invalid-url",
    countryCity: "",
    serviceNeeded: "",
    estimatedBudget: "",
    additionalContext: "",
    consentToShare: false,
  });

  assert.ok(result.errors.companyName);
  assert.ok(result.errors.contactName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.website);
  assert.ok(result.errors.serviceNeeded);
  assert.ok(result.errors.consentToShare);
});

test("commission is calculated from clientPaidAmount and snapshot percent", () => {
  assert.equal(calculateCommissionAmount("1500", 10), "150.00");
  assert.equal(calculateCommissionAmount("1500", 20), "300.00");
  assert.equal(calculateCommissionAmount("", 20), null);
});

test("commission status becomes not applicable when client paid amount is empty", () => {
  assert.equal(resolveCommissionStatus("DUE", ""), "NOT_APPLICABLE");
  assert.equal(resolveCommissionStatus("DUE", "0"), "NOT_APPLICABLE");
  assert.equal(resolveCommissionStatus("PAID", "2500"), "PAID");
  assert.equal(resolveCommissionStatus("PENDING", "2500"), "PENDING");
});

