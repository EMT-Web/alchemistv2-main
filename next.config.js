/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "cdn.sanity.io",
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
};
