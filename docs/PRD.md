# Developer MBTI - 제품 기획서 (PRD)

**작성일**: 2026-01-07  
**버전**: 1.0  
**작성자**: 용섭

---

## 1. 제품 개요

### 1.1 프로젝트명
**Developer MBTI** - 개발자 특화 성향 검사 서비스

### 1.2 목적
개발자의 업무 스타일, 협업 방식, 학습 성향을 MBTI 프레임워크로 분석하여 16가지 개발자 유형으로 분류하고, 이를 통해 자기 이해와 팀 빌딩에 도움을 주는 바이럴 웹 서비스

### 1.3 핵심 가치
- **재미**: 공감 가능한 개발자 시나리오 기반 질문
- **인사이트**: 실제 업무에 적용 가능한 구체적인 피드백
- **공유**: 쉬운 공유 기능으로 개발자 커뮤니티 내 자연스러운 확산

### 1.4 타겟 유저
- **주 타겟**: 경력 1-10년 차 개발자
- **부 타겟**: 개발 공부 중인 학생, 개발팀 리더/관리자

---

## 2. 목표 및 성공 지표

### 2.1 정량적 목표 (3개월 기준)
- 누적 검사 완료: 10,000명
- 일일 활성 사용자: 500명
- 공유 클릭률: 30% 이상
- 검사 완료율: 70% 이상 (시작한 사람 중)

### 2.2 정성적 목표
- 개발자 커뮤니티(Reddit, 디스코드, 슬랙)에서 자발적 공유 발생
- "재밌다", "공감된다"는 긍정적 피드백
- 블로그/유튜브 등 2차 콘텐츠 생성

---

## 3. 핵심 기능

### 3.1 성향 검사 (Core)
**질문 구조**
- 총 28개 질문 (E/I, S/N, T/F, J/P 각 7문항)
- 5점 척도 응답: 매우 그렇다(+2) / 그렇다(+1) / 보통(0) / 아니다(-1) / 전혀 아니다(-2)
- 고정된 순서 (랜덤화하지 않음)
  - 이유: 사용자 간 비교 가능성, 일관된 경험 제공

**점수 계산 로직**
- 각 축별로 양방향 점수 합산
  - 예: E 질문 점수 합 vs I 질문 점수 합
- 절댓값이 큰 쪽으로 성향 결정
- 동점일 경우: 첫 번째 문항의 성향 따름 (Tie-breaking rule)
- 최종 결과: 16가지 조합 중 하나 (예: INTJ, ENFP)

**응답 저장**
- 진행 중: 로컬스토리지에 임시 저장 (새로고침해도 복원)
- 완료 후: 백엔드로 전송하여 DB 저장

### 3.2 결과 페이지
**표시 정보**
- MBTI 타입 코드 (예: INTJ)
- 유형명 (예: "완벽주의 아키텍트")
- 4개 축별 점수 그래프
  - 예: E 30% ←●────→ I 70%
- 상세 설명
  - 주요 특징 (3-5개 bullet points)
  - 코딩 스타일
  - 추천 직무/역할
  - 어울리는 기술 스택 (3-5개)
  - 잘 맞는 동료 유형 (2-3개)
- 전체 통계: "당신과 같은 유형은 전체의 8.5%입니다"

**고유 URL**
- 형식: `/result/{share_token}`
- share_token: 12자리 랜덤 문자열 (예: `a3Bf9Xk2Qp1z`)
- 이 URL로 언제든 결과 재확인 가능

### 3.3 공유 기능
**지원 채널**
- 카카오톡 공유
- 트위터 공유
- 페이스북 공유
- URL 복사

**OG 메타태그**
- 각 MBTI 타입별 미리 제작된 이미지 (16개)
- 공유 시 카드 형태로 미리보기 표시
  - 제목: "나는 [유형명] 입니다"
  - 설명: "Developer MBTI로 내 개발자 유형을 알아보세요"
  - 이미지: 해당 유형 대표 이미지

### 3.4 통계 페이지
**제공 정보**
- 전체 참여자 수
- 유형별 분포 (막대 그래프)
- 가장 많은 유형 Top 3
- 각 축별 평균 비율 (E vs I 등)

**업데이트 주기**
- 실시간 반영 (결과 저장 시 즉시 통계 업데이트)
- 단, API 응답은 10초 캐싱 (성능 최적화)

---

## 4. 사용자 플로우

### 4.1 전체 플로우
```
[랜딩 페이지 방문]
    ↓
[서비스 소개 확인]
    ↓
["검사 시작" 버튼 클릭]
    ↓
[질문 1/28 페이지]
    ↓ 5점 척도 선택
[질문 2/28 페이지]
    ↓ ...
[질문 28/28 페이지]
    ↓ "결과 보기" 클릭
[로딩 화면 (1-2초)]
    ↓ 백엔드에서 MBTI 계산 및 저장
[결과 페이지]
    ↓ 공유 버튼 클릭 or URL 복사
[결과 공유 완료]
```

