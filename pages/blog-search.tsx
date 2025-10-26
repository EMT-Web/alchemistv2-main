import Head from 'next/head';
import React from 'react'
import PageHero from '../components/PageHero';
import { sanityClient, urlFor } from '../sanity';
import Image from 'next/image';

const SearchPage = ({posts, keyword}:any) => {
 
  return(
  <>
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="description" content=""></meta>
      <meta name="keywords" content=""></meta>
      <title>Blog Search</title>
      <meta name="robots" content="noindex, nofollow" />
 </Head>
<PageHero title={keyword} tag="Search results for:" img='/images/hero-bgs/blog-search.jpg'/>
<section className="ftco-section">
   <div className="container">
    
{
  posts.length === 0  &&   <div className="row justify-content-center">
  <div className="col-md-12 heading-section text-center ftco-animate">
      {/* <span className="subheading">Tours</span> */}
      <h2 className="mb-4">Ooops!</h2>
      <div><Image src='/images/notfound.gif' alt="Not Found" width={600} height={400} /></div>
      <h6>We looked all over, but we still didn't get there yet! </h6>
      <p>try our <a href="/">Homepage</a> or <a href="/blog">blog</a> instead</p>
    
  </div>
</div>
}

{ posts &&
  posts.map((post:any) => 
  <div className="row">
  <div className="col-md-4 d-flex ftco-animate">
  <div className="blog-entry justify-content-end">
   <a href={`/blog/${post.slug.current}`} className="block-20" style={{backgroundImage: `url(${urlFor(post.mainImage).url()!})`}}>
   </a>
   <div className="text">
   <div className="d-flex align-items-center mb-4 topp">
     <div className="one">
      <span className="day">{new Date(post._createdAt).getDay()}</span>
    </div>
    <div className="two">
      <span className="yr">{new Date(post._createdAt).toLocaleString('default', { month: 'long' })}</span>
      <span className="mos">{new Date(post._createdAt).getFullYear()}</span>
    </div>
  </div>
  <h3 className="heading"><a href={`/blog/${post.slug.current}`}>{post.title}</a></h3>
  <p>{post.seodescription}..</p>
  <p><a href={`/blog/${post.slug.current}`} className="btn btn-primary">Read more</a></p>
  
</div>
</div>
</div></div>)
}
</div>
{/* <div className="row mt-5">
  <div className="col text-center">
    <div className="block-27">
      <ul>
        <li><a href="#">&lt;</a></li>
        <li className="active"><span>1</span></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">&gt;</a></li>
    </ul>
</div>
</div>
</div> */}

</section>
</>)
  // if(searchResults.length !== 0 ){
  // return (
    
  //     searchResults.map((r:any)=>  <div>{r.title}</div>)
    
   
  // )}else{
  //   return (
  //     <div>Nothing Found</div>
  // )}
}


export async function getServerSideProps({ query }:any) {


// const res = `*[_type == 'post' &amp;&amp; ]`
const searchResults = await sanityClient.fetch(
  `*[_type == "post" && title match $query]{
    _createdAt,
    _id,
    seodescription,
    title,
    slug,
    mainImage
  }`,
  { query: `${query.q}*` }
);

  return {
    props: { posts: searchResults, keyword: query.q },
  };
}
export default SearchPage