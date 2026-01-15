/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '',
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => {
    return 'build-id'
  },
}

module.exports = nextConfig
