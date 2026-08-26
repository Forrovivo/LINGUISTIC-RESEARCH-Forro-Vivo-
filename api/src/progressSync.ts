import type { Context } from "hono";
import {
  LEARNER_ACCOUNT_HEADER,
  LEARNER_SCHEMA_VERSION,
  authorizeLearnerRequest,
  jsonError,
  parseStudyLanguage,
} from "./learnerAuth";

type ProgressEnv = {
  Bindings: Env;
};

export const PROGRESS_SCHEMA_VERSION = LEARNER_SCHEMA_VERSION;
export const PROGRESS_ACCOUNT_HEADER = LEARNER_ACCOUNT_HEADER;

export async function handleProgressHealth(c: Context<ProgressEnv>) {
  return c.json({
    status: "ok",
    surface: "learner-progress",
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    storage: c.env.DB ? "d1" : "unconfigured",
    auth: c.env.PROGRESS_SYNC_SECRET ? "hmac" : "unconfigured",
  });
}

export async function handleProgressGet(c: Context<ProgressEnv>) {
  const auth = await authorizeLearnerRequest(c);
  if (auth instanceof Response) return auth;

  const studyLanguage = parseStudyLanguage(c.req.query("studyLanguage"));
  if (!studyLanguage) {
    return jsonError(
      "PROGRESS_INVALID",
      "studyLanguage query parameter is required.",
      400,
    );
  }

  const row = await c.env.DB!.prepare(
    "SELECT payload_json, updated_at FROM learner_progress WHERE account_key = ? AND study_language = ?",
  )
    .bind(auth.accountKey, studyLanguage)
    .first<{ payload_json: string; updated_at: string }>();

  if (!row) {
    return jsonError("PROGRESS_NOT_FOUND", "No progress snapshot stored.", 404);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(row.payload_json);
  } catch {
    return jsonError(
      "PROGRESS_CORRUPT",
      "Stored progress snapshot is invalid.",
      500,
    );
  }

  return c.json({
    status: "ok",
    studyLanguage,
    updatedAt: row.updated_at,
    payload,
  });
}

export async function handleProgressPut(c: Context<ProgressEnv>) {
  const auth = await authorizeLearnerRequest(c);
  if (auth instanceof Response) return auth;

  let body: {
    schemaVersion?: number;
    studyLanguage?: string;
    updatedAt?: string;
    payload?: unknown;
  };
  try {
    body = await c.req.json();
  } catch {
    return jsonError("PROGRESS_INVALID", "Request body must be JSON.", 400);
  }

  if (body.schemaVersion !== PROGRESS_SCHEMA_VERSION) {
    return jsonError(
      "PROGRESS_INVALID",
      "Unsupported schemaVersion.",
      400,
    );
  }

  const studyLanguage = parseStudyLanguage(body.studyLanguage ?? null);
  if (!studyLanguage) {
    return jsonError(
      "PROGRESS_INVALID",
      "studyLanguage is required.",
      400,
    );
  }

  const updatedAt = body.updatedAt?.trim();
  if (!updatedAt || Number.isNaN(Date.parse(updatedAt))) {
    return jsonError(
      "PROGRESS_INVALID",
      "updatedAt must be an ISO-8601 timestamp.",
      400,
    );
  }

  if (body.payload === undefined) {
    return jsonError("PROGRESS_INVALID", "payload is required.", 400);
  }

  const payloadJson = JSON.stringify(body.payload);
  if (payloadJson.length > 512_000) {
    return jsonError(
      "PROGRESS_TOO_LARGE",
      "Progress snapshot exceeds the size limit.",
      413,
    );
  }

  await c.env.DB!.prepare(
    `INSERT INTO learner_progress (account_key, study_language, payload_json, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(account_key, study_language) DO UPDATE SET
       payload_json = excluded.payload_json,
       updated_at = excluded.updated_at`,
  )
    .bind(auth.accountKey, studyLanguage, payloadJson, updatedAt)
    .run();

  return c.json({
    status: "ok",
    studyLanguage,
    updatedAt,
  });
}

export async function handleProgressDelete(c: Context<ProgressEnv>) {
  const auth = await authorizeLearnerRequest(c);
  if (auth instanceof Response) return auth;

  const studyLanguage = parseStudyLanguage(c.req.query("studyLanguage"));
  if (!studyLanguage) {
    return jsonError(
      "PROGRESS_INVALID",
      "studyLanguage query parameter is required.",
      400,
    );
  }

  await c.env.DB!.prepare(
    "DELETE FROM learner_progress WHERE account_key = ? AND study_language = ?",
  )
    .bind(auth.accountKey, studyLanguage)
    .run();

  return c.json({ status: "ok", deleted: true, studyLanguage });
}
