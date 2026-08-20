import { FAMILY_INDEXES } from "./settings";
import { fetchGithubJson } from "./github";

export type DatasetRef = {
  key: string;
  family: string;
  variety: string | null;
  kind: "index" | "lexicon";
  jsonPath: string;
  languageName?: string;
  canonicalKey?: string;
};

type IndexChild = {
  id?: string;
  name?: string;
  path?: string;
};

function jsonPathFrom(relative: string): string {
  const trimmed = relative.replace(/\/+$/, "");
  if (trimmed.endsWith("dictionary.json")) {
    return trimmed;
  }
  return `${trimmed}/dictionary.json`;
}

export function folderFromJsonPath(jsonPath: string): string {
  return jsonPath.replace(/\/dictionary\.json$/, "");
}

export async function loadCatalog(env: Env): Promise<Map<string, DatasetRef>> {
  const catalog = new Map<string, DatasetRef>();

  for (const [family, indexPath] of FAMILY_INDEXES) {
    const payload = await fetchGithubJson(env, indexPath);
    if (!payload) {
      throw new Error(`Missing family index at ${indexPath}`);
    }
    catalog.set(family, {
      key: family,
      family,
      variety: null,
      kind: "index",
      jsonPath: indexPath,
    });
    const children = (payload.languages || payload.varieties || []) as IndexChild[];
    for (const child of children) {
      const childId = child.id;
      const childPath = child.path;
      if (!childId || !childPath) {
        continue;
      }
      const key = `${family}/${childId}`;
      catalog.set(key, {
        key,
        family,
        variety: childId,
        kind: "lexicon",
        jsonPath: jsonPathFrom(childPath),
        languageName: typeof child.name === "string" ? child.name : childId,
      });
    }
  }

  return catalog;
}

export function resolveKey(family: string, variety?: string | null): string {
  if (variety) {
    return `${family}/${variety}`;
  }
  return family;
}
