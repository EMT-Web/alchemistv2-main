import Head from 'next/head'
import { useRouter } from 'next/router'

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
  const fullTitle = `${title} | Escorted Morocco Tours`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
    "image": tour.coverImage ? `https://cdn.sanity.io${tour.coverImage}` : `${siteUrl}/images/escorted-morocco-tours.png`,
    "url": `${siteUrl}/tours/${tour.slug?.current}`,
    "provider": {
      "@type": "TravelAgency",
      "name": "Escorted Morocco Tours",
      "url": siteUrl
    },
    "touristType": "International Travelers",
    "itinerary": tour.itinerary ? {
      "@type": "ItemList",
      "numberOfItems": tour.itinerary.length,
      "itemListElement": tour.itinerary.map((day: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": day.title || `Day ${index + 1}`
      }))
    } : undefined,
    "duration": tour.duration ? `P${tour.duration}D` : undefined,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "url": `${siteUrl}/tours/${tour.slug?.current}`,
      "validFrom": new Date().toISOString()
    }
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
    "image": post.mainImage ? `https://cdn.sanity.io${post.mainImage}` : `${siteUrl}/images/escorted-morocco-tours.png`,
    "datePublished": post._createdAt || post.publishedAt,
    "dateModified": post._updatedAt || post._createdAt,
    "author": {
      "@type": "Person",
      "name": author || "Escorted Morocco Tours"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Escorted Morocco Tours",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/images/escorted-morocco-tours.png`
      }
    },
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

// Utility function to create review/rating schema
export function createAggregateRatingSchema(rating: number, reviewCount: number, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

