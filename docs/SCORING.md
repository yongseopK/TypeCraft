# Developer MBTI - 점수 계산 공식

**버전**: 1.0  
**작성일**: 2026-01-07

---

## 1. 기본 원리

### 1.1 응답 점수 매핑
사용자가 선택한 5점 척도를 점수로 변환:

| 선택지 | 점수 |
|--------|------|
| 매우 그렇다 | +2 |
| 그렇다 | +1 |
| 보통 | 0 |
| 아니다 | -1 |
| 전혀 아니다 | -2 |

### 1.2 MBTI 4개 축
- **E/I**: 외향(Extraversion) vs 내향(Introversion)
- **S/N**: 감각(Sensing) vs 직관(Intuition)
- **T/F**: 사고(Thinking) vs 감정(Feeling)
- **J/P**: 판단(Judging) vs 인식(Perceiving)

---

## 2. 점수 계산 프로세스

### 단계 1: 질문별 방향 확인
각 질문은 특정 방향(E, I, S, N, T, F, J, P)에 해당

**예시**:
- 질문 1 (E 방향): "팀원들과 브레인스토밍하는 게 즐겁다"
- 질문 2 (I 방향): "혼자 차분히 분석하는 게 더 효율적이다"

### 단계 2: 방향별 점수 합산
각 방향에 해당하는 질문의 점수를 합산

**공식**:
```
각 방향 점수 = Σ (해당 방향 질문에 대한 사용자 응답 점수)
```

**예시 (E/I 축)**:
- E 방향 질문: 1, 3, 5, 6 (4개)
- I 방향 질문: 2, 4, 7 (3개)

사용자 응답:
- 질문 1 (E): +2 (매우 그렇다)
- 질문 2 (I): -1 (아니다)
- 질문 3 (E): +1 (그렇다)
- 질문 4 (I): +2 (매우 그렇다)
- 질문 5 (E): 0 (보통)
- 질문 6 (E): -2 (전혀 아니다)
- 질문 7 (I): +1 (그렇다)

계산:
```
E 점수 = (+2) + (+1) + (0) + (-2) = +1
I 점수 = (-1) + (+2) + (+1) = +2
```

### 단계 3: 축별 성향 결정

**규칙**:
1. 양쪽 점수의 **절댓값** 비교
2. 절댓값이 큰 쪽이 해당 성향
3. **동점일 경우**: 해당 축의 첫 번째 질문 방향 선택

**공식**:
```
if |E 점수| > |I 점수|:
    성향 = 'E'
else if |I 점수| > |E 점수|:
    성향 = 'I'
else:  # 동점
    성향 = 해당 축 첫 번째 질문 방향
```

**예시 (위 계산 결과)**:
```
|E 점수| = |+1| = 1
|I 점수| = |+2| = 2

2 > 1 이므로 → 성향 = 'I'
```

### 단계 4: 최종 MBTI 타입 결정
4개 축의 성향을 조합

**형식**: `[E or I][S or N][T or F][J or P]`

**예시**:
- E/I 축: I
- S/N 축: N
- T/F 축: T
- J/P 축: J

→ 최종 MBTI = **INTJ**

---

## 3. 상세 계산 예시

### 시나리오: 전체 28개 질문 응답

#### 입력 데이터
```json
{
  "answers": [
    {"questionId": 1, "score": 2},    // E
    {"questionId": 2, "score": -1},   // I
    {"questionId": 3, "score": 1},    // E
    {"questionId": 4, "score": 2},    // I
    {"questionId": 5, "score": 0},    // E
    {"questionId": 6, "score": -2},   // E
    {"questionId": 7, "score": 1},    // I
    {"questionId": 8, "score": 2},    // S
    {"questionId": 9, "score": 1},    // S
    {"questionId": 10, "score": 0},   // S
    {"questionId": 11, "score": 2},   // S
    {"questionId": 12, "score": -1},  // N
    {"questionId": 13, "score": -2},  // N
    {"questionId": 14, "score": -1},  // N
    {"questionId": 15, "score": 2},   // T
    {"questionId": 16, "score": 2},   // T
    {"questionId": 17, "score": 1},   // T
    {"questionId": 18, "score": -1},  // F
    {"questionId": 19, "score": -2},  // F
    {"questionId": 20, "score": 2},   // T
    {"questionId": 21, "score": -1},  // F
    {"questionId": 22, "score": 2},   // J
    {"questionId": 23, "score": 2},   // J
    {"questionId": 24, "score": 1},   // J
    {"questionId": 25, "score": 1},   // J
    {"questionId": 26, "score": -1},  // P
    {"questionId": 27, "score": -2},  // P
    {"questionId": 28, "score": 2}    // J
  ]
}
```

