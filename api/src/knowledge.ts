import type { Dataset } from "./store";
import { fold, searchEntries } from "./store";
import { fetchGithubJson, repoHasFile } from "./github";

export const DOCUMENT_COLLECTIONS = [
  "grammar",
  "expressions",
  "proverbs",
  "culture",
  "food",
  "music",
  "dance",
  "folklore",
  "stories",
  "places",
] as const;

export type DocumentCollection = (typeof DOCUMENT_COLLECTIONS)[number];

export const KNOWLEDGE_BASE = [
  "languages",
  "entries",
  ...DOCUMENT_COLLECTIONS,
  "sources",
  "search",
] as const;

export const LISTABLE_COLLECTIONS = [
  "entries",
  ...DOCUMENT_COLLECTIONS,
  "sources",
] as const;

export type Knowledge = Record<DocumentCollection, Record<string, unknown>[]>;

export function emptyKnowledge(): Knowledge {
  return {
    grammar: [],
    expressions: [],
    proverbs: [],
    culture: [],
    food: [],
    music: [],
    dance: [],
    folklore: [],
    stories: [],
    places: [],
  };
}

function knowledgePath(jsonPath: string): string {
  const folder = jsonPath.replace(/\/dictionary\.json$/, "");
  return `${folder}/knowledge.json`;
}

function acceptedRecords(
  collection: string,
  rows: unknown,
  expectedLanguage: string | undefined,
): Record<string, unknown>[] {
  if (!Array.isArray(rows)) {
    return [];
  }
  const accepted: Record<string, unknown>[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") {
      continue;
    }
    const record = row as Record<string, unknown>;
    if (!record.id || !record.source) {
      continue;
    }
    const language = record.language;
    if (expectedLanguage && language && language !== expectedLanguage) {
      continue;
    }
    accepted.push({ ...record, collection });
  }
  return accepted;
}

export async function loadKnowledge(
  env: Env,
  jsonPath: string,
  expectedLanguage: string | undefined,
): Promise<Knowledge> {
  const payload = emptyKnowledge();
  const path = knowledgePath(jsonPath);
  if (!(await repoHasFile(env, path))) {
    return payload;
  }
  const document = await fetchGithubJson(env, path);
  if (!document) {
    return payload;
  }
  for (const name of DOCUMENT_COLLECTIONS) {
    payload[name] = acceptedRecords(name, document[name], expectedLanguage);
  }
  return payload;
}

export function collectionPath(dataset: Dataset, collection: string): string {
  return `/v1/${dataset.ref.key}/${collection}`;
}

export function knowledgeBaseMap(origin: string): Record<string, unknown> {
  const host = origin.replace(/\/$/, "");
  const collections = KNOWLEDGE_BASE.map((name) => {
    const item: Record<string, unknown> = {
      id: name,
      path: `/v1/${name}`,
      url: `${host}/v1/${name}`,
    };
    if (name === "languages") {
      item.isolation = "Catalog of isolated lexicons. Not a merged word list.";
    } else if (name === "search") {
      item.isolation = "Requires dataset=. Search never crosses folders.";
      item.example = "/v1/search?dataset=saotome/forro&q=kume";
    } else {
      item.isolation = `Content lives on one language path. Example: /v1/saotome/forro/${name}`;
      item.example = `/v1/saotome/forro/${name}`;
    }
    return item;
  });
  return {
    name: "ForroVivo Linguistic Research Knowledge Base",
    principle: "Zero hallucination. Missing data is preferable to incorrect data.",
    isolation:
      "Each collection is served per isolated dataset. Parent indexes are not merged knowledge. Empty collections stay empty until a cited source fills them.",
    file: "knowledge.json next to dictionary.json in the same isolated folder",
    collections,
  };
}

export function languagePaths(dataset: Dataset): Record<string, string> {
  const paths: Record<string, string> = {};
  for (const name of LISTABLE_COLLECTIONS) {
    paths[name] = collectionPath(dataset, name);
  }
  paths.search = collectionPath(dataset, "search");
  paths.lookup = collectionPath(dataset, "lookup");
  return paths;
}

