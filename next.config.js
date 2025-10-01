/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Next.js 15에서는 appDir이 기본값이므로 제거
  // 추가 최적화 설정
  images: {
    unoptimized: false, // 이미지 최적화 활성화
  },
  // 번들 분석을 위한 설정 (선택사항)
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig
