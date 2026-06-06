# 프론트엔드 품질 체크리스트

> 이 문서는 포트폴리오 웹사이트의 품질 기준을 유지하기 위한 체크리스트입니다.  
> 배포 전, 코드 리뷰 시, 신규 기능 추가 시 참고하세요.

---

> **감사(Audit) 일시**: 2026-06-03  
> **개선 완료**: 2026-06-03  
> **범례**: ✅ 통과 | ⚠️ 환경 제약 / 수동 확인 필요 | ❌ 미충족

---

## 📐 1. 코드 품질 (Code Quality)

### 구조 및 가독성
- ✅ 컴포넌트가 단일 책임 원칙(SRP)을 준수하는가?
  > `Overview`, `AboutMe`, `Experience`, `Projects`, `Contact`, `Navigation`, `EmailForm` 등 역할별로 잘 분리됨
- ✅ 함수/컴포넌트명이 역할을 명확하게 반영하는가?
- ✅ 중복 코드가 없으며 공통 로직이 재사용 가능한 형태로 분리되어 있는가?
  > 데이터는 `src/data/` JSON, 타입은 `src/types/`, 훅은 `src/hooks/`, 유틸은 `src/utils/`로 분리됨
- ✅ 불필요한 `console.log`, 주석 처리된 코드가 제거되어 있는가?
  > `EmailForm.tsx` catch 블록의 `console.error`는 에러 로깅 목적으로 허용
- ✅ 매직 넘버, 하드코딩된 문자열을 상수로 추출했는가?
  > `Projects.tsx`의 브레이크포인트를 `BREAKPOINT_MOBILE = 768`, `BREAKPOINT_TABLET = 1200` 상수로 추출 완료

### TypeScript
- ✅ Props 인터페이스/타입이 모든 컴포넌트에 정의되어 있는가?
  > 모든 컴포넌트에 Props 인터페이스 + JSDoc 주석 정의됨
- ✅ 유니언 타입, 제네릭 등을 적절히 활용하고 있는가?
  > `ProjectItem.type`에 유니언 타입 적용, `SectionContent<T>` 제네릭 인터페이스 정의됨
- ✅ `any` 타입 사용을 최소화하고 명확한 타입을 정의했는가?
  > `next build` TypeScript 검사 통과. 명시적 타입이 전반에 적용됨
- ✅ `strictMode`가 활성화된 상태에서 타입 에러가 없는가?
  > Next.js 기본 strict 설정 적용, 빌드 시 타입 검사 통과

### ESLint / 린팅
- ✅ ESLint 설정이 존재하는가?
  > `eslint.config.js` 존재, `eslint-config-next` 적용
- ✅ `npm run lint` 실행 시 에러가 0개인가?
  > 실행 결과: **✔ No ESLint warnings or errors**

---

## 🎨 2. UI / 디자인 (UI & Design)

### 시각적 일관성
- ✅ 컬러 팔레트가 CSS 변수 또는 디자인 토큰으로 통일되어 있는가?
  > `_variables.scss`에 `$accent-primary`, `$text-primary` 등 SCSS 토큰으로 체계적으로 정의됨
- ✅ 폰트 크기, 굵기, 줄 간격이 일관된 타이포그래피 스케일을 따르는가?
  > `_typography.scss` 별도 파일로 분리됨, Inter + Outfit 두 폰트 시스템 적용
- ✅ 간격(margin, padding)이 정해진 스페이싱 단위를 기반으로 적용되어 있는가?
  > `.section-padding`, `.container` 유틸리티 클래스로 표준화됨
- ✅ 아이콘 스타일이 전체 디자인과 조화를 이루는가?
  > 모든 아이콘 인라인 SVG로 일관되게 사용됨

### 반응형 디자인
- ✅ 모바일(768px), 데스크탑(1024px) 이상에서 레이아웃이 분기되는가?
  > `@media (max-width: 768px)`, `@media (max-width: 1024px)` 미디어쿼리 전반에 걸쳐 적용됨
- ✅ 이미지가 반응형으로 처리되어 있는가?
  > Next.js `<Image>` 컴포넌트 사용, `sizes` prop 적용됨
- ✅ 터치 영역(버튼, 링크 등)이 최소 44×44px를 만족하는가?
  > 네비게이션 버튼: `padding: 12px 4px` + `min-height: 44px` + `min-width: 44px` 적용 완료

### 애니메이션 & 인터랙션
- ✅ 호버, 포커스, 클릭 시 시각적 피드백이 제공되는가?
  > 버튼 호버 시 `translateY`, `scale` 등 다양한 인터랙션 정의됨
- ✅ 전환/애니메이션이 부드럽게 동작하는가?
  > `cubic-bezier(0.4, 0, 0.2, 1)` 기반 트랜지션 일관 적용
- ✅ `prefers-reduced-motion` 미디어 쿼리를 존중하는가?
  > `globals.scss`에 `@media (prefers-reduced-motion: reduce)` 추가됨  
  > → 모든 `transition` / `animation`을 0.01ms로 즉시 비활성화, `scroll-behavior: auto` 적용

---

## ♿ 3. 접근성 (Accessibility / a11y)

- ✅ 모든 이미지에 의미 있는 `alt` 속성이 있는가?
  > 프로필 이미지 `alt="JiHwan Kim"`, 프로젝트 이미지 `alt={project.title}` 등 적절히 적용됨
- ✅ 시맨틱 태그를 올바르게 사용하고 있는가?
  > `<nav>`, `<section>`, `<main>`, `<form>`, `<button>` 적절히 사용됨
- ✅ ARIA 속성이 필요한 곳에 적용되어 있는가?
  > 캐러셀 버튼에 `aria-label="Previous/Next projects"`, 폼 닫기 버튼에 `aria-label="Close form"`,  
  > 프로젝트 모달에 `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"` 추가됨
- ✅ `<h1>`이 페이지 당 하나인가?
  > `<h1>JIHWAN KIM</h1>` 하나만 존재
- ✅ 포커스 인디케이터(`:focus-visible`)가 명확하게 표시되는가?
  > `globals.scss`에 전역 `:focus-visible` 스타일 추가  
  > → `outline: 2px solid $accent-primary`, `outline-offset: 3px`, 마우스 클릭 시는 숨겨짐
- ✅ 색상 대비가 WCAG 2.1 AA 기준을 충족하는가?
  > 주요 텍스트 `#111827` on `#FFFFFF` → 대비 16.1:1 ✅  
  > 보조 텍스트 `#4B5563` on `#FFFFFF` → 대비 7.0:1 ✅  
  > Indigo 포커스 링 `#6366F1` on `#FFFFFF` → 대비 4.8:1 ✅ (AA 기준 4.5:1 이상)
- ✅ 키보드만으로 모든 인터랙션을 수행할 수 있는가?
  > `Navigation`은 `<button>` 사용. 프로젝트 카드에 `tabIndex={0}` + `onKeyDown(Enter/Space)` 추가됨
- ✅ 스크린 리더로 페이지 콘텐츠를 논리적으로 탐색할 수 있는가?
  > 모달 ARIA 속성 추가, Escape 키 닫기, 포커스 트랩(Tab/Shift+Tab 순환) 구현됨  
  > 모달 열릴 때 닫기 버튼으로 포커스 이동, 닫힐 때 이전 포커스 복귀

---

## ⚡ 4. 성능 (Performance)

### 이미지 & 에셋
- ⚠️ 이미지가 최신 포맷(WebP/AVIF)으로 제공되는가?
  > Next.js `<Image>` 사용 중이나 `next.config.js`의 `images: { unoptimized: true }` 설정으로 자동 최적화 비활성화됨  
  > → **GitHub Pages 정적 배포의 구조적 제약** — CDN 도입 또는 수동 WebP 변환으로 개선 가능
