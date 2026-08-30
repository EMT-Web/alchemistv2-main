import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react'
import Action1 from '../../components/Action1';
import PageHero from '../../components/PageHero';
import { sanityClient, config, urlFor } from '../../sanity';
import { PortableText } from '@portabletext/react';
import SEO, { createTourSchema, createBreadcrumbSchema, createFAQSchema } from '../../components/SEO';

import Image from 'next/image'


import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'next-share';
import Link from 'next/link';

type FormValues = {
  name: string;
  email: string;
  arrivalDate: Date;
  departureDate: Date;
  travelers:number;
  subject: string;
  message: string;
};

type TourFaq = { question: string; answer: string; link?: { text: string; href: string } }

function buildTourFaqs(tour: any): TourFaq[] {
  const destinationNames = (tour.destinations || [])
    .map((d: any) => d?.city)
    .filter(Boolean)
    .join(', ')
  const amenityNames = (tour.amenities || [])
    .map((a: any) => a?.title)
    .filter(Boolean)
    .join(', ')
  const isSaharaTour = (tour.destinations || []).some((d: any) =>
    /merzouga|zagora|sahara|erg chebbi|erg chigaga/i.test(d?.city || '')
  )

  const faqs: TourFaq[] = [
    {
      question: `How many days is the ${tour.title}?`,
      answer: destinationNames
        ? `This tour runs for ${tour.duration || 0} days, covering ${destinationNames}.`
        : `This tour runs for ${tour.duration || 0} days.`,
    },
  ]

  if (amenityNames) {
    faqs.push({
      question: 'What\'s included in this tour?',
      answer: `This tour includes: ${amenityNames}. For anything not listed here — flights, travel insurance, or personal expenses, for example — get in touch and we'll confirm exactly what's covered before you book.`,
    })
  }

  faqs.push(
    {
      question: 'Do I need a visa to visit Morocco?',
      answer: 'Many nationalities, including the US, Canada, UK, and most EU countries, can enter Morocco visa-free for tourist stays of up to 90 days. Requirements vary by nationality, so we recommend confirming what applies to you before booking.',
    },
    {
      question: 'How fit do I need to be for this tour?',
      answer: 'Most of our tours suit travelers with a reasonable level of general fitness — expect walking on uneven terrain, some early starts, and in Sahara-bound itineraries, a camel trek. Let us know about any specific concerns when you inquire and we\'ll advise on what to expect.',
    },
    {
      question: 'Can this itinerary be customized?',
      answer: 'Yes. This itinerary can be adapted to your travel dates, pace, and interests — use the inquiry form on this page to tell us what you\'d like to change.',
    },
    {
      question: 'What size are the tour groups?',
      answer: 'We run small-group departures to keep the experience personal rather than large coach-tour groups. Exact group size can vary by date, so ask us when you inquire about this tour.',
    },
  )

  if (isSaharaTour) {
    faqs.push({
      question: 'What should I pack for the Sahara portion of this tour?',
      answer: 'Layered clothing for big day-to-night temperature swings, sun protection, a scarf for sand and wind, and closed shoes for the camel trek are the essentials.',
      link: { text: 'See our full desert packing list for the complete rundown.', href: '/blog/what-to-pack-sahara-desert-tour' },
    })
  }

  return faqs
}

