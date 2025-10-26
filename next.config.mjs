/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep static export for Firebase Hosting
  output: 'export',
  trailingSlash: true,
  
  // React strict mode for better development experience
  reactStrictMode: true,
  
  // Images configuration for static export
  images: {
    unoptimized: true
  },
  
  // Experimental features
  experimental: {
    typedRoutes: true
  },
  
  // Disable TypeScript errors during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true
  }
};

export default nextConfig;



