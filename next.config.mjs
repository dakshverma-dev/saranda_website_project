import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    dangerouslyAllowLocalIP: true,
  },

  experimental: {
    globalNotFound: true,
  },
  
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
};

export default withPlaiceholder(nextConfig);