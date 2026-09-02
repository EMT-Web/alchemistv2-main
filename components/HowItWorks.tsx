import React from 'react'

const STEPS = [
  {
    n: '01',
    icon: 'fa fa-comments-o',
    title: 'Tell us your plans',
    text: 'Send your dates and interests via WhatsApp or the form. No commitment needed.',
  },
  {
    n: '02',
    icon: 'fa fa-map-o',
    title: 'Get your itinerary',
    text: 'Our local team designs a personalised, day-by-day plan built around you.',
  },
  {
    n: '03',
    icon: 'fa fa-check',
    title: 'Confirm & reserve',
    text: 'Approve the itinerary and pay a small deposit to lock in your travel dates.',
  },
  {
    n: '04',
    icon: 'fa fa-suitcase',
    title: 'Travel Morocco',
    text: 'Your guide meets you on day one. Settle the balance on arrival — cash or transfer.',
  },
]

function HowItWorks() {
  return (
    <section className="ftco-section how-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 heading-section ftco-animate">
            <span className="subheading">Simple process</span>
            <h2 className="mb-2">How it works</h2>
          </div>
        </div>

        <div className="row how-grid">
          {STEPS.map((s) => (
            <div key={s.n} className="col-lg-3 col-md-6 d-flex ftco-animate">
              <div className="how-card">
                <span className="how-card__num">{s.n}</span>
                <span className={`how-card__icon ${s.icon}`} aria-hidden="true" />
                <h3 className="how-card__title">{s.title}</h3>
                <p className="how-card__text">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-2">
          <a href="/contact" className="btn btn-primary py-3 px-5">Start planning with us</a>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
