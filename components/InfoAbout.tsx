import { useRouter } from 'next/router'
import React from 'react'

const DEFAULT_SERVICE = { title: 'Explore Morocco', paragraph: 'Discover the beauty of Morocco' }
const ICONS = ['flaticon-route', 'flaticon-mountains', 'flaticon-paragliding', 'flaticon-map']

function InfoAbout({ about }: any) {
  const router = useRouter()

  if (!about || typeof about === 'string') return null

  const services = [
    about.service1 || DEFAULT_SERVICE,
    about.service2 || DEFAULT_SERVICE,
    about.service3 || DEFAULT_SERVICE,
    about.service4 || DEFAULT_SERVICE,
  ]
  const isHome = router.asPath === '/'
  const isAbout = router.asPath === '/about'

  return (
    <section className="ftco-section services-section">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 heading-section ftco-animate">
            <span className="subheading">{isAbout ? 'What we offer' : about.abouttagline || 'What we offer'}</span>
            <h2 className="mb-3">{isAbout ? 'Ways to travel with us' : about.abouttitle || 'Escorted Morocco Tours'}</h2>
            <p className={`services-intro__text${isHome ? ' services-intro__text--clamp' : ''}`}>
              {isAbout
                ? 'Every trip is private and shaped around you. Choose the style that fits — or blend them — and our team tailors the itinerary, pace and budget to match.'
                : about.abouttext ||
                  'We offer customizable tours for every kind of traveller — cultural immersion, adventure, and luxury — led by an experienced local team.'}
            </p>
          </div>
        </div>

        <div className="row services-grid">
          {services.map((service: any, i: number) => (
            <div key={i} className="col-lg-3 col-md-6 d-flex ftco-animate">
              <div className="service-card">
                <div className="service-card__icon">
                  <span className={ICONS[i]} aria-hidden="true" />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__text">{service.paragraph}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-2 ftco-animate">
          {isHome && <a href="/about" className="btn btn-primary py-3 px-5">More about us</a>}
          {router.asPath === '/about' && (
            <a href="/gallery" className="btn btn-primary py-3 px-5">See the sights of Morocco</a>
          )}
        </div>
      </div>
    </section>
  )
}

export default InfoAbout
