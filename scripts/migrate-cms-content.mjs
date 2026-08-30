/**
 * migrate-cms-content.mjs
 *
 * One-off: turn a Sanity dataset export into a local content layer in this repo.
 *
 *   1. reads  sanity-export/<export-dir>/data.ndjson  +  assets.json
 *   2. resizes every referenced image into  public/cms/<hash>.<ext>  (max 2400px, q80)
 *   3. rewrites every image ref  ->  { src, width, height, alt, lqip, crop?, hotspot? }
 *      and every reference ref   ->  { id, type, slug, label }
 *   4. writes one JSON file per document type into  data/cms/
 *
 * Usage:  node scripts/migrate-cms-content.mjs [path-to-export-dir]
 * If no path is given it picks the newest folder under sanity-export/.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const EXPORT_ROOT = path.join(ROOT, 'sanity-export')
const OUT_DATA = path.join(ROOT, 'data', 'cms')
const OUT_IMG = path.join(ROOT, 'public', 'cms')
const MAX_EDGE = 2400
const QUALITY = 80

/* ---------- locate the export dir ---------- */
let exportDir = process.argv[2]
if (!exportDir) {
  const dirs = fs
    .readdirSync(EXPORT_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith('production-export'))
    .map((d) => path.join(EXPORT_ROOT, d.name))
    .sort()
  exportDir = dirs[dirs.length - 1]
}
if (!exportDir || !fs.existsSync(path.join(exportDir, 'data.ndjson'))) {
  console.error('Could not find data.ndjson. Pass the export dir as an argument.')
  process.exit(1)
}
console.log('export dir:', exportDir)

/* ---------- load ---------- */
const docs = fs
  .readFileSync(path.join(exportDir, 'data.ndjson'), 'utf8')
  .split('\n')
  .filter(Boolean)
  .map((l) => JSON.parse(l))

const assetsMeta = fs.existsSync(path.join(exportDir, 'assets.json'))
  ? JSON.parse(fs.readFileSync(path.join(exportDir, 'assets.json'), 'utf8'))
  : {}

const byId = new Map(docs.map((d) => [d._id, d]))

fs.mkdirSync(OUT_DATA, { recursive: true })
fs.mkdirSync(OUT_IMG, { recursive: true })

/* ---------- image handling ---------- */
const imageCache = new Map() // originalFilename -> { src, width, height, lqip }
let imgOk = 0
let imgFail = 0

