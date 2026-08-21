interface RateLimitBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  API_KEYS?: KVNamespace;
  API_RATE_LIMIT?: RateLimitBinding;
  GITHUB_TOKEN?: string;
  API_HOST?: string;
  API_ORIGIN?: string;
  SITE_ORIGIN?: string;
  GITHUB_URL?: string;
  GITHUB_OWNER?: string;
  GITHUB_REPO?: string;
  GITHUB_REF?: string;
  GITHUB_DATA_ORIGIN?: string;
  APP_STORE_URL?: string;
  GITHUB_CACHE_TTL?: string;
}