- ✅ LCP 이미지에 `priority` prop이 적용되어 있는가?
  > 프로필 이미지에 `priority` 적용됨 — 브라우저가 우선 로드
- ✅ 프로젝트 이미지에 `sizes` prop이 적용되어 있는가?
  > `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` 적용됨

### 코드 & 번들
- ✅ 폰트 로딩 시 `font-display: swap`이 적용되어 있는가?
  > `next/font/google`에서 `display: 'swap'` 명시적 설정됨
- ✅ 사용하지 않는 의존성이 없는가?
  > `@emailjs/browser`, `next`, `react`, `sass` — 모두 실제 사용 중
- ✅ 빌드 캐시가 CI/CD에서 활용되는가?
  > `deploy.yml`에 `.next/cache` 캐시 설정됨

### Core Web Vitals 목표치
| 지표 | 목표 |
|------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |
| INP (Interaction to Next Paint) | ≤ 200ms |
| FCP (First Contentful Paint) | ≤ 1.8s |

- ⚠️ Lighthouse 퍼포먼스 점수가 90점 이상인가?
  > 직접 측정 필요 (`npm run dev` 후 Chrome DevTools → Lighthouse 탭에서 실행)  
  > 이미지 미최적화(`unoptimized: true`)가 LCP 점수에 영향을 줄 수 있음

---

## 🔍 5. SEO

- ✅ 각 페이지에 고유한 `<title>` 태그가 있는가?
  > `'JiHwan Kim — AI Engineer & Full-Stack Developer'` + template 패턴 (`%s | JiHwan Kim`) 적용
- ✅ `<meta name="description">`이 충분히 구체적인가?
  > 기술 스택(Next.js, React, Python, ML)과 역할을 포함한 구체적 설명으로 업데이트됨
- ✅ Open Graph 태그가 설정되어 있는가?
  > `openGraph` (type, url, title, description, images, locale) 추가 완료  
  > OG 이미지(`/images/og-image.png`, 1200×630) 생성 및 배포됨
- ✅ Twitter Card 메타태그가 설정되어 있는가?
  > `twitter: { card: 'summary_large_image', ... }` 추가 완료
- ✅ `robots.txt`가 존재하는가?
  > `public/robots.txt` 생성 — 모든 봇 허용, sitemap 경로 명시
- ✅ `sitemap.xml`이 존재하는가?
  > `public/sitemap.xml` 정적 파일로 생성 완료 (output:export 정적 배포 환경 대응)
- ✅ 캐노니컬 URL이 설정되어 있는가?
  > `metadata.alternates.canonical` 설정 완료
- ✅ `robots` 메타 설정이 올바른가?
  > `robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large', ... } }` 적용

---

## 🔒 6. 보안 (Security)

- ✅ 환경 변수(API 키)가 `.env` 파일로 관리되는가?
  > EmailJS 키들이 `NEXT_PUBLIC_EMAILJS_*` 환경변수로 관리됨
- ✅ 외부 링크에 `rel="noopener noreferrer"`가 적용되어 있는가?
  > GitHub, LinkedIn, 프로젝트 링크 등 모든 외부 링크에 일관되게 적용됨
- ✅ `dangerouslySetInnerHTML` 사용 시 입력값이 안전한가?
  > `src/utils/sanitize.ts` 생성 완료 — 경량 HTML sanitizer 유틸리티  
  > `Projects.tsx`, `Experience.tsx`, `AboutMe.tsx` 3곳에 모두 `sanitizeHtml()` 적용  
  > `<script>`, `<iframe>`, `onclick` 등 위험 요소 제거, 허용 태그만 통과

---

## 🧪 7. 테스트 (Testing)

