import type { NextPage } from 'next'


import { useRouter } from "next/router";
import Banner from '../components/Banner';
import MainForm from '../components/MainForm';
import ToursSection from '../components/ToursSection';
import InfoAbout from '../components/InfoAbout';
import Testemonials from '../components/Testemonials';
import HomeDestinations from '../components/HomeDestinations';

import {sanityClient, urlFor} from '../sanity'
import PageHero from '../components/PageHero';
import Head from 'next/head';
import Action1 from '../components/Action1';
import FilterForm from '../components/FilterForm';
import SEO from '../components/SEO';


export default function  NextPage({about, destinations, tours, categories}:any) {

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Escorted Morocco Tours - Guided Immersion Tours",
    "url": "https://www.escortedmoroccotours.com",
    "description": "Expert guided Morocco tours and packages to get the best out of your vacation in Morocco. Best Morocco immersion tours and travel guides.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.escortedmoroccotours.com"
      }]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": (tours && Array.isArray(tours) ? tours.slice(0, 5) : []).map((tour: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.escortedmoroccotours.com/tours/${tour.slug?.current || ''}`
      }))
    }
  };

  return (
    <>
    <SEO
      title="Guided Immersion Tours & Travel Guides"
      description="Escorted Morocco Tours - Expert guided Morocco tours and packages to get the best out of your vacation in Morocco. Best Morocco immersion tours and travel guides."
      keywords="Escorted Morocco tours, Morocco Escorted tours, Guided Tours Morocco, Morocco, Visit Morocco, Morocco tours, Travel Guides, culture, history, adventure, guided tours, accommodations, cultural activities, adventure activities, immersive experience, morocco immersion tours"
      schema={homeSchema}
    />
          <PageHero title="Best Escorted Morocco Tours, Guided Tours" tag="Journeys through time & Culture" p="Get the best Out of your vacation in Morocco with our guided tours. Join Our Exciting Escorted Immersion Tours and Uncover the Best of Morocco." img='/images/hero-bgs/main-hero.jpg'/>
          {about?.mainabout && <InfoAbout about={about.mainabout}/>}
          <HomeDestinations destinations={destinations} />
          <ToursSection tours={tours}/>   
          <Action1/>
          <Testemonials/>
          <Banner/>
          {/* <Testemonials />
          <Banner /> */}

    </>
  )
}


export async function getServerSideProps({ req, res }:any) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const query1 = `
  *[_type == 'tour' &&  featured == true][0..5]{
      _id,
      _createdAt,
      title,
      featured,
      slug,
      duration,
      featured,
      mainImage,
      "destinations": destinations[][0..2]->{
        title,
        city,
        slug
      },
      "amenities": amenities[][0..2]->{
        title,
        slug, 
        icon
      }
    }
  `

  const query2 = `
  *[_type == 'destination' ] | order(publishedAt desc, _createdAt desc) [0..6]{
      _id,
      _createdAt,
      city,
      title,
      "count": count(*[_type == "tour" && references(^._id)]),
      slug,
      mainImage,
    }
  `
  const query3 = `
  *[_type == 'category' ] | order(publishedAt desc, _createdAt desc) [0..6]{
      _id,
      _createdAt,
      title,
      slug,
    }
  `
  const query4 = `
  *[_type == 'abouts' ][0]{
      _id,
      _createdAt,
      mainabout
    }
  `
  
  const tours = await sanityClient.fetch(query1)
  const destinations = await sanityClient.fetch(query2)
  const categories = await sanityClient.fetch(query3)
  const about = await sanityClient.fetch(query4)

  return {
    props: {
      about,
      tours,
      destinations,
      categories
    },
  };
}


