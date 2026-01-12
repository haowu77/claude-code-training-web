/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 禁用 TypeScript 和 ESLint 错误在构建时阻塞
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
