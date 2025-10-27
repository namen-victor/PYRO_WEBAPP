/** @type {import('next').NextConfig} */
const nextConfig = {
  // Developer experience
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },

  // Export config (merged from next.config.js)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;



