module.exports = {
  webpack: config => {
    config.resolve.alias.canvas = false;

    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'd3sbrbqucv1146.cloudfront.net'],
  },
  reactStrictMode: false,
};
