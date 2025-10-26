import { useTranslations } from 'next-intl';
import React from 'react'

function Action1() {
  return (
    <section className="ftco-intro ftco-section" style={{padding:"0.5rem"}}>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-12 text-center">
						<div className="img"  style={{backgroundImage: `url("/images/bg_2.jpg")`}}>
							<div className="overlay"></div>
							<h4>Let's create memories that will last a lifetime</h4>
							<p>From Exotic Souks to Majestic Palaces, Mountains to Coasts, Ancient Berber Villages to the Sahara Desert  Our Immersion Tours Have It All.</p>
							<p className="mb-2 mx-2" style={{display: "inline-block"}}><a href="/contact" className="btn btn-secondary px-4 py-3">Get In Touch</a></p>
							<p className="mb-2 mx-2" style={{display: "inline-block"}}><a href="/tours" className="btn btn-primary px-4 py-3">Browse All Tours</a></p>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default Action1