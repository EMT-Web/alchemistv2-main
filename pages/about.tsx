import { useTranslations } from "next-intl";
import Head from "next/head";
import Action1 from "../components/Action1";
import Banner from "../components/Banner";
import InfoAbout from "../components/InfoAbout";
import InfoAbout2 from "../components/InfoAbout2";
import PageHero from "../components/PageHero";
import Testemonials from "../components/Testemonials";
import { sanityClient, urlFor } from "../sanity";


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

  return (
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content={aboutData.seodescription}></meta>
    <meta name="keywords" content={aboutData.seokeywords}></meta>
    <title>{aboutData.seotitle}</title>
    <meta property="og:image" content="/images/escorted-morocco-tours.png" />
    <meta property="og:title" content="Escorted Morocco Tours | Expert Guided Tours - About Us" />
    <meta property='og:description' content="We offer a range of customizable tours that cater to all types of travelers, from cultural immersion tours to adventure and luxury. Best guided immersion tours" />
    </Head>
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
