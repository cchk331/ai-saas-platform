// Media Buyer Next.js Configuration
// Rationale: Proxies API calls to the Ad Automation FastAPI backend on port 8002.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/design-system"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8002/:path*",
      },
    ];
  },
};

export default nextConfig;
