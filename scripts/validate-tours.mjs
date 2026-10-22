#!/usr/bin/env node
/**
 * Tour consistency check: `npm run validate:tours`
 *
 * Reads data/cms/dataset.json (the content the site is built from) and reports
 * tours whose title, duration, itinerary, route, categories, prices or SEO fields
 * disagree. It uses the same route helper as the site (components/tourRoute.ts),
 * so what it checks is exactly what the cards and tour pages display.
 *
 * Findings are WARNINGS for a person to review: some differences are legitimate,
 * and nothing here edits the data. Exit code is 1 only for hard errors
 * (missing slug, title or duration, broken references, duplicate slugs).
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { getTourRoute, cityName } from '../components/tourRoute.ts'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const docs = JSON.parse(readFileSync(path.join(root, 'data/cms/dataset.json'), 'utf8'))
const byId = new Map(docs.map((d) => [d._id, d]))
const tours = docs.filter((d) => d._type === 'tour')

const errors = []
const warnings = []
const err = (slug, msg) => errors.push(`${slug}: ${msg}`)
const warn = (slug, msg) => warnings.push(`${slug}: ${msg}`)

const blockText = (b) => (b?.children || []).map((c) => c.text || '').join('')
const CITIES = ['Marrakech', 'Fes', 'Casablanca', 'Tangier', 'Agadir', 'Ouarzazate', 'Rabat', 'Merzouga', 'Zagora', 'Chefchaouen', 'Essaouira']
const norm = (s) => cityName(String(s || '').replace(/^Marrakesh$/i, 'Marrakech').replace(/^Fez$/i, 'Fes'))

/** "... from Fes to Marrakech ..." -> ['Fes', 'Marrakech'] (either may be empty). */
function titleEnds(title) {
  const t = String(title || '').replace(/Marrakesh/gi, 'Marrakech').replace(/\bFez\b/gi, 'Fes')
  const from = (t.match(new RegExp(`from (?:and back to )?(${CITIES.join('|')})`, 'i')) || [])[1] || ''
  const to = (t.match(new RegExp(`\\bto (${CITIES.join('|')})\\b`, 'i')) || [])[1] || ''
  return [norm(from), norm(to), /from and back to|round trip|\bto \w+ to \1/i.test(t)]
}

const seenSlugs = new Map()
const seenTitles = new Map()
const seenDescs = new Map()

for (const t of tours) {
  const slug = t.slug?.current
  if (!slug) { err(t._id, 'missing slug'); continue }
  if (seenSlugs.has(slug)) err(slug, 'duplicate slug')
  seenSlugs.set(slug, true)
  if (!t.title) err(slug, 'missing title')
  const duration = Number(t.duration)
  if (!duration) err(slug, 'missing or invalid duration')

  // Broken references
  for (const field of ['categories', 'destinations', 'amenities']) {
    for (const ref of t[field] || []) {
      if (!ref?._ref || !byId.has(ref._ref)) err(slug, `broken ${field} reference (${ref?._key || '?'})`)
    }
  }

  // Duration vs itinerary
  const headings = (t.body || []).map(blockText).filter((s) => /^\s*day\s*\d+/i.test(s))
  const dayNums = headings.map((s) => Number((s.match(/day\s*(\d+)/i) || [])[1]))
  if (headings.length && headings.length !== duration)
    warn(slug, `duration is ${duration} days but the itinerary has ${headings.length} "Day N" headings`)
  const dupes = dayNums.filter((n, i) => dayNums.indexOf(n) !== i)
  if (dupes.length) warn(slug, `itinerary repeats Day ${[...new Set(dupes)].join(', ')}`)
  const titleDays = Number((String(t.title).match(/(\d+)[- ]days?/i) || [])[1])
  if (titleDays && titleDays !== duration) warn(slug, `title says ${titleDays} days, duration field says ${duration}`)
  const slugDays = Number((slug.match(/^(\d+)-days?/) || [])[1])
  if (slugDays && slugDays !== duration) warn(slug, `URL says ${slugDays} days, duration field says ${duration}`)

  // Drive data vs duration (the route comes from it)
  const drives = Array.isArray(t.driveTimes) ? t.driveTimes : []
  if (!drives.length) warn(slug, 'no driveTimes, so no route can be shown')
  else if (drives.length !== duration)
    warn(slug, `driveTimes has ${drives.length} entries for a ${duration} day tour; the route end is hidden until they match`)

  // Route vs title and departure category
  const route = getTourRoute(t)
  const [tFrom, tTo, tLoop] = titleEnds(t.title)
  if (tFrom && route.start && tFrom !== route.start)
    warn(slug, `title starts in ${tFrom}, itinerary starts in ${route.start}`)
  if (tTo && route.end && tTo !== route.end)
    warn(slug, `title ends in ${tTo}, itinerary ends in ${route.end}`)
  if (tLoop && route.end && !route.roundTrip)
    warn(slug, `title says round trip, itinerary ends in ${route.end}`)

  const cats = (t.categories || []).map((c) => byId.get(c._ref)?.title).filter(Boolean)
  const fromCats = cats.filter((c) => /^tours from /i.test(c)).map((c) => norm(c.replace(/^tours from /i, '')))
  if (route.start && fromCats.length && !fromCats.includes(route.start))
    warn(slug, `departure category "Tours from ${fromCats.join('/')}" but the itinerary starts in ${route.start}`)
  if (route.start && !fromCats.length && ['Marrakech', 'Fes', 'Casablanca', 'Tangier'].includes(route.start))
    warn(slug, `starts in ${route.start} but has no "Tours from ${route.start}" category`)
  const durCats = cats.filter((c) => /day|week/i.test(c))
  const expected = duration <= 3 ? '1-3 day tours' : duration <= 7 ? '3-7 day tours' : '1-2 Week Tours'
  if (duration && durCats.length && !durCats.some((c) => c.toLowerCase() === expected.toLowerCase()))
    warn(slug, `duration category "${durCats.join(', ')}" does not match ${duration} days (expected "${expected}")`)

  // Prices
  if (t.priceFrom !== undefined && t.priceFrom !== null && !/^\d+(\.\d+)?$/.test(String(t.priceFrom)))
    err(slug, `priceFrom is not a number (${t.priceFrom})`)
  if (t.priceFrom && !t.priceCurrency) warn(slug, 'priceFrom has no priceCurrency')
  if (t.priceEstimated) warn(slug, `price ${t.priceFrom} ${t.priceCurrency || ''} is marked as an ESTIMATE and needs confirming`)

  // SEO fields
  if (!t.seotitle) warn(slug, 'no seotitle')
  if (!t.seodescription) warn(slug, 'no seodescription')
  for (const [map, key, label] of [[seenTitles, t.seotitle, 'seotitle'], [seenDescs, t.seodescription, 'seodescription']]) {
    if (!key) continue
    if (map.has(key)) warn(slug, `${label} duplicates ${map.get(key)}`)
    else map.set(key, slug)
  }
}

const out = (title, list) => list.length && console.log(`\n${title} (${list.length})\n${list.map((l) => `  - ${l}`).join('\n')}`)
console.log(`Checked ${tours.length} tours.`)
out('ERRORS', errors)
out('WARNINGS (review, do not auto-fix)', warnings)
if (!errors.length && !warnings.length) console.log('All consistent.')
process.exit(errors.length ? 1 : 0)
