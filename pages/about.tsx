import { useTranslations } from "next-intl";
import Head from "next/head";
import Action1 from "../components/Action1";
import Banner from "../components/Banner";
import InfoAbout from "../components/InfoAbout";
import InfoAbout2 from "../components/InfoAbout2";
import PageHero from "../components/PageHero";
import Testemonials from "../components/Testemonials";
import { sanityClient, urlFor } from "../sanity";
import SEO, { createBreadcrumbSchema } from "../components/SEO";


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

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, aboutPageSchema]
  };

  return (
    <>
    <SEO
      title={aboutData.seotitle || "About Us - Expert Guided Morocco Tours"}
      description={aboutData.seodescription || "We offer a range of customizable tours that cater to all types of travelers, from cultural immersion tours to adventure and luxury. Best guided immersion tours."}
      keywords={aboutData.seokeywords || "Morocco tours, about us, travel agency, guided tours, escorted tours, expert guides"}
      schema={combinedSchema}
    />
    <PageHero title={`"${aboutData.heroquote}"`} tag="" p={aboutData.herotag} img={about?.coverImage ? urlFor(aboutData.coverImage).url()! : '/images/hero-bgs/about-us.jpg'} />
    {aboutData.mainabout && <InfoAbout about={aboutData.mainabout} />}
    {aboutData.team && <InfoAbout2 team={aboutData.team} missionvision={aboutData.missionvision}/>}
    <Testemonials />
    <Action1 />
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