async function processImage(sanityAssetValue) {
  // "image@file://./images/<hash>-<WxH>.<ext>"
  const m = String(sanityAssetValue).match(/images\/([^"']+)$/)
  if (!m) return null
  const filename = m[1]
  if (imageCache.has(filename)) return imageCache.get(filename)

  const srcPath = path.join(exportDir, 'images', filename)
  if (!fs.existsSync(srcPath)) {
    imgFail++
    console.warn('  missing image file:', filename)
    return null
  }

  const dimMatch = filename.match(/-(\d+)x(\d+)\.\w+$/)
  const hashMatch = filename.match(/^([0-9a-f]+)-/)
  const ext = path.extname(filename).toLowerCase()
  const hash = hashMatch ? hashMatch[1] : filename.replace(/\W+/g, '')
  const outName = `${hash}${ext}`
  const outPath = path.join(OUT_IMG, outName)

  const origW = dimMatch ? Number(dimMatch[1]) : null
  const origH = dimMatch ? Number(dimMatch[2]) : null

  let width = origW
  let height = origH
  try {
    const img = sharp(srcPath, { failOn: 'none' })
    const meta = await img.metadata()
    width = meta.width || origW
    height = meta.height || origH

    const longEdge = Math.max(width || 0, height || 0)
    let pipeline = img
    if (longEdge > MAX_EDGE) {
      pipeline = img.resize({
        width: width >= height ? MAX_EDGE : null,
        height: height > width ? MAX_EDGE : null,
        withoutEnlargement: true,
      })
      const ratio = MAX_EDGE / longEdge
      width = Math.round(width * ratio)
      height = Math.round(height * ratio)
    }
    if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
    else if (ext === '.png') pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 })
    else if (ext === '.webp') pipeline = pipeline.webp({ quality: QUALITY })
    await pipeline.toFile(outPath)
    imgOk++
  } catch (e) {
    // fall back to a straight copy
    fs.copyFileSync(srcPath, outPath)
    imgFail++
    console.warn('  sharp failed, copied raw:', filename, e.message)
  }

  const meta = assetsMeta[`image-${hash}`]
  const result = {
    src: `/cms/${outName}`,
    width: width || null,
    height: height || null,
    lqip: meta?.metadata?.lqip || null,
  }
  imageCache.set(filename, result)
  return result
}

/* ---------- reference handling ---------- */
function labelOf(doc) {
  if (!doc) return null
  return doc.title || doc.city || doc.name || doc.question || doc.slug?.current || doc._id
}
function resolveRef(ref) {
  const target = byId.get(ref)
  return {
    id: ref,
    type: target?._type || null,
    slug: target?.slug?.current || null,
    label: labelOf(target),
  }
}

/* ---------- recursive transform ---------- */
async function transform(node) {
  if (Array.isArray(node)) {
    const out = []
    for (const item of node) out.push(await transform(item))
    return out
  }
  if (node && typeof node === 'object') {
    // image object
    if (node._sanityAsset && String(node._sanityAsset).startsWith('image@')) {
      const img = await processImage(node._sanityAsset)
      if (!img) return null
      const res = { ...img }
      if (node.alt) res.alt = node.alt
      if (node.crop) res.crop = node.crop
      if (node.hotspot) res.hotspot = node.hotspot
      return res
    }
    // reference
    if (node._type === 'reference' && node._ref) {
      const r = resolveRef(node._ref)
      if (node._key) r._key = node._key
      return r
    }
    // plain object -> recurse, drop _rev
    const out = {}
    for (const [k, v] of Object.entries(node)) {
      if (k === '_rev') continue
      out[k] = await transform(v)
    }
    return out
  }
  return node
}

/* ---------- run ---------- */
const TYPE_FILES = {
  tour: 'tours.json',
  destination: 'destinations.json',
  category: 'categories.json',
  amenity: 'amenities.json',
  faq: 'faqs.json',
  post: 'posts.json',
  author: 'authors.json',
  categoryblog: 'blogCategories.json',
  gallery: 'gallery.json',
}

const buckets = {}
let aboutDoc = null

for (const doc of docs) {
  if (doc._type?.startsWith('sanity.')) continue
  const t = await transform(doc)
  if (doc._type === 'abouts') {
    aboutDoc = t
    continue
  }
  ;(buckets[doc._type] ||= []).push(t)
}

for (const [type, arr] of Object.entries(buckets)) {
  const file = TYPE_FILES[type] || `${type}.json`
  arr.sort((a, b) => String(b._createdAt || '').localeCompare(String(a._createdAt || '')))
  fs.writeFileSync(path.join(OUT_DATA, file), JSON.stringify(arr, null, 2))
  console.log(`  data/cms/${file}  (${arr.length})`)
}
if (aboutDoc) {
  fs.writeFileSync(path.join(OUT_DATA, 'about.json'), JSON.stringify(aboutDoc, null, 2))
  console.log('  data/cms/about.json  (1)')
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: path.basename(exportDir),
  counts: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])),
  about: aboutDoc ? 1 : 0,
  images: { processed: imgOk, copiedRaw: imgFail, unique: imageCache.size },
}
fs.writeFileSync(path.join(OUT_DATA, '_manifest.json'), JSON.stringify(manifest, null, 2))

console.log('\nimages:', imgOk, 'resized,', imgFail, 'raw/fail,', imageCache.size, 'unique')
console.log('manifest:', JSON.stringify(manifest.counts))
console.log('done.')
