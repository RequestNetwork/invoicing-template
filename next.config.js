/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@lit-protocol/lit-node-client', '@requestnetwork/lit-protocol-cipher'],
  },
}

module.exports = nextConfig 