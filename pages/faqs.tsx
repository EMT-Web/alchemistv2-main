import React from 'react'
import PageHero from '../components/PageHero'
import { sanityClient } from '../sanity'
import SEO, { createFAQSchema, createBreadcrumbSchema } from '../components/SEO'

function faqs({faqs}:any) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'FAQs', url: '/faqs' }
  ]);

  const faqSchema = faqs?.length ? createFAQSchema(faqs) : null;

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": faqSchema ? [breadcrumbSchema, faqSchema] : [breadcrumbSchema]
  };

  return (
    <>
    <SEO
      title="Frequently Asked Questions"
      description="Answers to Some Other Questions You May Have About Visiting Morocco in general, Escorted Morocco Tours, Guided Tours, Immersion Tours"
      keywords="Escorted Morocco tours, Morocco Escorted tours, Guided Tours Morocco, Morocco, Visit Morocco, Morocco tours, Travel Guides culture, history, adventure, guided tours, accommodations, cultural activities, adventure activities, immersive experience, immersions morocco"
      schema={combinedSchema}
    />
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