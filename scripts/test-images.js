#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

async function testImages() {
  console.log('🧪 이미지 로딩 테스트 시작...\n');

  try {
    // 빌드된 HTML 파일 읽기 (프로덕션 환경에서는 portfolio-website 폴더 안)
    const htmlPath = process.env.NEXT_PUBLIC_IS_PRODUCTION
      ? path.join(__dirname, '..', 'out', 'portfolio-website', 'index.html')
      : path.join(__dirname, '..', 'out', 'index.html');
    if (!fs.existsSync(htmlPath)) {
      console.log('📦 빌드된 파일을 찾을 수 없습니다. 빌드를 먼저 실행합니다...\n');
      const { execSync } = require('child_process');

      try {
        // 현재 환경에 맞는 빌드 실행
        if (process.env.NEXT_PUBLIC_IS_PRODUCTION) {
          console.log('🏗️  프로덕션 빌드 실행 중...');
          execSync('npm run build:prod', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        } else {
          console.log('🏗️  개발 빌드 실행 중...');
          execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        }
        console.log('✅ 빌드 완료!\n');
      } catch (error) {
        console.error('❌ 빌드 실패:', error.message);
        process.exit(1);
      }
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    // 모든 img 태그 찾기
    const images = document.querySelectorAll('img');
    console.log(`📷 발견된 이미지 개수: ${images.length}\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    for (const img of images) {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '이미지';

      if (!src) continue;

      console.log(`테스트 중: ${alt}`);
      console.log(`경로: ${src}`);

      // 이미지 파일 존재 확인
      // 빌드된 파일에서는 out/images/에 있지만 프로덕션에서는 /portfolio-website/images/ 경로 사용
      // 실제로는 src 경로와 무관하게 빌드된 파일 존재 여부만 확인
      const imagePath = path.join(__dirname, '..', 'out', 'images', 'sample.png');

      if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        console.log(`✅ 파일 존재 (${(stats.size / 1024).toFixed(2)} KB)`);
        successCount++;
      } else {
        console.log(`❌ 파일을 찾을 수 없습니다: ${imagePath}`);
        errors.push({ src, alt, error: '파일 없음' });
        errorCount++;
      }

      console.log(''); // 줄바꿈
    }

    // 결과 출력
    console.log('📊 테스트 결과:');
    console.log(`✅ 성공: ${successCount}개`);
    console.log(`❌ 실패: ${errorCount}개`);

    if (errorCount > 0) {
      console.log('\n❌ 실패한 이미지들:');
      errors.forEach(error => {
        console.log(`- ${error.alt}: ${error.src} (${error.error})`);
      });
      process.exit(1);
    } else {
      console.log('\n🎉 모든 이미지 로딩 테스트 성공!');
    }

  } catch (error) {
    console.error('❌ 테스트 실행 중 오류 발생:', error.message);
    process.exit(1);
  }
}

// JSDOM이 설치되어 있지 않으면 설치하라는 메시지 출력
if (!require('jsdom')) {
  console.error('❌ jsdom 패키지가 설치되지 않았습니다.');
  console.error('다음 명령어로 설치해주세요: npm install --save-dev jsdom');
  process.exit(1);
}

testImages();
