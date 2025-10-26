import React from 'react'
import {  useRouter } from 'next/router';
import Image from 'next/image'


function PageHero({title, tag, img, p}:any) {
  const router = useRouter()

  return (
    <section className="hero-wrap js-fullheight" >
      <style>
{`
  .hero__desktop-image {
    display: none !important;
  }
  @media(orientation: landscape) {
    .hero__desktop-image {
      display: block !important;
    }
    .hero__mobile-image {
      display: none !important;
    }
  }
`}
</style>
<Image src="/images/mobile-alt-hero.jpg" className="hero__mobile-image" layout='fill' alt="Escorted Morocco Tours"  objectFit="cover" blurDataURL="/images/hero-bgs/mobile-alt-hero.jpg" placeholder="blur" priority/>
<Image src={img} className="hero__desktop-image" layout='fill' alt="Escorted Morocco Tours"  objectFit="cover" blurDataURL={img} placeholder="blur" priority/>

    <div className="container">
      <div className="row no-gutters slider-text js-fullheight align-items-center" data-scrollax-parent="true">
        <div className="col-md-7 ftco-animate">
          <span className="subheading">{tag}</span>
          <h1 className="mb-4">{title}</h1>
          <p className="caps">{p}</p>
        </div>
        { router.asPath === '/' &&
        <a href="https://www.youtube.com/watch?v=boiiiVh52v4" aria-label="video player" className="icon-video popup-vimeo d-flex align-items-center justify-content-center mb-4">
          <span className="fa fa-play"></span>
        </a>}
      </div>
    </div>
  </section>
  )
}

export default PageHero