import type { Context } from "hono";
import {
  LEARNER_SCHEMA_VERSION,
  authorizeLearnerRequest,
  jsonError,
  parseAppLanguage,
  parseStudyLanguage,
} from "./learnerAuth";

type AccountEnv = {
  Bindings: Env;
};

export const ACCOUNT_SCHEMA_VERSION = LEARNER_SCHEMA_VERSION;

function trimDisplayName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 120) return null;
  return trimmed;
}

function trimEmail(raw: unknown): string | null {
  if (raw === undefined || raw === null) return null;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (trimmed.length > 320) return null;
  return trimmed;
}

function parseUpdatedAt(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || Number.isNaN(Date.parse(trimmed))) return null;
  return trimmed;
}

export async function handleAccountHealth(c: Context<AccountEnv>) {
  return c.json({
    status: "ok",
    surface: "learner-account",
    schemaVersion: ACCOUNT_SCHEMA_VERSION,
    storage: c.env.DB ? "d1" : "unconfigured",
    auth: c.env.PROGRESS_SYNC_SECRET ? "hmac" : "unconfigured",
  });
}

export async function handleAccountGet(c: Context<AccountEnv>) {
  const auth = await authorizeLearnerRequest(c);
  if (auth instanceof Response) return auth;

  const row = await c.env.DB!.prepare(
    `SELECT provider, email, display_name, app_language, study_language,
            created_at, updated_at, last_seen_at
     FROM learner_accounts WHERE account_key = ?`,
  )
    .bind(auth.accountKey)
    .first<{
      provider: string;
      email: string | null;
      display_name: string;
      app_language: string;
      study_language: string;
      created_at: string;
      updated_at: string;
      last_seen_at: string;
    }>();

  if (!row) {
    return jsonError("ACCOUNT_NOT_FOUND", "No learner account stored.", 404);
  }

  return c.json({
    status: "ok",
    account: {
      provider: row.provider,
      email: row.email,
      displayName: row.display_name,
      appLanguage: row.app_language,
      studyLanguage: row.study_language,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      lastSeenAt: row.last_seen_at,
    },
  });
}

export async function handleAccountPut(c: Context<AccountEnv>) {
  const auth = await authorizeLearnerRequest(c);
  if (auth instanceof Response) return auth;

  let body: {
    schemaVersion?: number;
    displayName?: string;
    email?: string | null;
    appLanguage?: string;
    studyLanguage?: string;
    updatedAt?: string;
  };
  try {
    body = await c.req.json();
  } catch {
    return jsonError("ACCOUNT_INVALID", "Request body must be JSON.", 400);
  }

  if (body.schemaVersion !== ACCOUNT_SCHEMA_VERSION) {
    return jsonError("ACCOUNT_INVALID", "Unsupported schemaVersion.", 400);
  }

  const displayName = trimDisplayName(body.displayName);
  if (!displayName) {
    return jsonError("ACCOUNT_INVALID", "displayName is required.", 400);
  }

  const appLanguage = parseAppLanguage(body.appLanguage ?? null);
  if (!appLanguage) {
    return jsonError("ACCOUNT_INVALID", "appLanguage must be pt or en.", 400);
  }

  const studyLanguage = parseStudyLanguage(body.studyLanguage ?? null);
  if (!studyLanguage) {
    return jsonError("ACCOUNT_INVALID", "studyLanguage is required.", 400);
  }

  const updatedAt = parseUpdatedAt(body.updatedAt);
  if (!updatedAt) {
    return jsonError(
      "ACCOUNT_INVALID",
      "updatedAt must be an ISO-8601 timestamp.",
      400,
    );
  }

  const email = trimEmail(body.email);

  const existing = await c.env.DB!.prepare(
    "SELECT created_at FROM learner_accounts WHERE account_key = ?",
  )
    .bind(auth.accountKey)
    .first<{ created_at: string }>();

  const createdAt = existing?.created_at ?? updatedAt;

  await c.env.DB!.prepare(
    `INSERT INTO learner_accounts (
       account_key, provider, email, display_name, app_language, study_language,
       created_at, updated_at, last_seen_at
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(account_key) DO UPDATE SET
       provider = excluded.provider,
       email = excluded.email,
       display_name = excluded.display_name,
       app_language = excluded.app_language,
       study_language = excluded.study_language,
       updated_at = excluded.updated_at,
       last_seen_at = excluded.last_seen_at`,
  )
    .bind(
      auth.accountKey,
      auth.provider,
      email,
      displayName,
      appLanguage,
      studyLanguage,
      createdAt,
      updatedAt,
      updatedAt,
    )
    .run();

  return c.json({
    status: "ok",
    account: {
      provider: auth.provider,
      email,
      displayName,
      appLanguage,
      studyLanguage,
      createdAt,
      updatedAt,
      lastSeenAt: updatedAt,
    },
  });
}

export async function handleAccountDelete(c: Context<AccountEnv>) {
  const auth = await authorizeLearnerRequest(c);
  if (auth instanceof Response) return auth;

  await c.env.DB!.prepare(
    "DELETE FROM learner_progress WHERE account_key = ?",
  )
    .bind(auth.accountKey)
    .run();

  await c.env.DB!.prepare(
    "DELETE FROM learner_accounts WHERE account_key = ?",
  )
    .bind(auth.accountKey)
    .run();

  return c.json({ status: "ok", deleted: true });
}
