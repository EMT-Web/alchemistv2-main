import React, { useState, useEffect } from 'react'
import {  useRouter } from 'next/router';
import Image from 'next/image'


function PageHero({title, tag, img, p}:any) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="hero-wrap js-fullheight" suppressHydrationWarning>
      <style jsx>{`
        .hero-wrap {
          width: 100%;
          min-height: 600px;
          position: relative;
        }
      `}</style>
      <div style={{ position: 'absolute', width: '100%', height: '100%', minHeight: '600px', left: 0, top: 0 }}>
        <Image 
          src={img} 
          alt="Escorted Morocco Tours" 
          layout="fill" 
          objectFit="cover" 
          priority 
          quality={85}
          sizes="100vw"
        />
      </div>

    <div className="container">
      <div className="row no-gutters slider-text js-fullheight align-items-center" data-scrollax-parent="true">
        <div className="col-md-7 ftco-animate">
          <span className="subheading">{tag}</span>
          <h1 className="mb-4">{title}</h1>
          <p className="caps">{p}</p>
        </div>
        { mounted && router.asPath === '/' &&
        <a href="https://www.youtube.com/watch?v=boiiiVh52v4" aria-label="video player" className="icon-video popup-vimeo d-flex align-items-center justify-content-center mb-4">
          <span className="fa fa-play"></span>
        </a>}
      </div>
    </div>
  </section>
  )
}

export default PageHero