#### 계산 과정

**1단계: 방향별 점수 합산**

**E/I 축**:
```
E (질문 1, 3, 5, 6): 2 + 1 + 0 + (-2) = 1
I (질문 2, 4, 7): -1 + 2 + 1 = 2

|E| = 1, |I| = 2
2 > 1 → 성향 = 'I'
```

**S/N 축**:
```
S (질문 8, 9, 10, 11): 2 + 1 + 0 + 2 = 5
N (질문 12, 13, 14): -1 + (-2) + (-1) = -4

|S| = 5, |N| = 4
5 > 4 → 성향 = 'S'
```

**T/F 축**:
```
T (질문 15, 16, 17, 20): 2 + 2 + 1 + 2 = 7
F (질문 18, 19, 21): -1 + (-2) + (-1) = -4

|T| = 7, |F| = 4
7 > 4 → 성향 = 'T'
```

**J/P 축**:
```
J (질문 22, 23, 24, 25, 28): 2 + 2 + 1 + 1 + 2 = 8
P (질문 26, 27): -1 + (-2) = -3

|J| = 8, |P| = 3
8 > 3 → 성향 = 'J'
```

**2단계: 최종 MBTI 타입**
```
I + S + T + J = ISTJ
```

#### 출력 데이터
```json
{
  "mbtiType": "ISTJ",
  "scores": {
    "E": 1,
    "I": 2,
    "S": 5,
    "N": -4,
    "T": 7,
    "F": -4,
    "J": 8,
    "P": -3
  }
}
```

---

## 4. 동점 처리 (Tie-breaking)

### 4.1 동점 상황
양쪽 점수의 절댓값이 같을 때

**예시**:
```
E 점수 = +3
I 점수 = -3

|E| = |I| = 3 → 동점!
```

### 4.2 해결 방법
해당 축의 **첫 번째 질문 방향**을 선택

**각 축의 첫 번째 질문**:
- E/I 축: 질문 1 (E 방향) → 동점 시 'E'
- S/N 축: 질문 8 (S 방향) → 동점 시 'S'
- T/F 축: 질문 15 (T 방향) → 동점 시 'T'
- J/P 축: 질문 22 (J 방향) → 동점 시 'J'

### 4.3 코드 예시 (Java)
```java
public char determineAxis(int scoreA, int scoreB, char directionA, char directionB, char firstDirection) {
    int absA = Math.abs(scoreA);
    int absB = Math.abs(scoreB);
    
    if (absA > absB) {
        return directionA;
    } else if (absB > absA) {
        return directionB;
    } else {
        // 동점: 첫 번째 질문 방향 선택
        return firstDirection;
    }
}

// 사용 예시
char eiType = determineAxis(eScore, iScore, 'E', 'I', 'E');
```

---

## 5. 백엔드 구현 가이드

### 5.1 데이터 구조

**질문-방향 매핑 (DB에서 조회)**:
```java
Map<Integer, QuestionDirection> questionMap = new HashMap<>();
// questionMap.put(1, new QuestionDirection("E-I", "E"));
// questionMap.put(2, new QuestionDirection("E-I", "I"));
// ...
```

**사용자 응답**:
```java
List<Answer> answers = [
    new Answer(1, 2),  // questionId, score
    new Answer(2, -1),
    // ...
];
```

### 5.2 계산 알고리즘

```java
public MBTIResult calculateMBTI(List<Answer> answers) {
    // 1. 방향별 점수 초기화
    Map<String, Integer> scores = new HashMap<>();
    scores.put("E", 0); scores.put("I", 0);
    scores.put("S", 0); scores.put("N", 0);
    scores.put("T", 0); scores.put("F", 0);
    scores.put("J", 0); scores.put("P", 0);
    
    // 2. 각 답변 점수 합산
    for (Answer answer : answers) {
        Question question = questionRepository.findById(answer.getQuestionId());
        String direction = question.getDirection();
        scores.put(direction, scores.get(direction) + answer.getScore());
    }
    
    // 3. 각 축별 성향 결정
    char ei = determineAxis(scores.get("E"), scores.get("I"), 'E', 'I', 'E');
    char sn = determineAxis(scores.get("S"), scores.get("N"), 'S', 'N', 'S');
    char tf = determineAxis(scores.get("T"), scores.get("F"), 'T', 'F', 'T');
    char jp = determineAxis(scores.get("J"), scores.get("P"), 'J', 'P', 'J');
    
    // 4. 최종 MBTI 타입 조합
    String mbtiType = "" + ei + sn + tf + jp;
    
    return new MBTIResult(mbtiType, scores);
}
```