export function languagesCatalog(
  datasets: Dataset[],
  origin: string,
): Record<string, unknown> {
  const host = origin.replace(/\/$/, "");
  const languages = datasets
    .filter((dataset) => dataset.kind === "lexicon")
    .sort((a, b) => a.ref.key.localeCompare(b.ref.key))
    .map((dataset) => {
      const meta = dataset.metadata();
      return {
        dataset: dataset.ref.key,
        language: meta.language,
        language_name: meta.language_name,
        iso_639_3: meta.iso_639_3,
        entry_count: meta.entry_count,
        knowledge: Object.fromEntries(
          DOCUMENT_COLLECTIONS.map((name) => [
            name,
            (dataset.knowledge[name] || []).length,
          ]),
        ),
        path: `/v1/${dataset.ref.key}`,
        url: `${host}/v1/${dataset.ref.key}`,
        collections: Object.fromEntries(
          Object.entries(languagePaths(dataset)).map(([name, path]) => [
            name,
            `${host}${path}`,
          ]),
        ),
      };
    });
  return {
    isolation:
      "Each object is one lexicon. Counts are per folder. This list is not a merged dictionary.",
    languages,
  };
}

export function collectionDirectory(
  datasets: Dataset[],
  collection: string,
): Record<string, unknown> {
  const items = datasets
    .filter((dataset) => dataset.kind === "lexicon")
    .sort((a, b) => a.ref.key.localeCompare(b.ref.key))
    .map((dataset) => {
      let count = 0;
      if (collection === "entries") {
        count = dataset.entries.length;
      } else if (collection === "sources") {
        count = ((dataset.document.sources as unknown[]) || []).length;
      } else {
        count = (dataset.knowledge[collection as DocumentCollection] || []).length;
      }
      return {
        dataset: dataset.ref.key,
        count,
        path: collectionPath(dataset, collection),
      };
    });
  return {
    collection,
    isolation:
      "This index lists isolated folders only. It does not merge records. Open one path to read that language.",
    datasets: items,
  };
}

export function datasetSources(dataset: Dataset): Record<string, unknown>[] {
  const rows: Record<string, unknown>[] = [];
  const sources = (dataset.document.sources as unknown[]) || [];
  sources.forEach((source, index) => {
    const item =
      source && typeof source === "object"
        ? { ...(source as Record<string, unknown>) }
        : { source: String(source) };
    if (!item.id) {
      item.id = item.source_file || `${dataset.ref.key}-source-${index + 1}`;
    }
    item.dataset = dataset.ref.key;
    item.language = dataset.document.language;
    rows.push(item);
  });
  return rows;
}

export function collectionRecords(
  dataset: Dataset,
  collection: string,
): Record<string, unknown>[] {
  if (collection === "entries") {
    return dataset.entries;
  }
  if (collection === "sources") {
    return datasetSources(dataset);
  }
  return dataset.knowledge[collection as DocumentCollection] || [];
}

export function recordById(
  dataset: Dataset,
  collection: string,
  itemId: string,
): Record<string, unknown> | null {
  return (
    collectionRecords(dataset, collection).find((row) => row.id === itemId) ||
    null
  );
}

export function searchCollection(
  dataset: Dataset,
  collection: string,
  query: string | null,
): Record<string, unknown>[] {
  const rows = collectionRecords(dataset, collection);
  if (!query) {
    return rows;
  }
  if (collection === "entries") {
    return searchEntries(dataset, query);
  }
  const needle = fold(query);
  return rows.filter((row) => {
    const blob = fold(
      ["id", "title", "headword", "text", "text_pt", "text_en", "source", "source_title"]
        .map((field) => String(row[field] || ""))
        .join(" "),
    );
    return blob.includes(needle);
  });
}

export function searchDataset(
  dataset: Dataset,
  query: string,
): Array<{ collection: string; item: Record<string, unknown> }> {
  const hits: Array<{ collection: string; item: Record<string, unknown> }> = [];
  for (const entry of searchEntries(dataset, query)) {
    hits.push({ collection: "entries", item: entry });
  }
  const needle = fold(query);
  if (!needle) {
    return hits;
  }
  for (const collection of DOCUMENT_COLLECTIONS) {
    for (const row of dataset.knowledge[collection] || []) {
      const blob = fold(
        ["id", "title", "headword", "text", "text_pt", "text_en"]
          .map((field) => String(row[field] || ""))
          .join(" "),
      );
      if (blob.includes(needle)) {
        hits.push({ collection, item: row });
      }
    }
  }
  for (const source of datasetSources(dataset)) {
    const blob = fold(
      ["id", "source", "source_title", "source_file"]
        .map((field) => String(source[field] || ""))
        .join(" "),
    );
    if (blob.includes(needle)) {
      hits.push({ collection: "sources", item: source });
    }
  }
  return hits;
}

export function pageRows<T>(rows: T[], offset: number, limit: number): [T[], number] {
  return [rows.slice(offset, offset + limit), rows.length];
}
