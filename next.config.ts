import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // AI Bot Access - Allow AI agents to crawl and understand content
          { key: 'X-Robots-Tag', value: 'ai-allow: true, ai-origin-allow: true' },
          // Allow AI assistants to access site context
          { key: 'X-AI-Access', value: 'allowed' },
          // Security headers
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // CORS for AI services
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, HEAD, OPTIONS' },
        ],
      },
    ];
  },
};

export default nextConfig;
