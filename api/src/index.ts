import { Hono } from "hono";
import { cors } from "hono/cors";
import { fetchGithubFile, fetchGithubText, GithubError } from "./github";
import {
  collectionDirectory,
  DOCUMENT_COLLECTIONS,
  knowledgeBaseMap,
  languagesCatalog,
  pageRows,
  recordById,
  searchCollection,
  searchDataset,
} from "./knowledge";
import {
  API_FAMILY,
  API_VERSION,
  CORS_ALLOW_METHODS,
  CORS_ALLOW_ORIGIN,
  CORS_EXPOSE_HEADERS,
  FAMILIES,
  DEFAULT_LIMIT,
  GITHUB_URL,
  LICENSE_URL,
  MAX_LIMIT,
  PROJECT_LICENSE,
  RATE_LIMIT,
  attributionLinks,
  rateLimitPolicy,
  settingsFrom,
} from "./settings";
import {
  audioRelativePath,
  Dataset,
  getStore,
  lookupHeadword,
  presentEntry,
  searchEntries,
  Store,
} from "./store";
import { folderFromJsonPath } from "./catalog";
import {
  issueKey,
  keysIssueAuthorized,
  KEYS_ISSUE_HEADER,
  lookupKey,
  presentedKey,
  type KeyRecord,
} from "./keys";

type AppEnv = {
  Bindings: Env;
  Variables: { apiClient?: KeyRecord };
};

const app = new Hono<AppEnv>();
const KNOWLEDGE_AND_SOURCES = [...DOCUMENT_COLLECTIONS, "sources"] as const;
const INDEX_COLLECTIONS = ["entries", ...KNOWLEDGE_AND_SOURCES] as const;

