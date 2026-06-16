import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/branding/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/backgrounds/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/banners/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/covers/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Exact page redirects (non-trailing and trailing slash)
      { source: '/music-2', destination: '/music', permanent: true },
      { source: '/music-2/', destination: '/music', permanent: true },
      { source: '/signup', destination: '/fan-club', permanent: true },
      { source: '/signup/', destination: '/fan-club', permanent: true },
      { source: '/video', destination: '/videos', permanent: true },
      { source: '/video/', destination: '/videos', permanent: true },

      // Wildcard: individual video pages -> /videos
      { source: '/video/:slug*', destination: '/videos', permanent: true },

      // Wildcard: individual gig/tour-date pages -> /tour
      { source: '/gig', destination: '/tour', permanent: true },
      { source: '/gig/', destination: '/tour', permanent: true },
      { source: '/gig/:slug*', destination: '/tour', permanent: true },

      // Wildcard: individual release pages -> /music
      { source: '/release', destination: '/music', permanent: true },
      { source: '/release/', destination: '/music', permanent: true },
      { source: '/release/:slug*', destination: '/music', permanent: true },

      // Wildcard: release category pages -> /music
      { source: '/release-category', destination: '/music', permanent: true },
      { source: '/release-category/', destination: '/music', permanent: true },
      { source: '/release-category/:slug*', destination: '/music', permanent: true },
    ];
  },
};

export default nextConfig;
