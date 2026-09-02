import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const SLIDES = [
  '/cms/21b97a43bc01a80f83acc204029f580c03013c6b.jpg', // Sahara dunes, camel caravan
  '/images/hero-bgs/chefchaouen2.jpg', // Rif / Atlas mountains
  '/images/hero-bgs/testemo.jpg', // desert camp at dusk
]
const AUTOPLAY_MS = 6000

function HomeHero({ title, tag, p, slides = SLIDES }: any) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const count = slides.length

  const go = (n: number) => setIndex(((n % count) + count) % count)

  useEffect(() => {
    if (count < 2 || paused) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [count, paused])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section
      className="hero-wrap hero-wrap--compact hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((src: string, i: number) => (
        <div key={src} className={`hero-slider__slide${i === index ? ' is-active' : ''}`} aria-hidden={i !== index}>
          <Image src={src} alt="" fill sizes="100vw" priority={i === 0} style={{ objectFit: 'cover' }} />
        </div>
      ))}
      <div className="hero-wrap__scrim" />

      <div className="container">
        <div className="row no-gutters slider-text align-items-center">
          <div className="col-md-8">
            {tag ? <span className="subheading">{tag}</span> : null}
            <h1 className="mb-3">{title}</h1>
            {p ? <p className="caps">{p}</p> : null}
          </div>
        </div>
      </div>

      {count > 1 && (
        <>
          <button type="button" className="hero-slider__nav hero-slider__nav--prev" aria-label="Previous slide" onClick={() => go(index - 1)}>
            &#8249;
          </button>
          <button type="button" className="hero-slider__nav hero-slider__nav--next" aria-label="Next slide" onClick={() => go(index + 1)}>
            &#8250;
          </button>
          <div className="hero-slider__dots">
            {slides.map((s: string, i: number) => (
              <button
                key={s}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`hero-slider__dot${i === index ? ' is-active' : ''}`}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default HomeHero
