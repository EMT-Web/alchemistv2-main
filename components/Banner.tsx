import React from 'react'

function Banner() {
  return (
    <section className="cta-banner">
      <div
        className="cta-banner__bg"
        style={{ backgroundImage: 'url("/cms/21b97a43bc01a80f83acc204029f580c03013c6b.jpg")' }}
      />
      <div className="cta-banner__scrim" />
      <div className="container">
        <div className="cta-banner__inner">
          <span className="subheading">Your trip, your way</span>
          <h2>Tailor your dream Morocco vacation with our expert team</h2>
          <p>
            Imperial cities, the Sahara desert, or the coast — tell us what you have in mind and we&apos;ll
            build a private itinerary around your dates, pace and interests.
          </p>
          <a
            href="https://wa.me/212623668013"
            target="_blank"
            rel="noopener noreferrer"
            className="btn px-4 py-3 cta-banner__wa"
          >
            <span className="fa fa-whatsapp mr-2" aria-hidden="true" /> Quick inquiry
          </a>
        </div>
      </div>
    </section>
  )
}

export default Banner