function isLocalHost(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

const RATE_LIMIT_EXEMPT = new Set([
  "/health",
  "/v1/health",
  "/docs",
  "/v1/docs",
  "/openapi.yaml",
  "/v1/openapi.yaml",
]);

function clientKey(c: { req: { header: (name: string) => string | undefined } }) {
  return (
    c.req.header("cf-connecting-ip") ||
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    "local"
  );
}

app.use("*", async (c, next) => {
  const url = new URL(c.req.url);
  if (url.protocol === "http:" && !isLocalHost(url.hostname)) {
    url.protocol = "https:";
    return c.redirect(url.toString(), 308);
  }
  await next();
  if (url.protocol === "https:") {
    c.res.headers.set("Strict-Transport-Security", "max-age=31536000");
  }
});

app.use(
  "*",
  cors({
    origin: CORS_ALLOW_ORIGIN,
    allowMethods: [...CORS_ALLOW_METHODS],
    allowHeaders: [
      "Accept",
      "Content-Type",
      "If-None-Match",
      "Authorization",
      "X-Api-Key",
      KEYS_ISSUE_HEADER,
    ],
    exposeHeaders: [...CORS_EXPOSE_HEADERS],
    maxAge: 86400,
  }),
);

app.use("*", async (c, next) => {
  await next();
  const settings = settingsFrom(c.env);
  c.res.headers.set("API-Version", API_FAMILY);
  c.res.headers.set("RateLimit-Policy", rateLimitPolicy());
  c.res.headers.set("Link", attributionLinks(settings.apiOrigin, settings.githubUrl));
});

app.use("*", async (c, next) => {
  const token = presentedKey(
    c.req.header("Authorization"),
    c.req.header("X-Api-Key"),
  );
  if (!token) {
    await next();
    return;
  }
  if (!c.env.API_KEYS) {
    return c.json(
      {
        status: "error",
        code: "KEYS_UNAVAILABLE",
        message: "API keys are not available on this deployment.",
      },
      503,
    );
  }
  const record = await lookupKey(c.env.API_KEYS, token);
  if (!record) {
    return c.json(
      {
        status: "error",
        code: "KEY_INVALID",
        message: "That API key is not valid.",
      },
      401,
    );
  }
  c.set("apiClient", record);
  await next();
});

app.use("*", async (c, next) => {
  const path = new URL(c.req.url).pathname;
  if (c.req.method === "OPTIONS" || RATE_LIMIT_EXEMPT.has(path)) {
    await next();
    return;
  }
  const limiter = c.env.API_RATE_LIMIT;
  if (!limiter) {
    await next();
    return;
  }
  const client = c.get("apiClient");
  const { success } = await limiter.limit({
    key: client ? `key:${client.email}` : clientKey(c),
  });
  if (!success) {
    return c.json(
      {
        status: "error",
        code: "RATE_LIMITED",
        message: "Too many requests. Retry after the period in Retry-After.",
      },
      429,
      {
        "Retry-After": String(RATE_LIMIT.period),
        "RateLimit-Limit": String(RATE_LIMIT.limit),
        "RateLimit-Policy": rateLimitPolicy(),
      },
    );
  }
  await next();
});

app.onError((error, c) => {
  if (error instanceof GithubError) {
    return c.json(
      {
        status: "error",
        code: "GITHUB_UNAVAILABLE",
        message: error.message,
      },
      error.status as 502 | 503,
    );
  }
  return c.json(
    {
      status: "error",
      code: "INTERNAL_ERROR",
      message: "The API could not complete this request.",
    },
    500,
  );
});

function requestOrigin(c: { req: { url: string }; env: Env }): string {
  return settingsFrom(c.env).apiOrigin.replace(/\/$/, "") || new URL(c.req.url).origin;
}

function present(dataset: Dataset, entry: Record<string, unknown>, origin: string) {
  return presentEntry(dataset, entry, origin);
}

function termNotFound(dataset: Dataset) {
  return { body: dataset.missingTerm, status: 404 as const };
}

function datasetNotFound(key: string) {
  return {
    body: {
      status: "error",
      code: "DATASET_NOT_FOUND",
      message: "No isolated dataset is published at this path.",
      dataset: key,
    },
    status: 404 as const,
  };
}

function datasetRequired(collection: string) {
  return {
    status: "error",
    code: "DATASET_REQUIRED",
    message: "This collection is isolated. Name one dataset; do not search across languages.",
    collection,
    example:
      collection !== "search"
        ? `/v1/saotome/forro/${collection}`
        : "/v1/search?dataset=saotome/forro&q=kume",
  };
}

async function resolve(
  store: Store,
  family: string,
  variety?: string,
): Promise<{ dataset: Dataset } | { error: ReturnType<typeof datasetNotFound> }> {
  if (!FAMILIES.has(family)) {
    return { error: datasetNotFound(variety ? `${family}/${variety}` : family) };
  }
  const key = store.resolveKey(family, variety);
  const dataset = await store.get(key);
  if (!dataset) {
    return { error: datasetNotFound(key) };
  }
  return { dataset };
}

function envelope(dataset: Dataset, extra: Record<string, unknown>): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    dataset: dataset.ref.key,
    kind: dataset.kind,
    language: dataset.document.language,
    attribution: datasetAttribution(dataset),
  };
  if (dataset.ref.canonicalKey) {
    payload.canonical_dataset = dataset.ref.canonicalKey;
  }
  return { ...payload, ...extra };
}

function datasetAttribution(dataset: Dataset): Record<string, unknown> {
  const license = dataset.document.license;
  return {
    dataset: dataset.ref.key,
    github: `${GITHUB_URL}/tree/main/${folderFromJsonPath(dataset.ref.jsonPath)}`,
    sources: `/v1/${dataset.ref.key}/sources`,
    license:
      license && typeof license === "object"
        ? license
        : PROJECT_LICENSE,
    license_url: LICENSE_URL,
  };
}

function presentHit(
  dataset: Dataset,
  hit: { collection: string; item: Record<string, unknown> },
  origin: string,
) {
  if (hit.collection === "entries") {
    return { collection: "entries", item: present(dataset, hit.item, origin) };
  }
  return hit;
}

