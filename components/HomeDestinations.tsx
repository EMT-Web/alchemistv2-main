import React, { useRef } from 'react'
import { urlFor } from '../sanity'

function HomeDestinations({ destinations }: any) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCards = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.project-destination') as HTMLElement | null
    const step = card ? card.offsetWidth + 22 : 320
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const list = (destinations || []).filter((d: any) => d?.slug?.current)

  return (
    <section
      className="ftco-section img ftco-select-destination"
      style={{ backgroundImage: `url("/images/bg_3.jpg")` }}
    >
      <div className="container">
        <div className="row justify-content-center pb-4">
          <div className="col-md-12 heading-section text-center ftco-animate">
            <span className="subheading">A Journey of Culture and Adventure</span>
            <h2 className="mb-4">Escorted Morocco Tours Destinations</h2>
            <p className="mb-4">
              From bustling cities to the Sahara Desert, majestic Atlas Mountains to exotic beaches — our
              escorted tours cover it all.
            </p>
          </div>
        </div>

        <div className="dest-slider">
          {list.length > 4 && (
            <button
              type="button"
              className="dest-slider__nav dest-slider__nav--prev"
              aria-label="Previous destinations"
              onClick={() => scrollByCards(-1)}
            >
              &#8249;
            </button>
          )}

          <div className="dest-slider__track" ref={trackRef}>
            {list.map((destination: any) => (
              <div key={destination._id} className="project-destination">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${urlFor(destination.mainImage).url()})` }}
                >
                  <div className="text">
                    <div className="city">
                      <a
                        href={`/destinations/${destination.slug.current}`}
                        aria-label={destination.city}
                      >
                        {destination.city} <i className="fa fa-arrow-right" />
                      </a>
                    </div>
                    <a href={`/destinations/${destination.slug.current}`}>
                      <span>{destination.count} Tours</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {list.length > 4 && (
            <button
              type="button"
              className="dest-slider__nav dest-slider__nav--next"
              aria-label="More destinations"
              onClick={() => scrollByCards(1)}
            >
              &#8250;
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeDestinations
