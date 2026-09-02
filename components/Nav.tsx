import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const TOURS_MENU = {
  'Starts from': [
    ['Marrakesh', '/category/tours-from-marrakesh'],
    ['Fez', '/category/tours-from-fez'],
    ['Casablanca', '/category/tours-from-casablanca'],
    ['Tangier', '/category/tours-from-tangier'],
  ],
  Duration: [
    ['1-3 Day Tours', '/category/1-3-day-tours'],
    ['3-7 Day Tours', '/category/3-7-day-tours'],
    ['1-2 Weeks', '/category/1-2-week-tours'],
    ['All Tours', '/tours'],
  ],
}

const DEST_MENU = {
  'Imperial cities': [
    ['Marrakesh', '/destinations/marrakesh-the-red-city-of-morocco'],
    ['Fes', '/destinations/fes-fez-imperial-city-in-morocco'],
    ['Casablanca', '/destinations/casablanca-casa-city-morocco'],
    ['Rabat', '/destinations/rabat-the-capital-city-of-morocco'],
  ],
  'Desert & coast': [
    ['Ouarzazate', '/destinations/ouarzazate-the-cinema-city-of-morocco'],
    ['Chefchaouen', '/destinations/chefchaouen-the-blue-pearl-city-of-morocco'],
    ['Essaouira', '/destinations/essaouira-the-windy-coastal-city-of-morocco'],
    ['All Destinations', '/destinations'],
  ],
}

type MenuKey = 'tours' | 'destinations'

function MegaMenu({ groups }: { groups: Record<string, string[][]> }) {
  return (
    <div className="mega-menu">
      <div className="mega-menu__inner">
        {Object.entries(groups).map(([heading, links]) => (
          <div className="mega-menu__col" key={heading}>
            <h6 className="mega-menu__header">{heading}</h6>
            {links.map(([label, href]) => (
              <a key={href} href={href} className="mega-menu__item">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Nav() {
  const router = useRouter()
  // mobile-only: which mega-menu is expanded (desktop uses CSS :hover)
  const [openMenu, setOpenMenu] = useState<null | MenuKey>(null)
  const toggle = (m: MenuKey) => setOpenMenu((cur) => (cur === m ? null : m))

  // navbar is fixed + transparent over the hero; turn it solid white once the
  // page has scrolled past the hero's top edge (legacy main.js had this handler
  // but never invoked it). Same pattern as components/ScrollTop.tsx.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (p: string) => (router.asPath === p ? ' active' : '')
  const inSection = (p: string) =>
    router.asPath === p || router.asPath.startsWith(p + '/') ? ' active' : ''

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light${
        scrolled ? ' scrolled' : ''
      }`}
      id="ftco-navbar"
    >
      <div className="container">
        <a href="/" className="navbar-brand" aria-label="Escorted Morocco Tours — home">
          <Image
            src="/images/logo-white-01.png"
            alt="Escorted Morocco Tours"
            width={112}
            height={63}
            priority
            className="nav-logo nav-logo--light"
          />
          <Image
            src="/images/logo-colored-01.png"
            alt="Escorted Morocco Tours"
            width={112}
            height={63}
            priority
            className="nav-logo nav-logo--dark"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars" aria-hidden="true" /> Menu
        </button>
        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <li className={`nav-item${isActive('/')}`}>
              <a href="/" className="nav-link">
                Home
              </a>
            </li>

            <li className={`nav-item has-mega${inSection('/tours')}${openMenu === 'tours' ? ' is-open' : ''}`}>
              <span className="nav-link mega-link">
                <a href="/tours" className="mega-link__label">
                  Tours
                </a>
                <button
                  type="button"
                  className="mega-link__caret"
                  aria-label="Toggle tours menu"
                  aria-expanded={openMenu === 'tours'}
                  onClick={() => toggle('tours')}
                >
                  <span className="fa fa-angle-down" />
                </button>
              </span>
              <MegaMenu groups={TOURS_MENU} />
            </li>

            <li className={`nav-item has-mega${inSection('/destinations')}${openMenu === 'destinations' ? ' is-open' : ''}`}>
              <span className="nav-link mega-link">
                <a href="/destinations" className="mega-link__label">
                  Destinations
                </a>
                <button
                  type="button"
                  className="mega-link__caret"
                  aria-label="Toggle destinations menu"
                  aria-expanded={openMenu === 'destinations'}
                  onClick={() => toggle('destinations')}
                >
                  <span className="fa fa-angle-down" />
                </button>
              </span>
              <MegaMenu groups={DEST_MENU} />
            </li>

            <li className={`nav-item${inSection('/about')}`}>
              <a href="/about" className="nav-link">
                About
              </a>
            </li>
            <li className={`nav-item${inSection('/blog')}`}>
              <a href="/blog" className="nav-link">
                Blog
              </a>
            </li>

            <li className="nav-item nav-cta">
              <a href="/contact" className="nav-cta__btn">
                Plan your trip
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
