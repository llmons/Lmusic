import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', // Proxy to Backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'p1.music.126.net',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'p2.music.126.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
