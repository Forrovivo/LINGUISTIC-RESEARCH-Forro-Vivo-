import type { Context } from "hono";

type LearnerEnv = {
  Bindings: Env;
};

export const LEARNER_SCHEMA_VERSION = 1;
export const LEARNER_ACCOUNT_HEADER = "X-ForroVivo-Account";

export function jsonError(
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

export function parseAccountKey(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const match = /^(apple|google):[^\s]+$/i.exec(trimmed);
  if (!match) return null;
  const [provider, subject] = trimmed.split(":", 2);
  if (!provider || !subject || subject.length > 256) return null;
  return `${provider.toLowerCase()}:${subject}`;
}

export function accountProvider(accountKey: string): string | null {
  const [provider] = accountKey.split(":", 2);
  if (provider === "apple" || provider === "google") return provider;
  return null;
}

export function parseStudyLanguage(raw: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().toLowerCase();
  if (!/^[a-z0-9_-]{2,32}$/.test(trimmed)) return null;
  return trimmed;
}

export function parseAppLanguage(raw: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().toLowerCase();
  if (trimmed === "pt" || trimmed === "en") return trimmed;
  return null;
}

export async function authorizeLearnerRequest(
  c: Context<LearnerEnv>,
): Promise<{ accountKey: string; provider: string } | Response> {
  const secret = c.env.PROGRESS_SYNC_SECRET;
  if (!secret) {
    return jsonError(
      "LEARNER_UNAVAILABLE",
      "Learner cloud sync is not configured on this deployment.",
      503,
    );
  }
  if (!c.env.DB) {
    return jsonError(
      "LEARNER_UNAVAILABLE",
      "Learner storage is not configured on this deployment.",
      503,
    );
  }

  const accountKey = parseAccountKey(c.req.header(LEARNER_ACCOUNT_HEADER));
  if (!accountKey) {
    return jsonError(
      "LEARNER_AUTH_INVALID",
      "Missing or invalid account header.",
      401,
    );
  }

  const provider = accountProvider(accountKey);
  if (!provider) {
    return jsonError(
      "LEARNER_AUTH_INVALID",
      "Missing or invalid account header.",
      401,
    );
  }

  const token = presentedBearer(c.req.header("Authorization"));
  if (!token) {
    return jsonError(
      "LEARNER_AUTH_INVALID",
      "Missing learner authorization.",
      401,
    );
  }

  const expected = await hmacSha256Hex(accountKey, secret);
  if (!timingSafeEqual(expected, token.toLowerCase())) {
    return jsonError(
      "LEARNER_AUTH_INVALID",
      "Learner authorization failed.",
      401,
    );
  }

  return { accountKey, provider };
}
