<div align="center">

<img src="frontend/public/favicon/favicon-96x96.png" width="80" alt="TypeCraft Logo" />

# TypeCraft

**28개의 질문으로 알아보는 나의 개발자 성향**

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://typecraft.kr)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MariaDB](https://img.shields.io/badge/MariaDB-10.11-003545?style=flat-square&logo=mariadb)](https://mariadb.org)

[**🚀 지금 해보기 →**](https://typecraft.kr)

</div>

---

## 소개

TypeCraft는 개발자를 위한 MBTI 성향 검사 서비스입니다.
E/I, S/N, T/F, J/P 4개 축 각 7문항 총 28개의 질문에 답하면 16가지 개발자 유형 중 나에게 맞는 유형을 알 수 있습니다.
결과는 고유 링크와 카카오톡으로 친구에게 공유할 수 있습니다.

## 스크린샷

| 홈 | 퀴즈 | 결과 |
|:---:|:---:|:---:|
| 검사 시작 화면 | 28개 질문 응답 | MBTI 유형 및 성향 분석 |

## 기술 스택

| 영역 | 기술 |
|---|---|
| Frontend | Next.js (Pages Router), React, Tailwind CSS 4, Framer Motion |
| Backend | Spring Boot 4, Java 17, MyBatis, MariaDB |
| 인프라 | Vercel (Frontend), Railway (Backend) |
| 인증/보안 | Google reCAPTCHA v3 |
| 공유 | Kakao SDK (카카오톡 공유), Dynamic OG Image |

## 프로젝트 구조

```
TypeCraft/
├── frontend/          # Next.js 앱
│   └── src/
│       ├── pages/     # 라우팅 (index, quiz, loading, result, statistics)
│       ├── components/
│       └── lib/
├── backend/           # Spring Boot 앱
│   └── src/main/java/com/codeman/typecraft/
│       ├── common/    # CORS, 예외 처리
│       ├── question/  # 28개 질문
│       ├── result/    # 결과 및 공유 토큰
│       ├── statistics/# 통계
│       └── type/      # 16가지 MBTI 유형 정의
└── docs/              # PRD, 질문 목록, 점수 계산 알고리즘
```

## 로컬 실행

### 사전 요구사항

- Node.js 18+
- Java 17+
- MariaDB 10.11+

### 백엔드

```bash
cd backend

# application.yml 설정 (application-example.yml 참고)
cp src/main/resources/application-example.yml src/main/resources/application.yml

# 실행
./mvnw spring-boot:run          # Linux/Mac
mvnw.cmd spring-boot:run        # Windows
```

### 프론트엔드

```bash
cd frontend

# 환경변수 설정
cp .env.example .env.local
# .env.local 편집 후 키 입력

npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### 환경변수

| 변수명 | 설명 |
|---|---|
| `BACKEND_URL` | 백엔드 API URL |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 사이트 키 |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | Kakao JavaScript 키 |

## 문서

- [PRD](./docs/PRD.md) — 기획 및 요구사항
- [QUESTIONS](./docs/QUESTIONS.md) — 28개 질문 목록
- [SCORING](./docs/SCORING.md) — 점수 계산 알고리즘
