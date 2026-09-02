import React, { useMemo, useState } from 'react'
import TourCard from './TourCard'

type Tour = any

/** Departure city, read from herotag ("... from Marrakech") first, then the
 *  first linked destination. Normalises the Fez/Fes + Marrakesh/Marrakech spellings. */
function departureCity(tour: Tour): string {
  const hero = String(tour?.herotag || '').toLowerCase()
  const m = hero.match(/from\s+(marrake\w*|f[eè]s|fez|casablanca|tangier|agadir|ouarzazate)/)
  const raw =
    (m && m[1]) ||
    String(tour?.destinations?.[0]?.city || '').toLowerCase()
  if (raw.startsWith('marrake')) return 'Marrakech'
  if (raw.startsWith('fe')) return 'Fes'
  if (raw.startsWith('casa')) return 'Casablanca'
  if (raw.startsWith('tangier')) return 'Tangier'
  if (raw.startsWith('agadir')) return 'Agadir'
  if (raw.startsWith('ouarzazate')) return 'Ouarzazate'
  return ''
}

function durationBucket(tour: Tour): '1-3' | '4-7' | '8+' | '' {
  const d = Number(tour?.duration)
  if (!d) return ''
  if (d <= 3) return '1-3'
  if (d <= 7) return '4-7'
  return '8+'
}

const DURATION_FILTERS: { key: string; label: string; match: (t: Tour) => boolean }[] = [
  { key: 'all', label: 'All Tours', match: () => true },
  { key: 'd13', label: '1–3 Days', match: (t) => durationBucket(t) === '1-3' },
  { key: 'd47', label: '4–7 Days', match: (t) => durationBucket(t) === '4-7' },
  { key: 'd8', label: '8+ Days', match: (t) => durationBucket(t) === '8+' },
]

const CITY_ORDER = ['Marrakech', 'Fes', 'Casablanca', 'Tangier', 'Agadir', 'Ouarzazate']

export default function ToursFilter({ tours = [] as Tour[] }) {
  const [active, setActive] = useState('all')

  const cityFilters = useMemo(() => {
    const present = new Set(tours.map(departureCity).filter(Boolean))
    return CITY_ORDER.filter((c) => present.has(c)).map((c) => ({
      key: `city-${c.toLowerCase()}`,
      label: `From ${c}`,
      match: (t: Tour) => departureCity(t) === c,
    }))
  }, [tours])

  const allFilters = [...DURATION_FILTERS, ...cityFilters]
  const current = allFilters.find((f) => f.key === active) || DURATION_FILTERS[0]
  const filtered = tours.filter(current.match)

  return (
    <section className="ftco-section tours-browse" id="toursection">
      <div className="container">
        <div className="tours-browse__head">
          <span className="subheading">Find your trip</span>
          <h2>Morocco Guided Tours</h2>
          <p>
            {tours.length} escorted tours — filter by length or by the city your journey begins in.
          </p>
        </div>

        <div className="tour-chips" role="tablist" aria-label="Filter tours">
          {DURATION_FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active === f.key}
              className={`tour-chip${active === f.key ? ' is-active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
          {cityFilters.length > 0 && <span className="tour-chips__sep" aria-hidden="true" />}
          {cityFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={active === f.key}
              className={`tour-chip${active === f.key ? ' is-active' : ''}`}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="tour-chips__count">
          Showing {filtered.length} of {tours.length} tours
        </p>

        <div className="row tcard-grid">
          {filtered.map((tour: Tour, index: number) => (
            <div key={tour?._id || index} className="col-md-6 col-lg-4 d-flex ftco-animate">
              <TourCard tour={tour} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="tours-browse__empty">
            No tours match that filter yet.{' '}
            <button type="button" className="tour-chip is-active" onClick={() => setActive('all')}>
              Show all tours
            </button>
          </p>
        )}
      </div>
    </section>
  )
}