function tourDetails({ tour, destinations, relatedTours}:any) {

  const [isError, setIsError] = useState(null as any);
  let [fileds, setData] = useState(null as any);
  const { register, handleSubmit } = useForm<FormValues>();
  const [value, setValue] = useState(null as any)
  const onSubmit: SubmitHandler<FormValues> = async (data,e:any) => {
    e.preventDefault();
    fileds = setData(data)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      setIsError(!res.ok)
    } catch (err) {
      setIsError(true)
    }
  }
  const ptComponents = {
    types: {
      image: () => null,
    },
    marks: {
      link: ({ value, children }: any) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
      ),
    },
  };

  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tours/${tour.slug.current}` }
  ]);

  // Create tour schema
  const tourSchema = createTourSchema(tour);

  // Create FAQ content + schema for this tour
  const tourFaqs = buildTourFaqs(tour);
  const faqSchema = createFAQSchema(tourFaqs);

  // Combine schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, tourSchema, faqSchema]
  };

  return (
    <>
    <SEO
      title={tour.seotitle || tour.title}
      description={tour.seodescription || tour.heroparagraph || tour.title}
      keywords={tour.seokeywords || 'Morocco tours, Morocco travel, escorted tours Morocco, guided tours'}
      image={tour.mainImage ? urlFor(tour.mainImage).url()! : undefined}
      type="product"
      schema={combinedSchema}
    />
    <PageHero title={tour.seotitle || tour.title} p={tour.heroparagraph || tour.seodescription || ''} tag={tour.herotag || 'Morocco Tour'} img={tour.coverImage ? urlFor(tour.coverImage).url()! : '/images/hero-bgs/singletour.jpg'}/>
   <section className="ftco-section ftco-no-pb" >
  <div className="container">
    <div className="row">
      <div className="col-lg-8 ftco-animate py-md-5 mb-3" style={{userSelect: "none"}}>
        <p>
          <img src={urlFor(tour.mainImage).url()!} alt="" className="img-fluid" />
        </p>
        <div className="project-wrap">
        <div className="text p-4">
                        <span className="days">{tour.duration || 0} Days Tour</span>
                        <h2>{tour.title}</h2>
                        <p className="location my-3"><span className="fa fa-map-marker mr-2"></span>{tour.destinations?.map((d:any)=> d?.slug?.current && <a key={d._id || d._createdAt} href={`/destinations/${d.slug.current}`} target="_blank" rel="noopener noreferrer">{d.city}, </a>)}</p>
                        <hr />
                        <ul>
                        {tour.amenities?.map((a:any) => a?.title && <li key={a._id || a._createdAt}>&#10029; <em style={{display:"inline"}}>{a.title}</em></li>)}
                          </ul>
                    </div>
                    </div>
                    <div className="tour-itinerrary">
                    <PortableText value={tour.body} components={ptComponents} />
            </div>
            <div className="tour-faqs mt-5">
              <h2 className="mb-3">Frequently Asked Questions</h2>
              {tourFaqs.map((faq) => (
                <div key={faq.question} className="mb-4">
                  <h3 style={{ fontSize: '1.1rem' }}>{faq.question}</h3>
                  <p>{faq.answer} {faq.link && <a href={faq.link.href}>{faq.link.text}</a>}</p>
                </div>
              ))}
            </div>
      </div>
      <div className="col-lg-4 sidebar ftco-animate bg-light py-md-5">
      <div className="sidebar-box ">
        <h5 style={{fontWeight: "600"}}>Request a quote now!</h5>
          <p>Contact Us for a Tailor-Made Itinerary Designed to Your Preferences</p>
          <form onSubmit={handleSubmit(onSubmit)}  className="search-form">
            <div className="form-group">
              <span className="icon fa fa-avatar"></span>
              <input type="text" className="form-control" placeholder="Your Name" {...register("name", { required: true })} />
            </div>
            <div className="form-group">
              <span className="icon fa fa-avatar"></span>
              <input type="text" className="form-control" placeholder="Your Email" {...register("email", { required: true })}/>
            </div>

            <div className="form-group">
            <label className="form-label" htmlFor="arrivalDate" style={{fontSize:"11px", marginLeft:"5px"}}>Arrival Date</label>
              <input type="date"  id="arrivalDate" className="form-control"  {...register("arrivalDate")} />
            </div>
            <div className="form-group">
            <label className="form-label" htmlFor="departureDate" style={{fontSize:"11px", marginLeft:"5px"}}>Departure Date</label>
              <input type="date" id="departureDate" className="form-control"  {...register("departureDate")}/>
            </div>
            <div className="form-group">
              <input type="number" id="travelers" className="form-control" placeholder="Number of Travelers" min={1} max={30} {...register("travelers")}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Subject"  {...register("subject")} value={`Inquery: ${tour.title}`} hidden/>
            </div>
            <div className="form-group">
                    <textarea  id="" cols={30} rows={7} className="form-control" placeholder="Message" {...register("message", { required: true })}></textarea>
            </div>
            {isError == false && <div style={{color:"green"}}><b>Thank you!</b><p><em>Your message has been successfully sent. Our team will get back to you shortly with more information about your requested tour.</em></p></div>}
            {isError == true && <div style={{color:"red"}}><b>Oops!</b><p><em> It looks like there was an error with your inquiry form submission. Please check your information and try again. If you continue to experience issues, please <a href="mailto:info@escortedmoroccotours.com">Contact</a> our team directly.</em></p></div>}
            <p>Your Tour Itinerary Awaits: Check Your Inbox for More Details</p>
            <div className="form-group">
            <input type="submit" value='Send' className="btn btn-primary py-3 px-5" />
          </div>
        {/* <button onClick={} className="btn">Book Now</button>  */}
          
          </form> 
        </div>
      <div className="sidebar-box ftco-animate">
          <div className="categories">
            <h3>Destinations</h3>
            {destinations?.map((d:any)=> d?.slug?.current && <li key={d._id || d._createdAt}><p><a href={`/destinations/${d.slug.current}`} target="_blank" rel="noopener noreferrer">{d.city} </a><a href={`/destinations/${d.slug.current}`}><span>{`(${d.count || 0} Tours)`}</span></a></p></li>)}
            <li><p><a href={`/destinations`} target="_blank" rel="noopener noreferrer"><em>View All Destinations </em> <span><i className='fa fa-arrow-right' /></span></a></p></li>
          </div>
        </div>
<hr />
        <div className="sidebar-box ftco-animate">
          <h3>Similar Tours</h3>
          {
            relatedTours?.map((t:any)=> t?.slug?.current && <div key={t._id || t._createdAt} className="block-21 mb-4 d-flex">
            <a className="blog-img mr-4" style={{backgroundImage: `url(${urlFor(t.mainImage).url()!})`}}></a>
            <div className="text">
              <h3 className="heading"><a href={`/tours/${t.slug.current}`}>{t.title}</a></h3>
              <p><span className="fa fa-map-marker mr-2"></span>{t.destinations?.map((d:any)=> d?.slug?.current && <a key={d._id || d._createdAt} href={`/destinations/${d.slug.current}`} target="_blank" rel="noopener noreferrer">{d.city}, </a>)}...</p>
            </div>
          </div>)
          }
        </div>
        <hr />
        <div className="sidebar-box ftco-animate">
        <h3>Know anyone who loves to travel?</h3>
        <p>Let them know about our amazing tour!</p>
        <FacebookShareButton
                      url={`https://www.escortedmoroccotours.com/tours/${tour.slug.current}`}
                      quote={tour.title}
                      hashtag={'#excortedmoroccotours'}
                     
                    >
                      <FacebookIcon size={32}  className="mr-2" round />
                    </FacebookShareButton>
                    <WhatsappShareButton  
  url={`https://www.escortedmoroccotours.com/tours/${tour.slug.current}`}
  title={tour.title}
  separator=":: "
>
  <WhatsappIcon size={32}  className="mr-2" round />
</WhatsappShareButton>
        </div>
      </div>

    </div>
    <Action1 />
  </div>
</section> 
    </>
  )
}



export async function getStaticPaths() {
  const query = 
  `*[_type == 'tour']{
      slug{
      current
    }
    }`;
    const tours = await sanityClient.fetch(query);

    const paths = tours.map((tour:any) => ({
      params: {
          slug: tour.slug.current,
      }
    }))
   
  return {
    paths,
    fallback: 'blocking' // false or 'blocking'
  };
}



export const getStaticProps: GetStaticProps = async ({params}) => {

  const query = `
  *[_type == 'tour' && slug.current == $slug][0]{
      _id,
      _createdAt,
      seotitle,
      seodescription,
      seokeywords,
      herotag,
      heroparagraph,
      title,
      duration,
      slug,
      mainImage,
      "categories":category[],
      "amenities":amenities[]->{
        _createdAt,
        slug,
        title,
        icon
      },
      "destinations": destinations[]->{
        _createdAt,
        city, 
        slug,
        title
      },
      coverImage,
      body[]{
        ...,
        asset->{
						...,
						metadata
					}
				,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        }
      },
     "related": *[_type == "tour" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(duration asc)[0..4] {
      _createdAt,
      title,
      slug{
        current
      },
      mainImage,
      "categories":category[],
      "destinations": destinations[][0..1]->{
        _createdAt,
        city, 
        slug
      },
    }
    }
  `
  const query2 = `
  *[_type == 'destination']| order(city asc)[0..9]{
      _id,
      _createdAt,
      title,
      "count": count(*[_type == "tour" && references(^._id)]),
      slug,
      city
    }
  `
  const tour = await sanityClient.fetch(query, {
    slug: params?.slug, 
})

  // Check if tour exists first
  if(!tour){
    return {
      notFound: true
    }
  }

  const destinations = await sanityClient.fetch(query2)
  const relatedTours = tour.related || []

  return {
    props: {
      tour,
      destinations,
      relatedTours
    },
    revalidate: 10,
  };
}


export default tourDetails