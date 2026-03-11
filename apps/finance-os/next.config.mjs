// Finance OS Next.js Configuration
// Rationale: Configures the Next.js build for Finance OS, enabling
// transpilation of shared packages and API proxy rewrites.
//
// Steps:
// 1. Enable transpilePackages for monorepo shared code
// 2. Configure API rewrites to proxy /api/* to FastAPI backend on port 8000
// 3. Enable React strict mode for development quality

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/design-system"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
