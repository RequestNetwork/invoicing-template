/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Modern options for Next.js optimization
    optimizePackageImports: ['@lit-protocol/lit-node-client', '@requestnetwork/lit-protocol-cipher'],
    serverActions: true,
  },
  // Add any other necessary configuration options
}

module.exports = nextConfig 