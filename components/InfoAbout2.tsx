import React from 'react'
import { sanityClient, urlFor } from '../sanity';
import {PortableText} from '@portabletext/react';
import imageUrlBuilder from "@sanity/image-url";
import Image from 'next/image'

function InfoAbout2({team, missionvision}:any) {
  
  // Return null if data is missing
  if (!missionvision || !missionvision.coverimage || !missionvision.mainimage) {
    return null;
  }

  const serializers = {
    block: {
      p: ({ children }:any) => <h1 className="subheading">{children}</h1>
      }
    }
 
 return (
    <>
 <section className="ftco-section ftco-about img">
 <Image src={urlFor(missionvision.coverimage).url()} alt={missionvision.title} layout='fill' objectFit="cover" blurDataURL={urlFor(missionvision.coverimage).url()} placeholder="blur"/>
 <div className="overlay"></div>
 <div className="container py-md-5">
  <div className="row py-md-5">
   <div className="col-md d-flex align-items-center justify-content-center">
    <a href="https://www.youtube.com/watch?v=boiiiVh52v4" className="icon-video popup-vimeo d-flex align-items-center justify-content-center mb-4">
     <span className="fa fa-play"></span>
   </a>
 </div>
</div>
</div>
</section>

<section className="ftco-section ftco-about ftco-no-pt img">
 <div className="container">
  <div className="row d-flex">
   <div className="col-md-12 about-intro">
    <div className="row">
     <div className="col-md-6 d-flex align-items-stretch">
      <div className="img d-flex w-100 align-items-center justify-content-center" style={{position: "relative", minHeight: "450px", backgroundColor: "#f8f9fa"}}>
      <Image  src={urlFor(missionvision.mainimage).url()} alt={missionvision.title || "Our Mission"} layout='fill' objectFit="contain" style={{objectPosition: "center"}} blurDataURL={urlFor(missionvision.mainimage).url()}  placeholder="blur"/>
      </div>
    </div>
    <div className="col-md-6 pl-md-5 py-5">
      <div className="row justify-content-start pb-3">
        <div className="col-md-12 heading-section ftco-animate">
         <span className="subheading">{missionvision.visiontag}</span>
        <p>{missionvision.visiontext}</p>
        <span className="subheading">{missionvision.missiontag}</span>
        <p>{missionvision.missiontext}</p>
       </div>
     </div>
   </div>
 </div>
</div>
</div>
</div>
</section>

{team! && team.map((mem:any, index:any)=>
index % 2 === 0 ?
      <section key={index} className="ftco-section ftco-about  img" >
 <div className="container">
  <div className="row d-flex" style={{border : "3px solid #dcab0f"}}>
   <div className="col-md-12 about-intro" >
    <div className="row">
    <div className="col-md-6 pl-md-5 py-5">
      <div className="row justify-content-end pb-3">
        <div className="col-md-12 heading-section ">
         <span className="subheading">{mem.role}</span>
         <h2 className="mb-4">{mem.title}</h2>
         <p>{mem.paragraph}</p>
       </div>
     </div>
   </div>
   <div className="col-md-6 d-flex align-items-stretch">
      <div className="img d-flex w-100 align-items-center justify-content-center" style={{position: "relative", minHeight: "450px", backgroundColor: "#f8f9fa"}}>
      <Image  src={urlFor(mem.mainimage).url()} alt={mem.title || "Tour Guide"} layout='fill' objectFit="contain" style={{objectPosition: "center"}} blurDataURL={urlFor(mem.mainimage).url()} placeholder="blur"/>
      </div>
    </div>
 </div>
</div>
</div>
</div>
</section>
:
    <section key={index} className="ftco-section ftco-about  img">
 <div className="container">
  <div className="row d-flex" style={{border : "3px solid #dcab0f"}}>
  <div className="col-md-12 about-intro">
    <div className="row">
    <div className="col-md-6 d-flex align-items-stretch">
      <div className="img d-flex w-100 align-items-center justify-content-center" style={{position: "relative", minHeight: "450px", backgroundColor: "#f8f9fa"}}>
      <Image  src={urlFor(mem.mainimage).url()} alt={mem.title || "Tour Guide"} layout='fill' objectFit="contain" style={{objectPosition: "center"}} blurDataURL={urlFor(mem.mainimage).url()} placeholder="blur"/>
      </div>
    </div>
    <div className="col-md-6 pl-md-5 py-5">
      <div className="row justify-content-end pb-3">
        <div className="col-md-12 heading-section ">
         <span className="subheading">{mem.role}</span>
         <h2 className="mb-4">{mem.title}</h2>
         <p>{mem.paragraph}</p>
       </div>
     </div>
   </div>
 </div>
</div>
</div>
</div>
</section>

)}

    </>
  )
}

export default InfoAbout2