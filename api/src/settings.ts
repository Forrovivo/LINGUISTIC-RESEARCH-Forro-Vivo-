export const SITE_ORIGIN = "https://www.forrovivo.com";
export const API_HOST = "api.forrovivo.com";
export const API_ORIGIN = "https://api.forrovivo.com";
export const GITHUB_URL =
  "https://github.com/Forrovivo/LINGUISTIC-RESEARCH-Forro-Vivo-";
export const APP_STORE_URL = "https://apps.apple.com/app/id6751409176";
export const API_VERSION = "2.3.0";

export const CORS_ORIGINS = [
  "https://forrovivo.com",
  "https://www.forrovivo.com",
  API_ORIGIN,
  "http://127.0.0.1:8000",
  "http://localhost:8000",
  "http://127.0.0.1:8787",
  "http://localhost:8787",
];

export const FAMILY_INDEXES: Array<[string, string]> = [
  ["saotome", "data/saotome_dataset/dictionary.json"],
  ["caboverde", "data/caboverde_dataset/dictionary.json"],
  ["guinebissau", "data/guinebissau_dataset/dictionary.json"],
  ["angola", "data/angola_dataset/dictionary.json"],
  ["seychelles", "data/seychelles_dataset/dictionary.json"],
  ["equatorialguinea", "data/equatorialguinea_dataset/dictionary.json"],
  ["southafrica", "data/southafrica_dataset/dictionary.json"],
  ["ghana", "data/ghana_dataset/dictionary.json"],
  ["sierraleone", "data/sierraleone_dataset/dictionary.json"],
  ["rdcongo", "data/rdcongo_dataset/dictionary.json"],
  ["mauritius", "data/mauritius_dataset/dictionary.json"],
  ["nigeria", "data/nigeria_dataset/dictionary.json"],
  ["reunion", "data/reunion_dataset/dictionary.json"],
  ["centralafrican", "data/centralafrican_dataset/dictionary.json"],
  ["cameroon", "data/cameroon_dataset/dictionary.json"],
];

export const FAMILIES = new Set(FAMILY_INDEXES.map(([family]) => family));

export const DEFAULT_LIMIT = 50;
export const MAX_LIMIT = 1000;

export function settingsFrom(env: Env) {
  return {
    siteOrigin: env.SITE_ORIGIN || SITE_ORIGIN,
    apiHost: env.API_HOST || API_HOST,
    apiOrigin: env.API_ORIGIN || API_ORIGIN,
    githubUrl: env.GITHUB_URL || GITHUB_URL,
    appStoreUrl: env.APP_STORE_URL || APP_STORE_URL,
  };
}
