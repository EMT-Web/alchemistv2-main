import { GetStaticProps } from 'next'
import Image from 'next/image'
import PageHero from '../components/PageHero'
import TourCard from '../components/TourCard'
import SEO, { createBreadcrumbSchema, createFAQSchema } from '../components/SEO'
import { GUIDE_TOUR_QUERY } from '../components/GuidePage'
import { getTourRoute } from '../components/tourRoute'
import { tourPrice } from '../components/price'
import { sanityClient } from '../sanity'
import { TRIPADVISOR_URL, TRIPADVISOR_RATING, TRIPADVISOR_REVIEW_COUNT } from '../components/tripadvisor'

/*
 * Landing page for the Sahara tours that start in Errachidia, the closest city
 * and airport to the Erg Chebbi dunes of Merzouga. Tours live in the CMS
 * dataset (category "Tours From Errachidia"); the order below is the order shown.
 * Distances checked on 2026-11-03 against the drive data used on the tour pages.
 */

const SITE = 'https://www.escortedmoroccotours.com'
const PATH = '/tours-from-errachidia'
const WHATSAPP = 'https://wa.me/212623668013'
const IMG = '/images/errachidia'
const HERO = `${IMG}/dunes-sunset-sky-merzouga.jpg`

const TOUR_SLUGS = [
  '1-day-merzouga-desert-trip-from-errachidia',
  '2-days-errachidia-to-merzouga-desert-tour',
  '3-days-merzouga-desert-tour-from-errachidia',
  '3-days-errachidia-sahara-and-todra-gorge-tour',
  '4-days-errachidia-desert-and-gorges-loop',
  '3-days-desert-tour-from-errachidia-to-fes',
  '4-days-sahara-tour-from-errachidia-to-marrakech',
  '5-days-errachidia-to-marrakech-sahara-and-kasbahs-tour',
]

const STATS = [
  { value: '130 km', label: 'from Errachidia to the Merzouga dunes' },
  { value: '2 h', label: 'of driving, instead of 9 h from Marrakech' },
  { value: '8', label: 'private Sahara tours, from 1 to 5 days' },
  { value: `${TRIPADVISOR_RATING}★`, label: `on TripAdvisor from ${TRIPADVISOR_REVIEW_COUNT} reviews` },
]

const DISTANCES = [
  { from: 'Errachidia', km: '130 km / 81 mi', time: 'approx. 2h', note: 'Same day: land in the morning, camel ride at sunset', best: true },
  { from: 'Ouarzazate', km: '345 km / 214 mi', time: 'approx. 5h', note: 'A full day via the Dades and Todra gorges' },
  { from: 'Fes', km: '470 km / 292 mi', time: 'approx. 6h30', note: 'A full day via Ifrane, Midelt and the Ziz Gorges' },
  { from: 'Marrakech', km: '560 km / 348 mi', time: 'approx. 9h', note: 'Usually split over 2 days over the High Atlas' },
]

const ROUTE = [
  { km: '0 km', place: 'Errachidia', text: 'Pickup at Moulay Ali Cherif Airport (ERH) or your hotel.' },
  { km: '20 km', place: 'Meski Blue Spring', text: 'A palm shaded spring and old ksar on the edge of the Ziz Valley.' },
  { km: '40 km', place: 'Ziz Valley viewpoints', text: 'Miles of date palms and mud brick villages below the road.' },
  { km: '77 km', place: 'Erfoud', text: 'Fossil workshops and the date capital of the Tafilalet.' },
  { km: '100 km', place: 'Rissani', text: 'Caravan town, Ksar Ouled Abdelhalim and the cradle of the Alaouite dynasty.' },
  { km: '130 km', place: 'Merzouga and Erg Chebbi', text: 'Golden dunes up to 150 m high, your camel and your camp.' },
]

