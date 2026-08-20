import type { Dataset } from "./store";
import { fold } from "./store";

const COLLECTION_RELATIONS: Record<string, [string, string]> = {
  grammar: ["related_to", "grammar_rule"],
  expressions: ["appears_in", "expression"],
  proverbs: ["appears_in", "proverb"],
  culture: ["related_to", "cultural_practice"],
  food: ["related_to", "food"],
  music: ["related_to", "music"],
  dance: ["related_to", "dance"],
  folklore: ["related_to", "folklore"],
  stories: ["appears_in", "story"],
  places: ["related_to", "place"],
};

export function indexKnowledgeLinks(dataset: Dataset): void {
  const byEntry: Record<string, Array<[string, Record<string, unknown>]>> = {};
  const byHeadword: Record<string, Array<[string, Record<string, unknown>]>> = {};
  for (const [collection, rows] of Object.entries(dataset.knowledge)) {
    for (const row of rows) {
      for (const entryId of (row.related_entry_ids as unknown[]) || []) {
        if (entryId) {
          const key = String(entryId);
          (byEntry[key] ||= []).push([collection, row]);
        }
      }
      const headword = row.headword;
      if (typeof headword === "string" && headword) {
        (byHeadword[fold(headword)] ||= []).push([collection, row]);
      }
    }
  }
  dataset.knowledgeByEntryId = byEntry;
  dataset.knowledgeByHeadword = byHeadword;
}

export function entryGraph(
  dataset: Dataset,
  entry: Record<string, unknown>,
  origin: string,
): Record<string, unknown> {
  const host = origin.replace(/\/$/, "");
  const language = entry.language;
  const graph: Record<string, unknown> = {
    word: {
      id: entry.id,
      headword: entry.headword,
      type: "headword",
    },
    belongs_to: {
      language,
      language_name: entry.language_name || dataset.document.language_name,
      dataset: dataset.ref.key,
    },
    means: meanings(entry),
    related_to: [] as Record<string, unknown>[],
    appears_in: [] as Record<string, unknown>[],
    documented_by: sources(entry),
  };
  addEmbedded(graph, entry);
  const seen = new Set<string>();
  for (const [collection, record] of linkedRecords(dataset, entry)) {
    const marker = `${collection}:${String(record.id || "")}`;
    if (seen.has(marker)) {
      continue;
    }
    seen.add(marker);
    const [bucket, kind] = COLLECTION_RELATIONS[collection] || [
      "related_to",
      collection,
    ];
    (graph[bucket] as Record<string, unknown>[]).push(
      knowledgeEdge(dataset, collection, kind, record, host),
    );
  }
  return graph;
}

function meanings(entry: Record<string, unknown>): Array<Record<string, string>> {
  const rows: Array<Record<string, string>> = [];
  if (entry.translation_pt) {
    rows.push({ language: "pt", concept: String(entry.translation_pt) });
  }
  if (entry.translation_en) {
    rows.push({ language: "en", concept: String(entry.translation_en) });
  }
  return rows;
}

function sources(entry: Record<string, unknown>): Array<Record<string, unknown>> {
  if (!entry.source) {
    return [];
  }
  return [
    {
      source: entry.source,
      source_type: entry.source_type,
      source_title: entry.source_title,
      source_page: entry.source_page,
      source_url: entry.source_url,
      source_file: entry.source_file,
    },
  ];
}

function addEmbedded(
  graph: Record<string, unknown>,
  entry: Record<string, unknown>,
): void {
  const related = graph.related_to as Record<string, unknown>[];
  if (entry.grammatical_information) {
    related.push({
      kind: "grammar_rule",
      from: "entry",
      text: entry.grammatical_information,
    });
  }
  if (entry.cultural_context) {
    related.push({
      kind: "cultural_practice",
      from: "entry",
      text: entry.cultural_context,
    });
  }
}

function linkedRecords(
  dataset: Dataset,
  entry: Record<string, unknown>,
): Array<[string, Record<string, unknown>]> {
  const rows: Array<[string, Record<string, unknown>]> = [];
  const entryId = entry.id;
  if (typeof entryId === "string") {
    rows.push(...(dataset.knowledgeByEntryId[entryId] || []));
  }
  const headword = entry.headword;
  if (typeof headword === "string") {
    rows.push(...(dataset.knowledgeByHeadword[fold(headword)] || []));
  }
  return rows;
}

function knowledgeEdge(
  dataset: Dataset,
  collection: string,
  kind: string,
  record: Record<string, unknown>,
  host: string,
): Record<string, unknown> {
  const itemId = record.id;
  const path =
    itemId !== undefined && itemId !== null
      ? `/v1/${dataset.ref.key}/${collection}/${itemId}`
      : null;
  return {
    kind,
    collection,
    id: itemId,
    title: record.title,
    headword: record.headword,
    path,
    url: path ? `${host}${path}` : null,
    source: record.source,
    from: "knowledge",
  };
}
