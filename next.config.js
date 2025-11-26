/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'golden88a.com',
      },
      {
        protocol: 'https',
        hostname: 'inskingdom8.com',
      },
      {
        protocol: 'https',
        hostname: 'ridgydidgebets.com',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
