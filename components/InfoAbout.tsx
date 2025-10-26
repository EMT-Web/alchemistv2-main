import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react'
import { urlFor } from '../sanity';
import Image from 'next/image';

function InfoAbout({about}:any) {
    const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)
  
  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  const router = useRouter();

  // Return null if about data is missing or incomplete
  if (!about || typeof about === 'string') {
    return null;
  }

  // Default fallback values
  const defaultService = {
    title: "Explore Morocco",
    paragraph: "Discover the beauty of Morocco",
    mainImage: null
  };

  const service1 = about.service1 || defaultService;
  const service2 = about.service2 || defaultService;
  const service3 = about.service3 || defaultService;
  const service4 = about.service4 || defaultService;

  return (
    <section className="ftco-section services-section">
			<div className="container">
				<div className="row d-flex">
					<div className="col-md-6 order-md-last heading-section pl-md-5 ftco-animate d-flex align-items-center">
						<div className="w-100">
						<h2 className="mb-4">
							{about.abouttagline && <span className="subheading">{about.abouttagline}</span>}
							{about.abouttitle || "Welcome to Escorted Morocco Tours"}</h2>
							<p>{about.abouttext || "Discover the magic of Morocco with our expert-guided tours."}</p>
							{router.asPath === `/` && <p><a href="/about" className="btn btn-primary py-3 px-4">More About Us</a></p> }
							{router.asPath === `/about` && <p><a href="/gallery" target="_blank" className="btn btn-primary py-3 px-4">See the Sights of Morocco</a></p> }
						</div>
					</div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
								<div className="services services-1 color-2 d-block img" style={{backgroundImage: service1.mainImage ? `url(${urlFor(service1.mainImage).url()})` : 'url(/images/service-bgs/1.jpg)'}} >
									<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-route"></span></div>
									<div className="media-body" style={{position: "relative"}}>
										<h3 className="heading mb-3">{service1.title}</h3>
										<p>{service1.paragraph}</p>
									</div>
								</div>    
							</div>
							<div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
								<div className="services services-1 color-3 d-block img" style={{backgroundImage: service2.mainImage ? `url(${urlFor(service2.mainImage).url()})` : 'url(/images/service-bgs/2.jpg)'}}>
								
									<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-mountains"></span></div>
									<div className="media-body" style={{position: "relative"}}>
										<h3 className="heading mb-3">{service2.title}</h3>
										<p>{service2.paragraph}</p>
									</div>
								
								</div>      
							</div>
							<div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
								<div className="services services-1 color-1 d-block img"  style={{backgroundImage: service3.mainImage ? `url(${urlFor(service3.mainImage).url()})` : 'url(/images/service-bgs/3.jpg)'}}>
								
									<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-paragliding"></span></div>
									<div className="media-body" style={{position: "relative"}}>
										<h3 className="heading mb-3">{service3.title}</h3>
										<p>{service3.paragraph}</p>
									</div>
								</div>      
							</div>
							<div className="col-md-12 col-lg-6 d-flex align-self-stretch ftco-animate">
								<div className="services services-1 color-4 d-block img"  style={{backgroundImage: service4.mainImage ? `url(${urlFor(service4.mainImage).url()})` : 'url(/images/service-bgs/4.jpg)'}}>
								
									<div className="icon d-flex align-items-center justify-content-center"><span className="flaticon-map"></span></div>
									<div className="media-body" style={{position: "relative"}}>
										<h3 className="heading mb-3">{service4.title}</h3>
										<p>{service4.paragraph}</p>
									</div>
								</div>      
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  )
}

export default InfoAbout