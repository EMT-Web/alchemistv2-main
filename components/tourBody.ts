/**
 * The CMS stores a tour itinerary as one flat Portable Text array:
 *   h1  "Day 1: ..."   (sometimes h3)
 *   normal / bullet blocks  -> that day's content
 *   h3  "Inclusions" / "Exclusions" / "Notes"  -> lists
 *
 * This splits it into structured parts so the tour page can render an
 * accordion + an included/excluded grid instead of a wall of text.
 */
type Block = any

const text = (b: Block): string =>
  (b?.children || []).map((c: any) => c?.text || '').join('').trim()

const isHeading = (b: Block) => ['h1', 'h2', 'h3', 'h4'].includes(b?.style)

export type ParsedTourBody = {
  overview: Block[]
  days: { title: string; content: Block[] }[]
  included: string[]
  excluded: string[]
  notes: string[]
  structured: boolean
  raw: Block[]
}

export function parseTourBody(body: Block[] | undefined): ParsedTourBody {
  const raw = Array.isArray(body) ? body : []
  const overview: Block[] = []
  const days: { title: string; content: Block[] }[] = []
  const included: string[] = []
  const excluded: string[] = []
  const notes: string[] = []

  let mode: 'overview' | 'day' | 'included' | 'excluded' | 'notes' = 'overview'
  let current: { title: string; content: Block[] } | null = null
  const flush = () => {
    if (current) days.push(current)
    current = null
  }

  for (const b of raw) {
    const t = text(b)
    const isDay = /^\s*day\s*\d/i.test(t)

    if (isHeading(b) && isDay) {
      flush()
      current = { title: t.replace(/\s+/g, ' ').trim(), content: [] }
      mode = 'day'
      continue
    }
    if (isHeading(b)) {
      if (/inclusion|included/i.test(t) && !/exclu|not\s+included/i.test(t)) {
        flush(); mode = 'included'; continue
      }
      if (/exclusion|excluded|not\s+included/i.test(t)) {
        flush(); mode = 'excluded'; continue
      }
      if (/^\s*note/i.test(t)) {
        flush(); mode = 'notes'; continue
      }
      // any other heading while inside a day stays part of that day
      if (mode === 'day' && current) { current.content.push(b); continue }
    }

    if (!t && b?.style !== 'image') continue

    if (mode === 'day' && current) current.content.push(b)
    else if (mode === 'included') included.push(t)
    else if (mode === 'excluded') excluded.push(t)
    else if (mode === 'notes') notes.push(t)
    else overview.push(b)
  }
  flush()

  return {
    overview,
    days,
    included: included.filter(Boolean),
    excluded: excluded.filter(Boolean),
    notes: notes.filter(Boolean),
    structured: days.length > 0,
    raw,
  }
}
