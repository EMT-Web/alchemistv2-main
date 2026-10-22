/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },
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
      // Tour URLs renamed on 2026-10-17 when their day counts were corrected
      // (the itineraries were 6 and 9 days, the old URLs said 5 and 8).
      {
        source: "/tours/5-days-moroccan-imperial-tour-from-casablanca-to-fes",
        destination: "/tours/6-days-imperial-cities-tour-from-casablanca",
        statusCode: 301,
      },
      {
        source: "/tours/8-days-desert-imperial-tour-casablanca-to-marrakesh-morocco",
        destination: "/tours/9-days-desert-tour-casablanca-to-marrakech-via-chefchaouen",
        statusCode: 301,
      },
      // 22 Oct 2026: the tour runs 8 days (its itinerary always had 8 day entries).
      {
        source: "/tours/7-days-adventure-through-time-and-culture-morocco",
        destination: "/tours/8-days-adventure-through-time-and-culture-morocco",
        statusCode: 301,
      },
      {
        source: "/blog/why-small-group-escorted-tours-morocco",
        destination: "/blog/why-private-escorted-tours-morocco",
        statusCode: 301,
      },
      {
        source: "/destination/:slug",
        destination: "/destinations/:slug",
        permanent: true,
      },
    ];
  },
};
