import React, { useState } from 'react'

function HomeFaq({ faqs }: any) {
  const items = (faqs || []).slice(0, 6)
  const [open, setOpen] = useState<number | null>(0)

  if (!items.length) return null

  return (
    <section className="ftco-section faq-section">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 heading-section ftco-animate">
            <span className="subheading">FAQ</span>
            <h2 className="mb-2">Common questions</h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="faq-list">
              {items.map((f: any, i: number) => {
                const isOpen = open === i
                return (
                  <div key={f._id || i} className={`faq-item${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-item__q"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span>{f.question}</span>
                      <span className="faq-item__toggle" aria-hidden="true" />
                    </button>
                    <div className="faq-item__a">
                      <p>{f.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-4">
              <a href="/faqs" className="btn btn-outline-primary py-3 px-5">See all FAQs</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFaq
