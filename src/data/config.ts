// 환경별 설정
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const BASE_PATH = IS_PRODUCTION ? '/portfolio-website' : '';
export const ASSET_PREFIX = IS_PRODUCTION ? '/portfolio-website/' : '/';

// 이미지 경로 헬퍼 함수 - 단순하게 처리
export const getImagePath = (imagePath: string) => {
  if (IS_PRODUCTION) {
    return `/portfolio-website/${imagePath}`;
  }
  return `/${imagePath}`;
};

// 이미지 기본 경로 헬퍼 함수
export const getDefaultImagePath = () => {
  if (IS_PRODUCTION) {
    return '/portfolio-website/images/sample.png';
  }
  return '/images/sample.png';
};
