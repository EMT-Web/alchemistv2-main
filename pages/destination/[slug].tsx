import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react'
import PageHero from '../../components/PageHero';
import ToursSection from '../../components/ToursSection';
import { sanityClient, urlFor } from '../../sanity';
const capitalize = (s:any) => (s && s[0].toUpperCase() + s.slice(1)) || ""
function destinationTours({tours, city}:any) {

const c = capitalize(city)
  return (
   <>
     <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content={`From ${c} to the charming blue city of Chefchaouen, to the grandeur of the imperial cities of Meknes and Rabat, our tours offer a tailored and immersive experience of Morocco's treasures.`}/>
           <meta name="keywords" content={`${c},Escorted tours, guided tours, guided morocco tours, Morocco, Morocco Immersion Tours, history, adventure, luxury, premium, expert guides, tailored experience, hidden gems, immersion tours, authentic experiences,Sahara desert, Marrakesh, Rabat, Casablanca, Chefchaouen, Merzouga, Fes, Meknes, OUarzazate, Essaouira`}></meta>
           <title>Guided Morocco tours | Via {c}</title>
           <meta property='og:image' content='/images/hero-bgs/all-tours.jpg' />
<meta property='og:title' content={`Morocco tours | Via ${c}`} />
<meta property='og:description' content={`From ${c} to the charming blue city of Chefchaouen, to the grandeur of the imperial cities of Meknes and Rabat, our tours offer a tailored and immersive experience of Morocco's treasures.`} />

    </Head>
    <PageHero title={c} tag="Morocco Immersion Tours via" p='Join us on an adventure of a lifetime with our escorted tours in Morocco. From the bustling cities of Marrakech and Fez to the tranquil beauty the blue pearl chefchaouen, the Sahara Desert and the stunning Atlas Mountains, our tours offer a comprehensive and immersive journey through the culture, history, and natural wonders of Morocco. Our guided tours will take you everywhere.' img='/images/hero-bgs/all-tours.jpg'/>
    <ToursSection tours={tours || []}/>
   </>
  )
}




export async function getStaticPaths() {
    const query =`*[_type == "destination"]{
      slug,
      title,
    }`
      const destinations = await sanityClient.fetch(query);
   
      // const paths = categories.map((category : Category) => ({
      //   params: { category: category.slug },
      // }))
      
   
      const paths = Object.keys(destinations).map((key) => {
        const destination = destinations[key]
        // console.log(category)
        return {
          params: {slug: destination.slug.current}
        }
      })
      
    return {
      paths,
      fallback: 'blocking' // Allow dynamic generation of new pages
    };
  }
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
   let city = params?.slug?.toString()
   city = city?.replace(/-/g,' ')

    const query = `
    *[_type == 'tour' && $slug in destinations[]->slug.current ]{
        _id,
        _createdAt,
        title,
        duration,
        slug,
        "amenities": amenities[]->{
          slug,
          title,
          icon
        },
        "destinations": destinations[][0..2]->{
          slug,
          city
        },
        mainImage,
      }
    `
    // const query = `*[_type == "tour" && $slug in categories[]->slug.current]{
    //   _id,
    //   title,
    //   slug,
    //   author -> {
    //   name,
    //   image
    // }, 
    // "categories": categories[]->{
    //   slug,
    //   title,
    // },
    // mainImage,
    // description
    // }`
    const tours = await sanityClient.fetch(query, {
        slug: params?.slug,
    })
    // const posts = await sanityClient.fetch(query)
 
    if(!tours){
        return {
            notFound: true
        }
    }
    return {
        props: {
            tours,
            city
        },
        revalidate: 60,
    }
  }
export default destinationTours