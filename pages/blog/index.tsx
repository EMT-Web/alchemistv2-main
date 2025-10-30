import type { GetStaticProps, NextPage } from 'next'

import { Category, Post } from '../../typings'
import { useRouter } from "next/router";
import PageHero from '../../components/PageHero';
import { sanityClient, urlFor } from '../../sanity';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'
import SEO, { createBreadcrumbSchema } from '../../components/SEO';

export default function  NextPage({ posts}:any) {
  const router = useRouter();
  
  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ]);

  // Create blog collection schema
  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Escorted Morocco Tours Blog",
    "description": "Travel guides, tips, and stories about Morocco tours and destinations",
    "url": "https://www.escortedmoroccotours.com/blog",
    "blogPost": posts?.slice(0, 10).map((post: any) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://www.escortedmoroccotours.com/blog/${post.slug?.current}`,
      "datePublished": post._createdAt,
      "image": post.mainImage ? urlFor(post.mainImage).url()! : undefined
    }))
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, blogCollectionSchema]
  };
  
  return (
    <>
    <SEO
      title="Morocco Travel Blog | Expert Guides & Tips"
      description="Uncover the beauty and mystery of Morocco with our expertly crafted travel guides. Read about Morocco tours, destinations, culture, and travel tips from expert guides."
      keywords="Escorted Morocco tours, Morocco travel, immersion tours, Morocco blog, guided tours, desert tours, cultural experiences, Marrakech, Essaouira, Chefchaouen, travel tips"
      schema={combinedSchema}
    />
    <PageHero title="Discover the Best Escorted Morocco Tours" tag="From cultural experiences to adventure activities," p="Follow us on our journey through Morocco and get a taste of the Morocco's diverse landscapes, history and culture" img='/images/hero-bgs/blog.jpg'/>
    <section className="ftco-section">
   <div className="container">
    <div className="row">
{
  posts && posts.length > 0 ? posts.map((post:any) => <div key={post._id} className="col-md-4 d-flex ftco-animate">
  <div className="blog-entry justify-content-end">
   <a href={`/blog/${post.slug.current}`} className="block-20" >
    <Image src={urlFor(post.mainImage).url()!} alt={post.title} layout='fill' objectFit="cover" blurDataURL={urlFor(post.mainImage).url()!} placeholder="blur"/>
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
  <p style={{ overflow: "hidden",
   textOverflow: "ellipsis",
   display: "-webkit-box",
   wordWrap: "break-word",
  maxHeight: "3.6em",
  lineHeight: "1.8em"}}>{post.seodescription}..</p>
  <p><a href={`/blog/${post.slug.current}`} className="btn btn-primary">Read more</a></p>
</div>
</div>
</div>) : 
<div className="col-md-12 text-center">
  <p>No blog posts available yet. Please add content to your Sanity CMS.</p>
</div>
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
</div>
</section>
  </>
  )
}



export async function getServerSideProps({req, res}:any) {

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const query = `
  *[_type == 'post' ]{
      _id,
      _createdAt,
      seodescription,
      title,
      slug,
      mainImage,
    }
  `
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts
    },
  };
}


