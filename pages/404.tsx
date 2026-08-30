import Head from 'next/head'
import React from 'react'
import Image from 'next/image';

function notFound() {
  return (
    <>
    <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <title>404 - Page Not Found</title>
           <meta name="robots" content="noindex, nofollow" />
    </Head>
    <section className="ftco-section" style={{paddingTop: "8rem", color:"white", backgroundColor:"#000"}}>
   <div className="container">
   <div className="col-md-12 heading-section text-center  ftco-animate">
      {/* <span className="subheading">Tours</span> */}
      <h2 className="mb-4 text-white">Ooops!</h2>
      <div><Image src='/images/notfound.gif' alt="Not Found" width={600} height={400} /></div>
      <h6>We looked all over, but we still didn't get there yet! </h6>
      <p>try our <a href="/">Homepage</a> instead</p>
    
  </div>
</div>
  
    </section>

    </>
  )
}

export default notFound