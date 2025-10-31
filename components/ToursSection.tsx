 import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import Pagination from './Pagination';
import Image from 'next/image'

 function ToursSection({tours}:any) {
    const [ postNum, setPostNum] = useState(3); // Default number of posts dislplayed

    function handleClick() {
      setPostNum(prevPostNum => prevPostNum + 3) // 3 is the number of posts you want to load per click
    }
    // const [ postNum, setPostNum] = useState(3); // Default number of posts dislplayed
    // const [ toursArr, setToursArr] = useState(tours); 

    // function handleClick() {
    //   setToursArr(tours.slice(0, postNum))  
    //   setPostNum(prevPostNum => prevPostNum + 3) // 3 is the number of posts you want to load per click
    // }
    const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)
  
  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

    const router = useRouter();
   return (
    <section className="ftco-section" id="toursection">
    <div className="container">
        <div className="row justify-content-center">
        <div className="col-md-12 heading-section text-center ftco-animate">
                <span className="subheading">Make the Most of Your Time in Morocco with a Well-Planned packages</span>
                <h2>Morocco Immersion Tours</h2>
                <p className="mb-4">Whether you're looking for a private tour or a group excursion, our experienced guides can tailor your itinerary to your liking</p>
                {tours.length === 0 && <div><p>Nothing Found</p><p className="mb-0"><a href="/tours" className="btn btn-primary px-4 py-3">Browes All tours</a></p></div>}
            </div>
        </div>
       
        <div className="row">
                {tours.map((tour:any, index:any)=> <div key={index} className="col-md-4 ftco-animate">
                <div className="project-wrap">
                    <a href={`/tours/${tour.slug.current}`} className="img" style={{ position: 'relative', display: 'block', minHeight: '250px' }}>
                    <Image src={urlFor(tour.mainImage).url()!}  alt={tour.title} layout="fill" objectFit="cover" blurDataURL={rgbDataURL(237, 181, 6)} placeholder="blur" loading="lazy"/>
                        <span className="price">{tour.duration} Days Tour</span>
                    </a>
                    <div className="text p-4">
                        <span>Starts From </span><span className="days">{tour.destinations! && tour.destinations[0].city}</span>
                        <h3 className='my-2'><a href={`/tours/${tour.slug.current}`}>{tour.title}</a></h3>
                        <p className="location my-3"><span className="fa fa-map-marker mr-2"> via</span>{tour.destinations! && tour.destinations.slice(1).map((d:any, index:any)=>  <a key={index} href={`/destinations/${d.slug.current}`} target="_blank">{d.city}, </a>)}...</p>
                        <hr />
                        <ul>
                            {tour.amenities! && tour.amenities.map((a:any, index:any) =>
                             <li key={index}><div style={{display:"flex",  alignItems: "center"}}>&#10029; <em style={{display:"inline"}}>{a.title}</em></div></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>)
            }
            
        </div>
        {/* <div className="row"><div className="col text-center"><button onClick={handleClick}>Load More</button></div></div> */}
    </div>
</section>
   )
 }
 
 export default ToursSection