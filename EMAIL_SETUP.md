# 📧 이메일 전송 기능 설정 가이드

이 포트폴리오 웹사이트에서 실제 이메일을 전송할 수 있도록 EmailJS를 설정하는 방법입니다.

## 🚀 EmailJS 설정 단계

### 1. EmailJS 계정 생성
1. [https://www.emailjs.com/](https://www.emailjs.com/)에 접속
2. "Sign Up" 버튼을 클릭하여 계정 생성
3. 이메일 인증 완료

### 2. 이메일 서비스 연결
1. Dashboard에서 "Email Services" 클릭
2. "Add New Service" 클릭
3. Gmail, Outlook 등 원하는 이메일 서비스 선택
4. 이메일 계정 연결 (Gmail의 경우 OAuth 인증)

### 3. 이메일 템플릿 생성
1. Dashboard에서 "Email Templates" 클릭
2. "Create New Template" 클릭
3. 다음 템플릿 내용 사용:

```
Subject: 포트폴리오에서 새로운 메시지가 도착했습니다

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
이 메시지는 포트폴리오 웹사이트에서 전송되었습니다.
```

### 4. 환경변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용 추가:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 5. 값 찾기 방법
- **Service ID**: Email Services 페이지에서 확인
- **Template ID**: Email Templates 페이지에서 확인
- **Public Key**: Account > API Keys 페이지에서 확인

## 🔧 사용법

1. 환경변수 설정 완료 후 개발 서버 재시작
2. Contact 섹션의 Email 카드 클릭
3. 이메일 폼 작성 후 전송
4. 설정한 이메일 주소로 메시지 수신

## ⚠️ 주의사항

- EmailJS 무료 플랜: 월 200개 이메일 제한
- 스팸 방지를 위해 이메일 서비스 제공업체의 정책 확인
- 프로덕션 배포 시 환경변수 보안 확인

## 🆘 문제 해결

### 이메일이 전송되지 않는 경우
1. 환경변수가 올바르게 설정되었는지 확인
2. EmailJS 서비스가 활성화되어 있는지 확인
3. 브라우저 콘솔에서 오류 메시지 확인

### 템플릿 오류
1. 템플릿 변수명이 정확한지 확인 ({{from_name}}, {{from_email}}, {{message}})
2. 템플릿이 활성화되어 있는지 확인
