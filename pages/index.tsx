import type { NextPage } from 'next'


import { useRouter } from "next/router";
import Banner from '../components/Banner';
import MainForm from '../components/MainForm';
import ToursSection from '../components/ToursSection';
import InfoAbout from '../components/InfoAbout';
import Testemonials from '../components/Testemonials';
import HomeDestinations from '../components/HomeDestinations';

import {sanityClient, urlFor} from '../sanity'
import HomeHero from '../components/HomeHero';
import Head from 'next/head';
import Action1 from '../components/Action1';
import HowItWorks from '../components/HowItWorks';
import HomeBlog from '../components/HomeBlog';
import HomeFaq from '../components/HomeFaq';
import { localBlogPosts } from '../data/localBlogPosts';
import SEO, { createAggregateRatingSchema } from '../components/SEO';


export default function  NextPage({about, destinations, tours, categories, faqs, posts}:any) {

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
      "itemListElement": tours?.slice(0, 5).map((tour: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.escortedmoroccotours.com/tours/${tour.slug?.current}`
      }))
    }
  };

  // 8 real, attributed 5-star TripAdvisor reviews are rendered in <Testemonials/> below
  const ratingSchema = createAggregateRatingSchema(5, 8, "Escorted Morocco Tours");

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [homeSchema, ratingSchema]
  };

  return (
    <>
    <SEO
      title="Guided Immersion Tours & Travel Guides"
      description="Escorted Morocco Tours - Expert guided Morocco tours and packages to get the best out of your vacation in Morocco. Best Morocco immersion tours and travel guides."
      keywords="Escorted Morocco tours, Morocco Escorted tours, Guided Tours Morocco, Morocco, Visit Morocco, Morocco tours, Travel Guides, culture, history, adventure, guided tours, accommodations, cultural activities, adventure activities, immersive experience, morocco immersion tours"
      schema={combinedSchema}
    />
          <HomeHero title="Best Escorted Morocco Tours, Guided Tours" tag="Journeys through time & Culture" p="Get the best out of your vacation in Morocco with our guided tours. Join our escorted immersion tours and uncover the best of Morocco." />
          {about?.mainabout && <InfoAbout about={about.mainabout}/>}
          <HomeDestinations destinations={destinations} />
          <ToursSection tours={tours}/>
          <HowItWorks/>
          <HomeBlog posts={posts}/>
          <Testemonials/>
          <HomeFaq faqs={faqs}/>
          <Banner/>

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
      herotag,
      seodescription,
      mainImage,
      "destinations": destinations[]->{
        title,
        city,
        slug
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
  const query5 = `*[_type == 'faq'][0..7]{ _id, question, answer }`
  const query6 = `*[_type == 'post'] | order(_createdAt desc)[0..5]{ _id, _createdAt, title, slug, seodescription, mainImage }`

  const tours = await sanityClient.fetch(query1)
  const destinations = await sanityClient.fetch(query2)
  const categories = await sanityClient.fetch(query3)
  const about = await sanityClient.fetch(query4)
  const faqs = await sanityClient.fetch(query5)
  const sanityPosts = await sanityClient.fetch(query6)

  const localAsPosts = (localBlogPosts || []).map((p: any) => ({
    _id: `local-${p.slug}`,
    _createdAt: p.publishedAt,
    title: p.title,
    slug: { current: p.slug },
    seodescription: p.seodescription,
    mainImage: null,
    localImage: p.image,
  }))
  const posts = [...(sanityPosts || []), ...localAsPosts]
    .sort((a: any, b: any) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime())
    .slice(0, 3)

  return {
    props: {
      about,
      tours,
      destinations,
      categories,
      faqs,
      posts,
    },
  };
}


