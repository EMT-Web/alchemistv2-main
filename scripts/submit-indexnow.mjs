// IndexNow submitter — pings Bing / Yandex / Seznam / Naver (and anything else on the
// IndexNow network) that specific URLs changed, so they recrawl without waiting for the
// next sitemap sweep. The verification key is served as a static file from
// public/223c36e3f8ab47a3a06d2bdf2ea6ce26.txt (keyLocation below).
//
// Usage:
//   node scripts/submit-indexnow.mjs /tours/5-days-sahara-desert-tour /blog/some-post
//   node scripts/submit-indexnow.mjs https://www.escortedmoroccotours.com/about
//   node scripts/submit-indexnow.mjs --all        # submit every URL in public/sitemap*.xml
//   node scripts/submit-indexnow.mjs --all --dry-run
//
// Pass changed paths (or full URLs) as arguments. `--all` reads the generated sitemap;
// IndexNow docs discourage dumping the whole site repeatedly, so use it for the initial
// registration and after large content migrations only — day to day, pass just what changed.

import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://www.escortedmoroccotours.com'
const HOST = 'www.escortedmoroccotours.com'
const KEY = process.env.INDEXNOW_KEY || '223c36e3f8ab47a3a06d2bdf2ea6ce26'
const KEY_LOCATION = `${SITE}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const MAX_URLS_PER_REQUEST = 10000

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const useSitemap = args.includes('--all')
const positional = args.filter((a) => !a.startsWith('--'))

function readSitemapUrls() {
  const publicDir = path.join(process.cwd(), 'public')
  const files = fs
    .readdirSync(publicDir)
    .filter((f) => /^sitemap.*\.xml$/.test(f))
    .map((f) => path.join(publicDir, f))

  if (files.length === 0) {
    throw new Error('No public/sitemap*.xml found — run `npm run build` first (next-sitemap generates it).')
  }

  const urls = new Set()
  for (const file of files) {
    const xml = fs.readFileSync(file, 'utf8')
    for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      const loc = m[1].trim()
      // Skip the sitemap-index entries that point at other sitemaps
      if (/\/sitemap.*\.xml$/.test(loc)) continue
      urls.add(loc)
    }
  }
  return [...urls]
}

function normalize(entry) {
  if (/^https?:\/\//i.test(entry)) return entry
  return `${SITE}/${entry.replace(/^\/+/, '')}`
}

let urlList
if (useSitemap) {
  urlList = readSitemapUrls()
} else if (positional.length > 0) {
  urlList = positional.map(normalize)
} else {
  console.error('Nothing to submit. Pass changed paths/URLs as arguments, or --all for the full sitemap.')
  process.exit(1)
}

// Guard against submitting URLs for a domain IndexNow will reject (host must match the key file)
const badHost = urlList.filter((u) => new URL(u).host !== HOST)
if (badHost.length) {
  console.error(`These URLs are not on ${HOST} and would be rejected:\n  ${badHost.join('\n  ')}`)
  process.exit(1)
}

console.log(`IndexNow: ${urlList.length} URL(s), key ${KEY.slice(0, 8)}…, keyLocation ${KEY_LOCATION}`)
if (dryRun) {
  console.log(urlList.join('\n'))
  console.log('\n--dry-run: nothing submitted.')
  process.exit(0)
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

let failed = false
for (const batch of chunk(urlList, MAX_URLS_PER_REQUEST)) {
  const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: batch })
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  })
  const text = await res.text()
  // 200 = accepted, 202 = accepted but key validation pending. Anything else is a real error.
  if (res.status === 200 || res.status === 202) {
    console.log(`  ${batch.length} URL(s) → ${res.status} ${res.statusText}`)
  } else {
    failed = true
    console.error(`  ${batch.length} URL(s) → ${res.status} ${res.statusText}\n  ${text}`)
  }
}

process.exit(failed ? 1 : 0)
