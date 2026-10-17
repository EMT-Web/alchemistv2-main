import Head from 'next/head'
import { useRouter } from 'next/router'
import { urlFor } from '../sanity'

const SITE_URL = 'https://www.escortedmoroccotours.com'
const absImg = (source: any, fallback = `${SITE_URL}/images/escorted-morocco-tours.png`) => {
  const u = urlFor(source).url()
  if (!u) return fallback
  return u.startsWith('http') ? u : `${SITE_URL}${u}`
}

// Items inside an @graph inherit the top level @context, so drop their own copy.
const cleanSchema = (schema: any) =>
  schema && Array.isArray(schema['@graph'])
    ? {
        ...schema,
        '@graph': schema['@graph']
          .filter(Boolean)
          .map(({ ['@context']: _ctx, ...rest }: any) => rest),
      }
    : schema

interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
  type?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  schema?: any
  noindex?: boolean
}

export default function SEO({
  title,
  description,
  keywords,
  image = '/images/escorted-morocco-tours.png',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  schema,
  noindex = false
}: SEOProps) {
  const router = useRouter()
  const siteUrl = 'https://www.escortedmoroccotours.com'
  const canonicalUrl = `${siteUrl}${router.asPath.split('?')[0]}`
  const brand = 'Escorted Morocco Tours'
  // Google truncates <title> around 60-70 chars, so keep the rendered title
  // under MAX_TITLE_LENGTH: drop the brand suffix before trimming any words.
  const MAX_TITLE_LENGTH = 69
  const cleanTitle = (title || '').replace(/\s*\|\s*/g, ' | ').trim()
  const titleWithBrand = cleanTitle.toLowerCase().includes(brand.toLowerCase())
    ? cleanTitle
    : `${cleanTitle} | ${brand}`
  const trimToWord = (value: string, max: number) => {
    if (value.length <= max) return value
    const cut = value.slice(0, max)
    const lastSpace = cut.lastIndexOf(' ')
    return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s|,;:\-–—]+$/, '')
  }
  const fullTitle =
    titleWithBrand.length < MAX_TITLE_LENGTH
      ? titleWithBrand
      : cleanTitle.length < MAX_TITLE_LENGTH
      ? cleanTitle
      : trimToWord(cleanTitle, MAX_TITLE_LENGTH - 1)
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {!noindex && <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Escorted Morocco Tours" />
      <meta property="og:locale" content="en_US" />
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="geo.region" content="MA" />
      <meta name="geo.placename" content="Morocco" />
      
      {/* Structured Data / Schema.org */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema(schema)) }}
        />
      )}
    </Head>
  )
}

// Utility function to create breadcrumb schema
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.escortedmoroccotours.com${item.url}`
    }))
  }
}

// Utility function to create tour schema
export function createTourSchema(tour: any) {
  const siteUrl = 'https://www.escortedmoroccotours.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.title,
    "description": tour.seodescription || tour.heroparagraph,
    "image": absImg(tour.coverImage || tour.mainImage),
    "url": `${siteUrl}/tours/${tour.slug?.current}`,
    "provider": { "@id": `${siteUrl}/#organization` },
    "touristType": "International Travelers",
    // One entry per driving day: route, distance in km and miles, driving time.
    "itinerary": Array.isArray(tour.driveTimes) && tour.driveTimes.some((d: any) => d && d.km) ? {
      "@type": "ItemList",
      "name": "Driving times by day",
      "itemListElement": tour.driveTimes
        .map((d: any, i: number) => d && d.km ? {
          "@type": "ListItem",
          "position": i + 1,
          "item": {
            "@type": "TouristTrip",
            "name": d.label ? `Day ${i + 1}: ${d.label}` : `Day ${i + 1}: ${d.from} to ${d.to}`,
            "description": `${d.label || `${d.from} to ${d.to}${d.via ? ` via ${d.via}` : ''}`}: about ${d.km} km (${Math.round(d.km * 0.621371)} miles), approx. ${Math.floor(d.minutes / 60) ? `${Math.floor(d.minutes / 60)} h ` : ''}${d.minutes % 60 ? `${d.minutes % 60} min ` : ''}${d.mode ? `${d.mode} ` : ''}driving`,
            ...(d.from && d.to && !d.mode ? { "itinerary": [{ "@type": "Place", "name": d.from }, { "@type": "Place", "name": d.to }] } : {})
          }
        } : null)
        .filter(Boolean)
    } : undefined,
    "duration": tour.duration ? `P${tour.duration}D` : undefined,
    // An Offer is only valid with a price, so tours without one carry none.
    "offers": tour.priceFrom ? {
      "@type": "Offer",
      "price": Number(tour.priceFrom),
      "priceCurrency": tour.priceCurrency || "USD",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/tours/${tour.slug?.current}`,
      "description": "Starting price per person, based on 2 travellers sharing a double room"
    } : undefined
  }
}

// Utility function to create blog article schema
export function createArticleSchema(post: any, author?: string) {
  const siteUrl = 'https://www.escortedmoroccotours.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seodescription || post.title,
    "image": absImg(post.mainImage || post.localImage),
    "datePublished": post._createdAt || post.publishedAt,
    "dateModified": post._updatedAt || post._createdAt,
    "author": {
      "@type": "Person",
      "name": author || "Escorted Morocco Tours"
    },
    "publisher": { "@id": `${siteUrl}/#organization` },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug?.current}`
    }
  }
}

// Utility function to create FAQ schema
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
