interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  DB?: D1Database;
  /** HMAC secret shared with the iOS app for /app/v1/progress (wrangler secret). */
  PROGRESS_SYNC_SECRET?: string;
  API_KEYS?: KVNamespace;
  /** Server-to-server secret required to call POST /v1/keys (Open Knowledge only). */
  KEYS_ISSUE_SECRET?: string;
  API_RATE_LIMIT?: RateLimitBinding;
  GITHUB_TOKEN?: string;
  /** Optional dedicated token for private Forrovivo/datasets (falls back to GITHUB_TOKEN). */
  DATASETS_GITHUB_TOKEN?: string;
  API_HOST?: string;
  API_ORIGIN?: string;
  SITE_ORIGIN?: string;
  GITHUB_URL?: string;
  GITHUB_OWNER?: string;
  GITHUB_REPO?: string;
  GITHUB_REF?: string;
  GITHUB_DATA_ORIGIN?: string;
  DATASETS_GITHUB_OWNER?: string;
  DATASETS_GITHUB_REPO?: string;
  DATASETS_GITHUB_REF?: string;
  DATASETS_GITHUB_DATA_ORIGIN?: string;
  APP_STORE_URL?: string;
  GITHUB_CACHE_TTL?: string;
}