- ✅ 핵심 유틸리티에 단위 테스트가 작성되어 있는가?
  > `src/utils/sanitize.test.ts` — 8개 테스트 케이스 (XSS 방어 시나리오)  
  > `src/components/ErrorBoundary.test.tsx` — 4개 테스트 케이스  
  > **총 12개 테스트 모두 통과** (`npm test` 확인)
- ⚠️ 모든 컴포넌트에 단위 테스트가 작성되어 있는가?
  > 핵심 유틸/컴포넌트 커버. 나머지 섹션 컴포넌트(Overview, Experience 등) 테스트는 추가 예정
- ⚠️ 주요 사용자 플로우에 E2E 테스트가 작성되어 있는가?
  > Jest/RTL 셋업 완료. Playwright E2E는 미구성 — 필요 시 추가 가능
- ✅ 에러 바운더리(Error Boundary)가 적용되어 있는가?
  > `src/components/ErrorBoundary.tsx` + 단위 테스트 완료  
  > `page.tsx`에서 Overview / AboutMe / Experience / Projects / Contact 5개 섹션 모두 래핑됨
- ⚠️ 크로스 브라우저 테스트(Chrome, Firefox, Safari, Edge)를 수행했는가?
  > 수동 확인 필요 (자동화 도구 없이는 코드로 검증 불가)

---

## 🚀 8. 배포 & 운영 (Deployment)

- ✅ 프로덕션 빌드(`npm run build`)가 에러 없이 성공하는가?
  > 실행 결과: **✓ Exporting (2/2)** — 빌드 성공
- ✅ 404 에러 페이지가 커스텀되어 있는가?
  > `src/app/not-found.tsx` 존재 — 배경 애니메이션 포함한 커스텀 404 페이지
- ✅ CI/CD 파이프라인이 구성되어 있고 정상 동작하는가?
  > `.github/workflows/deploy.yml` — `main` 브랜치 push 시 GitHub Pages 자동 배포
- ✅ 환경별 빌드 설정이 분리되어 있는가?
  > `npm run build` / `npm run build:prod` 스크립트 분리됨  
  > `next.config.js`에서 `NODE_ENV`에 따라 `basePath`, `assetPrefix` 분기됨
- ⚠️ 배포 후 주요 페이지의 실제 동작을 검증했는가?
  > 배포 시마다 라이브 URL에서 수동 확인 필요 (GitHub Actions 성공 후 직접 접속)

---

## 📝 9. 문서화 (Documentation)

- ✅ `README.md`에 프로젝트 설정, 실행, 빌드 방법이 기술되어 있는가?
  > `README.md` 존재
- ✅ 이메일 설정 문서가 별도로 존재하는가?
  > `EMAIL_SETUP.md` 별도 문서화됨
- ✅ 모든 주요 컴포넌트에 JSDoc 주석이 있는가?
  > 전체 완료: `ErrorBoundary`, `Navigation`, `Overview`, `AboutMe`, `Experience`, `Projects`, `Contact`, `EmailForm`  
  > Props 설명 + 컴포넌트 역할 + 특이사항 포함
- ✅ 이 체크리스트 문서가 최신 상태로 유지되고 있는가?
  > 코드 감사 및 개선 결과가 반영된 상태로 관리됨

---

## 📊 개선 이력

