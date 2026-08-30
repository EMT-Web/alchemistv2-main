import Image from 'next/image'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share'
import SEO, { createArticleSchema, createBreadcrumbSchema, createFAQSchema } from './SEO'
import type { LocalBlogPost } from '../data/localBlogPosts'

export default function StaticBlogPost({ post }: { post: LocalBlogPost }) {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  const articleSchema = createArticleSchema(
    {
      title: post.title,
      seodescription: post.seodescription,
      mainImage: undefined,
      _createdAt: post.publishedAt,
      _updatedAt: post.publishedAt,
      slug: { current: post.slug },
    },
    'Escorted Morocco Tours'
  )
  // Override the image field with the real absolute CDN URL rather than the
  // relative-Sanity-asset path createArticleSchema expects.
  articleSchema.image = post.image

  const faqSchema = post.faqs.length ? createFAQSchema(post.faqs) : null

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema, articleSchema, ...(faqSchema ? [faqSchema] : [])],
  }

  return (
    <>
      <SEO
        title={post.seotitle || post.title}
        description={post.seodescription}
        keywords={post.seokeywords}
        image={post.image}
        type="article"
        author="Escorted Morocco Tours"
        publishedTime={post.publishedAt}
        modifiedTime={post.publishedAt}
        schema={combinedSchema}
      />
      <section className="hero-wrap hero-wrap-2">
        <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} sizes="100vw" />
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-center">
            <div className="col-md-9 ftco-animate pb-5 text-center">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="fa fa-chevron-right" />
                  </a>
                </span>{' '}
                <span className="mr-2">
                  <a href="/blog/">
                    Blog<i className="fa fa-chevron-right" />
                  </a>
                </span>
              </p>
              <h1 className="mb-0 bread">{post.title}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="ftco-section ftco-no-pt ftco-no-pb">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 ftco-animate py-md-5 mt-md-5">
              <h2 className="mb-3">{post.title}</h2>
              <div className="meta">
                <div>
                  <a href="#">
                    <span className="fa fa-calendar mr-2" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </a>
                </div>
              </div>
              <hr />
              <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

              {post.faqs.length > 0 && (
                <div className="faq-block mt-5">
                  <h2 className="mb-3">Frequently Asked Questions</h2>
                  {post.faqs.map((faq) => (
                    <div key={faq.question} className="mb-4">
                      <h3 style={{ fontSize: '1.1rem' }}>{faq.question}</h3>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-lg-4 sidebar ftco-animate bg-light py-md-5">
              <div className="sidebar-box pt-md-5">
                <form action="/blog-search" method="get" className="search-form">
                  <div className="form-group">
                    <span className="icon fa fa-search" />
                    <input type="text" name="q" className="form-control" placeholder="Search..." />
                  </div>
                </form>
              </div>

              {post.related.length > 0 && (
                <div className="sidebar-box ftco-animate">
                  <h3>Related Reading</h3>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {post.related.map((r) => (
                      <li key={r.href} className="mb-2">
                        <a href={r.href}>{r.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="sidebar-box ftco-animate">
                <h3>Travel is better when shared</h3>
                <p>Let your followers know about our amazing Escorted Morocco tours!</p>
                <FacebookShareButton
                  url={`https://www.escortedmoroccotours.com/blog/${post.slug}`}
                  quote={post.title}
                  hashtag={'#excortedmoroccotours'}
                >
                  <FacebookIcon size={32} className="mr-2" round />
                </FacebookShareButton>
                <WhatsappShareButton
                  url={`https://www.escortedmoroccotours.com/blog/${post.slug}`}
                  title={post.title}
                  separator=":: "
                >
                  <WhatsappIcon size={32} className="mr-2" round />
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
