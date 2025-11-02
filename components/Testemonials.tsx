import React from 'react'
import Image from 'next/image'
import { urlFor } from '../sanity'
import TripAdvisorWidget from './TripAdvisorWidget'

function Testemonials() {
  return (
    <>
    {/* Featured Testimonials Section */}
    <section className="ftco-section testimony-section bg-bottom" style={{backgroundImage: `url(/images/hero-bgs/testemo.jpg)`}}>
    {/* Background image handled via inline style to prevent hydration issues */}
    <div className="overlay"></div>
    <div className="container">
        <div className="row justify-content-center pb-4">
            <div className="col-md-7 text-center heading-section heading-section-white ftco-animate">
                <span className="subheading">Testimonials</span>
                <h4 className="mb-4">Words from Our Clients about our Guided Tours in Morocco</h4>
            </div>
        </div>
        <div className="row ftco-animate">
            <div className="col-md-12">
                <div className="carousel-testimonials owl-carousel">
                <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r886097614-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                <p className="mb-4">If I could give this tour MORE than 5 stars I would! My friend and I did the 6 days Special Morocco Tour with Elmustapha Oufouta and we couldn't have asked for a better guide! ... </p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r886097614-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://dynamic-media-cdn.tripadvisor.com/media/photo-f/01/2e/70/9e/avatar069.jpg?w=100&h=-1&s=1" alt="Mira I."  layout='fill' objectFit="cover" blurDataURL="https://dynamic-media-cdn.tripadvisor.com/media/photo-f/01/2e/70/9e/avatar069.jpg?w=100&h=-1&s=1" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">Mira I.</p>
                                        <span className="position">April 13, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r883116835-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                <p className="mb-4">It was a wonderful experience for us. All your arrangements were up to the mark. All Riads and transportation arrangements were excellent...</p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r883116835-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/57/36/5f/navigate41658583432.jpg?w=100&h=-1&s=1" alt="Varun R"  layout='fill' objectFit="cover" blurDataURL="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/57/36/5f/navigate41658583432.jpg?w=100&h=-1&s=1" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">Rajesh</p>
                                        <span className="position">March 22, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r882221664-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                <p className="mb-4">If we could give this trip more than 5 stars we would. Mustafa made fabulous choices about where we should visit and the Riads he chose were stunning...</p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r882221664-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/03/99/d2/steve-o.jpg?w=100&h=-1&s=1" alt="SteveOratowski"  layout='fill' objectFit="cover" blurDataURL="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/03/99/d2/steve-o.jpg?w=100&h=-1&s=1" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">SteveOratowski</p>
                                        <span className="position">March 14, 2023</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                <p className="mb-4">We did the 6 day tour of Morocco with Anouar and it was just the most magical experience. We went through different landscapes of this beautiful country...</p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d19099808-r876343943-6_days_Special_Morocco_Tour-Casablanca_Casablanca_Settat.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/e6/ea/default-avatar-2020-54.jpg" alt="Varun R"  layout='fill' objectFit="cover" blurDataURL="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/e6/ea/default-avatar-2020-54.jpg" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">Varun R</p>
                                        <span className="position">January 25</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                <p className="mb-4">Since the first contact requesting a quote, Mustapha was very attentive and detail-oriented in his responses. The trip was Fabulous!!! Beautiful places, excellent riads, ...</p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293734-d18834117-r864165759-7_Days_Morocco_tour_from_Marrakech-Marrakech_Marrakech_Safi.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/f0/9f/default-avatar-2020-16.jpg" alt="Adventure228395"  layout='fill' objectFit="cover" blurDataURL="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/f0/9f/default-avatar-2020-16.jpg" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">Adventure228395</p>
                                        <span className="position">October 11, 2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                <p className="mb-4">O melhor guia! Querido, atencioso, divertidos,  deu diversas dicas, levou nos melhores lugares! Nos ajudou em todos os momentos! Os lugares do passeio todos incríveis... </p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r863071044-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/f3/e4/default-avatar-2020-30.jpg" alt="Renata"  layout='fill' objectFit="cover" blurDataURL="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/f3/e4/default-avatar-2020-30.jpg" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">Renata</p>
                                        <span className="position">October 3, 2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                
                                <p className="mb-4">Mustafa exceeded ALL expectations. He was referred to me by a friend in the US (I also live in the US), who had taken a similar trip from Marrakech to Merzouga to experience ...</p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r857193118-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/e9/bb/default-avatar-2020-65.jpg?w=100&h=-1&s=1" alt="Wander226959"  layout='fill' objectFit="cover" blurDataURL="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/e9/bb/default-avatar-2020-65.jpg?w=100&h=-1&s=1" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">Wander226959</p>
                                        <span className="position">Aug, 2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimony-wrap py-4">
                            <div className="text">
                            <span><a href="https://www.tripadvisor.com/Attraction_Review-g293732-d18453425-Reviews-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}><span className="fa fa-tripadvisor mr-2"/></a>TripAdvisor User</span>
                                <p className="star">
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                    <span className="fa fa-star"></span>
                                </p>
                                <p className="mb-4">We travelled in November 2021 with Mustafa. He took care of everything and made the trip an incredible experience. I highly recommend him to everyone whether you want to do the same itinerary ...</p>
                                <a href="https://www.tripadvisor.com/ShowUserReviews-g293732-d18453425-r819298380-Escorted_Morocco_Tours-Casablanca_Casablanca_Settat.html" target={"_blank"}> Read review</a>
                                <div className="d-flex align-items-center">
                                    <div className="user-img" >
                                    <Image className="user-img" suppressHydrationWarning src="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/df/99/default-avatar-2020-40.jpg" alt="Elena G"  layout='fill' objectFit="cover" blurDataURL="https://media-cdn.tripadvisor.com/media/photo-o/1a/f6/df/99/default-avatar-2020-40.jpg" placeholder="blur" loading="lazy"/>
                                    </div>
                                    <div className="pl-3">
                                        <p className="name">Elena G</p>
                                        <span className="position">Nov, 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

{/* TripAdvisor Call-to-Action */}
<section className="ftco-section bg-light" style={{paddingTop: '2rem', paddingBottom: '3rem'}}>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                {/* Beautiful TripAdvisor CTA */}
                <TripAdvisorWidget />
            </div>
        </div>
    </div>
</section>
</>
  )
}

export default Testemonials