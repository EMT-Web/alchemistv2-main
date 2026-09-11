import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { sanityClient, urlFor } from '../../sanity'
import { PortableText } from '@portabletext/react'
import { createBodyComponents } from '../../components/portableTextComponents'
import { parseTourBody } from '../../components/tourBody'
import PageHero from '../../components/PageHero'
import TourCard from '../../components/TourCard'
import SEO, { createTourSchema, createBreadcrumbSchema, createFAQSchema } from '../../components/SEO'

const WHATSAPP = 'https://wa.me/212623668013'

type FormValues = {
  name: string
  email: string
  arrivalDate: string
  departureDate: string
  travelers: number
  subject: string
  message: string
}

type TourFaq = { question: string; answer: string; link?: { text: string; href: string } }

function buildTourFaqs(tour: any): TourFaq[] {
  const destinationNames = (tour.destinations || []).map((d: any) => d?.city).filter(Boolean).join(', ')
  const amenityNames = (tour.amenities || []).map((a: any) => a?.title).filter(Boolean).join(', ')
  const isSaharaTour = (tour.destinations || []).some((d: any) =>
    /merzouga|zagora|sahara|erg chebbi|erg chigaga/i.test(d?.city || '')
  )

  const faqs: TourFaq[] = [
    {
      question: `How many days is the ${tour.title}?`,
      answer: destinationNames
        ? `This tour runs for ${tour.duration || 0} days, covering ${destinationNames}.`
        : `This tour runs for ${tour.duration || 0} days.`,
    },
  ]
  if (amenityNames) {
    faqs.push({
      question: "What's included in this tour?",
      answer: `This tour includes: ${amenityNames}. For anything not listed — flights, travel insurance, personal expenses — get in touch and we'll confirm exactly what's covered before you book.`,
    })
  }
  faqs.push(
    {
      question: 'Do I need a visa to visit Morocco?',
      answer:
        'Many nationalities, including the US, Canada, UK and most EU countries, can enter Morocco visa-free for tourist stays of up to 90 days. Requirements vary, so confirm what applies to you before booking.',
    },
    {
      question: 'How fit do I need to be for this tour?',
      answer:
        'Most of our tours suit travellers with a reasonable level of general fitness — expect walking on uneven terrain, some early starts, and on Sahara itineraries a camel trek. Tell us about any concerns when you inquire.',
    },
    {
      question: 'Can this itinerary be customised?',
      answer:
        'Yes. This itinerary can be adapted to your travel dates, pace and interests — use the inquiry form on this page to tell us what you would like to change.',
    },
    {
      question: 'What size are the tour groups?',
      answer:
        'We run private and small-group departures to keep the experience personal rather than large coach-tour groups. Group size can vary by date, so ask us when you inquire.',
    }
  )
  if (isSaharaTour) {
    faqs.push({
      question: 'What should I pack for the Sahara portion of this tour?',
      answer:
        'Layered clothing for big day-to-night temperature swings, sun protection, a scarf for sand and wind, and closed shoes for the camel trek are the essentials.',
      link: { text: 'See our full desert packing list.', href: '/blog/what-to-pack-sahara-desert-tour' },
    })
  }
  return faqs
}