const EXPERIENCES = [
  { img: 'camel-caravan-erg-chebbi-dunes-merzouga', alt: 'Camel caravan in the Erg Chebbi dunes', title: 'Sunset camel trek', text: 'Ride into the Erg Chebbi dunes as the sand turns from gold to red, one camel per person.' },
  { img: 'luxury-desert-camp-merzouga-erg-chebbi', alt: 'Luxury tents in a Merzouga desert camp', title: 'Luxury desert camp', text: 'Private tents with air conditioning, heating and en suite bathroom, dinner under the stars.' },
  { img: 'gnawa-musicians-khamlia-village', alt: 'Gnawa musicians in Khamlia village', title: 'Gnawa music in Khamlia', text: 'The village of Khamlia keeps the music of the Gnawa alive with drums and iron castanets.' },
  { img: 'private-4x4-tour-sahara-morocco', alt: 'Private 4x4 in the Sahara near Merzouga', title: '4x4 desert safari', text: 'Nomad families, old mines and black desert plains around Erg Chebbi with your driver guide.' },
  { img: 'dayet-srji-lake-merzouga', alt: 'Dayet Srji seasonal lake near Merzouga', title: 'Dayet Srji lake', text: 'After the rains a lake appears beside the dunes and flamingos come to feed.' },
  { img: 'desert-camp-night-merzouga', alt: 'Desert camp at night under the moon, Merzouga', title: 'Nights under the stars', text: 'Berber drums around the fire, then one of the darkest night skies in Morocco.' },
]

const WHY = [
  { icon: 'fa-user-secret', title: 'Private, never shared', text: 'Your vehicle, your driver guide and your itinerary, for your party only. We do not run shared or group departures.' },
  { icon: 'fa-user', title: 'One driver guide throughout', text: 'The same English, French, Spanish or Italian speaking driver guide from Errachidia to the last day.' },
  { icon: 'fa-car', title: 'Our own cars, our own team', text: 'A licensed local agency from the south of Morocco. We plan and run every tour ourselves, with no middlemen.' },
  { icon: 'fa-check-circle', title: 'Clear prices', text: 'Hotel and camp taxes included, no hidden charges, and entrance fees simply paid on the spot.' },
]

const FAQS = [
  {
    question: 'How far is Merzouga from Errachidia?',
    answer:
      'Merzouga is about 130 km (81 miles) from Errachidia by road, around 2 hours of driving south through the Ziz Valley, Erfoud and Rissani. Errachidia is the closest city and airport to the Erg Chebbi dunes.',
  },
  {
    question: 'Which airport is closest to Merzouga and the Sahara desert?',
    answer:
      'Errachidia Moulay Ali Cherif Airport (ERH) is the closest airport to Merzouga. It has Royal Air Maroc flights from Casablanca and Rabat, Ryanair flights from Marrakech and seasonal Transavia flights from Paris Orly. Schedules change by season, so check them when you plan.',
  },
  {
    question: 'Can I visit the Sahara desert from Errachidia in one day?',
    answer:
      'Yes. Because the dunes are only two hours away, our 1 day Merzouga trip from Errachidia includes the Ziz Valley, Erfoud, Rissani and a camel ride in Erg Chebbi, and brings you back the same evening. To see the sunset and sunrise in the dunes, a night in the desert camp is worth it.',
  },
  {
    question: 'Why start a desert tour in Errachidia instead of Marrakech or Fes?',
    answer:
      'From Marrakech the drive to Merzouga is about 9 hours and from Fes about 6h30, so classic desert tours spend most of their time on the road. Starting in Errachidia you reach the dunes in 2 hours and can give that time to the desert itself: a second night in camp, a 4x4 safari or the gorges.',
  },
  {
    question: 'Can the tour end in Marrakech or Fes?',
    answer:
      'Yes. You can return to Errachidia, or travel on: our 3 day tour ends in Fes and our 4 and 5 day tours end in Marrakech, crossing southern Morocco through the gorges, the Road of a Thousand Kasbahs and Ait Ben Haddou.',
  },
  {
    question: 'What is the desert camp like?',
    answer:
      'We use luxury camps at the foot of the Erg Chebbi dunes. Each tent has a real bed, air conditioning, heating and its own bathroom with shower and toilet. Dinner and breakfast are included, there is live Berber drum music around the fire, and drinks can be ordered at the camp.',
  },
  {
    question: 'When is the best time for a Sahara tour from Errachidia?',
    answer:
      'October to April is the most comfortable season, with warm days and cool to cold nights. March, April, October and November are ideal. In June, July and August days in Merzouga often pass 40°C, so we plan the camel rides early in the morning and at sunset.',
  },
  {
    question: 'Are these tours private?',
    answer:
      'Yes, every tour is private for you and the people you travel with. Prices are per person based on two travellers, families and larger parties pay less per person, and every itinerary can be adjusted to your dates, flights and pace.',
  },
]

