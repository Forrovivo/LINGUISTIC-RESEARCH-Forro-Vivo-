-- ForroVivo Learning app: optional signed-in learner progress snapshots.
CREATE TABLE IF NOT EXISTS learner_progress (
  account_key TEXT NOT NULL,
  study_language TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (account_key, study_language)
);

CREATE INDEX IF NOT EXISTS idx_learner_progress_updated
  ON learner_progress (updated_at);
