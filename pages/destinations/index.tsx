import type { GetStaticProps, NextPage } from 'next'

import { Category, Post } from '../../typings'
import { useRouter } from "next/router";
import PageHero from '../../components/PageHero';
import { sanityClient, urlFor } from '../../sanity';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Head from 'next/head';
import Banner from '../../components/Banner';


export default function  NextPage({ destinations}:any) {
  const router = useRouter();

  return (
    <>
      <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content="Places to Visit in Morocco, Discover the rich history, vibrant culture, and breathtaking natural landscapes of Morocco's top destinations. From the bustling cities of Marrakech and Fez to the tranquil Sahara desert and the stunning Atlas Mountains, there is something for every traveler to enjoy. Explore ancient ruins, sample delicious cuisine, and experience the warm hospitality of the Moroccan people on a journey you won't forget."></meta>
           <meta name="keywords" content="Morocco, best places, Morocco destinations, Places to Visit in Morocco"></meta>
           <title>Morocco Travel Guide | Places to Visit in Morocco | Popular destinations</title>
           <meta property="og:image" content="/images/escorted-morocco-tours.png" />
           <meta property='og:description' content="Escorted Morocco Tours, Expert guided Morocco tours and Packages to get the best out of your vacation in Morocco. Best Morocco Immersion Tours and Travel Guides" />
    </Head>
    <PageHero title='Places to Visit in Morocco' tag="Explore the Best Moroccan Destinations" p="Discover the rich history, vibrant culture, and breathtaking natural landscapes of Morocco's top destinations. From the bustling cities of Marrakech and Fez to the tranquil Sahara desert and the stunning Atlas Mountains, there is something for every traveler to enjoy. Explore ancient ruins, sample delicious cuisine, and experience the warm hospitality of the Moroccan people on a journey you won't forget."  img='/images/hero-bgs/all-tours.jpg'/>
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
       
    <div className="row">
{
  destinations.map((destination:any) => <div className="col-md-4 d-flex ftco-animate">
  <div className="blog-entry justify-content-end">
   <a href={`/destinations/${destination.slug.current}`} className="block-20" style={{backgroundImage: `url(${urlFor(destination.mainImage).url()!})`}}>
   </a>
   <div className="text">
    <div className="d-flex align-items-center mb-4 topp">
     <div className="one">
      <span className="day">{destination.count}</span>
    </div>
    <div className="two">
      <span className="yr">Tours</span>
      <span className="mos">Via <strong>{destination.city}</strong></span>
    </div>
  </div>
  <h3 className="heading"><a href={`/destinations/${destination.slug.current}`}>{destination.title}</a></h3>
  <p style={{ overflow: "hidden",
   textOverflow: "ellipsis",
   display: "-webkit-box",
   wordWrap: "break-word",
  maxHeight: "3.6em",
  lineHeight: "1.8em"}}>{`${destination.seodescription}..`}</p>
  <p><a href={`/destinations/${destination.slug.current}`} className="btn btn-primary">Read more</a></p>
  
</div>
</div>
</div>)
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


