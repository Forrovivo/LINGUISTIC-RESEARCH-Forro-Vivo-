-- ForroVivo Learning app: signed-in learner account registry (Apple / Google).
CREATE TABLE IF NOT EXISTS learner_accounts (
  account_key TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  email TEXT,
  display_name TEXT NOT NULL DEFAULT '',
  app_language TEXT NOT NULL DEFAULT 'pt',
  study_language TEXT NOT NULL DEFAULT 'forro',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_learner_accounts_updated
  ON learner_accounts (updated_at);