### 4.2 예외 플로우
**중간에 이탈 후 재방문**
- 로컬스토리지에 진행 상황 저장
- 재방문 시 "이어서 하기" / "처음부터 하기" 선택 가능

**네트워크 에러**
- 결과 제출 실패 시 "재시도" 버튼 제공
- 로컬스토리지에 답변 보관되어 있어 데이터 손실 없음

**직접 URL 접근**
- `/result/{share_token}`: 유효한 토큰이면 결과 표시
- `/result/{invalid_token}`: 404 페이지 (잘못된 링크 안내)

---

## 5. 화면 설계

### 5.1 랜딩 페이지
**구성 요소**
- Hero 섹션
  - 메인 카피: "나는 어떤 개발자일까?"
  - 서브 카피: "28개의 질문으로 알아보는 나의 개발자 성향"
  - CTA: "무료로 검사 시작하기" (큰 버튼)
- 특징 소개 (3개 카드)
  - "실전 개발 시나리오": 실제 업무 상황 기반 질문
  - "16가지 개발자 유형": INTJ 아키텍트, ENFP 전도사 등
  - "즉시 공유 가능": 카카오톡, SNS로 친구와 비교
- 미니 통계
  - "지금까지 N명이 참여했어요"
  - "가장 많은 유형은 ISTJ입니다" (업데이트)
- Footer: 개발자 정보, 피드백 링크

**기술 구현**
- Next.js SSR로 빠른 초기 로딩
- 통계 데이터는 클라이언트에서 fetch

### 5.2 질문 페이지
**레이아웃**
- 상단: 프로그레스 바 (3/28 표시)
- 중앙: 질문 텍스트 (큰 폰트, 가독성 중심)
- 중하단: 5점 척도 라디오 버튼
  - [ 매우 그렇다 ] [ 그렇다 ] [ 보통 ] [ 아니다 ] [ 전혀 아니다 ]
  - 선택 시 시각적 피드백 (색상 변경)
- 하단: 네비게이션
  - [← 이전] (1번 문항에서는 비활성화)
  - [다음 →] (선택 완료 시 활성화)
  - 마지막 문항에서는 [결과 보기]

**UX 고려사항**
- 한 화면에 한 질문만 (집중도 향상)
- 키보드 단축키 지원 (1-5 숫자키, 화살표로 이전/다음)
- 모바일에서 스와이프로 이전/다음 이동

**데이터 저장**
```javascript
// 로컬스토리지 구조
{
  "answers": {
    "1": 2,  // 질문 1번에 "매우 그렇다" 선택
    "2": -1, // 질문 2번에 "아니다" 선택
    // ...
  },
  "currentQuestionIndex": 3,
  "startedAt": "2026-01-07T12:34:56Z"
}
```

### 5.3 로딩 페이지
- 애니메이션: 회전하는 로딩 스피너 또는 재미있는 메시지
  - "당신의 코드를 분석 중..."
  - "버그를 찾는 중..."
  - "커밋 히스토리를 확인 중..."
- 1-2초 후 결과 페이지로 자동 이동
- 실제로는 백엔드 API 호출 대기 시간

### 5.4 결과 페이지
**레이아웃 구조**
```
[상단]
- MBTI 코드: INTJ (큰 글씨)
- 유형명: "완벽주의 아키텍트" (캐치프레이즈 스타일)

[점수 그래프]
- E ●───────────→ I  (30% vs 70%)
- S ────●────────→ N  (45% vs 55%)
- T ──────────●─→ F  (85% vs 15%)
- J ───────●─────→ P  (60% vs 40%)

[특징 카드]
"이런 특징이 있어요"
• 전략적으로 사고하고 장기적 계획을 세웁니다
• 코드 품질과 아키텍처에 깊은 관심을 가집니다
• 논리적 토론을 즐기고 비효율을 참지 못합니다

"이런 역할이 잘 맞아요"
• 시스템 아키텍트
• 백엔드 엔지니어
• 기술 리드

"이런 기술을 선호해요"
• Clean Architecture, Domain-Driven Design
• TypeScript, Rust (타입 안정성)
• TDD, 자동화된 테스트

"이런 동료와 잘 맞아요"
• ENTP (혁신가): 아이디어 풍부, 실행력 보완
• INFP (이상주의자): 사용자 관점 제공

[통계]
"당신과 같은 유형은 전체의 8.5%입니다"

[공유 버튼]
[카카오톡] [트위터] [페이스북] [URL 복사]

[추가 액션]
[다른 유형 구경하기] [다시 검사하기]
```

**기술 구현**
- Next.js SSR: share_token으로 DB 조회하여 초기 렌더링
- OG 메타태그 동적 생성
```html
<meta property="og:title" content="나는 INTJ 완벽주의 아키텍트입니다" />
<meta property="og:description" content="Developer MBTI로 내 개발자 유형을 알아보세요" />
<meta property="og:image" content="https://example.com/og-images/INTJ.png" />
```

