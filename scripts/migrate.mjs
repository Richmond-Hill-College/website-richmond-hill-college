#!/usr/bin/env node
/**
 * Apply SQL migrations in lib/migrations/ to the Neon database.
 *
 * Usage:
 *   DATABASE_URL=postgres://... node scripts/migrate.mjs
 *
 * Migrations are run in lexical order. Each file should be idempotent
 * (CREATE TABLE IF NOT EXISTS, etc.) so re-running is safe.
 */
import { neon } from "@neondatabase/serverless";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "..", "lib", "migrations");

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("Missing DATABASE_URL.");
    process.exit(1);
  }
  const sql = neon(url);

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("No migrations found in", MIGRATIONS_DIR);
    return;
  }

  for (const f of files) {
    const path = join(MIGRATIONS_DIR, f);
    const text = readFileSync(path, "utf8");
    console.log(`▶ ${f}`);
    // Neon HTTP driver doesn't support multi-statement queries in one call,
    // so split on ';' for simple migrations. Strip empty parts and comments.
    const statements = text
      .split(/;\s*\n/)
      .map((s) => s.replace(/--[^\n]*\n/g, "").trim())
      .filter((s) => s.length > 0);
    for (const stmt of statements) {
      // eslint-disable-next-line no-await-in-loop
      await sql.query(stmt);
    }
    console.log(`✓ ${f}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
