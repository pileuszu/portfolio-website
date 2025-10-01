/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/portfolio-website',
  assetPrefix: '/portfolio-website',
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  images: {
    unoptimized: true, // GitHub Pages에서 이미지 최적화 비활성화
  },
  // 빌드 에러 해결을 위한 설정
  generateBuildId: async () => {
    return 'build-id'
  },
}

module.exports = nextConfig
