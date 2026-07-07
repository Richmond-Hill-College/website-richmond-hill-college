#!/usr/bin/env bash
# One-shot: commit the work from this session and push to main.
# Run from the repo root:  bash scripts/commit-and-push.sh

set -euo pipefail

cd "$(dirname "$0")/.."

# Clear any stale lock from a previous interrupted git operation
[ -f .git/index.lock ] && rm -f .git/index.lock || true

git add -A
git status --short

cat <<'MSG' > /tmp/rhc-commit-msg.txt
feat: contact backend, post-event archive, FR redirects, analytics, search, tests, docs

- Contact form: real /api/contact route → Neon DB persist + Resend email,
  zod validation, honeypot, in-memory rate limit. ContactForm rewired,
  bilingual error/success states.
- Neon DB: lib/db.ts client, lib/migrations/001_contact_submissions.sql,
  scripts/migrate.mjs runner, package.json db:migrate script.
- Conference 2025: PastEventBanner + NotifyMeForm, hubs converted to recap
  framing (EN+FR), time-sensitive subpages set to noindex, sitemap pruned.
- French parity: catch-all routes 308 to canonical EN, FR not-found
  rewritten as proper 404 (not "Coming soon"), accent fixes in CookiesBanner.
- Analytics: GA4 via @next/third-parties, gated by cookie consent.
  Sentry via instrumentation.ts + sentry.{client,server,edge}.config.ts,
  env-driven so dev runs without keys.
- Site search: build-time index from data files, MiniSearch client UI,
  /search EN+FR pages, footer link.
- Tests: Playwright config + smoke/contact/conference suites; GitHub
  Actions CI workflow runs lint+typecheck+e2e on PRs and main.
- Docs: .env.example, docs/DEPLOY.md, docs/CONTENT-EDITING.md,
  docs/BRANCH-CLEANUP.md.
MSG

git commit -F /tmp/rhc-commit-msg.txt
rm -f /tmp/rhc-commit-msg.txt

git push origin HEAD:main

echo ""
echo "Pushed. Vercel will auto-deploy. Watch: https://vercel.com/dashboard"
echo ""
echo "Next steps on your machine:"
echo "  1. Set DATABASE_URL + RESEND_API_KEY in Vercel env"
echo "  2. Run 'DATABASE_URL=... npm run db:migrate' once"
echo "  3. (Optional) NEXT_PUBLIC_GA_ID + Sentry vars"
echo "  4. See docs/BRANCH-CLEANUP.md for the cursor/* branches"
