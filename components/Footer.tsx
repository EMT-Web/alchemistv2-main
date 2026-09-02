import React from 'react'
import Image from 'next/image'

const TRIPADVISOR =
  'https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html'
const WHATSAPP = 'https://wa.me/212623668013'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      {/* Main footer */}
      <div className="site-footer__main">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 site-footer__col site-footer__col--brand">
              <a href="/" className="site-footer__logo" aria-label="Escorted Morocco Tours home">
                <Image src="/images/logo-white-01.png" alt="Escorted Morocco Tours" width={150} height={85} />
              </a>
              <p>
                Our team of experienced local guides is committed to the highest level of service — from
                your first message to the end of your trip.
              </p>
              <ul className="site-footer__social">
                <li>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <span className="fa fa-whatsapp" />
                  </a>
                </li>
                <li>
                  <a href={TRIPADVISOR} target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor">
                    <span className="fa fa-tripadvisor" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.facebook.com/helloescortedmoroccotours"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <span className="fa fa-facebook" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/escortedmoroccotours_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <span className="fa fa-instagram" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 col-6 site-footer__col">
              <h3>Company</h3>
              <ul>
                <li><a href="/tours">All Tours</a></li>
                <li><a href="/destinations">Destinations</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/booking-info">Booking Info</a></li>
                <li><a href="/faqs">FAQs</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 col-6 site-footer__col">
              <h3>Explore</h3>
              <ul>
                <li><a href="/blog">Travel Blog</a></li>
                <li><a href="/posts/about-morocco">About Morocco</a></li>
                <li><a href="/posts/high-atlas-mountains">High Atlas</a></li>
                <li><a href="/posts/sahara-desert">Sahara Desert</a></li>
                <li><a href="/posts/culture">Culture</a></li>
                <li><a href="/about">About Us</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 site-footer__col">
              <h3>Get in touch</h3>
              <ul className="site-footer__contact">
                <li>
                  <span className="fa fa-map-marker" aria-hidden="true" />
                  App 5-L. Elharti, Massira 2, Marrakech, Morocco
                </li>
                <li>
                  <span className="fa fa-map-marker" aria-hidden="true" />
                  Dr Ait Tajer, Taftechna, Zagora, Morocco
                </li>
                <li>
                  <a href="tel:+212623668013">
                    <span className="fa fa-phone" aria-hidden="true" /> +212 6 23 66 80 13
                  </a>
                </li>
                <li>
                  <a href="mailto:info@escortedmoroccotours.com">
                    <span className="fa fa-paper-plane" aria-hidden="true" /> info@escortedmoroccotours.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <div className="container">
          <p>© {year} Escorted Morocco Tours. All rights reserved.</p>
          <p className="site-footer__legal">ICE: 003967997000096 &nbsp;·&nbsp; RC: 4865</p>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="site-footer__wa">
        <span className="fa fa-whatsapp" aria-hidden="true" />
      </a>
    </footer>
  )
}

export default Footer
