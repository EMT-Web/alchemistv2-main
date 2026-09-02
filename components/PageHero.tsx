import React from 'react'
import Image from 'next/image'

function PageHero({title, tag, img, p}:any) {
  return (
    <section className="hero-wrap hero-wrap--compact">
      <div className="hero-wrap__bg">
        <Image src={img} alt="Escorted Morocco Tours" fill sizes="100vw" priority style={{ objectFit: 'cover' }} />
      </div>
      <div className="hero-wrap__scrim" />
      <div className="container">
        <div className="row no-gutters slider-text align-items-center">
          <div className="col-md-8 ftco-animate">
            {tag ? <span className="subheading">{tag}</span> : null}
            <h1 className="mb-3">{title}</h1>
            {p ? <p className="caps">{p}</p> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PageHero