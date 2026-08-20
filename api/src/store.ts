import type { DatasetRef } from "./catalog";
import { folderFromJsonPath, loadCatalog } from "./catalog";
import { fetchGithubJson } from "./github";
import { entryGraph, indexKnowledgeLinks } from "./graph";
import {
  DOCUMENT_COLLECTIONS,
  emptyKnowledge,
  loadKnowledge,
  type Knowledge,
} from "./knowledge";
import { API_ORIGIN } from "./settings";

const APOSTROPHES = /[‘’ʼ´`]/g;
const META_SKIP = new Set(["entries"]);

export function fold(text: string): string {
  const normalized = text.normalize("NFC").trim().toLowerCase().replace(APOSTROPHES, "'");
  return normalized.split(/\s+/).join(" ");
}

export function foldLoose(text: string): string {
  return fold(text)
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function headwordKeys(entry: Record<string, unknown>): string[] {
  const values: string[] = [String(entry.headword || "")];
  for (const variant of (entry.variants as unknown[]) || []) {
    if (typeof variant === "string") {
      values.push(variant);
    } else if (variant && typeof variant === "object") {
      const row = variant as Record<string, unknown>;
      values.push(String(row.form || row.headword || ""));
    }
  }
  return values.filter(Boolean);
}

export class Dataset {
  entries: Record<string, unknown>[] = [];
  byId: Record<string, Record<string, unknown>> = {};
  byFold: Record<string, Record<string, unknown>[]> = {};
  byLoose: Record<string, Record<string, unknown>[]> = {};
  knowledge: Knowledge = emptyKnowledge();
  knowledgeByEntryId: Record<string, Array<[string, Record<string, unknown>]>> = {};
  knowledgeByHeadword: Record<string, Array<[string, Record<string, unknown>]>> = {};

  constructor(
    readonly ref: DatasetRef,
    readonly document: Record<string, unknown>,
  ) {}

  get kind(): DatasetRef["kind"] {
    return this.ref.kind;
  }

  get missingTerm(): Record<string, unknown> {
    const fallback = {
      status: "error",
      code: "TERM_NOT_FOUND",
      message: "Translation not available in the verified database.",
    };
    const provided = this.document.missing_term;
    return provided && typeof provided === "object"
      ? { ...(provided as Record<string, unknown>) }
      : fallback;
  }

  metadata(): Record<string, unknown> {
    const payload: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(this.document)) {
      if (!META_SKIP.has(key)) {
        payload[key] = structuredClone(value);
      }
    }
    payload.dataset = this.ref.key;
    payload.kind = this.ref.kind;
    if (this.ref.canonicalKey) {
      payload.canonical_dataset = this.ref.canonicalKey;
    }
    payload.entry_count = this.entries.length;
    payload.knowledge = Object.fromEntries(
      DOCUMENT_COLLECTIONS.map((name) => [
        name,
        (this.knowledge[name] || []).length,
      ]),
    );
    return payload;
  }
}

export class Store {
  constructor(
    private readonly env: Env,
    readonly refs: Map<string, DatasetRef>,
    readonly datasets: Map<string, Dataset>,
  ) {}

  static async load(env: Env): Promise<Store> {
    return new Store(env, await loadCatalog(env), new Map());
  }

  async get(key: string): Promise<Dataset | undefined> {
    const cached = this.datasets.get(key);
    if (cached) {
      return cached;
    }
    const ref = this.refs.get(key);
    if (!ref) {
      return undefined;
    }
    const document = await fetchGithubJson(this.env, ref.jsonPath);
    if (!document) {
      return undefined;
    }
    const dataset = new Dataset(ref, document);
    if (ref.kind === "lexicon") {
      indexEntries(dataset, (document.entries as Record<string, unknown>[]) || []);
      dataset.knowledge = await loadKnowledge(
        this.env,
        ref.jsonPath,
        typeof document.language === "string" ? document.language : undefined,
      );
      indexKnowledgeLinks(dataset);
    }
    this.datasets.set(key, dataset);
    return dataset;
  }

  async require(key: string): Promise<Dataset> {
    const dataset = await this.get(key);
    if (!dataset) {
      throw new Error(key);
    }
    return dataset;
  }

  resolveKey(family: string, variety?: string | null): string {
    return variety ? `${family}/${variety}` : family;
  }

  async ensureAll(): Promise<void> {
    for (const key of this.refs.keys()) {
      try {
        await this.get(key);
      } catch {
        continue;
      }
    }
  }

  async catalog(): Promise<Record<string, unknown>[]> {
    return [...this.refs.values()]
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((ref) => {
        const loaded = this.datasets.get(ref.key);
        const meta = loaded?.metadata();
        return {
          dataset: ref.key,
          kind: ref.kind,
          language: meta?.language,
          language_name: meta?.language_name || ref.languageName,
          iso_639_3: meta?.iso_639_3,
          entry_count: meta?.entry_count,
          canonical_dataset: ref.canonicalKey,
          path: ref.jsonPath,
          folder: folderFromJsonPath(ref.jsonPath),
        };
      });
  }

  async lexicons(): Promise<Dataset[]> {
    await this.ensureAll();
    return [...this.datasets.values()].filter((dataset) => dataset.kind === "lexicon");
  }
}

function indexEntries(dataset: Dataset, entries: Record<string, unknown>[]): void {
  dataset.entries = entries;
  for (const entry of entries) {
    const entryId = entry.id;
    if (typeof entryId === "string" && entryId) {
      dataset.byId[entryId] = entry;
    }
    for (const value of headwordKeys(entry)) {
      (dataset.byFold[fold(value)] ||= []).push(entry);
      (dataset.byLoose[foldLoose(value)] ||= []).push(entry);
    }
  }
}

export function presentEntry(
  dataset: Dataset,
  entry: Record<string, unknown>,
  baseUrl?: string,
): Record<string, unknown> {
  const origin = (baseUrl || API_ORIGIN).replace(/\/$/, "");
  const payload = structuredClone(entry);
  const audioItems = (payload.audio as Record<string, unknown>[]) || [];
  for (const item of audioItems) {
    const relative = String(item.file || "").replace(/\\/g, "/");
    const filename = relative.split("/").pop();
    if (filename) {
      item.url = `${origin}/v1/${dataset.ref.key}/audio/${filename}`;
    }
  }
  payload.graph = entryGraph(dataset, entry, origin);
  return payload;
}

export function lookupHeadword(
  dataset: Dataset,
  headword: string,
): ["exact" | "normalized" | "diacritic-insensitive", Record<string, unknown>[]] {
  const needle = headword.normalize("NFC").trim();
  if (!needle) {
    return ["exact", []];
  }
  const folded = fold(needle);
  const loose = foldLoose(needle);
  const exact = (dataset.byFold[folded] || []).filter(
    (entry) => String(entry.headword || "").normalize("NFC").trim() === needle,
  );
  if (exact.length) {
    return ["exact", unique(exact)];
  }
  const foldedHits = dataset.byFold[folded] || [];
  if (foldedHits.length) {
    return ["normalized", unique(foldedHits)];
  }
  if (loose.length > 1) {
    const looseHits = dataset.byLoose[loose] || [];
    if (looseHits.length) {
      return ["diacritic-insensitive", unique(looseHits)];
    }
  }
  return ["exact", []];
}

export function searchEntries(
  dataset: Dataset,
  query: string,
): Record<string, unknown>[] {
  const needle = fold(query);
  if (!needle) {
    return [...dataset.entries];
  }
  const scored: Array<[number, number, Record<string, unknown>]> = [];
  dataset.entries.forEach((entry, index) => {
    const headword = fold(String(entry.headword || ""));
    const translationPt = fold(String(entry.translation_pt || ""));
    const translationEn = fold(String(entry.translation_en || ""));
    const entryId = fold(String(entry.id || ""));
    let rank = -1;
    if (needle === headword) rank = 0;
    else if (headword.startsWith(needle)) rank = 1;
    else if (headword.includes(needle)) rank = 2;
    else if (translationPt.includes(needle) || translationEn.includes(needle)) rank = 3;
    else if (entryId.includes(needle)) rank = 4;
    if (rank >= 0) {
      scored.push([rank, index, entry]);
    }
  });
  scored.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return scored.map((item) => item[2]);
}

export function audioRelativePath(dataset: Dataset, filename: string): string | null {
  const name = filename.split(/[\\/]/).pop() || "";
  if (!name || name !== filename || name === "." || name === "..") {
    return null;
  }
  const folder = dataset.ref.jsonPath.replace(/\/dictionary\.json$/, "");
  return `${folder}/Audio/${name}`;
}

function unique(entries: Record<string, unknown>[]): Record<string, unknown>[] {
  const seen = new Set<Record<string, unknown>>();
  const rows: Record<string, unknown>[] = [];
  for (const entry of entries) {
    if (seen.has(entry)) {
      continue;
    }
    seen.add(entry);
    rows.push(entry);
  }
  return rows;
}

let storePromise: Promise<Store> | null = null;
let storeLoadedAt = 0;

export function getStore(env: Env): Promise<Store> {
  const ttlMs = (Number(env.GITHUB_CACHE_TTL) || 300) * 1000;
  if (!storePromise || Date.now() - storeLoadedAt > ttlMs) {
    storeLoadedAt = Date.now();
    storePromise = Store.load(env);
  }
  return storePromise;
}
