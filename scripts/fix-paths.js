const fs = require('fs');
const path = require('path');

// 빌드된 HTML 파일에서 경로를 수정하는 스크립트
function fixPaths() {
  const outDir = path.join(__dirname, '..', 'out');
  const indexPath = path.join(outDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.html 파일을 찾을 수 없습니다.');
    return;
  }

  console.log('🔧 HTML 파일 경로 수정 시작...');

  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Next.js가 생성한 /portfolio-website/ 경로를 제거하고,
  // 실제 필요한 경로로 수정
  htmlContent = htmlContent
    // 이미지 경로 수정: /portfolio-website/images/ -> /images/
    .replace(/\/portfolio-website\/images\//g, '/images/')
    // CSS 경로 수정: /portfolio-website/_next/ -> /_next/
    .replace(/\/portfolio-website\/_next\//g, '/_next/')
    // 폰트 경로 유지 (외부 CDN은 그대로)
    // 다른 asset 경로는 필요에 따라 수정

  fs.writeFileSync(indexPath, htmlContent, 'utf8');

  console.log('✅ HTML 파일 경로 수정 완료!');
  console.log('📝 수정된 경로들:');
  console.log('   - 이미지: /portfolio-website/images/ → /images/');
  console.log('   - CSS/JS: /portfolio-website/_next/ → /_next/');
}

fixPaths();
