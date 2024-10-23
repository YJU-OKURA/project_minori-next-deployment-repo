module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/nest/:path*', // :path*로 와일드카드 매칭
        destination: 'http://localhost:3001/api/nest/:path*', // 매칭된 path를 전달
      },
      {
        source: '/api/gin/:path*', // :path*로 와일드카드 매칭
        destination: 'http://localhost:80/api/gin/:path*', // 매칭된 path를 전달
      },
    ];
  },
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
