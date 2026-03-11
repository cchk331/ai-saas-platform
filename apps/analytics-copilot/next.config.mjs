// Analytics Copilot Next.js Configuration
// Rationale: Proxies API calls to the Text-to-SQL FastAPI backend on port 8001.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/design-system"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8001/:path*",
      },
    ];
  },
};

export default nextConfig;
