import React from 'react'
import PageHero from './PageHero'
import TourCard from './TourCard'
import SEO, { createBreadcrumbSchema, createFAQSchema } from './SEO'
import type { Guide } from '../data/guides'

const SITE = 'https://www.escortedmoroccotours.com'

export default function GuidePage({ guide, tours }: { guide: Guide; tours: any[] }) {
  const url = `${SITE}/${guide.slug}`

  const articleSchema = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.title,
    description: guide.seodescription,
    image: `${SITE}${guide.image}`,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: 'en',
    mainEntityOfPage: url,
    author: {
      '@type': 'Person',
      name: 'Mustafa',
      jobTitle: 'Tour operator',
      worksFor: { '@id': `${SITE}/#organization` },
    },
    publisher: { '@id': `${SITE}/#organization` },
    about: guide.mentions.map((m) => ({ '@type': m.type, name: m.name, sameAs: m.sameAs })),
  }

  const toursSchema = tours.length
    ? {
        '@type': 'ItemList',
        name: guide.toursHeading,
        itemListElement: tours.map((t: any, i: number) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/tours/${t.slug?.current}`,
          name: t.title,
        })),
      }
    : null

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      createBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Travel guides', url: '/blog' },
        { name: guide.title, url: `/${guide.slug}` },
      ]),
      articleSchema,
      createFAQSchema(guide.faqs),
      ...(toursSchema ? [toursSchema] : []),
    ],
  }

  const updated = new Date(`${guide.updated}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <>
      <SEO
        title={guide.seotitle}
        description={guide.seodescription}
        image={guide.image}
        type="article"
        publishedTime={guide.published}
        modifiedTime={guide.updated}
        schema={schema}
      />
      <PageHero title={guide.title} tag={guide.tag} p={guide.heroIntro} img={guide.image} />

      <section className="ftco-section guide">
        <div className="container">
          <div className="row justify-content-center">
            <article className="col-lg-9">
              <p className="breadcrumbs guide__crumbs">
                <a href="/">Home</a> <span aria-hidden="true">›</span> <a href="/blog">Travel guides</a>{' '}
                <span aria-hidden="true">›</span> <span>{guide.title}</span>
              </p>
              <p className="guide__byline">
                By Mustafa, Escorted Morocco Tours · Updated <time dateTime={guide.updated}>{updated}</time>
              </p>

              <div className="guide__answer">
                <h2 className="guide__answer-title">Quick answer</h2>
                <p>{guide.answer}</p>
              </div>

              <nav className="guide__toc" aria-label="On this page">
                <h2>On this page</h2>
                <ol>
                  {guide.sections.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>{s.h2}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#tours">{guide.toursHeading}</a>
                  </li>
                  <li>
                    <a href="#faq">Frequently asked questions</a>
                  </li>
                </ol>
              </nav>

              {guide.sections.map((s) => (
                <section key={s.id} id={s.id} className="guide__section">
                  <h2>{s.h2}</h2>
                  <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: s.html }} />
                  {s.table && (
                    <div className="guide__table-wrap">
                      <table className="tourx-table guide__table">
                        <caption>{s.table.caption}</caption>
                        <thead>
                          <tr>
                            {s.table.head.map((h) => (
                              <th key={h} scope="col">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((r, i) => (
                            <tr key={i} className={r[0] === 'Total' ? 'guide__total' : undefined}>
                              <th scope="row">{r[0]}</th>
                              {r.slice(1).map((c, j) => (
                                <td key={j}>{c}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {s.table.note && <p className="tourx-note">{s.table.note}</p>}
                    </div>
                  )}
                </section>
              ))}
            </article>
          </div>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="ftco-section ftco-no-pt" id="tours">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 heading-section text-center">
                <h2>{guide.toursHeading}</h2>
                <p className="mb-4">Private tours with your own driver guide. Every itinerary can be adjusted to your dates and pace.</p>
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
      )}

      <section className="ftco-section ftco-no-pt guide">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <section id="faq" className="guide__section">
                <h2>Frequently asked questions</h2>
                {guide.faqs.map((f) => (
                  <div key={f.question} className="guide__faq">
                    <h3>{f.question}</h3>
                    <p>{f.answer}</p>
                  </div>
                ))}
              </section>

              <section className="guide__section">
                <h2>Related guides</h2>
                <ul className="guide__links">
                  {guide.related.map((r) => (
                    <li key={r.href}>
                      <a href={r.href}>{r.text}</a>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="guide__section guide__sources">
                <h2>Sources</h2>
                <ul>
                  {guide.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const GUIDE_TOUR_QUERY = `
  *[_type == 'tour' && slug.current in $slugs]{
    _id, title, duration, priceFrom, slug, herotag, seodescription, mainImage,
    "destinations": destinations[]->{ slug, city }
  }
`
