import { hashAdminPassword } from "../src/lib/admin-auth-crypto.ts";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run admin:hash-password -- "your-password"');
  process.exit(1);
}

console.log(hashAdminPassword(password));