### 5.3 유효성 검증

```java
public void validateAnswers(List<Answer> answers) {
    // 1. 정확히 28개인지 확인
    if (answers.size() != 28) {
        throw new InvalidRequestException("답변은 정확히 28개여야 합니다");
    }
    
    // 2. questionId 범위 확인 (1-28)
    Set<Integer> questionIds = new HashSet<>();
    for (Answer answer : answers) {
        int qid = answer.getQuestionId();
        if (qid < 1 || qid > 28) {
            throw new InvalidRequestException("유효하지 않은 질문 ID: " + qid);
        }
        
        // 3. 중복 체크
        if (questionIds.contains(qid)) {
            throw new InvalidRequestException("중복된 질문 ID: " + qid);
        }
        questionIds.add(qid);
        
        // 4. score 범위 확인 (-2, -1, 0, 1, 2)
        int score = answer.getScore();
        if (score < -2 || score > 2) {
            throw new InvalidRequestException("유효하지 않은 점수: " + score);
        }
    }
}
```

---

## 6. 프론트엔드 구현 가이드

### 6.1 TypeScript 타입 정의

```typescript
interface Answer {
  questionId: number;
  score: number;  // -2, -1, 0, 1, 2
}

interface Question {
  id: number;
  axis: 'E-I' | 'S-N' | 'T-F' | 'J-P';
  direction: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  text: string;
  category: string;
}

interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

interface MBTIResult {
  mbtiType: string;  // "INTJ", "ENFP", etc.
  scores: MBTIScores;
  shareToken: string;
  createdAt: string;
}
```

### 6.2 점수 변환 함수

```typescript
// 5점 척도 선택 → 점수 변환
function choiceToScore(choice: string): number {
  const scoreMap: Record<string, number> = {
    '매우 그렇다': 2,
    '그렇다': 1,
    '보통': 0,
    '아니다': -1,
    '전혀 아니다': -2,
  };
  return scoreMap[choice] || 0;
}

// 사용 예시
const userChoice = '매우 그렇다';
const score = choiceToScore(userChoice);  // 2
```

### 6.3 API 호출

```typescript
async function submitAnswers(answers: Answer[]): Promise<MBTIResult> {
  const response = await fetch('/api/results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });
  
  if (!response.ok) {
    throw new Error('결과 제출 실패');
  }
  
  return response.json();
}
```

---

## 7. 테스트 케이스

### 7.1 기본 케이스
**입력**: 모든 질문에 "매우 그렇다" (+2)
**출력**: E=8, I=6, S=8, N=6, T=8, F=6, J=10, P=4 → **ESTJ**

### 7.2 동점 케이스
**입력**: E/I 축이 정확히 동점
- E 질문 (1,3,5,6): +2, +1, 0, -3 → E = 0
- I 질문 (2,4,7): +1, -1, 0 → I = 0

**출력**: |E| = |I| = 0 → 첫 질문 방향 'E' 선택

### 7.3 극단 케이스
**입력**: 모든 E 질문 "매우 그렇다", 모든 I 질문 "전혀 아니다"
- E = 4×2 = 8
- I = 3×(-2) = -6

**출력**: |E| = 8, |I| = 6 → 'E' 선택

---

## 8. 통계 계산

### 8.1 백분율 계산
```sql
SELECT 
    mbti_type,
    count,
    ROUND(count * 100.0 / (SELECT SUM(count) FROM mbti_statistics), 2) AS percentage
FROM mbti_statistics
ORDER BY count DESC;
```

### 8.2 축별 평균
```sql
-- E vs I 평균
SELECT 
    ROUND(AVG(e_score) * 100.0 / (AVG(e_score) + AVG(i_score)), 2) AS e_percentage,
    ROUND(AVG(i_score) * 100.0 / (AVG(e_score) + AVG(i_score)), 2) AS i_percentage
FROM test_results;
```

---

## 9. 주의사항

### 9.1 음수 점수 처리
- 점수가 음수여도 정상 (I, N, F, P 방향 질문은 음수 가능)
- **절댓값 비교**가 핵심

### 9.2 질문 순서 의존성
- 동점 처리 로직이 첫 번째 질문에 의존
- **질문 순서를 변경하면 동점 결과도 바뀜**
- 따라서 질문 순서는 고정 (랜덤화 금지)

### 9.3 부동소수점 오류
- 점수는 모두 정수이므로 부동소수점 오류 없음
- 백분율 계산 시에만 소수점 사용

---

**문서 종료**
