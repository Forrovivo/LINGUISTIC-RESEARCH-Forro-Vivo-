export class GithubError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "GithubError";
  }
}

type GitTreeEntry = { path?: string; type?: string };

function dataOrigin(env: Env): string {
  return (env.GITHUB_DATA_ORIGIN || "").replace(/\/$/, "");
}

function githubHeaders(env: Env): Headers {
  const headers = new Headers({
    "User-Agent": "ForroVivo-Linguistic-Research-API",
    Accept: "application/vnd.github.raw",
  });
  if (env.GITHUB_TOKEN) {
    headers.set("Authorization", `Bearer ${env.GITHUB_TOKEN}`);
  }
  return headers;
}

function cacheTtl(env: Env): number {
  const parsed = Number(env.GITHUB_CACHE_TTL);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 300;
}

export function githubFileUrl(env: Env, relativePath: string): string {
  const path = relativePath.replace(/^\/+/, "");
  return `${dataOrigin(env)}/${path}`;
}

export async function fetchGithubFile(
  env: Env,
  relativePath: string,
): Promise<{ body: ArrayBuffer; contentType: string } | null> {
  const url = githubFileUrl(env, relativePath);
  const response = await fetch(url, {
    headers: githubHeaders(env),
    cf: {
      cacheEverything: true,
      cacheTtl: cacheTtl(env),
    },
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new GithubError(
      `GitHub could not serve ${relativePath} (${response.status}).`,
      response.status >= 500 ? 503 : 502,
    );
  }
  return {
    body: await response.arrayBuffer(),
    contentType: response.headers.get("Content-Type") || "application/octet-stream",
  };
}

export async function fetchGithubText(
  env: Env,
  relativePath: string,
): Promise<string | null> {
  const file = await fetchGithubFile(env, relativePath);
  if (!file) {
    return null;
  }
  return new TextDecoder().decode(file.body);
}

export async function fetchGithubJson(
  env: Env,
  relativePath: string,
): Promise<Record<string, unknown> | null> {
  const text = await fetchGithubText(env, relativePath);
  if (text === null) {
    return null;
  }
  return JSON.parse(text) as Record<string, unknown>;
}

let blobIndex: Promise<Set<string> | null> | null = null;

export async function repoHasFile(env: Env, relativePath: string): Promise<boolean> {
  const files = await listRepoBlobs(env);
  if (!files) {
    return false;
  }
  return files.has(relativePath.replace(/^\/+/, ""));
}

async function listRepoBlobs(env: Env): Promise<Set<string> | null> {
  if (!blobIndex) {
    blobIndex = fetchRepoBlobs(env);
  }
  return blobIndex;
}

async function fetchRepoBlobs(env: Env): Promise<Set<string> | null> {
  const owner = env.GITHUB_OWNER;
  const repo = env.GITHUB_REPO;
  const ref = env.GITHUB_REF || "main";
  const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`;
  const headers = githubHeaders(env);
  headers.set("Accept", "application/vnd.github+json");
  const response = await fetch(url, {
    headers,
    cf: {
      cacheEverything: true,
      cacheTtl: cacheTtl(env),
    },
  });
  if (!response.ok) {
    return null;
  }
  const payload = (await response.json()) as { tree?: GitTreeEntry[] };
  const paths = new Set<string>();
  for (const entry of payload.tree || []) {
    if (entry.type === "blob" && entry.path) {
      paths.add(entry.path);
    }
  }
  return paths;
}
