import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import CookieBanner from '../components/CookieBanner';
import ScriptLoader from '../components/ScriptLoader';


function MyApp({ Component, pageProps }: AppProps) {

  return (
          <>
           <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content="Expert guided Morocco tours with experienced guides. Customizable packages for cultural immersion, adventure, and luxury experiences across Morocco."/>
           <meta httpEquiv="Content-Type" content="text/html" charSet='UTF-8'/>
           <title>Escorted Morocco Tours | Guided Tours & Cultural Immersion</title>
          <link rel="shortcut icon" href="/images/fav.png" />
           <meta name="msvalidate.01" content='B88182ACF6FC3B1F2CA0B9FF61CCB8B3'/>
           <meta name="google-site-verification" content="UqKbxaFJdehuxB7HdYDPdzrYlY7sP1l-80rAxNDmzic" />
           

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
            
            {/* Scripts loaded sequentially via ScriptLoader component */}
            <ScriptLoader />
            

          </>
);

}

export default MyApp;
