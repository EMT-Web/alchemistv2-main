import React from 'react'
import { urlFor } from '../sanity'

function fmtDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return ''
  }
}

function HomeBlog({ posts }: any) {
  const items = (posts || []).slice(0, 3)
  if (!items.length) return null

  return (
    <section className="ftco-section blog-home-section">
      <div className="container">
        <div className="row align-items-end blog-home-head">
          <div className="col-md-8 heading-section ftco-animate">
            <span className="subheading">Travel journal</span>
            <h2 className="mb-2">Stories &amp; guides from Morocco</h2>
          </div>
          <div className="col-md-4 text-md-right ftco-animate blog-home-head__link">
            <a href="/blog">All articles <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>

        <div className="row">
          {items.map((p: any) => {
            const img = p.mainImage ? urlFor(p.mainImage).url() : p.localImage
            return (
              <div key={p._id || p.slug?.current} className="col-md-4 d-flex ftco-animate">
                <a href={`/blog/${p.slug.current}`} className="post-card">
                  <span className="post-card__img" style={{ backgroundImage: `url(${img})` }} />
                  <span className="post-card__body">
                    <span className="post-card__date">{fmtDate(p._createdAt || p.publishedAt)}</span>
                    <span className="post-card__title">{p.title}</span>
                    <span className="post-card__excerpt">{p.seodescription}</span>
                    <span className="post-card__more">Read article &rarr;</span>
                  </span>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HomeBlog
