const fs = require('fs');
const path = require('path');

// 빌드된 파일들을 portfolio-website 폴더로 재구성하는 스크립트
function fixPaths() {
  const outDir = path.join(__dirname, '..', 'out');
  const portfolioDir = path.join(outDir, 'portfolio-website');

  console.log('🔧 GitHub Pages 배포 구조 재구성 시작...');

  // portfolio-website 폴더 생성
  if (!fs.existsSync(portfolioDir)) {
    fs.mkdirSync(portfolioDir, { recursive: true });
  }

  // out 폴더의 모든 파일과 폴더를 portfolio-website 폴더로 이동
  const items = fs.readdirSync(outDir);

  for (const item of items) {
    const srcPath = path.join(outDir, item);
    const destPath = path.join(portfolioDir, item);

    // portfolio-website 폴더 자체는 이동하지 않음
    if (item === 'portfolio-website') continue;

    // 파일/폴더 이동
    if (fs.statSync(srcPath).isDirectory()) {
      // 디렉토리인 경우 재귀적으로 복사
      copyDirRecursive(srcPath, destPath);
      // 원본 디렉토리 삭제
      fs.rmSync(srcPath, { recursive: true, force: true });
    } else {
      // 파일인 경우 이동
      fs.renameSync(srcPath, destPath);
    }
  }

  console.log('✅ GitHub Pages 배포 구조 재구성 완료!');
  console.log('📁 새로운 구조: out/portfolio-website/');
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

fixPaths();
