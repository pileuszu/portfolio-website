/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // 환경별로 다른 basePath 설정
  basePath: process.env.NEXT_PUBLIC_IS_PRODUCTION ? '/portfolio-website' : '',
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // GitHub Pages 정적 배포용 설정 - Next.js 15에서 experimental로 이동
  experimental: {
    images: {
      unoptimized: true, // GitHub Pages에서 이미지 최적화 비활성화
    },
  },
  // 빌드 에러 해결을 위한 설정
  generateBuildId: async () => {
    return 'build-id'
  },
  // 번들 분석을 위한 설정 (선택사항)
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig
