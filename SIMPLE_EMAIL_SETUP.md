# 📧 간단한 이메일 전송 설정 가이드

회원가입 없이 바로 사용할 수 있는 이메일 전송 방법들을 소개합니다.

## 🚀 방법별 비교

### 1. **Web3Forms (추천) - 완전 무료, 회원가입 불필요**
- ✅ 완전 무료
- ✅ 회원가입 불필요
- ✅ 월 250개 이메일 무료
- ✅ 스팸 방지 기능
- ✅ 설정 시간: 2분

### 2. **Formspree - 간단한 설정**
- ✅ 무료 플랜 제공
- ⚠️ 회원가입 필요 (간단)
- ✅ 월 50개 이메일 무료
- ✅ 설정 시간: 5분

### 3. **Netlify Forms - 정적 사이트 호스팅 시**
- ✅ 완전 무료
- ✅ 회원가입 불필요
- ✅ Netlify 호스팅 시에만 사용 가능
- ✅ 설정 시간: 1분

### 4. **Mailto 링크 - 가장 간단**
- ✅ 완전 무료
- ✅ 회원가입 불필요
- ✅ 설정 시간: 0분
- ⚠️ 사용자 이메일 클라이언트 필요

## 🎯 Web3Forms 설정 (추천)

### 1단계: Access Key 발급
1. [https://web3forms.com/](https://web3forms.com/) 접속
2. "Get Started" 클릭
3. 이메일 주소 입력 (회원가입 불필요!)
4. 받은 이메일에서 Access Key 복사

### 2단계: 코드 수정
`src/app/page.tsx`에서 EmailForm을 Web3EmailForm으로 교체:

```tsx
import Web3EmailForm from '../components/Web3EmailForm'

// 기존 코드에서
<EmailForm onClose={() => setShowEmailOverlay(false)} />

// 다음으로 변경
<Web3EmailForm onClose={() => setShowEmailOverlay(false)} />
```

### 3단계: Access Key 설정
`src/components/Web3EmailForm.tsx`에서:
```tsx
access_key: 'YOUR_ACCESS_KEY', // 여기에 받은 키 입력
```

## 🎯 Formspree 설정

### 1단계: 계정 생성
1. [https://formspree.io/](https://formspree.io/) 접속
2. "Get Started" 클릭
3. 간단한 회원가입

### 2단계: 폼 생성
1. "New Form" 클릭
2. 폼 이름 입력
3. Form ID 복사

### 3단계: 코드 수정
`src/components/SimpleEmailForm.tsx`에서:
```tsx
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

## 🎯 Netlify Forms 설정

### 1단계: Netlify에 배포
1. GitHub에 코드 푸시
2. Netlify에서 사이트 연결
3. 자동으로 폼 감지

### 2단계: 코드 수정
`src/app/page.tsx`에서:
```tsx
import NetlifyEmailForm from '../components/NetlifyEmailForm'

// 기존 코드에서
<EmailForm onClose={() => setShowEmailOverlay(false)} />

// 다음으로 변경
<NetlifyEmailForm onClose={() => setShowEmailOverlay(false)} />
```

## 🎯 Mailto 링크 (가장 간단)

### 설정 방법
`src/app/page.tsx`에서:
```tsx
import SimpleMailtoForm from '../components/SimpleMailtoForm'

// 기존 코드에서
<EmailForm onClose={() => setShowEmailOverlay(false)} />

// 다음으로 변경
<SimpleMailtoForm onClose={() => setShowEmailOverlay(false)} />
```

### 특징
- 설정 불필요
- 사용자 이메일 클라이언트에서 전송
- 가장 간단한 방법

## 🔧 사용법

1. 원하는 방법 선택
2. 해당 컴포넌트로 교체
3. 필요한 설정 완료
4. 이메일 카드 클릭하여 테스트

## ⚠️ 주의사항

- **Web3Forms**: Access Key를 코드에 직접 입력 (보안상 프로덕션에서는 환경변수 사용 권장)
- **Formspree**: 무료 플랜은 월 50개 제한
- **Netlify Forms**: Netlify 호스팅 시에만 사용 가능
- **Mailto**: 사용자 환경에 따라 동작이 다를 수 있음

## 🆘 문제 해결

### 이메일이 전송되지 않는 경우
1. Access Key가 올바른지 확인
2. 네트워크 연결 상태 확인
3. 브라우저 콘솔에서 오류 메시지 확인

### 스팸으로 분류되는 경우
1. 이메일 서비스 제공업체의 정책 확인
2. 발신자 이메일 주소 신뢰성 확인
