/**
 * One source of truth for a tour's start and end city.
 *
 * The route used to be read from the first and last linked destination, but
 * destinations are a tag list in no particular order, so cards showed routes
 * such as "Fes → Merzouga" for a Marrakech to Fes tour. The day by day
 * `driveTimes` follow the itinerary, so the start is the first drive's `from`
 * and the end is the last drive's `to` (airport transfers count as the city).
 *
 * The end is only reported when the drive list covers every day of the tour;
 * an incomplete itinerary gives the start alone rather than a guessed end.
 */

type Drive = { from?: string; to?: string; mode?: string; km?: number } | null | undefined

export type TourRoute = {
  start: string
  end: string
  roundTrip: boolean
  /** "Marrakech → Fes", "Round trip from Fes", "From Marrakech" or "" */
  label: string
}

/** "Casablanca airport" -> "Casablanca"; "Fez" -> "Fes"; "Marrakesh" -> "Marrakech". */
export function cityName(place?: string): string {
  const p = String(place || '')
    .replace(/\s+(airport|port)(\/(airport|port))?$/i, '')
    .trim()
  if (/^marrakesh$/i.test(p)) return 'Marrakech'
  if (/^fez$/i.test(p)) return 'Fes'
  if (/^tanger$/i.test(p)) return 'Tangier'
  return p
}

export function getTourRoute(tour: any): TourRoute {
  const drives = (Array.isArray(tour?.driveTimes) ? tour.driveTimes : []) as Drive[]
  const legs = drives.filter((d) => d && d.from && d.to && !d.mode) as NonNullable<Drive>[]
  const start = cityName(legs[0]?.from)
  const complete = drives.length > 0 && drives.length === Number(tour?.duration)
  const end = complete ? cityName(legs[legs.length - 1]?.to) : ''
  const roundTrip = !!start && !!end && start === end
  const label = !start
    ? ''
    : roundTrip
      ? `Round trip from ${start}`
      : end
        ? `${start} → ${end}`
        : `From ${start}`
  return { start, end: roundTrip ? start : end, roundTrip, label }
}
