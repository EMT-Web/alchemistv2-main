import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React from 'react'
import PortableText from 'react-portable-text';
import { sanityClient, urlFor } from '../../sanity';
import Image from 'next/image'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';

function destinationDetails({ destination, destinations, relatedTours}:any) {

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
  return (
    <>
     <Head>
           <title>{destination.seotitle}</title>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content={destination.seodescription}></meta>
           <meta name="keywords" content={destination.seokeywords}></meta>
           <meta property='og:image' content={urlFor(destination.mainImage).url()!} />
<meta property='og:title' content={destination.seotitle} />
<meta property='og:description' content={destination.heroparagraph} />
    </Head>
  <section className="hero-wrap hero-wrap-2 " >
  <Image  src={urlFor(destination.coverImage).url()!} alt={destination.title} layout='fill' objectFit="cover" blurDataURL={urlFor(destination.coverImage).url()!} placeholder="blur" priority/>
  {/* <div className="overlay"></div> */}
  <div className="container">
    <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-center">
      <div className="col-md-9 ftco-animate pb-5 text-center">
       <p className="breadcrumbs"><span className="mr-2"><a href="/">Home <i className="fa fa-chevron-right"></i></a></span> <span className="mr-2"><a href="/destinations">Destinations<i className="fa fa-chevron-right"></i></a></span><span>{destination.city}<i className="fa fa-chevron-right"></i></span></p>
       <h1 className="mb-0 bread">{destination.title}</h1>
     </div>
   </div>
 </div>
</section>
<section className="ftco-section ftco-no-pt ftco-no-pb">
  <div className="container">
    <div className="row">
      <div className="col-lg-8 ftco-animate py-md-5 mt-md-5">
        <p>
          <img src={urlFor(destination.mainImage).url()!} alt={destination.city} className="img-fluid" />
        </p>
        <PortableText
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={destination.body}
            serializers={serializers}
            />
        
        <div className="about-author d-flex p-4 bg-light">
          <div className="bio mr-5">
            <img src={urlFor(destination.author.image).url()!} alt={destination.author.name} className="img-fluid mb-4" />
          </div>
          <div className="desc">
            <strong>{destination.author.name}</strong>
            <p style={{fontSize: "12px"}}>{destination.author.bio}</p>
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
          <h3>Tours via {destination.city}</h3>
          {
            relatedTours! && relatedTours.map((tour: any) =>  <div className="block-21 mb-4 d-flex">
            <a className="blog-img mr-4" >
            <Image src={urlFor(tour.mainImage).url()!} width={200} height={200}  alt={tour.title} className="blog-img" blurDataURL={urlFor(tour.mainImage).url()!}  placeholder="blur"/>
            </a>
            <div className="text">
              <h3 className="heading"><a href={`/tours/${tour.slug.current}`}>{tour.title}</a></h3>
              <div className="meta">
                <div><a href="#"><span className="fa fa-calendar mr-2"></span>{tour.duration} Days Tour</a></div>
              </div>
            </div>
          </div>)
          }
        </div>
        <div className="sidebar-box ftco-animate">
          <div className="categories">
            <h3>Destinations</h3>
            { destinations! && destinations.map((d:any)=> <li><p><a href={`/destinations/${d.slug.current}`} target="_blank">{d.city} </a><a href={`/destination/${d.slug.current}`}><span>{`(${d.count} Tours)`}</span></a></p></li> )}
            <li><p><a href={`/destinations`} target="_blank"><em>View All Destinations </em> <span><i className='fa fa-arrow-right' /></span></a></p></li>
          </div>
        </div>
        <div className="sidebar-box ftco-animate">
        <h3>Know anyone who loves to travel?</h3>
        <p>Let them know about our amazing destination!</p>
        <FacebookShareButton
                      url={`https://www.escortedmoroccotours.com/tours/${destination.slug.current}`}
                      quote={destination.title}
                      hashtag={'#excortedmoroccotours'}
                     
                    >
                      <FacebookIcon size={32}  className="mr-2" round />
                    </FacebookShareButton>
                    <WhatsappShareButton  
  url={`https://www.escortedmoroccotours.com/tours/${destination.slug.current}`}
  title={destination.title}
  separator=":: "
>
  <WhatsappIcon size={32}  className="mr-2" round />
</WhatsappShareButton>
        </div>
        {/* <div className="sidebar-box ftco-animate">
          <h3>Paragraph</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus itaque, autem necessitatibus voluptate quod mollitia delectus aut, sunt placeat nam vero culpa sapiente consectetur similique, inventore eos fugit cupiditate numquam!</p>
        </div> */}
      </div>

    </div>
  </div>
</section>
    </>
  )
}



export async function getStaticPaths() {
  const query = 
  `*[_type == 'destination']{
      _id,
      slug  {
      current
    },
    city
    }`;
    const destinations = await sanityClient.fetch(query);
    
    const paths = await destinations.map((destination : any) => ({
      params: {
          slug: destination.slug.current,
      }
    }))
   
  return {
    paths,
    fallback: false // false or 'blocking'
  };
}



export const getStaticProps: GetStaticProps = async ({params}) => {

  const query = `
  *[_type == 'destination'  && slug.current == $slug][0]{
      _id,
      _createdAt,
      seotitle,
      seodescription,
      seokeywords,
      city,
      title,
      slug,
      mainImage,
      coverImage,
      duration,
      author -> {
        name,
        image,
        bio,
      },
      body,
      "related": *[_type == "tour" && $slug  in destinations[]->slug.current] | order(duration asc) [0..5]{
        title,
        mainImage,
        duration,
        "destinations": destinations[]->{
          city, 
          slug,
          title
        },
        slug
      }
    }
  `
  const query2 = `
  *[_type == 'destination'  && slug.current != $slug] | order(city asc) [0..9]{
      _id,
      _createdAt,
      city,
      "count": count(*[_type == "tour" && references(^._id)]),
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
 
  
  const destination = await sanityClient.fetch(query,{
    slug: params?.slug, 
})
const destinations = await sanityClient.fetch(query2,{
  slug: params?.slug, 
})
// const tours = await sanityClient.fetch(query2,{
//   city: params?.city
// })
  const relatedTours = destination.related
  return {
    props: {
      destination,
      destinations,
      relatedTours,
    },
    revalidate: 60,
  };
}


export default destinationDetails