import { useTranslations } from 'next-intl'
import React from 'react'
import { urlFor } from '../sanity'

function HomeDestinations({destinations}:any) {

  return (
    <section className="ftco-section img ftco-select-destination" style={{backgroundImage: `url("/images/bg_3.jpg")`}}>
			<div className="container">
				<div className="row justify-content-center pb-4">
					<div className="col-md-12 heading-section text-center ftco-animate">
						<span className="subheading">A Journey of Culture and Adventure</span>
						<h2 className="mb-4">With Our Escorted Morocco Tours Destinations</h2>
						<p className="mb-4">From Bustling Cities to Sahara Desert, Majestic Atlas Mountains to Exotic Beaches. Our Escorted Tours cover it all! </p>
					</div>
				</div>
			</div>
			<div className="container container-2">
				<div className="row">
					<div className="col-md-12">
						<div className="carousel-destination owl-carousel ftco-animate">
							{
                              destinations! && destinations.map((destination:any)=>
							  <div key={destination._id} className="item ">
								<div className="project-destination">
									<div  className="img"  style={{backgroundImage: `url(${urlFor(destination.mainImage).url()!})`, minHeight: '400px', backgroundSize: 'cover', backgroundPosition: 'center'}}>
										<div className="text">
											<div className="city"><a href={`/destinations/${destination.slug.current}`} aria-label={destination.city}>{destination.city} <i className="fa fa-arrow-right"/></a></div>
											
											<a href={`/destination/${destination.slug.current}`}><span>{destination.count} Tours</span></a>
										</div>
									</div>
								</div>
							</div>
							)
							}
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default HomeDestinations