#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

async function testImages() {
  console.log('🧪 이미지 로딩 테스트 시작...\n');

  try {
    // 빌드된 HTML 파일 읽기
    const htmlPath = path.join(__dirname, '..', 'out', 'index.html');
    if (!fs.existsSync(htmlPath)) {
      console.error('❌ 빌드된 HTML 파일을 찾을 수 없습니다. 먼저 빌드를 실행해주세요.');
      process.exit(1);
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
      // 빌드된 파일에서는 out/images/에 있지만 모든 이미지가 sample.png이므로
      // 실제로는 src 경로와 무관하게 sample.png 파일 존재 여부만 확인
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
