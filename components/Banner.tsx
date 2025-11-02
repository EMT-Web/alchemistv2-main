import React from 'react'

function Banner() {
  return (
    <section className="ftco-intro ftco-section" style={{padding:"0.5rem"}}>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-12 text-center">
						<div className="img"  style={{backgroundImage: `url("/images/service-bgs/s1.jpg")`, minHeight: '300px', backgroundSize: 'cover', backgroundPosition: 'center'}}>
							<div className="overlay"></div>
							<h4>Tailor Your Dream Morocco Vacation with Our Expert Team</h4>
							<p>Whether you're interested in exploring the imperial cities, the Sahara desert, or the picturesque coastal towns, we can help you plan a customized itinerary that meets your unique preferences and interests.</p>
							<p className="mb-0"><a href="https://wa.me/+212623668013" className="btn btn-secondary px-4 py-3"><span className='fa fa-whatsapp mr-2'></span>Quick Inquery</a></p>
						</div>
					</div>
				</div>
			</div>
	</section>
  )
}

export default Banner