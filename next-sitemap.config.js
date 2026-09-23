const fs = require('fs')
const path = require('path')

// Pages that render <meta name="robots" content="noindex"> must not be listed in the
// sitemap: Google reports them as "Submitted URL marked noindex". Checked against the
// prerendered HTML, so it follows each page's own noindex logic automatically.
const isNoindex = (route) => {
  const file = path.join(__dirname, '.next/server/pages', `${route === '/' ? '/index' : route}.html`)
  try {
    return /<meta[^>]+name="robots"[^>]+noindex/i.test(fs.readFileSync(file, 'utf8'))
  } catch {
    return false
  }
}

const config = {
  siteUrl: "https://www.escortedmoroccotours.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/api/*', '/studio/*', '/_next/*', '/404', '/500', '/blog-search', '/search'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/', '/admin/']
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' }
      ]
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    if (isNoindex(path)) return null
    let priority = 0.7
    let changefreq = 'daily'
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.includes('/tours/')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.includes('/destinations/')) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.includes('/blog/')) {
      priority = 0.7
      changefreq = 'monthly'
    } else if (path.includes('/category/')) {
      priority = 0.6
      changefreq = 'weekly'
    }
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    }
  },
  additionalPaths: async (config) => {
    const result = []
      const customPaths = [
        '/contact',
        '/about',
        '/tours',
        '/destinations',
        '/blog',
        '/privacy-policy',
        '/booking-info'
        ]
    customPaths.forEach((path) => {
      result.push({
        loc: path,
        changefreq: 'monthly',
        priority: path === '/' ? 1.0 : 0.5,
        lastmod: new Date().toISOString()
      })
    })
    return result
  }
};
module.exports = config;
