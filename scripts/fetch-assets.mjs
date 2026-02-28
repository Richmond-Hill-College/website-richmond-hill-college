#!/usr/bin/env node
/**
 * Fetches assets from asset-manifest.json into the project.
 * Run from repo root: node scripts/fetch-assets.mjs
 */

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const manifestPath = path.join(__dirname, "asset-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; RHC-asset-fetch)" } }, (res) => {
      const redirect = res.headers.location;
      if (redirect && (res.statusCode === 301 || res.statusCode === 302)) {
        get(redirect).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on("data", (d) => chunks.push(d));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });
    req.on("error", reject);
  });
}

async function main() {
  for (const { url, path: filePath } of manifest) {
    const absolutePath = path.join(root, filePath);
    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    try {
      const data = await get(url);
      fs.writeFileSync(absolutePath, data);
      console.log("OK", filePath);
    } catch (err) {
      console.error("FAIL", filePath, err.message);
    }
  }
}

main();
