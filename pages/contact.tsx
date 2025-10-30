import Head from 'next/head';
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import PageHero from '../components/PageHero';
import SEO, { createBreadcrumbSchema } from '../components/SEO';


type FormValues = {
  name: string;
  email: string;
  arrivalDate : Date;
  departureDate: Date;
  travelers:number;
  subject: string;
  message: string;

};

function contact()  {
  const [isError, setIsError] = useState(null as any);
  let [fileds, setData] = useState(null as any);
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data,e:any) => {
    e.preventDefault();
    console.log('Sending')
    fileds = setData(data)
    
    try{
        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
          
        }).then((res) => {
          if (res.ok) {
            setIsError(false);
          }
        })
      }
       catch(err){
        setIsError(true);
       }
  }
  
  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' }
  ]);

  // Create local business schema for contact page
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Escorted Morocco Tours",
    "url": "https://www.escortedmoroccotours.com",
    "telephone": "+212-669-883-759",
    "email": "info@escortedmoroccotours.com",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "App 5-L. Elharti. Massira-2",
        "addressLocality": "Marrakech",
        "addressCountry": "Morocco"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Dr Ait Tajer, Taftechna",
        "addressLocality": "Zagora",
        "addressCountry": "Morocco"
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, localBusinessSchema]
  };

  return (
    <>
    <SEO
      title="Contact Us - Plan Your Morocco Tour"
      description="Contact Escorted Morocco Tours to plan your perfect Morocco vacation. Expert guides ready to create a tailor-made itinerary for your preferences. Get in touch today!"
      keywords="contact Morocco tours, Morocco tour inquiry, plan Morocco trip, Morocco travel agent, Morocco tour booking"
      schema={combinedSchema}
    />
    <PageHero title="We are here to help you plan the ultimate trip to Morocco" tag="Contact Us" p="Let us design a tour that takes you to the country's most beautiful and lesser-known destinations. From Bustling Cities to Sahara Desert, Majestic Atlas Mountains to Exotic Beaches. We've got you covered! 
 "  img="/images/hero-bgs/contact.jpg"/>
    <section className="ftco-section ftco-no-pb contact-section mb-4">
      <div className="container">
        <div className="row d-flex contact-info">
          <div className="col-md-4 d-flex">
          <div className="align-self-stretch box p-4 text-center">
            <div className="icon d-flex align-items-center justify-content-center">
            <span className="fa fa-map-marker"></span>
          </div>
          <h3 className="mb-2">Address</h3>
          <p><span className="fa fa-map-marker mr-2"/>App 5-L. Elharti. Massira-2.<br/> Marrakech. Morocco <br/><span className="fa fa-map-marker mr-2"/>Dr Ait Tajer, Taftechna,<br/> Zagora. Morocco</p>
        </div>
      </div>
      <div className="col-md-4 d-flex">
        <div className="align-self-stretch box p-4 text-center">
          <div className="icon d-flex align-items-center justify-content-center">
          <span className="fa fa-phone"></span>
        </div>
        <h3 className="mb-2">Phone</h3>
        <p><span className="fa fa-phone mr-2"></span><a href="tel://+212623668013">+212 6 23 66 80 13</a></p>
      </div>
    </div>
    <div className="col-md-4 d-flex">
      <div className="align-self-stretch box p-4 text-center">
        <div className="icon d-flex align-items-center justify-content-center">
        <span className="fa fa-paper-plane"></span>
      </div>
      <h3 className="mb-2">Our email</h3>
      <p><span className="fa fa-envelope mr-2"/><a href="mailto:info@escortedmoroccotours.com">info@escortedmoroccotours.com</a></p>
    </div>
    </div>
    </div>
    </div>
    </section>
<section className="ftco-section contact-section ftco-no-pt">
  <div className="container">
    <div className="row block-9">
    <div className="col-md-6 order-md-last">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-5 contact-form">
                <h4>Contact us</h4>
                 <p>Contact Us for a Tailor-Made Itinerary Designed to Your Preferences</p>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Your name" {...register("name", { required: true })}/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Your email"  {...register("email", { required: true })}/>
                  </div>
                  <div className="form-group">
                  <label className="form-label" htmlFor="arrivalDate">Arrival Date</label>
                    <input type="date" id="arrivalDate" className="form-control" placeholder="Arrival Date"  {...register("arrivalDate")}  />
                  </div>
                  <div className="form-group">
                  <label className="form-label" htmlFor="departureDate">Departure Date</label>
                    <input type="date" id="departureDate" className="form-control" placeholder="Departure Date"  {...register("departureDate")}  />
                  </div>
                  <div className="form-group">
              <input type="number" id="travelers" className="form-control" placeholder="Number of Travelers" min={1} max={30} {...register("travelers")}/>
            </div>
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Hidden"  {...register("subject")} value="Main Contact Form" hidden/>
                  </div>
                  <div className="form-group">
                    <textarea  id="" cols={30} rows={7} className="form-control" placeholder="Message" {...register("message", { required: true })}></textarea>
                  </div>
                  <div className="form-group">
                  {isError == false && <div style={{color:"green"}}><b>Thank you!</b><p><em>Your message has been successfully sent. Our team will get back to you shortly with more information about your requested tour.</em></p></div>}
            {isError == true && <div style={{color:"red"}}><b>Oops!</b><p><em> It looks like there was an error with your inquiry form submission. Please check your information and try again. If you continue to experience issues, please <a href="mailto:info@escortedmoroccotours.com">Contact</a> our team directly.</em></p></div>}
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Send Message" className="btn btn-primary py-3 px-5" />
                  </div>
                </form>
    </div>
      <div className="col-md-6">
       <div  id="map"  className="bg-white">
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108703.09881241457!2d-8.007853099999998!3d31.634621449999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh!5e0!3m2!1sen!2sma!4v1676569225739!5m2!1sen!2sma"  style={{border:0 , width:"100%", height:"100%"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
       </div>
     </div>
   </div>
 </div>
</section>
    </>
    
  )
}



export default contact;

