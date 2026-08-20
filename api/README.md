# ForroVivo Linguistic Research API

Read-only HTTP API for attested Portuguese-lexifier creole lexicons.

**ForroVivo** is the platform and ecosystem. This service publishes machine-readable data for the Linguistic Research initiative within it.

**Production:** https://api.forrovivo.com  
**Public brand:** https://www.forrovivo.com  
**App Store:** https://apps.apple.com/app/id6751409176  
**Contract:** [openapi.yaml](openapi.yaml)  
**Examples:** [examples/](examples/)  
**Guide:** [docs/api.md](../docs/api.md)

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

DNS for `api.forrovivo.com` must point at **this Worker**, not at the website. The public brand is `www.forrovivo.com`. The language-learning product is on the App Store.