const RELATED = [
  { text: 'Merzouga Sahara Desert travel guide', href: '/destinations/merzouga-sahara-desert' },
  { text: 'Our luxury desert camps in Merzouga', href: '/merzouga-luxury-desert-camps' },
  { text: 'Marrakech to Merzouga: route and driving times', href: '/marrakech-to-merzouga' },
  { text: 'Best time to visit Morocco, month by month', href: '/best-time-to-visit-morocco' },
  { text: 'What to pack for a Sahara desert tour', href: '/blog/what-to-pack-sahara-desert-tour' },
]

const toMiles = (km: number) => Math.round(km * 0.621371)
const hours = (m: number) => {
  const h = Math.floor(m / 60)
  const r = m % 60
  return h === 0 ? `${r} min` : r === 0 ? `${h}h` : `${h}h${String(r).padStart(2, '0')}`
}

function summary(tour: any) {
  const drives = (tour.driveTimes || []).filter((d: any) => d && d.km && !d.mode)
  const longest = drives.reduce((a: any, d: any) => (!a || d.minutes > a.minutes ? d : a), null)
  const route = getTourRoute(tour)
  const desertNights = (tour.driveTimes || []).filter((d: any, i: number) => i < tour.duration - 1 && (d === null || d?.to === 'Merzouga')).length
  return {
    ends: route.roundTrip ? 'Errachidia (round trip)' : route.end || 'Errachidia',
    longest: longest ? `${hours(longest.minutes)} (${longest.km} km)` : '',
    nights: tour.duration === 1 ? 'Day trip' : `${desertNights} ${desertNights === 1 ? 'night' : 'nights'}`,
    price: tourPrice(tour)?.perPerson || '',
  }
}

