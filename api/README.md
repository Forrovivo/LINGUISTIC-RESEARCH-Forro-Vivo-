# ForroVivo Linguistic Research API

Read-only HTTP API for attested Portuguese-lexifier creole lexicons.

**ForroVivo** is the platform and ecosystem. This service publishes machine-readable data for the Linguistic Research initiative within it.

**Production:** https://api.forrovivo.com  
**Public brand:** https://www.forrovivo.com  
**App Store:** https://apps.apple.com/app/id6751409176  
**Contract:** [openapi.yaml](openapi.yaml)  
**Examples:** [examples/](examples/)  
**Guide:** [docs/api.md](../docs/api.md)

```text
PYTHONPATH=. uvicorn api.main:app --reload --host 127.0.0.1 --port 8000
```

```text
https://api.forrovivo.com/v1/saotome/forro/lookup?headword=kume
https://api.forrovivo.com/v1/kb
https://api.forrovivo.com/v1/languages
https://api.forrovivo.com/v1/search?dataset=saotome/forro&q=kume
```

The service loads `data/*/dictionary.json` and, when present, `knowledge.json` in the same folder. It does not invent translations or merge languages. DNS for `api.forrovivo.com` must point at this process. The public brand is `www.forrovivo.com`. The language-learning product is on the App Store.
