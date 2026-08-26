# ForroVivo Linguistic Research API

> **LIVLU TECHNOLOGIES** · **Research** pillar  
> Read-only HTTP API for attested Portuguese-lexifier creole lexicons.

**Place in LIVLU TECHNOLOGIES:** Individual Research team surface (this `api/` folder lives in the Research repo). Sister pillars: Open Knowledge (site / playground) and Learning (ForroVivo App). Open licence applies to Research datasets; the apps and site are proprietary.

**Operator:** LIVLU TECHNOLOGIES LTD  
**Production:** https://api.forrovivo.com  
**Public brand:** https://forrovivo.com (`www` redirects there)  
**Playground:** https://forrovivo.com/api  
**App Store:** https://apps.apple.com/app/id6751409176  
**Contract:** [openapi.yaml](openapi.yaml)  
**Examples:** [examples/](examples/)  
**Guide:** [docs/api.md](../docs/api.md)  
**Parent docs:** [../README.md](../README.md) · [../LICENSE](../LICENSE)

Production is a Cloudflare Worker. It reads attested files from this GitHub repository and does not invent translations or merge languages. Routes are versioned under `/v1`. CORS allows any origin. Fair-use rate limits apply. Lookup responses include source attribution.

```text
cd api
npm install
npm run dev
npx wrangler deploy
```

Workers Builds deploys from the repository root. Keep the root `wrangler.jsonc` `name` as `linguistic-research-forro-vivo`.

Python remains for pytest against local `data/` files:

```text
PYTHONPATH=. uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

```text
https://api.forrovivo.com/v1/saotome/forro/lookup?headword=kume
https://api.forrovivo.com/v1/kb
https://api.forrovivo.com/v1/languages
https://api.forrovivo.com/v1/search?dataset=saotome/forro&q=kume
```

DNS for `api.forrovivo.com` must point at **this Worker**, not at the website. The public brand is `forrovivo.com`. The developer playground is `https://forrovivo.com/api`. The language-learning product is on the App Store.

## Learning app: learner accounts + progress sync (D1)

Signed-in ForroVivo learners register an account row and can back up academy progress to D1 (separate from the public Research `/v1` API).

```text
# Once (replace database_id in wrangler.jsonc):
cd api
npx wrangler d1 create forrovivo-learner-progress
npx wrangler d1 migrations apply forrovivo-learner-progress --remote

# Shared HMAC secret (same value as iOS PROGRESS_SYNC_HMAC_SECRET):
npx wrangler secret put PROGRESS_SYNC_SECRET

npx wrangler deploy
```

Account registry:

```text
GET    /app/v1/account/health
GET    /app/v1/account
PUT    /app/v1/account
DELETE /app/v1/account
```

Progress backup:

```text
GET    /app/v1/progress/health
GET    /app/v1/progress?studyLanguage=forro
PUT    /app/v1/progress
DELETE /app/v1/progress?studyLanguage=forro
```

`DELETE /app/v1/account` removes the learner account row and all progress snapshots for that identity.

Auth: `X-ForroVivo-Account: apple:<subject>` or `google:<subject>`, plus `Authorization: Bearer <hex hmac-sha256(account, PROGRESS_SYNC_SECRET)>`.
