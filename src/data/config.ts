// 환경별 설정
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const BASE_PATH = IS_PRODUCTION ? '/portfolio-website' : '';
export const ASSET_PREFIX = IS_PRODUCTION ? '/portfolio-website/' : '/';

// 이미지 기본 경로 헬퍼 함수 - 데이터 파일의 경로를 그대로 사용
export const getDefaultImagePath = () => '/portfolio-website/images/sample.png';
