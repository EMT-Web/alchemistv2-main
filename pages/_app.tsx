import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
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
          <meta name="google-site-verification" content="UqKbxaFJdehuxB7HdYDPdzrYlY7sP1l-80rAxNDmzic" />
 {/* Global Site Tag (gtag.js) - Google Analytics */}

            </Head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-2934P3WFS5"/>
 <Script>
  {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `}

            </Script>
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
            <Footer/>
            <CookieBanner />
            
            {/* <div id="ftco-loader" className="show fullscreen"><svg className="circular" width="48px" height="48px"><circle className="path-bg" cx="24" cy="24" r="22" fill="none" strokeWidth="4" stroke="#eeeeee"/><circle className="path" cx="24" cy="24" r="22" fill="none" strokeWidth="4" strokeMiterlimit="10" stroke="#F96D00"/></svg></div> */}
            
            <Script src="/js/jquery.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/jquery-migrate-3.0.1.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/popper.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/bootstrap.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/jquery.easing.1.3.js" strategy="beforeInteractive" defer/>
            <Script src="/js/jquery.waypoints.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/jquery.stellar.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/owl.carousel.min.js" strategy="beforeInteractive"  defer/>
            <Script src="/js/jquery.magnific-popup.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/jquery.animateNumber.min.js" strategy="beforeInteractive" defer/>
            <Script src="/js/bootstrap-datepicker.js" strategy="beforeInteractive" defer/>
            <Script src="/js/scrollax.min.js" strategy="beforeInteractive" defer/>
            {/* <Script src="./https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false"/> */}
      
            <Script src="/js/main.js" />
            

          </>
);

}

export default MyApp;
