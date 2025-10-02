/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // 개발 환경에서는 basePath를 비활성화하고, 프로덕션에서만 활성화
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '',
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
