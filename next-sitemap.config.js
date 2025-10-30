const config = {
  siteUrl: "https://www.escortedmoroccotours.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/api/*', '/studio/*', '/_next/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/', '/admin/']
      }
    ],
    additionalSitemaps: [
      'https://www.escortedmoroccotours.com/sitemap.xml',
      'https://www.escortedmoroccotours.com/server-sitemap.xml'
    ]
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
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
    
    // Add custom paths that need to be included
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
