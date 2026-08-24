import { GithubError } from "./github";

/** Learning-app remote catalog (private Forrovivo/datasets), not open research. */
const ALLOWED_PATHS = new Set([
  "manifest.json",
  "forro/dictionary.json",
  "forro/kontu_cultura.json",
  "forro/learning_path.json",
  "forro/models.json",
  "forro/voice_audio.zip",
]);

function datasetsOrigin(env: Env): string {
  const configured = (env.DATASETS_GITHUB_DATA_ORIGIN || "").replace(/\/$/, "");
  if (configured) {
    return configured;
  }
  const owner = env.DATASETS_GITHUB_OWNER || "Forrovivo";
  const repo = env.DATASETS_GITHUB_REPO || "datasets";
  const ref = env.DATASETS_GITHUB_REF || "main";
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}`;
}

function datasetsHeaders(env: Env): Headers {
  const headers = new Headers({
    "User-Agent": "ForroVivo-Remote-Catalog",
    Accept: "application/vnd.github.raw",
  });
  const token = env.DATASETS_GITHUB_TOKEN || env.GITHUB_TOKEN;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

function cacheTtl(env: Env): number {
  const parsed = Number(env.GITHUB_CACHE_TTL);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 300;
}

function contentTypeFor(path: string): string {
  if (path.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }
  if (path.endsWith(".zip")) {
    return "application/zip";
  }
  return "application/octet-stream";
}

export function normalizeCatalogPath(raw: string): string | null {
  const cleaned = raw.replace(/^\/+/, "").replace(/\\/g, "/");
  if (!cleaned || cleaned.includes("..") || cleaned.includes("//")) {
    return null;
  }
  if (!ALLOWED_PATHS.has(cleaned)) {
    return null;
  }
  return cleaned;
}

/**
 * Stream a private datasets pack through the Worker without buffering the body.
 * GitHub stays private; the app only talks to api.forrovivo.com.
 */
export async function proxyRemoteCatalogFile(
  env: Env,
  relativePath: string,
): Promise<Response> {
  const path = normalizeCatalogPath(relativePath);
  if (!path) {
    return Response.json(
      {
        status: "error",
        code: "CATALOG_PATH_DENIED",
        message: "That remote-catalog path is not published.",
      },
      { status: 404 },
    );
  }

  const url = `${datasetsOrigin(env)}/${path}`;
  const upstream = await fetch(url, {
    headers: datasetsHeaders(env),
    cf: {
      cacheEverything: true,
      cacheTtl: cacheTtl(env),
    },
  });

  if (upstream.status === 404) {
    return Response.json(
      {
        status: "error",
        code: "CATALOG_NOT_FOUND",
        message: `Remote catalog file missing: ${path}`,
      },
      { status: 404 },
    );
  }

  if (!upstream.ok) {
    throw new GithubError(
      `Private datasets could not serve ${path} (${upstream.status}).`,
      upstream.status >= 500 ? 503 : 502,
    );
  }

  const headers = new Headers({
    "Content-Type": contentTypeFor(path),
    "Cache-Control": `public, max-age=${cacheTtl(env)}`,
    "X-Catalog-Source": "forrovivo-datasets",
  });
  const etag = upstream.headers.get("ETag");
  if (etag) {
    headers.set("ETag", etag);
  }
  const length = upstream.headers.get("Content-Length");
  if (length) {
    headers.set("Content-Length", length);
  }

  return new Response(upstream.body, {
    status: 200,
    headers,
  });
}