### 5.5 통계 페이지
**구성 요소**
- 총 참여자 수 (큰 숫자로 강조)
- 유형별 분포 (막대 그래프)
  - X축: 16개 MBTI 타입
  - Y축: 참여자 수 또는 비율(%)
- 축별 평균
  - "개발자들은 평균적으로 E 40% vs I 60% 성향입니다"
- 실시간 업데이트: "방금 전 ENFP가 추가되었습니다!" (옵션)

---

## 6. 기술 아키텍처

### 6.1 전체 구조
```
[사용자 브라우저]
    ↕ HTTPS
[Next.js Frontend (Vercel)]
    ↕ REST API
[Spring Boot Backend]
    ↕ JDBC (MyBatis)
[MariaDB]
```

### 6.2 기술 스택 세부사항

#### 프론트엔드
- **Framework**: Next.js 14+ (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion (결과 페이지)
- **차트**: Recharts (통계 페이지)
- **상태 관리**: React Context API (전역 상태 최소)
- **API 호출**: Fetch API + SWR (캐싱)
- **로컬 저장소**: LocalStorage API

#### 백엔드
- **Framework**: Spring Boot 3.x
- **언어**: Java 17+
- **빌드**: Gradle
- **ORM**: MyBatis
- **인증**: 없음 (공개 서비스)
- **캐싱**: Spring Cache (EhCache)
- **로깅**: Logback
- **API 문서**: Swagger/OpenAPI (개발용)

#### 데이터베이스
- **DBMS**: MariaDB 10.11+
- **커넥션 풀**: HikariCP
- **마이그레이션**: Flyway

#### 배포 환경
- **프론트엔드**: Vercel (자동 배포)
- **백엔드**: (환경 중립 - AWS, 회사 서버 등)
- **데이터베이스**: (환경 중립 - RDS, 온프레미스 등)

### 6.3 설계 결정 사항

#### POST 메서드 사용
**모든 API 엔드포인트는 POST 메서드만 사용합니다.**

**이유**:
1. **URL 깔끔함**: GET 방식은 쿼리 파라미터가 URL에 노출되어 지저분함
2. **데이터 은닉**: 민감한 정보(share_token 등)가 URL에 표시되지 않음
3. **일관성**: 모든 요청이 동일한 방식으로 처리되어 코드 통일성 향상
4. **로깅 편의성**: 모든 요청 데이터가 Body에 있어 로깅 처리 일관됨

**예시**:
```
❌ GET /api/results/a3Bf9Xk2Qp1z  (토큰이 URL에 노출)
✅ POST /api/results/get  + Body: {"shareToken": "a3Bf9Xk2Qp1z"}
```

#### VARCHAR 시간 형식 (YYYYMMDDHHMMSS)
**모든 시간 필드는 VARCHAR(14)로 저장합니다.**

**이유**:
1. **코드 단계 계산 용이**: 문자열 연산으로 날짜 비교/계산 간단
   ```java
   // 7일 전 데이터 필터링
   String sevenDaysAgo = getDateString(LocalDateTime.now().minusDays(7));
   WHERE created_at >= #{sevenDaysAgo}
   ```
2. **타임존 이슈 회피**: 문자열이므로 타임존 변환 걱정 없음
3. **정렬 편의성**: 문자열 정렬만으로 시간순 정렬 가능
   ```sql
   ORDER BY created_at DESC  -- 최신순
   ```
4. **가독성**: 로그나 쿼리 결과에서 직관적으로 시간 확인 가능
   ```
   20260107153045 → 2026년 1월 7일 15시 30분 45초
   ```

**형식**: YYYYMMDDHHMMSS (14자리)
- 예: `20260107153045` = 2026년 1월 7일 15시 30분 45초

**DB 함수 사용**:
```sql
-- INSERT 시
DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')

-- 조회 시 변환 (필요한 경우)
STR_TO_DATE(created_at, '%Y%m%d%H%i%S')
```

### 6.4 API 설계 원칙
- **모든 API는 POST 메서드 사용** (URL에 데이터 노출 방지, 깔끔한 인터페이스)
- JSON 응답 형식
- HTTP 상태 코드 표준 준수
  - 200: 성공
  - 400: 잘못된 요청
  - 500: 서버 에러
- camelCase 네이밍 (JavaScript 컨벤션과 일관성)
- **시간 형식**: VARCHAR(14) - YYYYMMDDHHMMSS (코드 단계 시간 계산 용이)
  - 예: `20260107153045` = 2026년 1월 7일 15시 30분 45초
- 에러 응답 구조 통일
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "질문 ID 1은 유효하지 않습니다",
    "timestamp": "20260107153045"
  }
}
```

---

## 7. API 명세

### 7.1 질문 조회
```
POST /api/questions/list
```

**설명**: 전체 질문 목록을 조회합니다 (28개, 고정 순서)

**Request Body**: 없음 (빈 객체 `{}` 또는 생략)

**Response** (200 OK):
```json
{
  "questions": [
    {
      "id": 1,
      "axis": "E-I",
      "direction": "E",
      "text": "새 프로젝트 시작 시 팀원들과 브레인스토밍하며 아이디어를 나누는 게 즐겁다",
      "category": "협업"
    },
    {
      "id": 2,
      "axis": "E-I",
      "direction": "I",
      "text": "버그를 만났을 때 혼자 차분히 분석하는 게 더 효율적이다",
      "category": "문제해결"
    }
    // ... 26개 더
  ]
}
```

**캐싱**: 서버 메모리에 무기한 캐싱 (질문 변경 시만 갱신)

---

### 7.2 결과 제출 및 계산
```
POST /api/results
```

**설명**: 28개 질문에 대한 답변을 제출하고 MBTI 유형을 계산합니다

**Request Body**:
```json
{
  "answers": [
    {"questionId": 1, "score": 2},
    {"questionId": 2, "score": -1},
    {"questionId": 3, "score": 0},
    // ... 25개 더 (총 28개)
  ]
}
```

**Request 유효성 검사**:
- `answers` 배열은 정확히 28개 요소 포함
- 각 `questionId`는 1-28 범위
- 각 `score`는 -2, -1, 0, 1, 2 중 하나
- 중복된 `questionId` 없음

**Response** (200 OK):
```json
{
  "mbtiType": "INTJ",
  "scores": {
    "E": 3,
    "I": 11,
    "S": 5,
    "N": 9,
    "T": 12,
    "F": 2,
    "J": 10,
    "P": 4
  },
  "shareToken": "a3Bf9Xk2Qp1z",
  "createdAt": "20260107153045"
}
```

**백엔드 로직**:
1. 답변 유효성 검증
2. 각 축별 점수 계산
   - E/I축: E 방향 질문들의 점수 합 vs I 방향 질문들의 점수 합
   - 절댓값이 큰 쪽 선택
   - 동점 시: 해당 축의 첫 번째 질문 방향 선택
3. 4개 축 조합하여 MBTI 타입 결정 (예: I + N + T + J = INTJ)
4. DB에 결과 저장 (share_token 생성)
5. 통계 테이블 업데이트 (해당 MBTI 타입 count +1)

**Error Responses**:
- 400: 잘못된 요청 (답변 개수 부족, 잘못된 questionId 등)
```json
{
  "error": {
    "code": "INVALID_ANSWERS",
    "message": "답변은 정확히 28개여야 합니다",
    "timestamp": "20260107153045"
  }
}
```

---

### 7.3 결과 조회
```
POST /api/results/get
```

**설명**: 공유 토큰으로 저장된 결과를 조회합니다

**Request Body**:
```json
{
  "shareToken": "a3Bf9Xk2Qp1z"
}
```

**Response** (200 OK):
```json
{
  "mbtiType": "INTJ",
  "scores": {
    "E": 3,
    "I": 11,
    "S": 5,
    "N": 9,
    "T": 12,
    "F": 2,
    "J": 10,
    "P": 4
  },
  "typeInfo": {
    "title": "완벽주의 아키텍트",
    "description": "체계적인 설계와 효율성을 추구하는 전략가형 개발자입니다.",
    "characteristics": [
      "전략적으로 사고하고 장기적 계획을 세웁니다",
      "코드 품질과 아키텍처에 깊은 관심을 가집니다",
      "논리적 토론을 즐기고 비효율을 참지 못합니다"
    ],
    "suitableRoles": ["시스템 아키텍트", "백엔드 엔지니어", "기술 리드"],
    "techStack": ["Clean Architecture", "TypeScript", "TDD"],
    "compatibility": ["ENTP", "INFP"]
  },
  "statistics": {
    "percentage": 8.5,
    "rank": 7
  },
  "createdAt": "20260107153045"
}
```

**Error Responses**:
- 400: shareToken 누락
```json
{
  "error": {
    "code": "MISSING_SHARE_TOKEN",
    "message": "shareToken이 필요합니다",
    "timestamp": "20260107153045"
  }
}
```
- 404: 토큰을 찾을 수 없음
```json
{
  "error": {
    "code": "RESULT_NOT_FOUND",
    "message": "해당 결과를 찾을 수 없습니다",
    "timestamp": "20260107153045"
  }
}
```

**캐싱**: 없음 (매번 DB 조회)

---

### 7.4 MBTI 유형 정보 조회
```
POST /api/types/get
```

**설명**: 특정 MBTI 유형의 상세 정보를 조회합니다

**Request Body**:
```json
{
  "mbtiCode": "INTJ"
}
```

**Response** (200 OK):
```json
{
  "mbtiCode": "INTJ",
  "title": "완벽주의 아키텍트",
  "description": "체계적인 설계와 효율성을 추구하는 전략가형 개발자입니다.",
  "characteristics": [
    "전략적으로 사고하고 장기적 계획을 세웁니다",
    "코드 품질과 아키텍처에 깊은 관심을 가집니다",
    "논리적 토론을 즐기고 비효율을 참지 못합니다"
  ],
  "codingStyle": "설계 우선, 리팩토링보다 초기 아키텍처에 집중",
  "suitableRoles": ["시스템 아키텍트", "백엔드 엔지니어", "기술 리드"],
  "techStack": ["Clean Architecture", "Domain-Driven Design", "TypeScript", "Rust", "TDD"],
  "compatibility": ["ENTP", "INFP"],
  "imageUrl": "/images/types/INTJ.png"
}
```

**캐싱**: 서버 메모리에 무기한 캐싱 (유형 정보 변경 시만 갱신)

**Error Responses**:
- 400: mbtiCode 누락
```json
{
  "error": {
    "code": "MISSING_MBTI_CODE",
    "message": "mbtiCode가 필요합니다",
    "timestamp": "20260107153045"
  }
}
```
- 404: 잘못된 MBTI 코드
```json
{
  "error": {
    "code": "TYPE_NOT_FOUND",
    "message": "MBTI 코드 XXXX는 존재하지 않습니다",
    "timestamp": "20260107153045"
  }
}
```

---

### 7.5 전체 통계 조회
```
POST /api/statistics/get
```

**설명**: 전체 MBTI 유형별 통계를 조회합니다

**Request Body**: 없음 (빈 객체 `{}` 또는 생략)

**Response** (200 OK):
```json
{
  "totalCount": 12345,
  "distribution": [
    {
      "mbtiType": "ISTJ",
      "count": 1543,
      "percentage": 12.5
    },
    {
      "mbtiType": "INTJ",
      "count": 1049,
      "percentage": 8.5
    }
    // ... 14개 더 (총 16개)
  ],
  "axisAverages": {
    "E_vs_I": {"E": 38.5, "I": 61.5},
    "S_vs_N": {"S": 42.0, "N": 58.0},
    "T_vs_F": {"T": 71.2, "F": 28.8},
    "J_vs_P": {"J": 55.3, "P": 44.7}
  },
  "topThree": ["ISTJ", "INTJ", "INTP"],
  "updatedAt": "20260107153045"
}
```

**캐싱**: 10초 TTL (빈번한 조회 예상, 실시간성 덜 중요)

---

### 7.6 Health Check
```
POST /api/health
```

**설명**: 서버 상태 확인 (모니터링용)

**Request Body**: 없음 (빈 객체 `{}` 또는 생략)

**Response** (200 OK):
```json
{
  "status": "UP",
  "timestamp": "20260107153045",
  "components": {
    "database": "UP",
    "cache": "UP"
  }
}
```

---

## 8. 데이터베이스 스키마

### 8.1 ERD 개요
```
questions (질문)
    ↓
