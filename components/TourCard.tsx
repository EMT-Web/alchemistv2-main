import React from 'react'
import Image from 'next/image'
import { urlFor } from '../sanity'
import { getTourRoute } from './tourRoute'

const WHATSAPP = '212623668013'

/* Short one/two-word tag for the card badge. Prefer the departure city from
   herotag ("Tour from Marrakech" -> "From Marrakech"); otherwise a theme word. */
function shortTag(tour: any): string {
  const ht = String(tour?.herotag || '').trim()
  const start = getTourRoute(tour).start
  if (start) return `From ${start}`

  const dests = (tour?.destinations || []).map((d: any) => (d?.city || '').toLowerCase()).join(' ')
  const text = `${tour?.title || ''} ${ht} ${dests}`.toLowerCase()
  if (/imperial|4 imperial|four imperial/.test(text)) return 'Imperial Cities'
  if (/essaouira|agadir|coast|beach|atlantic/.test(text)) return 'Coast & Cities'
  if (/atlas|mountain|trek|hiking/.test(text)) return 'Atlas & Desert'
  if (/merzouga|zagora|erg chebbi|erg chigaga|sahara|desert|dunes/.test(text)) return 'Sahara Desert'
  const first = ht.split(/[\s—,-]+/).filter(Boolean)[0]
  return first && first.length > 2 && !/^tour$/i.test(first) ? first : 'Morocco Tour'
}

export default function TourCard({ tour }: any) {
  const slug = tour?.slug?.current
  const route = getTourRoute(tour)
  const tag = shortTag(tour)
  const desc = tour?.seodescription || tour?.heroparagraph || ''
  const img = urlFor(tour?.mainImage).url()
  const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hi, I'd like to inquire about the "${tour?.title}" tour.`
  )}`

  return (
    <article className="tcard">
      <a href={`/tours/${slug}`} className="tcard__media" aria-label={tour?.title}>
        {img && (
          <Image
            src={img}
            alt={tour?.title || 'Morocco tour'}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 380px"
            style={{ objectFit: 'cover' }}
          />
        )}
        <span className="tcard__tag">{tag}</span>
        <span className="tcard__days">
          <span className="fa fa-clock-o" aria-hidden="true" /> {tour?.duration} Days
        </span>
      </a>

      <div className="tcard__body">
        <h3 className="tcard__title">
          <a href={`/tours/${slug}`}>{tour?.title}</a>
        </h3>

        {route.label && (
          <p className="tcard__route">
            <span className="fa fa-map-marker" aria-hidden="true" />
            {route.end && !route.roundTrip ? (
              <>
                <span>{route.start}</span>
                <span className="tcard__arrow" aria-hidden="true">→</span>
                <span className="sr-only"> to </span>
                <span>{route.end}</span>
              </>
            ) : (
              <span>{route.label}</span>
            )}
          </p>
        )}

        {tour?.priceFrom && (
          <p className="tcard__price">
            From <strong>US${Number(tour.priceFrom).toLocaleString('en-US')}</strong> per person
          </p>
        )}

        {desc && <p className="tcard__desc">{desc}</p>}

        <div className="tcard__actions">
          <a href={`/tours/${slug}`} className="tcard__btn tcard__btn--view">
            View Tour
          </a>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="tcard__btn tcard__btn--inquire">
            <span className="fa fa-whatsapp" aria-hidden="true" /> Inquire
          </a>
        </div>
      </div>
    </article>
  )
}
