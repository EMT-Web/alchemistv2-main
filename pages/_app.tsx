import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieBanner from '../components/CookieBanner';


function MyApp({ Component, pageProps }: AppProps) {

  return (
          <>
           <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content="Escorted Morocco Tours, Expert guided Morocco tours and Packages to get the best out of your vacation in Morocco."/>
           <meta httpEquiv="Content-Type" content="text/html" charSet='UTF-8'/>
           <title>Escorted Morocco Tours | Visit Morocco</title>
          <link rel="shortcut icon" href="/images/fav.png" />
          <meta name="msvalidate.01" content='B88182ACF6FC3B1F2CA0B9FF61CCB8B3'/>
 {/* Global Site Tag (gtag.js) - Google Analytics */}

            </Head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ENWG2RLTV7"/>
<Script id="google-analytics" strategy="afterInteractive"> 
            { ` window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-ENWG2RLTV7');`
            }
              </Script>
            <Nav />
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
            <Footer/>
            <CookieBanner />
            
            {/* <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div> */}
            
            {/* <Script src="./https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"/> */}

            {/* jQuery + all jQuery-plugin dependents (bootstrap, owl-carousel, magnific-popup,
                bootstrap-datepicker, scrollax, etc.) concatenated into one file in their exact
                original load order, ending with main.js which depends on all of them - this
                guarantees correct execution order as a single script instead of 13 separate
                beforeInteractive tags, which were previously fetched at elevated priority and
                competing directly with the page's actual LCP content for bandwidth. */}
            <Script src="/js/vendor-bundle.js" strategy="afterInteractive" />
            

          </>
);

}

export default MyApp;
