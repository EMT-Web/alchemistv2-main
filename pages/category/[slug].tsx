import { GetStaticProps } from 'next';
import React from 'react'
import PageHero from '../../components/PageHero';
import ToursSection from '../../components/ToursSection';
import { sanityClient, urlFor } from '../../sanity';
import SEO from '../../components/SEO';


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
     <SEO
       title={categoryData.seotitle}
       description={categoryData.seodescription}
       keywords={categoryData.seokeywords}
       image="/images/hero-bgs/all-tours.jpg"
     />
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
      fallback: 'blocking' // Allow dynamic generation of new pages
    };
  }
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `
    *[_type == 'tour' && $slug in categories[]->slug.current ] | order(duration asc){
        _id,
        _createdAt,
        title,
        duration,
        slug,
        herotag,
        seodescription,
        "destinations": destinations[]->{
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
   
    if(!tours || tours.length === 0){
        return {
            notFound: true
        }
    }

    // Get category data or use null
    const category = tours[0]?.category?.[0] || null;

    return {
        props: {
            tours,
            category,
        },
        revalidate: 10,
    }
  }
export default categoryTours