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
import SEO from '../components/SEO';


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

  // No aggregateRating here on purpose: Google's review snippet rules forbid
  // marking up a business's own rating on its own pages and ratings taken from
  // other sites (TripAdvisor). The reviews stay visible in <Testemonials/>.
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [homeSchema]
  };

  return (
    <>
    <SEO
      title="Private Morocco Tours with Local Guides"
      description="Private Morocco tours with your own driver guide: Sahara nights in Merzouga, Fes, Marrakech, Chefchaouen and the Atlas. Rated 5.0 on TripAdvisor."
      schema={combinedSchema}
    />
          <HomeHero title="Private Morocco Tours with Local Driver Guides" tag="Journeys through time & Culture" p="Get the best out of your vacation in Morocco with our guided tours. Whether you're searching for escorted tours to Morocco or Morocco escorted tours, our small-group itineraries help you uncover the best of Morocco, from the Sahara Desert to the Atlas Mountains." />
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
      priceFrom, driveTimes,
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


