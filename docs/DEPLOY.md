# Deploy & Operations Runbook

The site auto-deploys to Vercel from the GitHub `main` branch. Production URL: https://www.richmondhillcollege.ca

## First-time setup

1. **Vercel project** is already linked (see `.vercel/project.json`). New developers run `vercel link` and select `richmond-hill-college` under the team `eJKxHTr6hBHmFlauJdoj4A2g`.
2. **Environment variables** — set these in Vercel → Project → Settings → Environment Variables. See `.env.example` for the full list. Set them for **all three** environments (Production / Preview / Development).
3. **Neon database** — create a project at https://console.neon.tech and paste the pooled connection string into `DATABASE_URL`. Then run the migration:
   ```bash
   DATABASE_URL=postgres://... npm run db:migrate
   ```
4. **Resend** — create an API key at https://resend.com, verify the sending domain (`richmondhillcollege.ca`), set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_NOTIFY_EMAIL`.
5. **GA4 (optional)** — create a GA4 property and paste the measurement ID into `NEXT_PUBLIC_GA_ID`. Loads only after user accepts cookies.
6. **Sentry (optional)** — create a Next.js project at https://sentry.io. Set `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`.

## Daily flow

```bash
git checkout -b your-feature
# edit
npm run dev          # http://localhost:3000
npm run lint         # check before pushing
git push origin your-feature
# Open PR — Vercel posts a Preview URL on the PR
# Merge to main — production deploy is automatic
```

## Database migrations

Migrations live in `lib/migrations/` as numbered SQL files. Each must be **idempotent** (use `CREATE TABLE IF NOT EXISTS`). To apply:

```bash
DATABASE_URL=postgres://... node scripts/migrate.mjs
```

Migrations are not auto-applied on deploy. Run manually before merging a change that depends on a new column or table.

## Rolling back

- **Code rollback** — Vercel → Deployments → pick the prior green deploy → "Promote to Production".
- **Database rollback** — Neon supports point-in-time restore via the dashboard. Migrations should always be additive (add columns nullable, never DROP) so rollback is rarely needed.

## Monitoring

- **Errors** — Sentry dashboard (DSN: see `NEXT_PUBLIC_SENTRY_DSN`).
- **Traffic** — Google Analytics 4 property.
- **Build/runtime logs** — Vercel → Project → Logs.

## Common tasks

- **Add a new page** — see `docs/CONTENT-EDITING.md` and `README.md`. Always update `lib/sitemap-routes.ts`.
- **Update a course** — edit `lib/rhc-global-bridge-courses.ts`. Re-deploy.
- **Add a team member** — edit `lib/team.ts`.
- **Pull contact submissions** — `psql $DATABASE_URL -c "SELECT id, name, email, created_at FROM contact_submissions ORDER BY created_at DESC LIMIT 50;"`
