# 미니멀 포트폴리오 웹사이트

TypeScript, React, Next.js, SCSS + CSS Modules를 사용한 디자이너 느낌의 미니멀 포트폴리오 웹사이트입니다.

## 🚀 기술 스택

- **Frontend**: React 18, Next.js 15, TypeScript
- **Styling**: SCSS, CSS Modules
- **Design**: Minimal Black & White Theme
- **Animation**: CSS Animations, Smooth Transitions
- **Development**: ESLint 9, Modern Build Tools

## ✨ 주요 기능

- 🎨 **미니멀 디자인**: 화이트 배경과 흑백 중심의 깔끔한 디자인
- 📱 **완전 반응형**: 모든 디바이스에서 최적화된 사용자 경험
- 🎭 **도메인 카드 시스템**: 59×86 비율의 인터랙티브 카드 인터페이스
- 🔄 **동적 레이아웃**: 카드 선택 시 왼쪽 정렬, 오른쪽 세부 정보 표시
- 💫 **부드러운 애니메이션**: 미묘한 호버 효과와 전환 애니메이션
- 🔺 **기하학적 로딩**: 다층 기하학적 도형으로 구성된 로딩 애니메이션
- 🚪 **문 열림 효과**: 로딩 완료 시 화면이 세로로 열리는 인상적인 전환
- 🎯 **포트폴리오 중심**: 도메인별 프로젝트와 기술 스택 체계적 정리
- ⚡ **최적화된 성능**: React.memo, useCallback을 활용한 성능 최적화

## 🏗️ 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈 페이지 (로딩 상태 관리)
├── components/            # React 컴포넌트
│   ├── LoadingScreen/    # 기하학적 로딩 애니메이션
│   ├── PortfolioMain/    # 메인 포트폴리오 컨테이너
│   ├── DomainCard/       # 59×86 비율 도메인 카드
│   └── DomainDetail/     # 도메인 상세 정보
├── types/                 # TypeScript 타입 정의
│   └── portfolio.ts      # 도메인 및 프로젝트 타입
├── data/                  # 정적 데이터
│   └── domains.ts        # 도메인별 프로젝트 데이터
└── styles/               # 글로벌 스타일
    └── globals.scss      # 전역 SCSS (화이트/블랙 테마)
```

## 🛠️ 설치 및 실행

### 사전 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🎨 커스터마이징

### 색상 테마 변경
`src/styles/globals.scss`에서 CSS 변수를 수정하여 색상 테마를 변경할 수 있습니다:

```scss
:root {
  --primary-black: #000000;    # 메인 검은색
  --secondary-black: #333333;  # 보조 검은색
  --gray-light: #666666;       # 연한 회색
  --gray-lighter: #999999;     # 더 연한 회색
  --white: #ffffff;            # 배경 흰색
  --border-light: #e0e0e0;     # 테두리 색상
}
```

### 개인 정보 수정
`PortfolioMain.tsx`에서 도메인과 프로젝트 정보를 수정할 수 있습니다:

```typescript
const domains: Domain[] = [
  {
    id: 'nlp',
    title: 'NLP',
    subtitle: 'Natural Language Processing',
    description: '자연어 처리 기술을 활용한 지능형 시스템 개발',
    color: '#000000',
    skills: ['Python', 'TensorFlow', 'BERT'],
    projects: [...]
  },
  // 추가 도메인들...
]
```

### 카드 디자인 커스터마이징
`DomainCard.module.scss`에서 카드 스타일을 조정할 수 있습니다:

```scss
.card {
  aspect-ratio: 59 / 86;  // 카드 비율 (변경 가능)
  border-radius: 8px;     // 모서리 둥글기
  // 기타 스타일 속성들...
}
```

## 📱 반응형 디자인

- **Desktop**: 1200px 이상
- **Tablet**: 768px - 1199px
- **Mobile**: 767px 이하

각 섹션은 모든 화면 크기에서 최적화되어 있습니다.

## 🚀 배포

### Vercel (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify
```bash
# 빌드
npm run build

# dist 폴더를 Netlify에 업로드
```

## 📄 라이선스

MIT License - 자유롭게 사용하고 수정하실 수 있습니다.

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

- 이메일: your.email@example.com
- GitHub: [@username](https://github.com/username)
- LinkedIn: [your-profile](https://linkedin.com/in/your-profile)

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
