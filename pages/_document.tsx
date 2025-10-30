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
          <link rel="preconnect" href="https://cdn.sanity.io" />
          
          {/* DNS Prefetch */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          
          {/* Theme color */}
          <meta name="theme-color" content="#f15d30" />
          
          {/* Fonts */}
          <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" />
          
          {/* CSS */}
          <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
          <link rel="stylesheet" href="/css/animate.css" />
          <link rel="stylesheet" href="/css/owl.carousel.min.css" />
          <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
          <link rel="stylesheet" href="/css/magnific-popup.css" />
          <link rel="stylesheet" href="/css/aos.css" />
          <link rel="stylesheet" href="/css/ionicons.min.css" />
          <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
          <link rel="stylesheet" href="/css/jquery.timepicker.css" />
          <link rel="stylesheet" href="/css/flaticon.css" />
          <link rel="stylesheet" href="/css/icomoon.css" />
          <link rel="stylesheet" href="/css/style.css" />
          
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
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "Morocco",
                  "addressRegion": "Marrakech-Safi"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+212-669-883-759",
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

