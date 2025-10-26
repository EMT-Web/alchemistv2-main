import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react'
import PageHero from '../../components/PageHero';
import { sanityClient, urlFor } from '../../sanity';
import Image from 'next/image'
const capitalize = (s:any) => (s && s[0].toUpperCase() + s.slice(1)) || ""

function categoryBlog({posts, category}:any) {
 
  return (
   <>
     <Head>
           <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
           <meta name="description" content={category.seodescription}></meta>
           <meta name="keywords" content={category.seokeywords}></meta>
           <title>{category.seotitle}</title>
           <meta property='og:image' content={urlFor(category.mainImage).url()!} />
<meta property='og:title' content={category.seotitle} />
<meta property='og:description' content={category.heroparagraph} />

    </Head>
    
    <PageHero title={category.title} tag="Category:" p={category.seodescription} img={urlFor(category.mainImage).url()!}/>
     
<section className="ftco-section">
   <div className="container">
    <div className="row">
{
  posts.map((post:any) => <div className="col-md-4 d-flex ftco-animate">
  <div className="blog-entry justify-content-end">
   <a href={`/blog/${post.slug.current}`} className="block-20" style={{backgroundImage: `url(${urlFor(post.mainImage).url()!})`}}>
   <Image src={urlFor(post.mainImage).url()!}  alt={post.title} layout='fill' objectFit="cover" blurDataURL={urlFor(post.mainImage).url()!}  placeholder="blur"/>
   </a>
   <div className="text">
    <div className="d-flex align-items-center mb-4 topp">
     <div className="one">
      <span className="day">{new Date(post._createdAt).getDay()}</span>
    </div>
    <div className="two">
      <span className="yr">{new Date(post._createdAt).toLocaleString('default', { month: 'long' })}</span>
      <span className="mos">{new Date(post._createdAt).getFullYear()}</span>
    </div>
  </div>
  <h3 className="heading"><a href={`/blog/${post.slug.current}`}>{post.title}</a></h3>
  <p style={{ overflow: "hidden",
   textOverflow: "ellipsis",
   display: "-webkit-box",
   wordWrap: "break-word",
  maxHeight: "4.6em",
  lineHeight: "1.5em"}}>{post.seodescription}...</p>
  <p><a href={`/blog/${post.slug.current}`} className="btn btn-primary">Read more</a></p>
</div>
</div>
</div>)
}

</div>
{/* <div className="row mt-5">
  <div className="col text-center">
    <div className="block-27">
      <ul>
        <li><a href="#">&lt;</a></li>
        <li className="active"><span>1</span></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">&gt;</a></li>
    </ul>
</div>
</div>
</div> */}
</div>
</section>
   </>
  )
}




export async function getStaticPaths() {
    const query =`*[_type == "categoryblog"]{
      slug,
      title,
    }`
      const categories = await sanityClient.fetch(query);
   
      // const paths = categories.map((category : Category) => ({
      //   params: { category: category.slug },
      // }))
      
   
      const paths = Object.keys(categories).map((key) => {
        const category = categories[key]
        // console.log(category)
        return {
          params: {slug: category.slug.current}
        }
      })
      
    return {
      paths,
      fallback: false // false or 'blocking'
    };
  }
  
  export const getStaticProps: GetStaticProps = async ({params}) => {
    
    const query = `
    *[_type == 'post' && $slug in categories[]->slug.current ]{
        _id,
        _createdAt,
        seodescription,
        title,
        slug,
        "categories": categories[]->{
            slug,
            city
          },
        'category': *[_type == "categoryblog" && slug.current == $slug ]{
            slug,
            seotitle,
            seodescription,
            seokeywords,
            title,
            mainImage
          },
        mainImage,
      }
    `

    const posts = await sanityClient.fetch(query, {
        slug: params?.slug,
    })
    // const posts = await sanityClient.fetch(query)
  
   
    if(!posts){
        return {
            notFound: true
        }
    }
    return {
        props: {
          posts,
          category: posts[0]?.category[0] || null,
        },
        revalidate: 60,
    }
  }
export default categoryBlog