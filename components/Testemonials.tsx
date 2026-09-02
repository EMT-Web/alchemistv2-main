import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Review = {
  name: string
  date: string
  avatar: string
  text: string
  url: string
}

const REVIEWS: Review[] = [
  {
    name: 'Mira I.',
    date: 'April 13, 2023',
    avatar:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-f/01/2e/70/9e/avatar069.jpg?w=100&h=-1&s=1',
    text:
      "If I could give this tour MORE than 5 stars I would! My friend and I did the 6 days Special Morocco Tour with Elmustapha Oufouta and we couldn't have asked for a better guide!",
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r886097614-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html',
  },
  {
    name: 'Rajesh',
    date: 'March 22, 2023',
    avatar:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/57/36/5f/navigate41658583432.jpg?w=100&h=-1&s=1',
    text:
      'It was a wonderful experience for us. All your arrangements were up to the mark. All Riads and transportation arrangements were excellent.',
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r883116835-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html',
  },
  {
    name: 'SteveOratowski',
    date: 'March 14, 2023',
    avatar:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/03/99/d2/steve-o.jpg?w=100&h=-1&s=1',
    text:
      'If we could give this trip more than 5 stars we would. Mustafa made fabulous choices about where we should visit and the Riads he chose were stunning.',
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r882221664-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html',
  },
  {
    name: 'Varun R',
    date: 'January 25, 2023',
    avatar:
      'https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/e6/ea/default-avatar-2020-54.jpg',
    text:
      'We did the 6 day tour of Morocco with Anouar and it was just the most magical experience. We went through different landscapes of this beautiful country.',
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293732-d19099808-r876343943-6_days_Special_Morocco_Tour-Casablanca_Casablanca_Settat.html',
  },
  {
    name: 'Adventure228395',
    date: 'October 11, 2022',
    avatar:
      'https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/f0/9f/default-avatar-2020-16.jpg',
    text:
      'Since the first contact requesting a quote, Mustapha was very attentive and detail-oriented in his responses. The trip was fabulous — beautiful places, excellent riads.',
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293734-d18834117-r864165759-7_Days_Morocco_tour_from_Marrakech-Marrakech_Marrakech_Safi.html',
  },
  {
    name: 'Renata',
    date: 'October 3, 2022',
    avatar:
      'https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/f3/e4/default-avatar-2020-30.jpg',
    text:
      'O melhor guia! Querido, atencioso, divertido, deu diversas dicas, levou nos melhores lugares! Nos ajudou em todos os momentos! Os lugares do passeio todos incríveis.',
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r863071044-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html',
  },
  {
    name: 'Wander226959',
    date: 'August, 2022',
    avatar:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/e9/bb/default-avatar-2020-65.jpg?w=100&h=-1&s=1',
    text:
      'Mustafa exceeded ALL expectations. He was referred to me by a friend in the US, who had taken a similar trip from Marrakech to Merzouga to experience the desert.',
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r857193118-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html',
  },
  {
    name: 'Elena G',
    date: 'November, 2021',
    avatar:
      'https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/df/99/default-avatar-2020-40.jpg',
    text:
      'We travelled in November 2021 with Mustafa. He took care of everything and made the trip an incredible experience. I highly recommend him to everyone.',
    url: 'https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r819298380-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html',
  },
]

const AUTOPLAY_MS = 5000

function Testemonials() {
  const [index, setIndex] = useState(0)
  const [perView, setPerView] = useState(3)
  const hovering = useRef(false)

  // responsive slides-per-view
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setPerView(w < 600 ? 1 : w < 1000 ? 2 : 3)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const pages = Math.max(1, REVIEWS.length - perView + 1)
  const clampedIndex = Math.min(index, pages - 1)

  const next = useCallback(() => setIndex((i) => (i + 1) % pages), [pages])

  useEffect(() => {
    if (pages <= 1) return
    const id = window.setInterval(() => {
      if (!hovering.current && !document.hidden) next()
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [next, pages])

  return (
    <section
      className="ftco-section testimony-section bg-bottom"
      style={{ backgroundImage: `url(/images/hero-bgs/testemo.jpg)` }}
    >
      <Image
        src="/images/hero-bgs/testemo.jpg"
        alt="Guided Morocco Tours"
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="overlay" />
      <div className="container">
        <div className="row justify-content-center pb-4">
          <div className="col-md-7 text-center heading-section heading-section-white ftco-animate">
            <span className="subheading">Testimonials</span>
            <h4 className="mb-4">Words from Our Clients about our Guided Tours in Morocco</h4>
          </div>
        </div>

        <div
          className="tslider"
          onMouseEnter={() => (hovering.current = true)}
          onMouseLeave={() => (hovering.current = false)}
        >
          <div className="tslider__viewport">
            <div
              className="tslider__track"
              style={{
                transform: `translateX(-${clampedIndex * (100 / perView)}%)`,
              }}
            >
              {REVIEWS.map((r) => (
                <div className="tslider__cell" key={r.name} style={{ flexBasis: `${100 / perView}%` }}>
                  <article className="testimony-wrap">
                    <div className="text">
                      <span>
                        <a href={r.url} target="_blank" rel="noopener noreferrer">
                          <span className="fa fa-tripadvisor mr-2" />
                        </a>
                        TripAdvisor review
                      </span>
                      <p className="star">
                        <span className="fa fa-star" />
                        <span className="fa fa-star" />
                        <span className="fa fa-star" />
                        <span className="fa fa-star" />
                        <span className="fa fa-star" />
                      </p>
                      <p className="mb-4">{r.text}</p>
                      <a href={r.url} target="_blank" rel="noopener noreferrer">
                        Read review
                      </a>
                      <div className="d-flex align-items-center">
                        <div className="user-img">
                          <Image
                            className="user-img"
                            src={r.avatar}
                            alt={r.name}
                            fill
                            sizes="46px"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                          />
                        </div>
                        <div className="pl-3">
                          <p className="name">{r.name}</p>
                          <span className="position">{r.date}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="tslider__dots">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`tslider__dot${i === clampedIndex ? ' is-active' : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testemonials
