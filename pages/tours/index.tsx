import type { NextPage } from 'next'

import { useRouter } from "next/router";
import PageHero from '../../components/PageHero';
import ToursSection from '../../components/ToursSection';
import { sanityClient } from '../../sanity';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import {paginate} from '../../helpers/paginate'
import Image from 'next/image'
import { urlFor } from '../../sanity'

export default function  NextPage({tours}:any) {
  const [ postNum, setPostNum] = useState(9); // Default number of posts dislplayed
  let [ toursList, setToursList] = useState(tours.slice(0, 9));

  function handleClick() {
    setPostNum(prevPostNum => prevPostNum + 3)// 3 is the number of posts you want to load per click
    window.history.pushState( setToursList(tours.slice(0, postNum)) , 'tours', '/tours' );

  }

  const [currentPage, setCurrentPage] = useState(1);
 const pageSize = 9;
 
 const onPageChange = (page:any) => {
   setCurrentPage(page);
 };

  const paginatedPosts = paginate(tours, currentPage, pageSize);
  

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

  return (
    <>
     <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content="Make the Most of Your Vacation in Morocco with a Well-Planned Guided Immersion tours. Best Morocco Escorted Tours"></meta>
           <meta name="keywords" content="Escorted Morocco tours, Morocco Escorted Tours, Travel packages,  vacation, guided tours, Morocco, culture, history, adventure, luxury, holiday, expert guides, tailored experience, hidden gems, immersive journey, personalized service, authentic experiences,"></meta>
           <title>Escorted Morocco Tours | Best Guided Immersion Tours</title>
           <meta property="og:image" content="/images/escorted-morocco-tours.png" />
           <meta property="og:title" content="Escorted Morocco Tours | Travel packages | Guided Immersion tours" />
           <meta property='og:description' content="Make the Most of Your Vacation in Morocco with a Well-Planned Guided Immersion tours. Best Morocco Escorted Tours" />
    </Head>
    <PageHero title='Discover the Best of Morocco with our Escorted Tours' tag='Get the best of your journey' p={`Join us on an adventure of a lifetime with our escorted tours in Morocco. From the bustling cities of Marrakech and Fez to the tranquil beauty of the Sahara Desert and the stunning Atlas Mountains, our tours offer a comprehensive and immersive journey through the culture, history, and natural wonders of Morocco. ${tours.length} Tours`} img='/images/hero-bgs/all-tours.jpg'/>
    
    <section className="ftco-section" id="toursection">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-12 heading-section text-center ftco-animate">
                <span className="subheading">Make the Most of Your Time in Morocco with a Well-Planned Immersion Tours</span>
                <h2 >Morocco Guided Tours</h2>
                <p className="mb-4">Whether you're looking for a private tour or a group excursion, our experienced guides can tailor your itinerary to your liking</p>
               
            </div>
        </div>
       
        <div className="row">
                {tours.map((tour:any, index:any)=> <div key={index} className="col-md-4 ftco-animate">
                <div className="project-wrap">
                    <a href={`/tours/${tour.slug.current}`} className="img" >
                    <Image src={urlFor(tour.mainImage).url()!}  alt={tour.title} layout='fill' objectFit="cover" blurDataURL={rgbDataURL(237, 181, 6)} placeholder="blur"/>
                        <span className="price">{tour.duration} Days Tour</span>
                    </a>
                    <div className="text p-4">
                        <span>Starts From </span><span className="days">{tour.destinations! && tour.destinations[0].city}</span>
                        <h3 className='my-2'><a href={`/tours/${tour.slug.current}`}>{tour.title}</a></h3>
                        <p className="location my-3"><span className="fa fa-map-marker mr-2"></span>{tour.destinations! && tour.destinations.slice(1).map((d:any, index:any)=> <a key={index} href={`/destinations/${d.slug.current}`} target="_blank">{d.city}, </a>)}...</p>
                        <hr />
                        <ul>
                            {tour.amenities! && tour.amenities.map((a:any, index:any) =>
                            <li key={index}><div style={{display:"flex",  alignItems: "center"}}>&#10029; <em style={{display:"inline"}}>{a.title}</em></div></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>)
            }
            
        </div>
        {/* <div className="row"><div className="col text-center"><button onClick={handleClick}>Load More</button></div></div> */}
    </div>
</section>
  </>
  )
}


export async function getServerSideProps({req, res}:any) {


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const query = `
  *[_type == 'tour'] | order(duration asc){
      _id,
      _createdAt,
      title,
      duration,
      slug,
      "amenities": amenities[][0..2]->{
        title,
        slug
      },
      "destinations": destinations[][0..2]->{
        slug,
        city
      },
      mainImage,
    }
  `
  const tours = await sanityClient.fetch(query)
  return {
    props: {
      tours
    }
  };
}