function tourDetails({ tour, destinations, relatedTours }: any) {
  // Inline CMS body images fall back to the page title when Sanity has no alt.
  const bodyComponents = React.useMemo(() => createBodyComponents(tour?.title || ''), [tour?.title])
  const [isError, setIsError] = useState<boolean | null>(null)
  const { register, handleSubmit } = useForm<FormValues>()
  // Itinerary days are all expanded by default; clicking a day toggles just that day.
  const [closedDays, setClosedDays] = useState<Set<number>>(new Set())
  const toggleDay = (i: number) =>
    setClosedDays((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const onSubmit: SubmitHandler<FormValues> = async (data, e: any) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, subject: `Inquiry: ${tour.title}` }),
      })
      setIsError(!res.ok)
    } catch {
      setIsError(true)
    }
  }

  const dests = (tour.destinations || []).filter((d: any) => d?.city)
  const from = dests[0]?.city
  const to = dests[dests.length - 1]?.city
  const parsed = parseTourBody(tour.body)
  const tourFaqs = buildTourFaqs(tour)

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tours/${tour.slug.current}` },
  ])
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, createTourSchema(tour), createFAQSchema(tourFaqs)],
  }

  const facts = [
    { icon: 'fa-clock-o', label: 'Duration', value: `${tour.duration || 0} days` },
    { icon: 'fa-user', label: 'Tour type', value: 'Private & small-group' },
    { icon: 'fa-map-marker', label: 'Route', value: from ? `${from}${to && to !== from ? ` → ${to}` : ''}` : 'Morocco' },
    { icon: 'fa-calendar', label: 'Availability', value: 'Year-round' },
  ]

  return (
    <>
      <SEO
        title={tour.seotitle || tour.title}
        description={tour.seodescription || tour.heroparagraph || tour.title}
        keywords={tour.seokeywords || 'Morocco tours, Morocco travel, escorted tours Morocco, guided tours'}
        image={tour.mainImage ? urlFor(tour.mainImage).url()! : undefined}
        type="product"
        schema={combinedSchema}
      />

      <PageHero
        title={tour.title}
        tag={tour.herotag || 'Morocco tour'}
        p=""
        img={tour.coverImage ? urlFor(tour.coverImage).url()! : urlFor(tour.mainImage).url()!}
      />

      {/* Quick facts bar */}
      <div className="tourx-facts">
        <div className="container">
          <ul>
            {facts.map((f) => (
              <li key={f.label}>
                <span className={`fa ${f.icon}`} aria-hidden="true" />
                <span className="tourx-facts__label">{f.label}</span>
                <span className="tourx-facts__value">{f.value}</span>
              </li>
            ))}
            <li className="tourx-facts__rating">
              <span className="fa fa-tripadvisor" aria-hidden="true" /> 5.0 on TripAdvisor
            </li>
          </ul>
        </div>
      </div>

      <section className="ftco-section tourx">
        <div className="container">
          <div className="row">
            {/* MAIN */}
            <div className="col-lg-8 tourx__main">
              <img src={urlFor(tour.mainImage).url()!} alt={tour.title} className="tourx__hero-img" />

              <div className="tourx-block">
                <h2>Tour overview</h2>
                {parsed.overview.length > 0 ? (
                  <PortableText value={parsed.overview} components={bodyComponents} />
                ) : (
                  <p>{tour.heroparagraph || tour.seodescription}</p>
                )}
                {tour.amenities?.length > 0 && (
                  <ul className="tourx-chips">
                    {tour.amenities.map((a: any) => a?.title && <li key={a.slug?.current || a.title}>{a.title}</li>)}
                  </ul>
                )}
              </div>

              {/* Itinerary */}
              <div className="tourx-block">
                <h2>Day-by-day itinerary</h2>
                {parsed.structured ? (
                  <div className="tourx-acc">
                    {parsed.days.map((day, i) => {
                      const isOpen = !closedDays.has(i)
                      return (
                        <div key={i} className={`tourx-acc__item${isOpen ? ' is-open' : ''}`}>
                          <button
                            type="button"
                            className="tourx-acc__head"
                            aria-expanded={isOpen}
                            onClick={() => toggleDay(i)}
                          >
                            <span className="tourx-acc__num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="tourx-acc__title">{day.title.replace(/^day\s*\d+\s*:?\s*/i, '')}</span>
                            <span className="tourx-acc__toggle" aria-hidden="true" />
                          </button>
                          <div className="tourx-acc__body">
                            <PortableText value={day.content} components={bodyComponents} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="tour-itinerrary">
                    <PortableText value={tour.body} components={bodyComponents} />
                  </div>
                )}
              </div>

              {/* Included / Excluded */}
              {(parsed.included.length > 0 || parsed.excluded.length > 0) && (
                <div className="tourx-block">
                  <h2>What&apos;s included</h2>
                  <div className="tourx-inex">
                    <div>
                      <h3><span className="fa fa-check-circle" aria-hidden="true" /> Included</h3>
                      <ul className="tourx-inex__yes">
                        {parsed.included.map((x, i) => <li key={i}>{x}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3><span className="fa fa-times-circle" aria-hidden="true" /> Not included</h3>
                      <ul className="tourx-inex__no">
                        {parsed.excluded.map((x, i) => <li key={i}>{x}</li>)}
                      </ul>
                    </div>
                  </div>
                  {parsed.notes.length > 0 && (
                    <p className="tourx-note">
                      <strong>Good to know:</strong> {parsed.notes.join(' ')}
                    </p>
                  )}
                </div>
              )}

              {/* At a glance */}
              <div className="tourx-block">
                <h2>Tour at a glance</h2>
                <table className="tourx-table">
                  <tbody>
                    <tr><th>Duration</th><td>{tour.duration || 0} days</td></tr>
                    {from && <tr><th>Starts</th><td>{from}</td></tr>}
                    {to && <tr><th>Ends</th><td>{to}</td></tr>}
                    <tr><th>Tour type</th><td>Private &amp; small-group</td></tr>
                    <tr><th>Transport</th><td>Private air-conditioned vehicle</td></tr>
                    <tr><th>Languages</th><td>English, French, Spanish, Arabic</td></tr>
                    <tr><th>Availability</th><td>Year-round, on your dates</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Destinations */}
              {dests.length > 0 && (
                <div className="tourx-block">
                  <h2>Destinations on this tour</h2>
                  <div className="tourx-dests">
                    {dests.map((d: any) =>
                      d?.slug?.current ? (
                        <a key={d.slug.current} href={`/destinations/${d.slug.current}`} className="tourx-dest-chip">
                          <span className="fa fa-map-marker" aria-hidden="true" /> {d.city}
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              )}

              {/* FAQ */}
              <div className="tourx-block">
                <h2>Frequently asked questions</h2>
                <div className="tourx-faq">
                  {tourFaqs.map((faq, i) => {
                    const isOpen = openFaq === i
                    return (
                      <div key={faq.question} className={`tourx-faq__item${isOpen ? ' is-open' : ''}`}>
                        <button
                          type="button"
                          className="tourx-faq__q"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                        >
                          <span>{faq.question}</span>
                          <span className="tourx-faq__toggle" aria-hidden="true" />
                        </button>
                        <div className="tourx-faq__a">
                          <p>
                            {faq.answer}{' '}
                            {faq.link && <a href={faq.link.href}>{faq.link.text}</a>}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* STICKY INQUIRY */}
            <div className="col-lg-4">
              <div className="tourx-inquiry">
                <h3>Plan this trip</h3>
                <p className="tourx-inquiry__sub">
                  No payment required. We usually reply within an hour.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="text" placeholder="Your name" {...register('name', { required: true })} />
                  <input type="email" placeholder="Your email" {...register('email', { required: true })} />
                  <label>Arrival date</label>
                  <input type="date" {...register('arrivalDate')} />
                  <label>Departure date</label>
                  <input type="date" {...register('departureDate')} />
                  <input type="number" placeholder="Number of travellers" min={1} max={40} {...register('travelers')} />
                  <textarea rows={4} placeholder="Anything you'd like to change or ask?" {...register('message', { required: true })} />
                  {isError === false && (
                    <div className="tourx-inquiry__ok">
                      <strong>Thank you!</strong> Your message has been sent — we&apos;ll be in touch shortly.
                    </div>
                  )}
                  {isError === true && (
                    <div className="tourx-inquiry__err">
                      Something went wrong. Please try again or email{' '}
                      <a href="mailto:info@escortedmoroccotours.com">info@escortedmoroccotours.com</a>.
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary">Send inquiry →</button>
                </form>
                <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I'd like to inquire about the "${tour.title}" tour.`)}`}
                   target="_blank" rel="noopener noreferrer" className="tourx-inquiry__wa">
                  <span className="fa fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="tourx-cta">
        <div className="container">
          <h2>Questions about this tour?</h2>
          <p>Message our team on WhatsApp — quick answers, no obligation.</p>
          <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi, I have a question about the "${tour.title}" tour.`)}`}
             target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <span className="fa fa-whatsapp" aria-hidden="true" /> Chat with us
          </a>
        </div>
      </section>

      {/* Related */}
      {relatedTours?.length > 0 && (
        <section className="ftco-section">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8 heading-section">
                <span className="subheading">You might also like</span>
                <h2 className="mb-2">Similar Morocco tours</h2>
              </div>
            </div>
            <div className="row tcard-grid">
              {relatedTours.filter((t: any) => t?.slug?.current).slice(0, 3).map((t: any, i: number) => (
                <div key={t._id || i} className="col-md-6 col-lg-4 d-flex ftco-animate">
                  <TourCard tour={t} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const tours = await sanityClient.fetch(`*[_type == 'tour']{ slug { current } }`)
  return {
    paths: tours.map((t: any) => ({ params: { slug: t.slug.current } })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
  *[_type == 'tour' && slug.current == $slug][0]{
      _id, _createdAt, seotitle, seodescription, seokeywords, herotag, heroparagraph,
      title, duration, slug, mainImage, coverImage,
      "amenities": amenities[]->{ _createdAt, slug, title, icon },
      "destinations": destinations[]->{ _createdAt, city, slug, title },
      body,
     "related": *[_type == "tour" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(duration asc)[0..4] {
        _id, _createdAt, title, duration, slug, herotag, seodescription, mainImage,
        "destinations": destinations[]->{ city, slug }
      }
    }
  `
  const query2 = `
  *[_type == 'destination'] | order(city asc)[0..9]{
      _id, _createdAt, title, "count": count(*[_type == "tour" && references(^._id)]), slug, city
    }
  `
  const tour = await sanityClient.fetch(query, { slug: params?.slug })
  if (!tour) return { notFound: true }
  const destinations = await sanityClient.fetch(query2)

  return {
    props: { tour, destinations, relatedTours: tour.related || [] },
    revalidate: 10,
  }
}

export default tourDetails