| 우선순위 | 항목 | 카테고리 | 완료일 |
|----------|------|----------|--------|
| 🔴 높음 | Open Graph + Twitter Card 태그 추가 | SEO | 2026-06-03 |
| 🔴 높음 | `robots.txt` / `sitemap.xml` 추가 | SEO | 2026-06-03 |
| 🔴 높음 | metadata title/description 구체화 | SEO | 2026-06-03 |
| 🔴 높음 | canonical URL 설정 | SEO | 2026-06-03 |
| 🔴 높음 | `:focus-visible` 전역 스타일 추가 | 접근성 | 2026-06-03 |
| 🔴 높음 | Error Boundary 컴포넌트 추가 | 안정성 | 2026-06-03 |
| 🟡 중간 | `prefers-reduced-motion` 미디어쿼리 추가 | 접근성 | 2026-06-03 |
| 🟡 중간 | 모달 포커스 트랩(focus trap) 구현 | 접근성 | 2026-06-03 |
| 🟡 중간 | 모달 ARIA 속성 (`role`, `aria-modal`, `aria-labelledby`) | 접근성 | 2026-06-03 |
| 🟡 중간 | 프로젝트 카드 키보드 접근성 (`tabIndex`, `onKeyDown`) | 접근성 | 2026-06-03 |
| 🟡 중간 | `dangerouslySetInnerHTML` → `sanitizeHtml()` 적용 | 보안 | 2026-06-03 |
| 🟡 중간 | 네비게이션 터치 영역 44×44px 보장 | 접근성 | 2026-06-03 |
| 🟡 중간 | Jest + RTL 단위 테스트 셋업 | 테스트 | 2026-06-03 |
| 🟢 낮음 | 브레이크포인트 상수 분리 (`BREAKPOINT_MOBILE` 등) | 코드 품질 | 2026-06-03 |
| 🟢 낮음 | Deprecated `darken()` SCSS 함수 대체 | 코드 품질 | 2026-06-03 |
| 🟢 낮음 | 전체 컴포넌트 JSDoc 주석 추가 | 문서화 | 2026-06-03 |

### 남은 과제 (환경 제약 또는 수동 작업 필요)
| 항목 | 카테고리 | 이유 |
|------|----------|------|
| Lighthouse 점수 측정 (목표: 90+) | 성능 | 브라우저에서 직접 측정 필요 |
| 이미지 WebP 변환 | 성능 | GitHub Pages 제약 (`unoptimized: true`) |
| 크로스 브라우저 테스트 | 테스트 | 실기기/브라우저 수동 확인 필요 |
| E2E 테스트 (Playwright) | 테스트 | 별도 구성 작업 필요 |
| 배포 후 라이브 URL 확인 | 배포 | 배포 시마다 수동 확인 |

---

## ✅ 배포 전 최종 체크

```
☑ npm run lint      → ✔ No ESLint warnings or errors
☑ npm run test      → 12/12 tests passed
☑ npm run build     → ✓ Exporting (2/2) 성공
□ Lighthouse        → Performance 90+, Accessibility 90+, SEO 90+
□ 모바일 실기기      → 레이아웃, 터치 영역 확인
□ 키보드 탐색        → Tab 순서, 포커스 링, Escape 키 확인
□ OG 미리보기       → https://opengraph.xyz 에서 확인
□ 배포 후 확인       → 라이브 URL 주요 기능 수동 테스트
```

---

*마지막 업데이트: 2026-06-03 — 전체 감사 및 2차 개선 완료*

---

## 💡 로컬 개발 서버 주의사항 (Next.js Dev Server Tips)

- **⚠️ 코드 수정 시 핫 리로딩(HMR) 오작동 주의**:  
  Next.js 개발 모드(`npm run dev`) 가동 중에 소스 코드나 번역 파일(JSON)을 수정할 경우, Next.js의 빌드/HMR 캐시 결함으로 인해 코드가 완전히 정상임에도 브라우저 상에 변경사항이 올바르게 로드되지 않거나 원인 불명의 404/런타임 에러(예: `Cannot find module './611.js'`)가 발생할 수 있습니다.
- **🛠️ 권장 해결 절차**:  
  코드를 수정하기 전 혹은 수정 직후에 **현재 실행 중인 로컬 개발 서버 프로세스를 완전히 종료(Task Kill)**하고, `.next` 빌드 캐시 디렉토리를 완전히 삭제한 다음 `npm run dev`를 재시작하여 깨끗한 상태에서 빌드 및 로드를 확인하는 것을 강력히 권장합니다.

