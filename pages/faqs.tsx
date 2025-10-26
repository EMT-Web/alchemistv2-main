import Head from 'next/head'
import React from 'react'
import PageHero from '../components/PageHero'
import { sanityClient } from '../sanity'

function faqs({faqs}:any) {
  return (
    <>
     <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content="Answers to Some Other Questions You May Have About Visiting Morocco in general, Escorted Morocco Tours, Guided Tours, Immersion Tours"></meta>
           <meta name="keywords" content="Escorted Morocco tours, Morocco Escorted tours, Guided Tours Morocco, Morocco, Visit Morocco, Morocco tours, Travel Guides culture, history, adventure, guided tours, accommodations, cultural activities, adventure activities, immersive experience, immersions morocco"></meta>
           <title>Escorted Morocco Tours - Frequently Asked Questions - FAQs</title>
           <meta property="og:image" content="/images/escorted-morocco-tours.png" />
           <meta property="og:title" content="Escorted Morocco Tours - Booking Conditions" />
           <meta property='og:description' content="Answers to Some Other Questions You May Have About Visiting Morocco in general, Travel Guides, Guided Tours, Immersion Tours" />
    </Head>
    <PageHero title="Frequently Asked Questions" tag="Secure Your Trip" p="Answers to Some Other Questions You May Have"  img='/images/hero-bgs/about-us.jpg' />
    <section className="ftco-section services-section">
			<div className="container">
				<div className="row d-flex">
                <div className="col-12" id="accordion">
{ faqs! && faqs.map((faq:any)=> <div className="card">
    <div className="card-header" id={`${faq._createdAt}`}>
      <h3 className="mb-0">
        <a className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        {faq.question}
        </a>
      </h3>
    </div>

    <div id="collapseOne" className="collapse show" aria-labelledby={`${faq._createdAt}`} data-parent="#accordion">
      <div className="card-body">
      {faq.answer}
      </div>
    </div>
  </div>
  )}
</div>
                </div>
            </div>
    </section>
    </>
    

  )
}


export async function getServerSideProps() {

  const query1 = `
  *[_type == 'faq']{
      _id,
      _createdAt,
      question,
      answer
    }
  `

  
  const faqs = await sanityClient.fetch(query1)
  
  return {
    props: {
      faqs
    },
  };
}


export default faqs