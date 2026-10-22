import type { NextPage } from 'next'

import { useRouter } from "next/router";
import PageHero from '../../components/PageHero';
import TourCard from '../../components/TourCard';
import ToursFilter from '../../components/ToursFilter';
import { sanityClient } from '../../sanity';
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import {paginate} from '../../helpers/paginate'
import Image from 'next/image'
import { urlFor } from '../../sanity'
import SEO, { createBreadcrumbSchema } from '../../components/SEO';

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

  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' }
  ]);

  // Create tours collection schema
  const toursCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Morocco Tours",
    "description": "Browse all our guided Morocco tours and packages",
    "url": "https://www.escortedmoroccotours.com/tours",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": tours?.length || 0,
      "itemListElement": tours?.slice(0, 10).map((tour: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "TouristTrip",
          "name": tour.title,
          "url": `https://www.escortedmoroccotours.com/tours/${tour.slug?.current}`
        }
      }))
    }
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, toursCollectionSchema]
  };

  return (
    <>
    <SEO
      title="Morocco Tours: 2 to 13 Day Private Itineraries"
      description={`Compare ${tours.length} private Morocco tours from Marrakech, Fes, Casablanca and Tangier, from 2 day Sahara trips to 13 day grand tours. Every route can be adjusted.`}
      schema={combinedSchema}
    />
    <PageHero title='All Morocco Tours' tag='Get the best of your journey' p={`Join us on an adventure of a lifetime with our escorted tours in Morocco. From the bustling cities of Marrakech and Fez to the tranquil beauty of the Sahara Desert and the stunning Atlas Mountains, our tours offer a comprehensive and immersive journey through the culture, history, and natural wonders of Morocco. ${tours.length} Tours`} img='/cms/ea329707ee6a76072f888eaac2ea74174bc8b105.jpg'/>

    <ToursFilter tours={tours} />
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
      priceFrom, priceCurrency, priceTravellers, driveTimes,
      slug,
      herotag,
      seodescription,
      "destinations": destinations[]->{
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


