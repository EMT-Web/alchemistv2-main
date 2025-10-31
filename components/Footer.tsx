import { useTranslations } from 'next-intl';
import Link from 'next/link'
import Script from 'next/script'
import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <>
		<footer className="ftco-footer bg-bottom  pt-5" >
			<div className="container">
				<div className="row mb-5">
							<div className="col-md pt-3">
								<div className="ftco-footer-widget pt-md-3 mb-4">
								<a href="/"><Image src='/images/logo-colored-01.png' alt="Morocco Immersion Tours" width={170} height={67}/></a>
									<p> Our team of experienced and knowledgeable guides is committed to delivering the highest level of service, from the moment you contact us to the end of your trip.</p>
									<ul className="ftco-footer-social list-unstyled float-md-left float-lft">
									<li className="ftco-animate"><Link href="https://wa.me/+212623668013" target={"_blank"}><a><span className="fa fa-whatsapp"/></a></Link></li>
										<li className="ftco-animate"><Link href="https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><a><span className="fa fa-tripadvisor"/></a></Link></li>
										<li className="ftco-animate"><Link href="https://web.facebook.com/helloescortedmoroccotours" target={"_blank"}><a><span className="fa fa-facebook"/></a></Link></li>
										<li className="ftco-animate"><Link href="https://www.instagram.com/escortedmoroccotours_/" target={"_blank"}><a><span className="fa fa-instagram"/></a></Link></li>
										<li className="ftco-animate"><Link href="https://www.youtube.com/watch?v=boiiiVh52v4" target={"_blank"}><a><span className="fa fa-youtube"/></a></Link></li>
										<li className="ftco-animate"><Link href="https://twitter.com" target={"_blank"}><a><span className="fa fa-twitter"/></a></Link></li>
										<li className="ftco-animate"><Link href="https://www.linkedin.com/company" target={"_blank"}><a><span className="fa fa-linkedin"/></a></Link></li>
									</ul>
								</div>
							</div>
							<div className="col-md pt-3 border-left">
								<div className="ftco-footer-widget pt-md-3 mb-4 ml-md-5">
									<strong style={{fontSize: "1rem"}}>Company</strong>
									<ul className="list-unstyled">
									    <li><a href='/gallery'  className="py-2 d-block">Gallery</a></li>
										<li><a href='/contact'  className="py-2 d-block">Quick Inquery</a></li>
										<li><a href='/booking-info' className="py-2 d-block">Booking Info</a></li>
										<li><a href='/privacy-policy' className="py-2 d-block">Privacy policy</a></li>
										<li><a href='/faqs' className="py-2 d-block">FAQs</a></li>
									</ul>
								</div>
							</div>
							<div className="col-md pt-3 border-left">
								<div className="ftco-footer-widget pt-md-3 mb-4">
									<strong style={{fontSize: "1rem"}}>Blog</strong>
									<ul className="list-unstyled">
										<li><a href="/posts/about-morocco" className="py-2 d-block">Morocco</a></li>
										<li><a href="/posts/high-atlas-mountains" className="py-2 d-block">High Atlas</a></li>
										<li><a href="/posts/sahara-desert" className="py-2 d-block">Sahara Desert</a></li>
										<li><a href="/posts/culture" className="py-2 d-block">Culture</a></li>
										<li><a href="/posts/attractions" className="py-2 d-block">Attractions</a></li>
									</ul>
								</div>
							</div>
							<div className="col-md pt-3 border-left">
								<div className="ftco-footer-widget pt-md-3 mb-4">
									<strong style={{fontSize: "1rem"}}>Have a question?</strong>
									<div className="block-23 mb-3 mt-3">
										<ul>
											<li><Link href="#"><a><span className="icon fa fa-map-marker"/><span className="text">App 5-L. Elharti. Massira-2. Marrakech. Morocco</span></a></Link></li>
											<li><Link href="#"><a><span className="icon fa fa-map-marker"/><span className="text">Dr Ait Tajer, Taftechna, Zagora. Morocco</span></a></Link></li>
											<li><Link href="#"><a><span className="icon fa fa-phone"/><span className="text">+212 6 23 66 80 13</span></a></Link></li>
											<li><Link href="mailto:info@escortedmoroccotours.com"><a><span className="icon fa fa-paper-plane"/><span className="text">Info@escortedmoroccotours.com</span></a></Link></li>
										</ul>
									</div>
								</div>
							</div>
				</div>
				<div className="row">
					<div className="col-md-12 text-center">
						<p>Copyright &copy;2022 All rights reserved | Escorted Morocco Tours</p>
					</div>
				</div>
				<a href="https://wa.me/+212623668013" aria-label="Whatsapp Floating Button" className="icon-video d-flex align-items-center justify-content-center mb-4" style={{borderWidth: 1, borderBlockStyle:"solid", borderColor: "#25D366", position:"fixed",
right:20,
bottom:0,
zIndex: 999}}>
          <span className="fa fa-whatsapp" style={{color:"#25D366"}}></span>
        </a>
			</div>
		</footer>		
    </>
    
  )
}

export default Footer