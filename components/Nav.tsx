import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { useTranslations } from 'next-intl';
import Image from 'next/image'
function Nav() {
   let router = useRouter()
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar" >
		<div className="container">
			{/* <a href='/' className="navbar-brand"  style={{display:"inline"}}>Escorted<span>Morocco Tours</span></a> */}
      <a href='/' className="navbar-brand"  style={{display:"inline"}}><Image src='/images/logo-white-01.png' alt="Escorted Morocco Tours" width={108} height={61} priority/></a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="oi oi-menu"/> Menu
			</button>
			<div className="collapse navbar-collapse" id="ftco-nav">
				<ul className="navbar-nav ml-auto">
               <li className={`nav-item ${router.asPath === '/' ? "active" : '' }`}>
                  <a href="/" className="nav-link">Home</a>
               </li>
               <li className="nav-item dropdown position-static">
        <a className="nav-link dropdown-toggle" href="/tours" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Tours
        </a>
        <div className="dropdown-menu mega-menu p-2" aria-labelledby="navbarDropdownMenuLink">
          <div className="row">
            <div className="col-sm-6">
              <h6 className="dropdown-header">Starts from</h6>
              <a className="dropdown-item" href="/category/tours-from-marrakesh">Marrakesh</a>
              <a className="dropdown-item" href="/category/tours-from-fez">Fez</a>
              <a className="dropdown-item" href="/category/tours-from-casablanca">Casablanca</a>
              <a className="dropdown-item" href="/category/tours-from-tangier">Tangier</a>
            </div>
            <div className="col-sm-6">
              <h6 className="dropdown-header">Duration</h6>
              <a className="dropdown-item" href="/category/1-3-day-tours">1-3 Day Tours</a>
              <a className="dropdown-item" href="/category/3-7-day-tours">3-7 Day Tours</a>
              <a className="dropdown-item" href="/category/1-2-week-tours">1-2 Weeks</a>
              <a className="dropdown-item" href="/tours">All Tours</a>
            </div>
          </div>
        </div>
      </li>
      <li className="nav-item dropdown position-static">
        <a className="nav-link dropdown-toggle" href="/tours" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Destinations
        </a>
        <div className="dropdown-menu mega-menu p-2" aria-labelledby="navbarDropdownMenuLink2">
          <div className="row">
            <div className="col-sm-6">
              <a className="dropdown-item" href="/destinations/marrakesh-the-red-city-of-morocco">Marrakesh</a>
              <a className="dropdown-item" href="/destinations/fes-fez-imperial-city-in-morocco">Fes</a>
              <a className="dropdown-item" href="/destinations/casablanca-casa-city-morocco">Casablanca</a>
              <a className="dropdown-item" href="/destinations/rabat-the-capital-city-of-morocco">Rabat</a>
            </div>
            <div className="col-sm-6">
              <a className="dropdown-item" href="/destinations/ouarzazate-the-cinema-city-of-morocco">Ouarzazate</a>
              <a className="dropdown-item" href="/destinations/chefchaouen-the-blue-pearl-city-of-morocco">Chefchaouen</a>
              <a className="dropdown-item" href="/destinations/essaouira-the-windy-coastal-city-of-morocco">Essaouira</a>
              <a className="dropdown-item" href="/destinations">All Destinations</a>
            </div>
          </div>
        </div>
      </li>
             
					<li className={`nav-item ${router.asPath === '/about' ? "active" : '' }`}>
                  <a href="/about" className="nav-link">About Us</a>
               </li>
               <li className={`nav-item ${router.asPath === '/blog' ? "active" : '' }`}>
                  <a href="/blog" className="nav-link">Blog</a>
               </li>
               <li className={`nav-item ${router.asPath === '/contact' ? "active" : '' }`}>
                  <a href="/contact" className="nav-link">Contact Us</a>
               </li>
				</ul>
			</div>
		</div>
	</nav>
  )
}

export default Nav