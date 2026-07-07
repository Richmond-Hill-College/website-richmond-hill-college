-- Richmond Hill College — initial schema
-- Run once against your Neon database. Idempotent.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT,
  message       TEXT        NOT NULL,
  locale        TEXT        NOT NULL DEFAULT 'en',
  source_path   TEXT,
  send_copy     BOOLEAN     NOT NULL DEFAULT FALSE,
  ip_hash       TEXT,                    -- sha256(ip + secret); never store raw IP
  user_agent    TEXT,
  status        TEXT        NOT NULL DEFAULT 'new',  -- new | emailed | spam | replied
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
  ON contact_submissions (LOWER(email));
