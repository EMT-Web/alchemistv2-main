import { GetStaticProps } from 'next';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import PortableText from 'react-portable-text';
import { sanityClient, urlFor } from '../../sanity';
import SEO, { createArticleSchema, createBreadcrumbSchema } from '../../components/SEO';

function post({ post, destinations, relatedPosts}:any) {
  const serializers = {
    types: {
      image: ({ node }:any) => {
        const url = urlFor(node.asset._ref).url()
        // Use the Materialize CSS framework to display the image
        return (
          <img
            src={url}
          />
        );
      }
    }
  };

  // View counter disabled during build - requires write permissions
  // TODO: Move to client-side useEffect if needed
  // sanityClient
  // .patch(post._id)
  // .inc({views: 1}) 
  // .commit()

  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug.current}` }
  ]);

  // Create article schema
  const articleSchema = createArticleSchema(post, post.author?.name);

  // Combine schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, articleSchema]
  };

  return (
    <>
    <SEO
      title={post.seotitle || post.title}
      description={post.seodescription || post.title}
      keywords={post.seokeywords || 'Morocco travel, Morocco blog, Morocco guide'}
      image={post.mainImage ? urlFor(post.mainImage).url()! : undefined}
      type="article"
      author={post.author?.name}
      publishedTime={post._createdAt}
      modifiedTime={post._updatedAt}
      schema={combinedSchema}
    />
     <section className="hero-wrap hero-wrap-2 " >
      <Image  src={urlFor(post.mainImage).url()!} alt={post.title} layout='fill' objectFit="cover" blurDataURL={urlFor(post.mainImage).url()!} placeholder="blur"/>
  <div className="overlay"></div>
  <div className="container">
    <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-center">
      <div className="col-md-9 ftco-animate pb-5 text-center">
       <p className="breadcrumbs"><span className="mr-2"><a href="/">Home <i className="fa fa-chevron-right"></i></a></span> <span className="mr-2"><a href="/blog/">Blog<i className="fa fa-chevron-right"/></a></span></p>
       <h1 className="mb-0 bread">{post.title}</h1>
     </div>
   </div>
 </div>
</section>
<section className="ftco-section ftco-no-pt ftco-no-pb">
  <div className="container">
    <div className="row">
      <div className="col-lg-8 ftco-animate py-md-5 mt-md-5">
        
        <Image src={urlFor(post.mainImage).url()!} width={600} height={400} alt={post.title} className="img-fluid" blurDataURL={urlFor(post.mainImage).url()!} placeholder="blur"/>
        
        <h2 className="mb-3">{post.title}</h2>
        <div className="meta">
          <div>
            <a href="#"><span className="fa fa-calendar mr-2"></span>{new Date(post._createdAt).toLocaleDateString()}</a>
            <a href="#"><span className="fa fa-eye ml-5 mr-2"></span> {post.views} Views</a></div>
        </div>
        
        <hr/>
        <PortableText
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={serializers}
            />
        
        <div className="about-author d-flex p-4 bg-light">
          <div className="bio mr-5">
          <img src={urlFor(post.author.image).url()!} alt="Image placeholder" className="img-fluid mb-4" />
          </div>
          <div className="desc">
            <h3>{post.author.name}</h3>
            <p style={{fontSize: "12px"}}>{post.author.bio}</p>
          </div>
        </div>
      </div> 
      <div className="col-lg-4 sidebar ftco-animate bg-light py-md-5">
        <div className="sidebar-box pt-md-5">
          <form action="/blog-search" method="get" className="search-form">
            <div className="form-group">
              <span className="icon fa fa-search"></span>
              <input type="text" name="q" className="form-control" placeholder="Search..." />
            </div>
          </form>
        </div>
        <div className="sidebar-box ftco-animate">
          <div className="categories">
            <h3>Destinations</h3>
            { destinations! && destinations.map((d:any)=> <li><p><a href={`/destinations/${d.slug.current}`} target="_blank">{d.city} </a><a href={`/destination/${d.slug.current}`}><span>{`(${d.count} Tours)`}</span></a></p></li> )}
            <li><p><a href={`/destinations`} target="_blank"><em>View All Destinations </em> <span><i className='fa fa-arrow-right' /></span></a></p></li>
          </div>
        </div>

        <div className="sidebar-box ftco-animate">
          <h3>Similar Posts</h3>
          {
            relatedPosts! && relatedPosts.map((p: any) =>  <div className="block-21 mb-4 d-flex">
            <a className="blog-img mr-4" style={{backgroundImage: `url(${urlFor(p.mainImage).url()!})`}}></a>
            <div className="text">
              <h3 className="heading"><a href={`/blog/${p.slug.current}`}>{p.title}</a></h3>
              <div className="meta">
                <div><a href="#"><span className="fa fa-calendar mr-2"></span>{new Date(p._createdAt).toLocaleDateString()}</a></div>
              </div>
            </div>
          </div>)
          }
        </div>
        <div className="sidebar-box ftco-animate">
        <h3>Travel is better when shared</h3>
        <p>Let your followers know about our amazing Escorted Morocco tours!</p>
        <FacebookShareButton
                      url={`https://www.escortedmoroccotours.com/blog/${post.slug.current}`}
                      quote={post.title}
                      hashtag={'#excortedmoroccotours'}
                     
                    >
                      <FacebookIcon size={32}  className="mr-2" round />
                    </FacebookShareButton>
                    <WhatsappShareButton  
  url={`https://www.escortedmoroccotours.com/blog/${post.slug.current}`}
  title={post.title}
  separator=":: "
>
  <WhatsappIcon size={32}  className="mr-2" round />
</WhatsappShareButton>
        </div>
      </div>

    </div>
  </div>
</section>
   </>
  )
}


export async function getStaticPaths() {
  const query = 
  `*[_type == 'post']{
      _id,
      slug  {
      current
    }
    }`;
    const posts = await sanityClient.fetch(query);
    
    const paths = await posts.map((post : any) => ({
      params: {
          slug: post.slug.current,
      }
    }))
   
  return {
    paths,
    fallback: 'blocking' // Allow dynamic generation of new pages
  };
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  const query = `
  *[_type == 'post'  && slug.current == $slug][0]{
      _id,
      _createdAt,
      seotitle,
      seodescription,
      seokeywords,
      title,
      slug,
      views,
      mainImage,
      body,
      "related": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..5] {
        _id,
        _createdAt,
        title,
        slug,
        mainImage,
        "categories":category[]
      }, 
      author -> {
        name,
        image,
        bio,
      }
    }
  `
  const query2 = `
  *[_type == 'destination'  && slug.current != $slug] | order(city asc) [0..9] {
      _id,
      _createdAt,
      "count": count(*[_type == "tour" && references(^._id)]),
      city,
      slug
    }
  `
  // const query2 = `
  // *[_type == 'tour'  && $city in destinations[]->city]{
  //     _id,
  //     _createdAt,
  //     lang,
  //     title,
  //     "destinations": destinations[]->{
  //        slug,
  //        title,
  //        city
  //     },
  //     slug,
  //     mainImage,
  //   },
  // `
 
  
  const post = await sanityClient.fetch(query,{
    slug: params?.slug, 
})

  // Check if post exists
  if (!post) {
    return {
      notFound: true
    }
  }

  const destinations = await sanityClient.fetch(query2,{
    slug: params?.slug, 
  })

  const relatedPosts = post.related || []

  return {
    props: {
      post,
      destinations,
      relatedPosts,
    },
    revalidate: 10,
  };
}

export default post