import Head from 'next/head';
import React from 'react'
import PageHero from '../components/PageHero';
import ToursSection from '../components/ToursSection';
import { sanityClient } from '../sanity';
import Image from 'next/image'

const SearchPage = ({searchResults, keyword}:any) => {


  return(
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content=""></meta>
      <meta name="keywords" content=""></meta>
      <title>Tours Search</title>
      <meta name="robots" content="noindex, nofollow" />
 </Head>
<PageHero title="Tours" tag="Search results" img='/images/hero-bgs/blog-search.jpg'/>

{
  searchResults.length === 0 &&
  <div className="col-md-12 heading-section text-center ftco-animate">
      {/* <span className="subheading">Tours</span> */}
      <h2 className="mb-4">Ooops!</h2>
      <div><Image src='/images/notfound.gif' alt="Not Found" width={600} height={400} /></div>
      <h6>We looked all over, but we still didn't get there yet! </h6>
      <p>Browse more<a href="/tours">Escorted Morocco Tours</a></p>
      <p>Or Get Your Desired Itinerary Tailored By our Expert Team <a href="/contact">Get in Touch</a></p>
  </div>

}
{
 searchResults.length !== 0 &&    <ToursSection tours={searchResults} />
 }

    </>
  )
  
}


export async function getServerSideProps({ query }:any) {

  const categories = query.categories;

// const res = `*[_type == 'post' &amp;&amp; ]`
const searchResults = await sanityClient.fetch(
  `*[_type == "tour" ]{
    _createdAt,
    _id,
    title,
    slug,
    duration,
    slug,
    "amenities": amenities[][0..2]->{
      title,
      slug
    },
    "categories": categories[]->{
      _id,
    },
    "destinations": destinations[]->{
      _id,
     slug,
     city,
     title,
    },
  }`
);

let tours = {};
if(categories){
 
  tours = searchResults.filter((t:any) => {

    categories.includes(t.categories)});;
}


  return {
    props: { searchResults},
  };
}
export default SearchPage