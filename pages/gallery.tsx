import React from 'react'
import PageHero from '../components/PageHero'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import SEO from '../components/SEO'

function gallery({gallery}:any) {
  return (
    <>
    <SEO
      title="Our Escorted Morocco Tours Gallery"
      description="Browse through stunning images of Morocco from our escorted tours gallery. Get inspired for your next adventure and discover the beauty of this enchanting destination."
      keywords="Escorted Morocco tours, gallery, images, photos, travel inspiration, adventure, destinations, culture, history, landmarks, beautiful scenery."
    />
    <PageHero title="Our Escorted Tours Gallery" tag="Experience the Beauty of Morocco:" p="Get inspired for your next adventure and discover the beauty of this enchanting destination."  img="/images/hero-bgs/gallery2.jpg"/>
    <section className="ftco-section img ftco-select-destination" style={{backgroundImage: `url("/images/bg_3.jpg")`}}>
			<div className="container">
				<div className="row justify-content-center pb-4">
        <div className="col-md-12">
						<div className="carousel-gallery owl-carousel ftco-animate">
							{
                gallery! && gallery.map((img:any)=>
							  <div key={img._id} className="item ">
								<div className="project-destination">
									<a href='#' className="img"  style={{backgroundImage: `url(${urlFor(img.image).url()!})`}}>
										<img src={urlFor(img.image).url()!} alt={img.image?.alt || "Escorted Morocco Tours gallery photo"} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
										
									</a>
								</div>
							</div>
							)
							}
						</div>
					</div>
        </div>
        </div>
        </section>
    <section className="ftco-section ftco-no-pb contact-section mb-4 image-grid">
  <div className="container">
  <div className="row">
  {gallery! && gallery.map((img:any)=>  <div className="col-md-4 mb-3">
  <a href="#" className="meat" data-img={urlFor(img.image).url()!}>
    <img src={urlFor(img.image).url()!} alt={img.image?.alt || "Escorted Morocco Tours gallery photo"} className="img" width={"350"}/>
  </a>
<div id="meatModal" className="modal fade" tabIndex={-1} role="dialog">
<div className="modal-dialog">
	<div className="modal-content">
	  <div className="modal-body">
        <img src={urlFor(img.image).url()!} alt={img.image?.alt || "Escorted Morocco Tours gallery photo"} id="meatModalImg" width="100%" />
	  </div>
	</div>
</div>
</div>
  </div>)}
</div>

    
  </div>
</section>
    </>
  )
}


export async function getServerSideProps() {

  const query1 = `
  *[_type == 'gallery' && show == true][0..9]{
      _id,
      _createdAt,
      show,
      image
    }
  `

  
  const gallery = await sanityClient.fetch(query1)
  return {
    props: {
      gallery
    },
  };
}


export default gallery