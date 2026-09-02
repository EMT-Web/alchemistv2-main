import type { GetStaticProps, NextPage } from 'next'

import { Category, Post } from '../../typings'
import { useRouter } from "next/router";
import PageHero from '../../components/PageHero';
import { sanityClient, urlFor } from '../../sanity';
import Link from 'next/link';
import Banner from '../../components/Banner';
import SEO from '../../components/SEO';


export default function  NextPage({ destinations}:any) {
  const router = useRouter();

  return (
    <>
      <SEO
        title="Morocco Travel Guide | Places to Visit"
        description="Places to Visit in Morocco, Discover the rich history, vibrant culture, and breathtaking natural landscapes of Morocco's top destinations. From the bustling cities of Marrakech and Fez to the tranquil Sahara desert and the stunning Atlas Mountains, there is something for every traveler to enjoy. Explore ancient ruins, sample delicious cuisine, and experience the warm hospitality of the Moroccan people on a journey you won't forget."
        keywords="Morocco, best places, Morocco destinations, Places to Visit in Morocco"
      />
    <PageHero title='Places to Visit in Morocco' tag="Explore the Best Moroccan Destinations" p="Discover the rich history, vibrant culture, and breathtaking natural landscapes of Morocco's top destinations. From the bustling cities of Marrakech and Fez to the tranquil Sahara desert and the stunning Atlas Mountains, there is something for every traveler to enjoy. Explore ancient ruins, sample delicious cuisine, and experience the warm hospitality of the Moroccan people on a journey you won't forget."  img='/cms/ea4c833e52b16d88aa6b67dcfb5318e49ba3402e.jpg'/>
    {/* <section className="ftco-section ftco-no-pb">
   <div className="container">
      <div className="row">
       <div className="col-md-12">
          <div className="search-wrap-1 ftco-animate">
             <form action="#" className="search-property-1">
                <div className="row no-gutters">
                   <div className="col-lg d-flex">
                      <div className="form-group p-4 border-0">
                         <label htmlFor="#">Destination</label>
                         <div className="form-field">
                           <div className="icon"><span className="fa fa-search"></span></div>
                           <input type="text" className="form-control" placeholder="Search place" />
                       </div>
                   </div>
               </div>
               <div className="col-lg d-flex">
                  <div className="form-group p-4">
                     <label htmlFor="#">Check-in date</label>
                     <div className="form-field">
                       <div className="icon"><span className="fa fa-calendar"></span></div>
                       <input type="text" className="form-control checkin_date" placeholder="Check In Date" />
                   </div>
               </div>
           </div>
           <div className="col-lg d-flex">
              <div className="form-group p-4">
                 <label htmlFor="#">Check-out date</label>
                 <div className="form-field">
                   <div className="icon"><span className="fa fa-calendar"></span></div>
                   <input type="text" className="form-control checkout_date" placeholder="Check Out Date" />
               </div>
           </div>
       </div>
       <div className="col-lg d-flex">
          <div className="form-group p-4">
             <label htmlFor="#">Price Limit</label>
             <div className="form-field">
               <div className="select-wrap">
                <div className="icon"><span className="fa fa-chevron-down"></span></div>
                <select name="" id="" className="form-control">
                  <option value="">$5,000</option>
                  <option value="">$10,000</option>
                  <option value="">$50,000</option>
                  <option value="">$100,000</option>
                  <option value="">$200,000</option>
                  <option value="">$300,000</option>
                  <option value="">$400,000</option>
                  <option value="">$500,000</option>
                  <option value="">$600,000</option>
                  <option value="">$700,000</option>
                  <option value="">$800,000</option>
                  <option value="">$900,000</option>
                  <option value="">$1,000,000</option>
                  <option value="">$2,000,000</option>
              </select>
          </div>
      </div>
  </div>
</div>
<div className="col-lg d-flex">
  <div className="form-group d-flex w-100 border-0">
     <div className="form-field w-100 align-items-center d-flex">
        <input type="submit" value="Search" className="align-self-stretch form-control btn btn-primary" />
    </div>
</div>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</section> */}
<section className="ftco-section">
   <div className="container">
   <div className="row justify-content-center">
        <div className="col-md-12 heading-section text-center ftco-animate">
                <span className="subheading">Experience the thrill of adventure and culture in Morocco!</span>
                <h2>Popular Places to Visit in Morocco</h2>
                <p className="mb-5"> Immerse yourself in the rich culture and history of Morocco with our well-designed Escorted Tours</p>
            </div>
        </div>
       
    <div className="row dcard-grid">
{
  destinations
    .filter((destination:any) => destination?.slug?.current)
    .map((destination:any) => {
      const href = `/destinations/${destination.slug.current}`
      const img = destination?.mainImage ? urlFor(destination.mainImage).url() : ''
      return (
        <div className="col-sm-6 col-lg-4 d-flex ftco-animate" key={destination._id}>
          <article className="dcard">
            <a
              href={href}
              className="dcard__media"
              style={img ? { backgroundImage: `url(${img})` } : undefined}
              aria-label={destination.city}
            >
              {typeof destination.count === 'number' && (
                <span className="dcard__badge">
                  {destination.count} {destination.count === 1 ? 'tour' : 'tours'}
                </span>
              )}
              <span className="dcard__city">{destination.city}</span>
            </a>
            <div className="dcard__body">
              <h3 className="dcard__title">
                <a href={href}>{destination.title}</a>
              </h3>
              {destination.seodescription && (
                <p className="dcard__desc">{destination.seodescription}</p>
              )}
              <a href={href} className="dcard__link">
                Explore {destination.city} <span className="fa fa-arrow-right" />
              </a>
            </div>
          </article>
        </div>
      )
    })
}
</div>
{/* <div className="row mt-5">
  <div className="col text-center">
    <div className="block-27">
      <ul>
        <li><a href="#">&lt;</a></li>
        <li className="active"><span>1</span></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">&gt;</a></li>
    </ul>
</div>
</div>
</div> */}
</div>
</section>
<Banner/>
  </>
  )
}



export async function getServerSideProps() {

  const query = `
  *[_type == 'destination' ]{
      _id,
      _createdAt,
      city,
      seodescription,
      "count": count(*[_type == "tour" && references(^._id)]),
      title,
      slug,
      mainImage,
    }
  `
  const destinations = await sanityClient.fetch(query)
  return {
    props: {
      destinations,
    },
  };
}


