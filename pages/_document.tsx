import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Charset and IE compatibility */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          
          {/* Favicon */}
          <link rel="icon" href="/images/fav.png" />
          <link rel="shortcut icon" href="/images/fav.png" />
          <link rel="apple-touch-icon" href="/images/fav.png" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          
          {/* DNS Prefetch */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          
          {/* Theme color */}
          <meta name="theme-color" content="#f15d30" />
          
          {/* Fonts */}
          <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap" rel="stylesheet" />
          
          {/* Critical CSS - blocking (needed for above-the-fold layout). Minified with
              clean-css level:1 (whitespace/comments only, zero rule changes - verified
              2542 rule blocks in, 2542 out) to cut parse/transfer weight safely. */}
          <link rel="stylesheet" href="/css/style.min.css" />
          <link rel="stylesheet" href="/css/perf-fix.css" />

          {/* Component-specific library CSS (icon fonts, carousel, popup, scroll animations,
              booking-form date/time pickers) - deferred via preload, swapped to a real
              stylesheet by the inline script below once loaded, so they don't block first
              paint. Each has a <noscript> fallback for JS-disabled clients. */}
          {[
            '/css/animate.css',
            '/css/owl.carousel.min.css',
            '/css/owl.theme.default.min.css',
            '/css/magnific-popup.css',
            '/css/bootstrap-datepicker.css',
            '/css/jquery.timepicker.css',
            '/css/flaticon.css',
          ].map((href) => (
            <link key={href} rel="preload" href={href} as="style" />
          ))}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var l=document.querySelectorAll('link[rel="preload"][as="style"]');for(var i=0;i<l.length;i++){l[i].addEventListener('load',function(){this.rel='stylesheet';});}})();`,
            }}
          />
          <noscript>
            <link rel="stylesheet" href="/css/animate.css" />
            <link rel="stylesheet" href="/css/owl.carousel.min.css" />
            <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
            <link rel="stylesheet" href="/css/magnific-popup.css" />
            <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
            <link rel="stylesheet" href="/css/jquery.timepicker.css" />
            <link rel="stylesheet" href="/css/flaticon.css" />
          </noscript>
          
          {/* Organization Schema - Global */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TravelAgency",
                "name": "Escorted Morocco Tours",
                "url": "https://www.escortedmoroccotours.com",
                "logo": "https://www.escortedmoroccotours.com/images/escorted-morocco-tours.png",
                "image": "https://www.escortedmoroccotours.com/images/escorted-morocco-tours.png",
                "description": "Expert guided Morocco tours and packages to get the best out of your vacation in Morocco. Best Morocco immersion tours and travel guides.",
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
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+212623668013",
                  "contactType": "Customer Service",
                  "email": "info@escortedmoroccotours.com",
                  "availableLanguage": ["English", "French", "Arabic", "Spanish"]
                },
                "sameAs": [
                  "https://www.tripadvisor.com/Attraction_Review-g293734-d26650886-Reviews-Escorted_Morocco_Tours-Marrakech_Marrakech_Safi.html"
                ],
                "priceRange": "$$",
                "areaServed": {
                  "@type": "Country",
                  "name": "Morocco"
                },
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Morocco Tour Packages",
                  "itemListElement": [
                    {
                      "@type": "OfferCatalog",
                      "name": "Desert Tours",
                      "itemListElement": []
                    },
                    {
                      "@type": "OfferCatalog",
                      "name": "City Tours",
                      "itemListElement": []
                    },
                    {
                      "@type": "OfferCatalog",
                      "name": "Cultural Tours",
                      "itemListElement": []
                    }
                  ]
                }
              })
            }}
          />
          
          {/* Website Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Escorted Morocco Tours",
                "url": "https://www.escortedmoroccotours.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.escortedmoroccotours.com/blog-search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