function presentRecords(
  dataset: Dataset,
  collection: string,
  rows: Record<string, unknown>[],
  origin: string,
) {
  if (collection === "entries") {
    return rows.map((row) => present(dataset, row, origin));
  }
  return rows;
}

function parsePage(url: URL): { offset: number; limit: number } {
  const offset = Math.max(0, Number(url.searchParams.get("offset") || 0) || 0);
  const rawLimit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number.isFinite(rawLimit) ? rawLimit : DEFAULT_LIMIT));
  return { offset, limit };
}

function docsHtml(origin: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>ForroVivo Linguistic Research API</title>
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"/>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    window.ui = SwaggerUIBundle({
      url: ${JSON.stringify(`${origin}/v1/openapi.yaml`)},
      dom_id: "#swagger-ui"
    });
  </script>
</body>
</html>`;
}

app.get("/health", (c) => c.json({ status: "ok" }));
app.get("/v1/health", (c) => c.json({ status: "ok", api: API_FAMILY }));

app.get("/", (c) => c.redirect("/v1", 307));

app.get("/docs", (c) => {
  const origin = requestOrigin(c);
  return c.html(docsHtml(origin));
});
app.get("/v1/docs", (c) => c.redirect("/docs", 307));

app.get("/openapi.yaml", async (c) => serveOpenApi(c));
app.get("/v1/openapi.yaml", async (c) => serveOpenApi(c));

async function serveOpenApi(c: { env: Env; json: Function }) {
  const text = await fetchGithubText(c.env, "api/openapi.yaml");
  if (text === null) {
    return c.json(
      {
        status: "error",
        code: "GITHUB_UNAVAILABLE",
        message: "OpenAPI contract could not be read from GitHub.",
      },
      502,
    );
  }
  return new Response(text, {
    headers: { "Content-Type": "application/yaml; charset=utf-8" },
  });
}

app.post("/v1/keys", async (c) => {
  const issueAuth = keysIssueAuthorized(
    c.env.KEYS_ISSUE_SECRET,
    c.req.header(KEYS_ISSUE_HEADER),
  );
  if (issueAuth === "NOT_CONFIGURED") {
    return c.json(
      {
        status: "error",
        code: "KEYS_ISSUE_NOT_CONFIGURED",
        message:
          "Key issuance is not configured on this deployment. Keys are issued only through the API Platform.",
      },
      503,
    );
  }
  if (issueAuth === "UNAUTHORIZED") {
    return c.json(
      {
        status: "error",
        code: "KEYS_ISSUE_UNAUTHORIZED",
        message:
          "Key issuance requires the API Platform. Public clients cannot mint keys.",
      },
      401,
    );
  }
  if (!c.env.API_KEYS) {
    return c.json(
      {
        status: "error",
        code: "KEYS_UNAVAILABLE",
        message: "API keys are not available on this deployment.",
      },
      503,
    );
  }
  let email = "";
  try {
    const body: unknown = await c.req.json();
    if (body && typeof body === "object" && "email" in body) {
      const value = (body as { email?: unknown }).email;
      if (typeof value === "string") email = value;
    }
  } catch {
    email = "";
  }
  const issued = await issueKey(c.env.API_KEYS, email);
  if ("error" in issued) {
    return c.json(
      {
        status: "error",
        code: "INVALID_EMAIL",
        message: "A valid email address is required.",
      },
      400,
    );
  }
  return c.json(
    {
      status: "ok",
      key: issued.ok.key,
      email: issued.ok.email,
      prefix: issued.ok.prefix,
      created_at: issued.ok.created_at,
      shown_once: true,
      usage: "Authorization: Bearer <key>",
    },
    201,
  );
});

app.get("/v1", (c) => {
  const settings = settingsFrom(c.env);
  return c.json({
    name: "ForroVivo Linguistic Research API",
    api: API_FAMILY,
    version: API_VERSION,
    platform: "ForroVivo",
    initiative: "Linguistic Research",
    founder: "Henriques Pontes",
    idealist: "Henriques Pontes",
    cofounders: ["Luis Lima"],
    host: settings.apiHost,
    url: settings.apiOrigin,
    homepage: settings.siteOrigin,
    github: settings.githubUrl,
    app_store: settings.appStoreUrl,
    runtime: "cloudflare-workers",
    data: "github",
    project_start_date: "2023-03-23",
    authentication:
      "Optional. Public GET stays open. Optional keys are issued only via the API Platform (server-to-server). Send Authorization: Bearer <key>.",
    naming: "/v1/{family}/{variety}/{collection}",
    cors: "Any origin. GET, HEAD, and OPTIONS. Credentials are not used.",
    rate_limit: "Fair-use per client. See RateLimit-Policy and Retry-After.",
    attribution:
      "Each lexicon keeps its cited sources. Project materials are CC BY 4.0. Source extracts keep their original terms. See Link: rel=license and rel=source.",
    principle: "Zero hallucination. Missing data is preferable to incorrect data.",
    isolation:
      "Each path serves one dataset. Parent indexes are not merged lexicons. data/angola_dataset/ is an Angola country index (Contruy, Umbundu, Kimbundu, Kikongo). It is not Angolar / Ngola. Other country folders are indexes of their languages.",
    graph:
      "Each entry includes an attested relation graph: means (Portuguese / English concepts), belongs_to (one language), related_to (grammar, culture), appears_in (proverb, story), documented_by (source). Missing edges stay empty. Edges never cross folders.",
    license: PROJECT_LICENSE,
    docs: `${settings.apiOrigin}/docs`,
    openapi: `${settings.apiOrigin}/v1/openapi.yaml`,
    catalog: `${settings.apiOrigin}/v1/datasets`,
    knowledge_base: `${settings.apiOrigin}/v1/kb`,
    languages: `${settings.apiOrigin}/v1/languages`,
  });
});

app.get("/v1/datasets", async (c) => {
  const store = await getStore(c.env);
  return c.json({ datasets: await store.catalog() });
});

app.get("/v1/kb", (c) => c.json(knowledgeBaseMap(requestOrigin(c))));

app.get("/v1/languages", async (c) => {
  const store = await getStore(c.env);
  return c.json(languagesCatalog(await store.lexicons(), requestOrigin(c)));
});

app.get("/v1/search", async (c) => {
  const datasetKey = c.req.query("dataset");
  const q = c.req.query("q");
  if (!datasetKey) {
    return c.json(datasetRequired("search"), 400);
  }
  const parts = datasetKey.replace(/^\/+|\/+$/g, "").split("/");
  const store = await getStore(c.env);
  const resolved = await resolve(store, parts[0], parts[1]);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  if (resolved.dataset.kind === "index") {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  if (!q) {
    return c.json(
      {
        status: "error",
        code: "QUERY_REQUIRED",
        message: "Search requires q= inside one isolated dataset.",
        dataset: resolved.dataset.ref.key,
      },
      400,
    );
  }
  const { offset, limit } = parsePage(new URL(c.req.url));
  const rows = searchDataset(resolved.dataset, q);
  const [page, total] = pageRows(rows, offset, limit);
  const origin = requestOrigin(c);
  return c.json(
    envelope(resolved.dataset, {
      collection: "search",
      query: q,
      total,
      offset,
      limit,
      results: page.map((hit) => presentHit(resolved.dataset, hit, origin)),
    }),
  );
});

for (const name of INDEX_COLLECTIONS) {
  app.get(`/v1/${name}`, async (c) => {
    const store = await getStore(c.env);
    return c.json(collectionDirectory(await store.lexicons(), name));
  });
}

async function handleLookup(c: { req: { query: (name: string) => string | undefined; url: string }; env: Env; json: Function }, family: string, variety?: string) {
  const headword = c.req.query("headword") || "";
  if (!headword) {
    return c.json(
      {
        status: "error",
        code: "QUERY_REQUIRED",
        message: "Lookup requires headword= inside one isolated dataset.",
      },
      400,
    );
  }
  const store = await getStore(c.env);
  const resolved = await resolve(store, family, variety);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  if (resolved.dataset.kind === "index") {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  const [match, entries] = lookupHeadword(resolved.dataset, headword);
  if (!entries.length) {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  const origin = requestOrigin(c);
  return c.json(
    envelope(resolved.dataset, {
      query: { headword },
      match,
      count: entries.length,
      entries: entries.map((entry) => present(resolved.dataset, entry, origin)),
    }),
  );
}

app.get("/v1/:family/lookup", (c) => handleLookup(c, c.req.param("family")));
app.get("/v1/:family/:variety/lookup", (c) =>
  handleLookup(c, c.req.param("family"), c.req.param("variety")),
);

app.get("/v1/:family/entries/:entry_id", async (c) => {
  return handleEntry(c, c.req.param("family"), undefined, c.req.param("entry_id"));
});
app.get("/v1/:family/:variety/entries/:entry_id", async (c) => {
  return handleEntry(
    c,
    c.req.param("family"),
    c.req.param("variety"),
    c.req.param("entry_id"),
  );
});

async function handleEntry(
  c: { req: { url: string }; env: Env; json: Function },
  family: string,
  variety: string | undefined,
  entryId: string,
) {
  const store = await getStore(c.env);
  const resolved = await resolve(store, family, variety);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  if (resolved.dataset.kind === "index") {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  const entry = resolved.dataset.byId[entryId];
  if (!entry) {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  return c.json(
    envelope(resolved.dataset, {
      entry: present(resolved.dataset, entry, requestOrigin(c)),
    }),
  );
}

app.get("/v1/:family/entries", (c) => handleEntries(c, c.req.param("family")));
app.get("/v1/:family/:variety/entries", (c) =>
  handleEntries(c, c.req.param("family"), c.req.param("variety")),
);

async function handleEntries(
  c: { req: { query: (name: string) => string | undefined; url: string }; env: Env; json: Function },
  family: string,
  variety?: string,
) {
  const store = await getStore(c.env);
  const resolved = await resolve(store, family, variety);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  if (resolved.dataset.kind === "index") {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  const q = c.req.query("q");
  const rows = q ? searchEntries(resolved.dataset, q) : resolved.dataset.entries;
  const { offset, limit } = parsePage(new URL(c.req.url));
  const page = rows.slice(offset, offset + limit);
  const origin = requestOrigin(c);
  return c.json(
    envelope(resolved.dataset, {
      query: q || null,
      total: rows.length,
      offset,
      limit,
      entries: page.map((entry) => present(resolved.dataset, entry, origin)),
    }),
  );
}

app.get("/v1/:family/audio/:filename", (c) =>
  handleAudio(c, c.req.param("family"), undefined, c.req.param("filename")),
);
app.get("/v1/:family/:variety/audio/:filename", (c) =>
  handleAudio(
    c,
    c.req.param("family"),
    c.req.param("variety"),
    c.req.param("filename"),
  ),
);

async function handleAudio(
  c: { env: Env; json: Function },
  family: string,
  variety: string | undefined,
  filename: string,
) {
  const store = await getStore(c.env);
  const resolved = await resolve(store, family, variety);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  let served = resolved.dataset;
  if (served.ref.canonicalKey) {
    served = await store.require(served.ref.canonicalKey);
  }
  const relative = audioRelativePath(served, filename);
  if (!relative) {
    return c.json(
      {
        status: "error",
        code: "AUDIO_NOT_FOUND",
        message: "No audio file with that name is stored in this dataset.",
        dataset: served.ref.key,
      },
      404,
    );
  }
  const file = await fetchGithubFile(c.env, relative);
  if (!file) {
    return c.json(
      {
        status: "error",
        code: "AUDIO_NOT_FOUND",
        message: "No audio file with that name is stored in this dataset.",
        dataset: served.ref.key,
      },
      404,
    );
  }
  return new Response(file.body, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}

async function handleCollectionList(
  c: { req: { query: (name: string) => string | undefined; url: string }; env: Env; json: Function },
  family: string,
  variety: string | undefined,
  collection: string,
) {
  const store = await getStore(c.env);
  const resolved = await resolve(store, family, variety);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  if (resolved.dataset.kind === "index") {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  const q = c.req.query("q") || null;
  const rows = searchCollection(resolved.dataset, collection, q);
  const { offset, limit } = parsePage(new URL(c.req.url));
  const [page, total] = pageRows(rows, offset, limit);
  return c.json(
    envelope(resolved.dataset, {
      collection,
      query: q,
      total,
      offset,
      limit,
      items: presentRecords(resolved.dataset, collection, page, requestOrigin(c)),
    }),
  );
}

async function handleCollectionItem(
  c: { req: { url: string }; env: Env; json: Function },
  family: string,
  variety: string | undefined,
  collection: string,
  itemId: string,
) {
  const store = await getStore(c.env);
  const resolved = await resolve(store, family, variety);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  if (resolved.dataset.kind === "index") {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  const item = recordById(resolved.dataset, collection, itemId);
  if (!item) {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  const payload =
    collection === "entries" ? present(resolved.dataset, item, requestOrigin(c)) : item;
  return c.json(envelope(resolved.dataset, { collection, item: payload }));
}

async function handleSearchOne(
  c: { req: { query: (name: string) => string | undefined; url: string }; env: Env; json: Function },
  family: string,
  variety?: string,
) {
  const q = c.req.query("q");
  const store = await getStore(c.env);
  const resolved = await resolve(store, family, variety);
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  if (resolved.dataset.kind === "index") {
    const missing = termNotFound(resolved.dataset);
    return c.json(missing.body, missing.status);
  }
  if (!q) {
    return c.json(
      {
        status: "error",
        code: "QUERY_REQUIRED",
        message: "Search requires q= inside one isolated dataset.",
        dataset: resolved.dataset.ref.key,
      },
      400,
    );
  }
  const { offset, limit } = parsePage(new URL(c.req.url));
  const rows = searchDataset(resolved.dataset, q);
  const [page, total] = pageRows(rows, offset, limit);
  const origin = requestOrigin(c);
  return c.json(
    envelope(resolved.dataset, {
      collection: "search",
      query: q,
      total,
      offset,
      limit,
      results: page.map((hit) => presentHit(resolved.dataset, hit, origin)),
    }),
  );
}

for (const name of KNOWLEDGE_AND_SOURCES) {
  app.get(`/v1/:family/${name}/:item_id`, (c) =>
    handleCollectionItem(
      c,
      c.req.param("family"),
      undefined,
      name,
      c.req.param("item_id"),
    ),
  );
  app.get(`/v1/:family/:variety/${name}/:item_id`, (c) =>
    handleCollectionItem(
      c,
      c.req.param("family"),
      c.req.param("variety"),
      name,
      c.req.param("item_id"),
    ),
  );
  app.get(`/v1/:family/${name}`, (c) =>
    handleCollectionList(c, c.req.param("family"), undefined, name),
  );
  app.get(`/v1/:family/:variety/${name}`, (c) =>
    handleCollectionList(c, c.req.param("family"), c.req.param("variety"), name),
  );
}

app.get("/v1/:family/search", (c) => handleSearchOne(c, c.req.param("family")));
app.get("/v1/:family/:variety/search", (c) =>
  handleSearchOne(c, c.req.param("family"), c.req.param("variety")),
);

app.get("/v1/:family/:variety", async (c) => {
  const store = await getStore(c.env);
  const resolved = await resolve(
    store,
    c.req.param("family"),
    c.req.param("variety"),
  );
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  return c.json(resolved.dataset.metadata());
});

app.get("/v1/:family", async (c) => {
  const store = await getStore(c.env);
  const resolved = await resolve(store, c.req.param("family"));
  if ("error" in resolved) {
    return c.json(resolved.error.body, resolved.error.status);
  }
  return c.json(resolved.dataset.metadata());
});

export default app;
