/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "media-cdn.tripadvisor.com",
      "dynamic-media-cdn.tripadvisor.com",
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimize production builds
  compress: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
  // Canonicalize apex domain to www, matching every canonical tag/JSON-LD/sitemap entry sitewide
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "escortedmoroccotours.com" }],
        destination: "https://www.escortedmoroccotours.com/:path*",
        permanent: true,
      },
      {
        source: "/destination/:slug",
        destination: "/destinations/:slug",
        permanent: true,
      },
    ];
  },
};
