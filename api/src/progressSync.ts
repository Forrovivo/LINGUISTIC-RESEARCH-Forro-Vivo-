import type { Context } from "hono";

type ProgressEnv = {
  Bindings: Env;
};

export const PROGRESS_SCHEMA_VERSION = 1;
export const PROGRESS_ACCOUNT_HEADER = "X-ForroVivo-Account";

function jsonError(
  code: string,
  message: string,
  status: 400 | 401 | 404 | 405 | 413 | 500 | 503,
) {
  return Response.json({ status: "error", code, message }, { status });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function hex(bytes: ArrayBuffer): string {
  return [...new Uint8Array(bytes)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256Hex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return hex(sig);
}

function presentedBearer(authorization: string | undefined): string | null {
  if (!authorization) return null;
  const match = /^Bearer\s+(.+)$/i.exec(authorization.trim());
  return match?.[1]?.trim() || null;
}

function parseAccountKey(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const match = /^(apple|google):[^\s]+$/i.exec(trimmed);
  if (!match) return null;
  const [provider, subject] = trimmed.split(":", 2);
  if (!provider || !subject || subject.length > 256) return null;
  return `${provider.toLowerCase()}:${subject}`;
}

function parseStudyLanguage(raw: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().toLowerCase();
  if (!/^[a-z0-9_-]{2,32}$/.test(trimmed)) return null;
  return trimmed;
}

async function authorizeProgressRequest(
  c: Context<ProgressEnv>,
): Promise<{ accountKey: string } | Response> {
  const secret = c.env.PROGRESS_SYNC_SECRET;
  if (!secret) {
    return jsonError(
      "PROGRESS_UNAVAILABLE",
      "Progress sync is not configured on this deployment.",
      503,
    );
  }
  if (!c.env.DB) {
    return jsonError(
      "PROGRESS_UNAVAILABLE",
      "Progress storage is not configured on this deployment.",
      503,
    );
  }

  const accountKey = parseAccountKey(c.req.header(PROGRESS_ACCOUNT_HEADER));
  if (!accountKey) {
    return jsonError(
      "PROGRESS_AUTH_INVALID",
      "Missing or invalid account header.",
      401,
    );
  }

  const token = presentedBearer(c.req.header("Authorization"));
  if (!token) {
    return jsonError(
      "PROGRESS_AUTH_INVALID",
      "Missing progress authorization.",
      401,
    );
  }

  const expected = await hmacSha256Hex(accountKey, secret);
  if (!timingSafeEqual(expected, token.toLowerCase())) {
    return jsonError(
      "PROGRESS_AUTH_INVALID",
      "Progress authorization failed.",
      401,
    );
  }

  return { accountKey };
}

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
  const auth = await authorizeProgressRequest(c);
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
  const auth = await authorizeProgressRequest(c);
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
  const auth = await authorizeProgressRequest(c);
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
