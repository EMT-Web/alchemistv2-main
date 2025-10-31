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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 31536000, // 1 year
    formats: ['image/webp', 'image/avif'],
  },
  // Optimize production builds
  compress: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};
