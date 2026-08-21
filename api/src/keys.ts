export const KEY_PREFIX = "fv_live_";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type KeyRecord = {
  email: string;
  created_at: string;
  prefix: string;
};

export type IssuedKey = KeyRecord & { key: string };

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function mintKey() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  const hex = [...bytes]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return `${KEY_PREFIX}${hex}`;
}

export function presentedKey(
  authorization?: string,
  apiKeyHeader?: string,
) {
  const bearer = authorization?.match(/^Bearer\s+(\S+)/i)?.[1];
  const token = bearer || apiKeyHeader?.trim();
  if (!token || !token.startsWith(KEY_PREFIX)) return null;
  return token;
}

export async function issueKey(
  kv: KVNamespace,
  email: string,
): Promise<{ ok: IssuedKey } | { error: "INVALID_EMAIL" }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !EMAIL_PATTERN.test(normalized)) {
    return { error: "INVALID_EMAIL" };
  }
  const key = mintKey();
  const hash = await sha256Hex(key);
  const emailKey = `email:${normalized}`;
  const previous = await kv.get(emailKey);
  if (previous) await kv.delete(`key:${previous}`);
  const record: KeyRecord = {
    email: normalized,
    created_at: new Date().toISOString(),
    prefix: key.slice(0, 16),
  };
  await kv.put(`key:${hash}`, JSON.stringify(record));
  await kv.put(emailKey, hash);
  return { ok: { key, ...record } };
}

export async function lookupKey(kv: KVNamespace, token: string) {
  const raw = await kv.get(`key:${await sha256Hex(token)}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as KeyRecord;
  } catch {
    return null;
  }
}