export default function ToursFromErrachidia({ tours }: { tours: any[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      createBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Tours', url: '/tours' },
        { name: 'Sahara Tours from Errachidia', url: PATH },
      ]),
      {
        '@type': 'CollectionPage',
        '@id': `${SITE}${PATH}#webpage`,
        url: `${SITE}${PATH}`,
        name: 'Sahara Desert Tours from Errachidia to Merzouga',
        description:
          'Private Sahara desert tours from Errachidia, the closest city and airport to the Erg Chebbi dunes of Merzouga.',
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE}/#website` },
        publisher: { '@id': `${SITE}/#organization` },
        primaryImageOfPage: `${SITE}${HERO}`,
        about: [
          { '@type': 'City', name: 'Errachidia', sameAs: 'https://en.wikipedia.org/wiki/Errachidia' },
          { '@type': 'Place', name: 'Merzouga', sameAs: 'https://en.wikipedia.org/wiki/Merzouga' },
          { '@type': 'Place', name: 'Erg Chebbi', sameAs: 'https://en.wikipedia.org/wiki/Erg_Chebbi' },
          { '@type': 'Airport', name: 'Moulay Ali Cherif Airport', iataCode: 'ERH', sameAs: 'https://en.wikipedia.org/wiki/Moulay_Ali_Cherif_Airport' },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Sahara tours from Errachidia',
        itemListElement: tours.map((t: any, i: number) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/tours/${t.slug?.current}`,
          name: t.title,
        })),
      },
      createFAQSchema(FAQS),
    ],
  }

  return (
    <>
      <SEO
        title="Sahara Desert Tours from Errachidia to Merzouga"
        description="Private Sahara tours from Errachidia airport, just 2 hours from the Merzouga dunes. 8 tours of 1 to 5 days with camel treks, luxury camps and the gorges."
        keywords="tours from Errachidia, Errachidia to Merzouga, Sahara desert tours from Errachidia, Errachidia desert tour, Merzouga desert tours, Erg Chebbi camel trek, Errachidia airport to Merzouga, luxury desert camp Merzouga, private desert tour Morocco"
        image={HERO}
        schema={schema}
      />
      <PageHero
        title="Sahara Tours from Errachidia"
        tag="Tours from Errachidia"
        p="The closest gateway to the Erg Chebbi dunes. Land at Errachidia airport and ride a camel into the Merzouga Sahara the same afternoon."
        img={HERO}
      />

      {/* Key figures */}
      <section className="erh-stats" aria-label="Errachidia tours at a glance">
        <div className="container">
          <ul className="erh-stats__list">
            {STATS.map((s) => (
              <li key={s.label} className="erh-stats__item">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Intro */}
      <section className="ftco-section erh-intro">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="subheading">Errachidia to Merzouga</span>
              <h2 className="erh-h2">The shortest road to the Sahara desert in Morocco</h2>
              <p className="erh-lead">
                Errachidia is the closest city and airport to Merzouga and the dunes of Erg Chebbi, only about 130 km
                (81 miles) away. Where a desert tour from Marrakech needs two long days on the road, from Errachidia you
                reach the dunes in about two hours, in time for the sunset camel trek.
              </p>
              <p>
                Our private Sahara tours from Errachidia are built around that advantage: more nights in the desert,
                fewer hours in the car. Choose a day trip, a classic night in a luxury desert camp, two nights with a
                4x4 desert safari, a loop through the Todra and Dades gorges, or a journey on to Fes or Marrakech.
              </p>
              <div className="erh-actions">
                <a href="#tours" className="btn btn-primary">See the 8 tours</a>
                <a
                  href={`${WHATSAPP}?text=${encodeURIComponent('Hi, I would like a private Sahara tour from Errachidia.')}`}
                  className="btn erh-btn-wa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fa fa-whatsapp" aria-hidden="true" /> Ask on WhatsApp
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="erh-intro__media">
                <Image
                  src={`${IMG}/sunrise-tea-erg-chebbi-dune-merzouga.jpg`}
                  alt="Travellers having mint tea on a dune at sunrise in Erg Chebbi, Merzouga"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours */}
      <section className="ftco-section ftco-no-pt" id="tours">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 heading-section text-center">
              <span className="subheading">Private tours</span>
              <h2 className="erh-h2">Sahara desert tours from Errachidia</h2>
              <p className="mb-4">
                From a one day camel ride to five days across the south to Marrakech. Every tour is private, starts at
                Errachidia airport or your hotel, and can be adjusted to your flights.
              </p>
            </div>
          </div>
          <div className="row tcard-grid">
            {tours.map((tour: any) => (
              <div key={tour._id} className="col-md-6 col-lg-4 d-flex">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare */}
      <section className="ftco-section ftco-no-pt">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 className="erh-h2 text-center">Compare the tours at a glance</h2>
              <div className="guide__table-wrap">
                <table className="tourx-table guide__table erh-table">
                  <caption>Prices per person, based on 2 travellers sharing</caption>
                  <thead>
                    <tr>
                      <th scope="col">Tour</th>
                      <th scope="col">Days</th>
                      <th scope="col">In the desert</th>
                      <th scope="col">Ends in</th>
                      <th scope="col">Longest drive</th>
                      <th scope="col">From</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map((t: any) => {
                      const s = summary(t)
                      return (
                        <tr key={t._id}>
                          <th scope="row">
                            <a href={`/tours/${t.slug?.current}`}>{t.title}</a>
                          </th>
                          <td>{t.duration}</td>
                          <td>{s.nights}</td>
                          <td>{s.ends}</td>
                          <td>{s.longest}</td>
                          <td className="erh-table__price">{s.price}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distance comparison + route */}
      <section className="ftco-section erh-route">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <span className="subheading">Less driving, more desert</span>
              <h2 className="erh-h2">How far is Merzouga from each city?</h2>
              <ul className="erh-dist">
                {DISTANCES.map((d) => (
                  <li key={d.from} className={`erh-dist__row${d.best ? ' is-best' : ''}`}>
                    <div className="erh-dist__city">
                      {d.from}
                      {d.best && <em>Closest</em>}
                    </div>
                    <div className="erh-dist__nums">
                      <strong>{d.time}</strong> · {d.km}
                    </div>
                    <p>{d.note}</p>
                  </li>
                ))}
              </ul>
              <p className="tourx-note">Approximate road distances and driving times to Merzouga, without stops.</p>
            </div>
            <div className="col-lg-6">
              <span className="subheading">The road to the dunes</span>
              <h2 className="erh-h2">Errachidia to Merzouga, stop by stop</h2>
              <ol className="erh-timeline">
                {ROUTE.map((r) => (
                  <li key={r.place}>
                    <span className="erh-timeline__km">{r.km}</span>
                    <div>
                      <h3>{r.place}</h3>
                      <p>{r.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 heading-section text-center mb-4">
              <span className="subheading">In the Erg Chebbi dunes</span>
              <h2 className="erh-h2">What you experience in the Merzouga desert</h2>
            </div>
          </div>
          <div className="erh-exp">
            {EXPERIENCES.map((e) => (
              <figure key={e.title} className="erh-exp__card">
                <div className="erh-exp__media">
                  <Image src={`${IMG}/${e.img}.jpg`} alt={e.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <figcaption>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="ftco-section erh-why">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 heading-section heading-section-white text-center mb-4">
              <span className="subheading">Escorted Morocco Tours</span>
              <h2 className="erh-h2">Why book your Errachidia desert tour with us</h2>
            </div>
          </div>
          <div className="erh-why__grid">
            {WHY.map((w) => (
              <div key={w.title} className="erh-why__item">
                <span className={`fa ${w.icon}`} aria-hidden="true" />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
          <p className="erh-why__ta">
            Rated {TRIPADVISOR_RATING} out of 5 by {TRIPADVISOR_REVIEW_COUNT} travellers.{' '}
            <a href={TRIPADVISOR_URL} target="_blank" rel="noopener noreferrer">
              Read our TripAdvisor reviews
            </a>
          </p>
        </div>
      </section>

      {/* FAQ + related */}
      <section className="ftco-section guide">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <section id="faq" className="guide__section">
                <h2>Questions about Sahara tours from Errachidia</h2>
                {FAQS.map((f) => (
                  <div key={f.question} className="guide__faq">
                    <h3>{f.question}</h3>
                    <p>{f.answer}</p>
                  </div>
                ))}
              </section>
              <section className="guide__section">
                <h2>Plan your Merzouga desert trip</h2>
                <ul className="guide__links">
                  {RELATED.map((r) => (
                    <li key={r.href}>
                      <a href={r.href}>{r.text}</a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="erh-cta">
        <div className="erh-cta__bg">
          <Image src={`${IMG}/sunset-over-erg-chebbi-dunes.jpg`} alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="container erh-cta__inner">
          <h2>Your own Sahara tour from Errachidia</h2>
          <p>Tell us your flight times and how many nights you would like in the dunes. We reply with a private itinerary and a clear price.</p>
          <div className="erh-actions erh-actions--center">
            <a href="/contact" className="btn btn-primary">Plan my desert tour</a>
            <a
              href={`${WHATSAPP}?text=${encodeURIComponent('Hi, I would like a private Sahara tour from Errachidia.')}`}
              className="btn erh-btn-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="fa fa-whatsapp" aria-hidden="true" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const found = await sanityClient.fetch(GUIDE_TOUR_QUERY, { slugs: TOUR_SLUGS })
  const tours = TOUR_SLUGS.map((s) => found.find((t: any) => t.slug?.current === s)).filter(Boolean)
  if (tours.length !== TOUR_SLUGS.length) throw new Error('tours-from-errachidia: missing tours')
  return { props: { tours } }
}
