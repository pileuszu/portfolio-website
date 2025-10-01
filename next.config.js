/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages 실제 배포 경로에 맞게 설정 (루트 배포)
  basePath: '',
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // GitHub Pages 정적 배포용 설정 - Next.js 15에서 experimental로 이동
  experimental: {
    images: {
      unoptimized: true, // GitHub Pages에서 이미지 최적화 비활성화
    },
  },
  // 번들 분석을 위한 설정 (선택사항)
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig
