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


export default function  NextPage({about, destinations, tours, categories}:any) {

  return (
    <>
    <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <title>Escorted Morocco Tours | Guided Immersion tours | Travel Guides</title>
           <meta name="description" content="Escorted Morocco Tours, Expert guided Morocco tours and Packages to get the best out of your vacation in Morocco. Best Morocco Immersion Tours and Travel Guides"></meta>
           <meta name="keywords" content="Escorted Morocco tours, Morocco Escorted tours, Guided Tours Morocco, Morocco, Visit Morocco, Morocco tours, Travel Guides culture, history, adventure, guided tours, accommodations, cultural activities, adventure activities, immersive experience, morocco immersion tours"></meta>
           <meta property="og:image" content="/images/escorted-morocco-tours.png" />
           <meta property='og:description' content="Escorted Morocco Tours, Expert guided Morocco tours and Packages to get the best out of your vacation in Morocco. Best Morocco Immersion Tours and Travel Guides" />
    </Head>
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


