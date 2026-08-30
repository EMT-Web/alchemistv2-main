/**
 * Local content layer — replaces the Sanity client.
 *
 * `sanityClient.fetch(groqQuery, params)` runs the SAME GROQ queries the site
 * already had, but against a local snapshot of the dataset
 * (`data/cms/dataset.json`) using groq-js. No network, no Sanity.
 * groq-js + the dataset are loaded lazily so they never end up in a client bundle
 * (only getStaticProps / getServerSideProps ever call `.fetch`).
 *
 * `urlFor(imageField).url()` returns a local `/cms/<hash>.<ext>` path (images
 * live in `public/cms/`, produced by `scripts/migrate-cms-content.mjs`).
 *
 * To refresh content: re-export the dataset, re-run the migration script, and
 * rebuild `data/cms/dataset.json` from the export's `data.ndjson`.
 */

// keep the old shape some pages import
export const config = {
  dataset: "production",
  projectId: "local",
  apiVersion: "2024-01-01",
  useCdn: false,
};

let _datasetPromise;
const loadDataset = () => {
  if (!_datasetPromise) {
    _datasetPromise = import("./data/cms/dataset.json").then((m) => m.default || m);
  }
  return _datasetPromise;
};

export const sanityClient = {
  async fetch(query, params = {}) {
    const [{ parse, evaluate }, dataset] = await Promise.all([
      import("groq-js"),
      loadDataset(),
    ]);
    const value = await evaluate(parse(query), { dataset, params });
    return value.get();
  },
};

// Turn a Sanity-export image field into a local /cms/<hash>.<ext> path.
function resolveImage(source) {
  if (!source) return "";
  if (typeof source === "string") {
    const m = source.match(/([0-9a-f]{6,})-\d+x\d+[.-](\w+)/);
    return m ? `/cms/${m[1]}.${m[2]}` : source;
  }
  if (source.src) return source.src;
  const ref =
    source._sanityAsset ||
    (source.asset && (source.asset._ref || source.asset._id)) ||
    source._ref ||
    "";
  const m = String(ref).match(/([0-9a-f]{6,})-\d+x\d+[.-](\w+)/);
  return m ? `/cms/${m[1]}.${m[2]}` : "";
}

export const urlFor = (source) => {
  const url = resolveImage(source);
  const builder = {
    url: () => url,
    toString: () => url,
    width: () => builder,
    height: () => builder,
    quality: () => builder,
    format: () => builder,
    auto: () => builder,
    fit: () => builder,
    crop: () => builder,
    dpr: () => builder,
    ignoreImageParams: () => builder,
  };
  return builder;
};
