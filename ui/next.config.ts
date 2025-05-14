import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
