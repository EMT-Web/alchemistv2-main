import Head from "next/head";
import Banner from "../components/Banner";
import InfoAbout from "../components/InfoAbout";
import { AboutStory, AboutMissionVision, AboutTeam } from "../components/AboutSections";
import PageHero from "../components/PageHero";
import Testemonials from "../components/Testemonials";
import { sanityClient, urlFor } from "../sanity";
import SEO, { createBreadcrumbSchema, createAggregateRatingSchema } from "../components/SEO";


export default function  About({about}:any) {

  // Fallback values if Sanity data is not available
  const defaultAbout = {
    seodescription: "Expert guided Morocco tours and Packages to get the best out of your vacation in Morocco.",
    seokeywords: "Morocco tours, travel, guided tours, escorted tours",
    seotitle: "About Escorted Morocco Tours",
    heroquote: "Discover Morocco with Expert Guides",
    herotag: "Your Journey Starts Here",
    mainabout: "Welcome to Escorted Morocco Tours",
    team: [],
    missionvision: "Our mission is to provide unforgettable experiences."
  };

  const aboutData = about || defaultAbout;

  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' }
  ]);

  // Create about page schema
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Escorted Morocco Tours",
    "url": "https://www.escortedmoroccotours.com/about",
    "description": "Learn about Escorted Morocco Tours - Expert guided tours and packages with experienced guides offering cultural immersion, adventure, and luxury experiences.",
    "mainEntity": {
      "@type": "TravelAgency",
      "name": "Escorted Morocco Tours",
      "description": "We offer a range of customizable tours that cater to all types of travelers, from cultural immersion tours to adventure and luxury.",
      "url": "https://www.escortedmoroccotours.com"
    }
  };

  // 8 real, attributed 5-star TripAdvisor reviews are rendered in <Testemonials/> below
  const ratingSchema = createAggregateRatingSchema(5, 8, "Escorted Morocco Tours");

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, aboutPageSchema, ratingSchema]
  };

  return (
    <>
    <SEO
      title={aboutData.seotitle || "About Us - Expert Guided Morocco Tours"}
      description={aboutData.seodescription || "We offer a range of customizable tours that cater to all types of travelers, from cultural immersion tours to adventure and luxury. Best guided immersion tours."}
      keywords={aboutData.seokeywords || "Morocco tours, about us, travel agency, guided tours, escorted tours, expert guides"}
      schema={combinedSchema}
    />
    <PageHero
      title="About Escorted Morocco Tours"
      tag="Who We Are"
      p={aboutData.heroquote ? `"${aboutData.heroquote}"${aboutData.herotag ? ` — ${aboutData.herotag}` : ''}` : aboutData.herotag}
      img={about?.coverImage ? urlFor(aboutData.coverImage).url()! : '/images/hero-bgs/about-us.jpg'}
    />
    <AboutStory about={aboutData} />
    {aboutData.mainabout && typeof aboutData.mainabout !== 'string' && (
      <InfoAbout about={aboutData.mainabout} />
    )}
    <AboutMissionVision about={aboutData} />
    <AboutTeam about={aboutData} />
    <Testemonials />
    <Banner />
    </>
  )
}

export async function getStaticProps({context}:any) {
  const query = `
  *[_type == 'abouts' ][0]
  `
  const about = await sanityClient.fetch(query)

  return {
    props: {
       about
    },
  };
}
