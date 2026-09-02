import React from 'react'
import TourCard from './TourCard'

function ToursSection({ tours }: any) {
  return (
    <section className="ftco-section" id="toursection">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 heading-section text-center ftco-animate">
            <span className="subheading">Well-planned small-group &amp; private tours</span>
            <h2>Morocco Immersion Tours</h2>
            <p className="mb-4">
              Whether you&apos;re looking for a private tour or a group excursion, our experienced guides can
              tailor your itinerary to your liking
            </p>
            {(!tours || tours.length === 0) && (
              <div>
                <p>Nothing found</p>
                <p className="mb-0">
                  <a href="/tours" className="btn btn-primary px-4 py-3">
                    Browse all tours
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="row tcard-grid">
          {(tours || []).map((tour: any, index: number) => (
            <div key={tour?._id || index} className="col-md-6 col-lg-4 d-flex ftco-animate">
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToursSection
