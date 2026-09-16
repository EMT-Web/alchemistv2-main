import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import PageHero from '../components/PageHero'
import SEO, { createBreadcrumbSchema } from '../components/SEO'

type FormValues = {
  name: string
  email: string
  arrivalDate: Date
  departureDate: Date
  travelers: number
  subject: string
  message: string
}

const WHATSAPP = 'https://wa.me/212623668013'
const PHONE = '+212623668013'
const EMAIL = 'info@escortedmoroccotours.com'
const FACEBOOK = 'https://web.facebook.com/helloescortedmoroccotours'
const INSTAGRAM = 'https://www.instagram.com/escortedmoroccotours_/'
const TRIPADVISOR =
  'https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html'

function contact() {
  const [isError, setIsError] = useState(null as any)
  const [sending, setSending] = useState(false)
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data, e: any) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      setIsError(!res.ok)
    } catch (err) {
      setIsError(true)
    } finally {
      setSending(false)
    }
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ])

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Escorted Morocco Tours',
    url: 'https://www.escortedmoroccotours.com',
    telephone: '+212623668013',
    email: 'info@escortedmoroccotours.com',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'App 5-L. Elharti. Massira-2',
        addressLocality: 'Marrakech',
        postalCode: '40140',
        addressCountry: 'MA',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Dr Ait Tajer, Taftechna',
        addressLocality: 'Zagora',
        postalCode: '47900',
        addressCountry: 'MA',
      },
    ],
  }

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, localBusinessSchema],
  }

  return (
    <>
      <SEO
        title="Contact Us - Plan Your Morocco Tour"
        description="Contact Escorted Morocco Tours to plan your perfect Morocco vacation. Expert guides ready to create a tailor-made itinerary for your preferences. Get in touch today!"
        keywords="contact Morocco tours, Morocco tour inquiry, plan Morocco trip, Morocco travel agent, Morocco tour booking"
        schema={combinedSchema}
      />
      <PageHero
        title="We are here to help you plan the ultimate trip to Morocco"
        tag="Contact Us"
        p="From bustling cities to the Sahara Desert, majestic Atlas Mountains to exotic beaches — tell us what you have in mind and our local team will design the tour around you."
        img="/images/hero-bgs/contact.jpg"
      />

      <section className="ftco-section contactx">
        <div className="container">
          <div className="row contactx__row">
            {/* -------------------------------------------------- details */}
            <div className="col-lg-5 contactx__aside">
              <span className="subheading">Get in touch</span>
              <h2>Start planning your journey</h2>
              <p>
                Our team of experienced local guides is committed to delivering the highest level of
                service. Send us a message and we&apos;ll reply with ideas and a draft itinerary —
                usually within a day.
              </p>

              <ul className="contactx__list">
                <li>
                  <span className="contactx__ic fa fa-map-marker" aria-hidden="true" />
                  <div>
                    <strong>Marrakech office</strong>
                    App 5-L. Elharti, Massira-2, Marrakech, Morocco
                  </div>
                </li>
                <li>
                  <span className="contactx__ic fa fa-map-marker" aria-hidden="true" />
                  <div>
                    <strong>Zagora office</strong>
                    Dr Ait Tajer, Taftechna, Zagora, Morocco
                  </div>
                </li>
                <li>
                  <span className="contactx__ic fa fa-phone" aria-hidden="true" />
                  <div>
                    <strong>Phone</strong>
                    <a href={`tel:${PHONE}`}>+212 6 23 66 80 13</a>
                  </div>
                </li>
                <li>
                  <span className="contactx__ic fa fa-envelope" aria-hidden="true" />
                  <div>
                    <strong>Email</strong>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                </li>
              </ul>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary contactx__wa"
              >
                <span className="fa fa-whatsapp mr-2" aria-hidden="true" /> Message us on WhatsApp
              </a>

              <div className="contactx__social">
                <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <span className="fa fa-facebook" />
                </a>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <span className="fa fa-instagram" />
                </a>
                <a href={TRIPADVISOR} target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor">
                  <span className="fa fa-tripadvisor" />
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <span className="fa fa-whatsapp" />
                </a>
              </div>
            </div>

            {/* ----------------------------------------------------- form */}
            <div className="col-lg-7 contactx__formwrap">
              <form onSubmit={handleSubmit(onSubmit)} className="contactx-form">
                <h3>Tell us about your trip</h3>
                <p className="contactx-form__lead">
                  Share your dates, group size and what you&apos;d like to see. Every field except the
                  message is optional.
                </p>

                <div className="contactx-form__row">
                  <div className="form-group">
                    <label htmlFor="cf-name">Your name</label>
                    <input
                      id="cf-name"
                      type="text"
                      className="form-control"
                      placeholder="Jane Doe"
                      {...register('name', { required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email">Email</label>
                    <input
                      id="cf-email"
                      type="email"
                      className="form-control"
                      placeholder="you@email.com"
                      {...register('email', { required: true })}
                    />
                  </div>
                </div>

                <div className="contactx-form__row">
                  <div className="form-group">
                    <label htmlFor="arrivalDate">Arrival date</label>
                    <input
                      type="date"
                      id="arrivalDate"
                      className="form-control"
                      {...register('arrivalDate')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="departureDate">Departure date</label>
                    <input
                      type="date"
                      id="departureDate"
                      className="form-control"
                      {...register('departureDate')}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="travelers">Number of travellers</label>
                  <input
                    type="number"
                    id="travelers"
                    className="form-control"
                    placeholder="2"
                    min={1}
                    max={30}
                    {...register('travelers')}
                  />
                </div>

                <input type="hidden" value="Main Contact Form" {...register('subject')} />

                <div className="form-group">
                  <label htmlFor="cf-message">Message</label>
                  <textarea
                    id="cf-message"
                    cols={30}
                    rows={6}
                    className="form-control"
                    placeholder="Which places would you like to visit? Any must-sees, pace or budget notes?"
                    {...register('message', { required: true })}
                  />
                </div>

                {isError === false && (
                  <div className="contactx-form__note contactx-form__note--ok">
                    <strong>Thank you!</strong> Your message has been sent. Our team will get back to
                    you shortly with more information about your tour.
                  </div>
                )}
                {isError === true && (
                  <div className="contactx-form__note contactx-form__note--err">
                    <strong>Something went wrong.</strong> Please check your details and try again, or
                    email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                  </div>
                )}

                <button type="submit" className="btn btn-primary py-3 px-5" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contactx-map" aria-label="Map of Marrakech">
        <iframe
          title="Escorted Morocco Tours — Marrakech"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108703.09881241457!2d-8.007853099999998!3d31.634621449999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh!5e0!3m2!1sen!2sma!4v1676569225739!5m2!1sen!2sma"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  )
}

export default contact
