import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyAdminPassword(password: string, passwordHash: string) {
  const [algorithm, salt, storedHash] = passwordHash.split(":");

  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const calculatedHash = scryptSync(password, salt, 64);
  const expectedHash = Buffer.from(storedHash, "hex");

  if (calculatedHash.byteLength !== expectedHash.byteLength) {
    return false;
  }

  return timingSafeEqual(calculatedHash, expectedHash);
}

export function verifyAdminCredentialsFromConfig({
  expectedEmail,
  expectedPasswordHash,
  email,
  password,
}: {
  expectedEmail: string;
  expectedPasswordHash: string;
  email: string;
  password: string;
}) {
  return (
    email.trim().toLowerCase() === expectedEmail.trim().toLowerCase() &&
    verifyAdminPassword(password, expectedPasswordHash)
  );
}
