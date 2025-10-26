import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react'
import PageHero from '../../components/PageHero';
import ToursSection from '../../components/ToursSection';
import { sanityClient, urlFor } from '../../sanity';


function categoryTours({tours, category}:any) {
  
  // Fallback if category data is missing
  const defaultCategory = {
    seodescription: "Explore Morocco with our guided tours",
    seokeywords: "Morocco tours, guided tours",
    seotitle: "Morocco Tours",
    title: "Morocco Tours"
  };

  const categoryData = category || defaultCategory;
  
  return (
   <>
     <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content={categoryData.seodescription}></meta>
           <meta name="keywords" content={categoryData.seokeywords}></meta>
           <title>{categoryData.seotitle}</title>
           <meta property='og:image' content='/images/hero-bgs/all-tours.jpg' />
           <meta property='og:title' content={categoryData.seotitle} />
          <meta property='og:description' content={categoryData.seodescription} />
    </Head> 
    <PageHero title={categoryData.title} tag="Category:" p='Join us on an adventure of a lifetime with our guided morocco tours. From the bustling cities of Marrakech, Fes, Meknes, Tangier, Rabat and Casablanca to the tranquil beauty the blue city Chefchaouen, the windy city Essaouira, the Sahara Desert and the stunning Atlas Mountains, our escorted tours offer a comprehensive and immersive journeys through the culture, history, and natural wonders of Morocco.' img={category?.mainImage ? urlFor(categoryData.mainImage).url()! : '/images/hero-bgs/all-tours.jpg'} />
    <ToursSection tours={tours || []}/>
   </>
  )
}


export async function getStaticPaths({context}:any) {
    const query =`*[_type == "category"]{
      slug,
      title,
    }`
      const categories = await sanityClient.fetch(query);
   
      const paths = Object.keys(categories).map((key) => {
        const category = categories[key]
        // console.log(category)
        return {
          params: {slug: category.slug.current}
        }
      })
      
    return {
      paths,
      fallback: false // false or 'blocking'
    };
  }
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `
    *[_type == 'tour' && $slug in categories[]->slug.current ]{
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
        "categories": categories[]->{
            slug,
            city
        },
        'category': *[_type == "category" && slug.current == $slug ]{
          slug,
          seotitle,
          seodescription,
          seokeywords,
          title,
          mainImage
        },
        mainImage,
      }
    `


    const tours = await sanityClient.fetch(query, {
        slug: params?.slug,
    })
   
    if(!tours){
        return {
            notFound: true
        }
    }
    return {
        props: {
            tours,
            category: tours[0]?.category[0]!,
        },
        revalidate: 10,
    }
  }
export default categoryTours