mbti_types (유형 정보)
    ↑
test_results (결과) → mbti_statistics (통계)
```

### 8.2 테이블 상세

#### questions
```sql
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    axis VARCHAR(4) NOT NULL COMMENT 'MBTI 축: E-I, S-N, T-F, J-P',
    direction VARCHAR(1) NOT NULL COMMENT '어느 쪽 성향: E, I, S, N, T, F, J, P',
    text TEXT NOT NULL COMMENT '질문 내용',
    category VARCHAR(50) COMMENT '질문 카테고리 (협업, 문제해결 등)',
    display_order INT NOT NULL COMMENT '화면 표시 순서 (1-28)',
    is_active BOOLEAN DEFAULT TRUE COMMENT '활성화 여부',
    created_at VARCHAR(14) NOT NULL COMMENT '생성일시 YYYYMMDDHHMMSS',
    updated_at VARCHAR(14) NOT NULL COMMENT '수정일시 YYYYMMDDHHMMSS',
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**데이터 예시**:
```sql
INSERT INTO questions (axis, direction, text, category, display_order, created_at, updated_at) VALUES
('E-I', 'E', '새 프로젝트 시작 시 팀원들과 브레인스토밍하며 아이디어를 나누는 게 즐겁다', '협업', 1, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('E-I', 'I', '버그를 만났을 때 혼자 차분히 분석하는 게 더 효율적이다', '문제해결', 2, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
-- ... 26개 더
```

---

#### mbti_types
```sql
CREATE TABLE mbti_types (
    mbti_code VARCHAR(4) PRIMARY KEY COMMENT 'MBTI 코드: INTJ, ENFP 등',
    title VARCHAR(100) NOT NULL COMMENT '유형 이름: 완벽주의 아키텍트',
    description TEXT COMMENT '유형 설명',
    characteristics JSON COMMENT '특징 목록 (배열)',
    coding_style VARCHAR(200) COMMENT '코딩 스타일 요약',
    suitable_roles JSON COMMENT '추천 직무 (배열)',
    tech_stack JSON COMMENT '어울리는 기술 스택 (배열)',
    compatibility JSON COMMENT '잘 맞는 유형 (배열)',
    image_url VARCHAR(255) COMMENT '대표 이미지 경로',
    created_at VARCHAR(14) NOT NULL COMMENT '생성일시 YYYYMMDDHHMMSS',
    updated_at VARCHAR(14) NOT NULL COMMENT '수정일시 YYYYMMDDHHMMSS'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**데이터 예시**:
```sql
INSERT INTO mbti_types VALUES (
    'INTJ',
    '완벽주의 아키텍트',
    '체계적인 설계와 효율성을 추구하는 전략가형 개발자입니다.',
    JSON_ARRAY(
        '전략적으로 사고하고 장기적 계획을 세웁니다',
        '코드 품질과 아키텍처에 깊은 관심을 가집니다',
        '논리적 토론을 즐기고 비효율을 참지 못합니다'
    ),
    '설계 우선, 리팩토링보다 초기 아키텍처에 집중',
    JSON_ARRAY('시스템 아키텍트', '백엔드 엔지니어', '기술 리드'),
    JSON_ARRAY('Clean Architecture', 'TypeScript', 'TDD'),
    JSON_ARRAY('ENTP', 'INFP'),
    '/images/types/INTJ.png',
    DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'),
    DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')
);
-- ... 15개 더
```

---

#### test_results
```sql
CREATE TABLE test_results (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    mbti_type VARCHAR(4) NOT NULL COMMENT 'MBTI 결과 코드',
    e_score INT NOT NULL COMMENT 'E 방향 점수 합',
    i_score INT NOT NULL COMMENT 'I 방향 점수 합',
    s_score INT NOT NULL COMMENT 'S 방향 점수 합',
    n_score INT NOT NULL COMMENT 'N 방향 점수 합',
    t_score INT NOT NULL COMMENT 'T 방향 점수 합',
    f_score INT NOT NULL COMMENT 'F 방향 점수 합',
    j_score INT NOT NULL COMMENT 'J 방향 점수 합',
    p_score INT NOT NULL COMMENT 'P 방향 점수 합',
    share_token VARCHAR(12) UNIQUE NOT NULL COMMENT '공유용 고유 토큰',
    created_at VARCHAR(14) NOT NULL COMMENT '생성일시 YYYYMMDDHHMMSS',
    FOREIGN KEY (mbti_type) REFERENCES mbti_types(mbti_code),
    UNIQUE INDEX idx_share_token (share_token),
    INDEX idx_mbti_type (mbti_type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**share_token 생성 규칙**:
- 12자리 랜덤 문자열
- 사용 문자: a-z, A-Z, 0-9 (대소문자 구분)
- 중복 체크 필수
- 생성 예: `a3Bf9Xk2Qp1z`

---

#### mbti_statistics
```sql
CREATE TABLE mbti_statistics (
    mbti_type VARCHAR(4) PRIMARY KEY COMMENT 'MBTI 코드',
    count INT DEFAULT 0 NOT NULL COMMENT '해당 유형 응시자 수',
    updated_at VARCHAR(14) NOT NULL COMMENT '수정일시 YYYYMMDDHHMMSS',
    FOREIGN KEY (mbti_type) REFERENCES mbti_types(mbti_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**초기 데이터**:
```sql
-- 16개 MBTI 타입 모두 0으로 초기화
INSERT INTO mbti_statistics (mbti_type, count, updated_at) VALUES
('INTJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('INTP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ENTJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ENTP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('INFJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('INFP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ENFJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ENFP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('ISTJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ISFJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ESTJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ESFJ', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('ISTP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ISFP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ESTP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')), 
('ESFP', 0, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));
```

**업데이트 로직**:
- `test_results` INSERT 시 트랜잭션으로 통계 업데이트
```sql
-- 트랜잭션 예시
START TRANSACTION;
INSERT INTO test_results (..., created_at) VALUES (..., DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));
UPDATE mbti_statistics 
SET count = count + 1, 
    updated_at = DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')
WHERE mbti_type = 'INTJ';
COMMIT;
```

---

### 8.3 초기 데이터 마이그레이션
**Flyway 스크립트 구조**:
```
src/main/resources/db/migration/
├── V1__create_tables.sql           # 테이블 생성
├── V2__insert_questions.sql        # 28개 질문 삽입
├── V3__insert_mbti_types.sql       # 16개 유형 정보 삽입
└── V4__insert_statistics_init.sql  # 통계 초기화
```

---

## 9. 비기능 요구사항

### 9.1 성능
**응답 시간**
- 질문 조회 (GET /api/questions): < 100ms (캐싱)
- 결과 제출 (POST /api/results): < 500ms
- 결과 조회 (GET /api/results/{token}): < 200ms
- 통계 조회 (GET /api/statistics): < 150ms (캐싱)

**동시 사용자**
- 목표: 100명 동시 접속 처리 가능
- 피크 시간: 1000 req/min 처리

**데이터베이스**
- 커넥션 풀: 최소 10, 최대 50
- 쿼리 타임아웃: 5초

### 9.2 확장성
**수평 확장**
- Spring Boot: Stateless 설계로 여러 인스턴스 실행 가능
- 로드 밸런서 뒤에 배치
- 세션 없음 (JWT 대신 share_token 사용)

**캐싱 전략**
- 질문 목록: 애플리케이션 시작 시 메모리 로드, 무기한 유지
- MBTI 유형 정보: 애플리케이션 시작 시 메모리 로드, 무기한 유지
- 통계: 10초 TTL EhCache

**데이터베이스 확장**
- Read Replica 추가 가능 (통계 조회용)
- 파티셔닝: test_results 테이블 (created_at 기준)

### 9.3 보안
**API 보호**
- Rate Limiting: IP 기반, 1분당 최대 30 요청
  - POST /api/results: 1분당 3회 (스팸 방지)
  - GET 요청: 1분당 30회
- CORS 설정: 프론트엔드 도메인만 허용
- SQL Injection: MyBatis 파라미터 바인딩 사용
- XSS: 프론트에서 입력 sanitize (질문은 readonly)

**데이터 보호**
- 개인정보 수집 없음 (IP도 저장 안 함)
- share_token만으로 결과 조회 (인증 불필요)

**HTTPS**
- 프론트엔드: Vercel 자동 HTTPS
- 백엔드: 배포 환경에서 HTTPS 적용

### 9.4 가용성
**목표 Uptime**: 99.5% (월 3.6시간 다운타임 허용)

**모니터링**
- Health Check Endpoint: GET /api/health
- 로그 수집: Logback → 파일 또는 중앙 로깅 시스템
- 에러 알림: 5xx 에러 발생 시 알림 (Slack/이메일)

**백업**
- 데이터베이스: 일일 자동 백업
- 백업 보관: 최근 7일치

### 9.5 유지보수성
**코드 품질**
- 테스트 커버리지: 핵심 로직 80% 이상
- API 문서: Swagger 자동 생성
- 로깅 레벨:
  - PROD: INFO
  - DEV: DEBUG

**버전 관리**
- Git 브랜치 전략: Git Flow
  - main: 운영 배포
  - develop: 개발 통합
  - feature/*: 기능 개발

---

## 10. 개발 단계 및 우선순위

### Phase 1: MVP (2주)
**목표**: 핵심 기능 완성, 내부 테스트 가능 수준

**프론트엔드**
- [ ] 랜딩 페이지
- [ ] 질문 페이지 (28문항)
- [ ] 로컬스토리지 저장/복원
- [ ] 결과 페이지 (기본 버전)
- [ ] 로딩 화면

**백엔드**
- [ ] Spring Boot 프로젝트 초기 세팅
- [ ] MariaDB 연결, Flyway 설정
- [ ] 테이블 생성 + 초기 데이터 삽입 (질문 28개, 유형 16개)
- [ ] API 구현
  - POST /api/questions/list
  - POST /api/results/submit
  - POST /api/results/get
  - POST /api/types/get
- [ ] MBTI 계산 로직
- [ ] 캐싱 설정

**통합**
- [ ] 프론트-백 API 연동
- [ ] 에러 처리

**배포**
- [ ] Next.js → Vercel
- [ ] Spring Boot → 테스트 서버

---

### Phase 2: 공유 기능 및 SEO (1주)
**목표**: 바이럴 확산 준비

**프론트엔드**
- [ ] 공유 버튼 (카카오톡, 트위터, 페이스북, URL 복사)
- [ ] OG 메타태그 동적 생성
- [ ] 16개 유형별 OG 이미지 제작
- [ ] 모바일 최적화

**백엔드**
- [ ] Rate Limiting 적용
- [ ] CORS 설정

**SEO**
- [ ] robots.txt, sitemap.xml
- [ ] 구조화된 데이터 (JSON-LD)

---

### Phase 3: 통계 및 분석 (3일)
**목표**: 사용자에게 인사이트 제공

**프론트엔드**
- [ ] 통계 페이지
- [ ] 차트 라이브러리 적용 (Recharts)
- [ ] 실시간 참여자 수 표시

**백엔드**
- [ ] POST /api/statistics/get 구현
- [ ] 통계 캐싱 (10초 TTL)

---

### Phase 4: 최적화 및 개선 (지속)
**목표**: 사용자 경험 향상, 성능 개선

**기능 개선**
- [ ] "다른 유형 구경하기" 페이지 (16개 모두 나열)
- [ ] 질문 카테고리별 필터 (통계 페이지)
- [ ] 애니메이션 효과 강화

**성능 최적화**
- [ ] Next.js 이미지 최적화
- [ ] 번들 크기 최소화
- [ ] DB 인덱스 튜닝

**모니터링**
- [ ] 로그 분석 (어떤 유형이 많은지, 이탈률 등)
- [ ] 에러 추적 (Sentry 도입 검토)

---

### Phase 5: 관리자 기능 (선택, 추후)
- [ ] 관리자 페이지 (질문 CRUD)
- [ ] 통계 대시보드 (일별 참여자 추이 등)
- [ ] A/B 테스트 (질문 버전 관리)

---

## 11. 리스크 및 제약사항

### 11.1 리스크
**기술적 리스크**
1. **부하 급증**: 예상보다 많은 트래픽 발생 시
   - 완화: 캐싱 강화, CDN 활용, DB Read Replica
2. **share_token 충돌**: 랜덤 생성 시 중복 가능성
   - 완화: 12자리 = 62^12 조합 (충돌 확률 극히 낮음), 중복 체크 로직
3. **스팸 공격**: 무한 결과 제출
   - 완화: Rate Limiting, POST 요청 1분당 3회 제한

**운영 리스크**
1. **질문 변경 시 기존 데이터 무효화**: 통계가 섞임
   - 완화: 질문 버전 관리 (추후 고려), 초기에 신중하게 질문 확정
2. **바이럴 실패**: 사용자 유입 없음
   - 완화: 개발자 커뮤니티 타겟 마케팅, SEO 최적화

### 11.2 제약사항
**기술적 제약**
- 회원 기능 없음: 개인화 제한, 재검사 시 이전 결과 비교 불가
- 로컬스토리지: 브라우저 의존, 시크릿 모드에서 저장 안 됨
- 모바일 앱 없음: 푸시 알림, 네이티브 기능 사용 불가

**비즈니스 제약**
- 수익 모델 없음: 광고나 과금 계획 없음 (순수 무료)
- 인력: 개발자 1명 (용섭)
- 예산: 최소 비용 (Vercel 무료 티어, DB 소규모)

---

## 12. 성공 지표 측정

### 12.1 KPI (Key Performance Indicators)
**핵심 지표**
1. **검사 완료 수**: 누적 test_results 레코드 수
2. **공유 클릭률**: (공유 버튼 클릭 / 결과 페이지 방문) %
3. **검사 완료율**: (결과 제출 / 첫 질문 시작) %
4. **일일 활성 사용자** (DAU)

**부가 지표**
- 평균 검사 소요 시간 (프론트 측정)
- 유형별 분포 편향도 (일부 유형에 쏠림 체크)
- 이탈 구간 (몇 번째 질문에서 많이 이탈하는지)

### 12.2 분석 도구
- **Google Analytics**: 페이지뷰, 이탈률, 세션 시간
- **백엔드 로그**: API 호출 빈도, 에러율
- **DB 쿼리**: 통계 테이블로 유형별 분포 분석

---

## 13. 향후 확장 아이디어

### 13.1 기능 확장
- **팀 비교 기능**: 팀원들 결과 모아서 분포 확인
- **회사별 통계**: "우리 회사 개발자들은 ISTJ가 가장 많아요"
- **영문 버전**: 글로벌 확산
- **개발 스타일 퀴즈**: MBTI 외 다른 성향 테스트

### 13.2 수익화 (선택)
- **기업용 유료 버전**: 팀 분석 리포트 제공
- **채용 연계**: 유형별 맞춤 채용 공고 추천
- **광고**: 최소한의 디스플레이 광고

### 13.3 기술 확장
- **모바일 앱**: React Native 또는 Flutter
- **AI 추천**: 유형별 추천 기술 스택, 강의
- **실시간 대시보드**: WebSocket으로 실시간 통계 업데이트

---

## 14. 부록

### 14.1 용어 정의
- **MBTI**: Myers-Briggs Type Indicator, 16가지 성격 유형 분류 체계
- **share_token**: 결과 공유를 위한 고유 식별자
- **축(Axis)**: MBTI의 4가지 양극성 (E-I, S-N, T-F, J-P)
- **방향(Direction)**: 각 축의 한쪽 극 (E, I, S, N, T, F, J, P)

### 14.2 참고 자료
- MBTI 공식 이론: https://www.myersbriggs.org/
- Next.js 문서: https://nextjs.org/docs
- Spring Boot 문서: https://spring.io/projects/spring-boot
- Tailwind CSS: https://tailwindcss.com/docs

---

## 변경 이력
| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|----------|--------|
| 1.0 | 2026-01-07 | 초안 작성 | 용섭 |

---

**문서 종료**
