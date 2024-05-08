module.exports = {
  webpack: config => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'd3sbrbqucv1146.cloudfront.net',
      },
    ],
  },
  reactStrictMode: false,
  output: 'standalone',
};
