-- ============================================================
-- V2: 28개 질문 삽입
-- ============================================================

-- E/I 축 (7문항)
INSERT INTO questions (axis, direction, text, category, display_order, created_at, updated_at) VALUES
('E-I', 'E', '새 프로젝트 시작 시 팀원들과 브레인스토밍하며 아이디어를 나누는 게 즐겁다', '협업', 1, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('E-I', 'I', '버그를 만났을 때 혼자 차분히 분석하는 게 더 효율적이다', '문제해결', 2, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('E-I', 'E', '새 기술을 배울 때 스터디나 모임에 참여하는 게 혼자 공부하는 것보다 효율적이다', '학습', 3, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('E-I', 'I', '슬랙/메신저로 대화하는 것이 직접 만나서 이야기하는 것보다 편하다', '커뮤니케이션', 4, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('E-I', 'E', '회의에서 적극적으로 의견을 제시하고 토론하는 편이다', '회의', 5, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('E-I', 'E', '개발자 컨퍼런스나 밋업에서 모르는 사람에게 먼저 말 거는 걸 즐긴다', '네트워킹', 6, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('E-I', 'I', '점심시간에 혼자 조용히 쉬는 시간이 필요하다', '휴식', 7, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

-- S/N 축 (7문항)
INSERT INTO questions (axis, direction, text, category, display_order, created_at, updated_at) VALUES
('S-N', 'S', 'API 사용 시 예제 코드보다 상세한 공식 문서를 먼저 읽는다', '문서', 8, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('S-N', 'S', '검증된 안정적인 기술을 선호하고, 최신 트렌드는 신중하게 접근한다', '기술 선택', 9, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('S-N', 'S', '코드 작성 전 상세한 설계와 명세를 먼저 만드는 게 중요하다', '계획', 10, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('S-N', 'S', '버그 발생 시 로그를 한 줄씩 체크하며 정확한 원인을 찾는다', '디버깅', 11, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('S-N', 'N', '새 프로젝트 파악 시 구체적인 코드 구현보다 전체 아키텍처를 먼저 이해하려 한다', '프로젝트 이해', 12, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('S-N', 'N', '주어진 요구사항을 그대로 구현하는 것보다 더 나은 해결책을 찾는 게 재미있다', '업무 방식', 13, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('S-N', 'N', '검증된 사례보다 이론적으로 더 나은 방법이라면 시도해보고 싶다', '경험', 14, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

-- T/F 축 (7문항)
INSERT INTO questions (axis, direction, text, category, display_order, created_at, updated_at) VALUES
('T-F', 'T', '코드 리뷰 시 감정보다 로직과 효율성에 집중해서 피드백한다', '코드리뷰', 15, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('T-F', 'T', '프로젝트 성공을 위해서라면 다소 팀 분위기가 경직되더라도 명확한 지적이 필요하다', '팀 분위기', 16, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('T-F', 'T', '개발 시 사용자 경험보다 성능과 안정성을 먼저 고려한다', '우선순위', 17, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('T-F', 'F', '기술 선택 시 객관적인 장단점 비교와 함께 팀원들의 선호도도 중요하게 고려한다', '의사결정', 18, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('T-F', 'F', '내 코드에 대한 비판이 논리적이더라도 표현 방식이 날카로우면 받아들이기 어렵다', '피드백 수용', 19, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('T-F', 'T', '마감이 촉박할 때 팀원 개인 사정보다 프로젝트 완수를 우선한다', '업무 처리', 20, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('T-F', 'F', '의견 충돌 시 합리적 근거와 함께 상대방의 감정도 배려하며 설득한다', '갈등 해결', 21, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

-- J/P 축 (7문항)
INSERT INTO questions (axis, direction, text, category, display_order, created_at, updated_at) VALUES
('J-P', 'J', '일주일 단위로 해야 할 작업을 미리 계획하고 체크리스트를 만든다', '계획', 22, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('J-P', 'J', '기능 구현 전 상세한 설계와 일정을 먼저 정하는 편이다', '개발 방식', 23, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('J-P', 'J', 'Jira/이슈트래커를 꼼꼼히 관리하고 우선순위를 명확히 정리한다', '이슈 관리', 24, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('J-P', 'J', '마감일보다 충분히 여유있게 작업을 완료하려고 한다', '마감 대응', 25, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('J-P', 'P', '프로젝트 중간에 요구사항이 바뀌어도 유연하게 대응할 수 있다', '변경 대응', 26, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('J-P', 'P', '여러 작업을 동시에 진행하면서 상황에 따라 우선순위를 조정하는 게 편하다', '작업 방식', 27, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S')),
('J-P', 'J', 'IDE, 폴더 구조, Git 브랜치를 체계적으로 정리해두는 편이다', '환경 정리', 28, DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));
