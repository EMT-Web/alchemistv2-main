# Local content layer

The site no longer talks to Sanity. Content is served from a local snapshot.

- **`dataset.json`** — every published document from the Sanity `production`
  dataset (a JSON array). `sanity.js` runs the site's existing GROQ queries
  against this with [`groq-js`](https://github.com/sanity-io/groq-js), so the
  page code was left almost unchanged (`sanityClient.fetch(query, params)` still
  works, it just evaluates locally).
- **`public/cms/<hash>.<ext>`** — every referenced image, resized to ≤2400px / q80
  (164 MB → 25 MB). `urlFor(field).url()` returns `/cms/<hash>.<ext>`.
- The per-type files (`tours.json`, `destinations.json`, …) and `index.ts` are a
  cleaned/denormalised view of the same data — handy if you want typed helpers,
  but the site itself only reads `dataset.json`.

## Refreshing content

1. Re-export the dataset (needs a Sanity read token in `SANITY_AUTH_TOKEN`):

   ```
   npx sanity@latest dataset export production ./sanity-export/production.tar.gz --project-id 7y3hy4cc --overwrite
   cd sanity-export && tar -xzf production.tar.gz && cd ..
   ```

2. Regenerate images + per-type JSON:

   ```
   node scripts/migrate-cms-content.mjs ./sanity-export/<export-dir>
   ```

3. Rebuild `dataset.json` from the export's `data.ndjson` (strip the
   `sanity.*` asset docs, write a compact JSON array to `data/cms/dataset.json`).
