-- ============================================================
-- V3: 16개 MBTI 유형 정보 삽입
-- ============================================================

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('INTJ', '완벽주의 아키텍트',
 '체계적인 설계와 효율성을 추구하는 전략가형 개발자입니다.',
 JSON_ARRAY('전략적으로 사고하고 장기적 계획을 세웁니다', '코드 품질과 아키텍처에 깊은 관심을 가집니다', '논리적 토론을 즐기고 비효율을 참지 못합니다', '혼자 깊이 파고드는 집중력이 뛰어납니다'),
 '설계 우선, 리팩토링보다 초기 아키텍처에 집중',
 JSON_ARRAY('시스템 아키텍트', '백엔드 엔지니어', '기술 리드'),
 JSON_ARRAY('Clean Architecture', 'Domain-Driven Design', 'TypeScript', 'Rust', 'TDD'),
 JSON_ARRAY('ENTP', 'INFP'),
 '/images/types/INTJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('INTP', '논리적 탐구자',
 '복잡한 시스템을 분석하고 이론적 완벽함을 추구하는 개발자입니다.',
 JSON_ARRAY('문제의 근본 원인을 파고드는 분석력이 있습니다', '새로운 개념과 기술을 빠르게 흡수합니다', '코드의 우아함과 논리적 일관성을 중시합니다', '유연하고 개방적이며 다양한 가능성을 탐색합니다'),
 '알고리즘과 자료구조에 집중, 최적화된 해결책 선호',
 JSON_ARRAY('알고리즘 엔지니어', '데이터 엔지니어', '플랫폼 개발자'),
 JSON_ARRAY('Python', 'Haskell', 'Go', 'Algorithms', 'Distributed Systems'),
 JSON_ARRAY('ENTJ', 'INFJ'),
 '/images/types/INTP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ENTJ', '전략적 테크리더',
 '비전을 기술로 실현하는 추진력 있는 리더형 개발자입니다.',
 JSON_ARRAY('목표를 향해 팀을 이끄는 리더십이 있습니다', '빠른 의사결정과 실행력이 뛰어납니다', '큰 그림을 보며 전략적으로 사고합니다', '높은 기준을 설정하고 팀에 도전을 부여합니다'),
 '성과 중심, 빠른 프로토타이핑 후 리팩토링',
 JSON_ARRAY('CTO', '기술 리드', '엔지니어링 매니저'),
 JSON_ARRAY('Java', 'Spring Boot', 'Kubernetes', 'AWS', 'MSA'),
 JSON_ARRAY('INTP', 'ISTP'),
 '/images/types/ENTJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ENTP', '혁신적 발명가',
 '기존의 틀을 깨고 새로운 가능성을 탐구하는 혁신가형 개발자입니다.',
 JSON_ARRAY('아이디어가 넘치고 토론을 즐깁니다', '빠른 프로토타이핑으로 가능성을 검증합니다', '새로운 기술 도입에 적극적입니다', '문제를 다양한 각도에서 바라봅니다'),
 '빠른 실험과 검증, 완벽함보다 가능성 탐색',
 JSON_ARRAY('스타트업 개발자', 'R&D 엔지니어', '풀스택 개발자'),
 JSON_ARRAY('Node.js', 'React', 'GraphQL', 'LLM', 'Rapid Prototyping'),
 JSON_ARRAY('INTJ', 'INFJ'),
 '/images/types/ENTP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('INFJ', '통찰력 있는 멘토',
 '사용자를 깊이 이해하고 의미 있는 서비스를 만드는 개발자입니다.',
 JSON_ARRAY('사용자 관점에서 문제를 바라봅니다', '팀의 화합과 장기적 비전을 중시합니다', '신중하게 결정하고 깊이 있는 코드를 작성합니다', '개인의 성장과 팀의 발전을 함께 추구합니다'),
 '사용자 중심 설계, 직관적인 UX 구현에 집중',
 JSON_ARRAY('프로덕트 엔지니어', 'UX 개발자', '테크 에반젤리스트'),
 JSON_ARRAY('React', 'Vue.js', 'Accessibility', 'User Research', 'Design System'),
 JSON_ARRAY('ENTP', 'INTP'),
 '/images/types/INFJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('INFP', '이상주의적 크리에이터',
 '기술로 가치 있는 것을 만들고자 하는 열정적인 개발자입니다.',
 JSON_ARRAY('자신만의 개성 있는 코드 스타일이 있습니다', '의미 있는 프로젝트에 깊은 몰입을 합니다', '창의적인 문제 해결을 즐깁니다', '코드 가독성과 표현력을 중시합니다'),
 '창의적 표현 중심, 코드 가독성과 의미 있는 변수명 선호',
 JSON_ARRAY('프론트엔드 개발자', '인디 개발자', '크리에이티브 테크니스트'),
 JSON_ARRAY('JavaScript', 'Creative Coding', 'p5.js', 'Open Source', 'Documentation'),
 JSON_ARRAY('ENFJ', 'INTJ'),
 '/images/types/INFP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ENFJ', '열정적 팀 빌더',
 '팀의 성장과 협업을 이끄는 리더십 있는 개발자입니다.',
 JSON_ARRAY('팀원의 성장을 진심으로 돕습니다', '적극적인 커뮤니케이션으로 팀을 이끕니다', '코드 리뷰 문화와 지식 공유를 주도합니다', '팀의 목표와 개인의 발전을 연결합니다'),
 '협업 친화적 코드, 명확한 문서화와 PR 설명 중시',
 JSON_ARRAY('팀 리드', '개발자 에반젤리스트', '테크 멘토'),
 JSON_ARRAY('Agile', 'Code Review', 'Pair Programming', 'Tech Blog', 'CI/CD'),
 JSON_ARRAY('INFP', 'ISTP'),
 '/images/types/ENFJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ENFP', '창의적 전도사',
 '새로운 기술과 아이디어에 열정적인 에너지 넘치는 개발자입니다.',
 JSON_ARRAY('새로운 기술 트렌드에 누구보다 빨리 관심을 갖습니다', '팀에 긍정적 에너지와 동기를 부여합니다', '다양한 분야에 관심이 많고 연결 고리를 찾습니다', '사람들을 영감으로 이끄는 스토리텔링을 잘합니다'),
 '아이디어 중심 개발, 다양한 기술 스택 실험 선호',
 JSON_ARRAY('DevRel 엔지니어', '풀스택 개발자', '테크 스피커'),
 JSON_ARRAY('AI/ML', 'Next.js', 'WebAssembly', 'Side Project', 'Open Source'),
 JSON_ARRAY('INTJ', 'INFJ'),
 '/images/types/ENFP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ISTJ', '신뢰할 수 있는 장인',
 '꼼꼼하고 안정적인 코드로 시스템을 유지하는 신뢰형 개발자입니다.',
 JSON_ARRAY('책임감이 강하고 약속을 반드시 지킵니다', '꼼꼼한 테스트와 문서화를 습관화합니다', '검증된 기술과 안정적인 솔루션을 선호합니다', '레거시 코드도 성실하게 유지보수합니다'),
 '안정성 우선, 충분한 테스트 후 배포',
 JSON_ARRAY('백엔드 개발자', 'DevOps 엔지니어', '시스템 관리자'),
 JSON_ARRAY('Java', 'Spring', 'Oracle', 'Jenkins', 'Monitoring'),
 JSON_ARRAY('ESTJ', 'ISFJ'),
 '/images/types/ISTJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ISFJ', '헌신적인 수호자',
 '팀과 사용자를 위해 묵묵히 최선을 다하는 헌신형 개발자입니다.',
 JSON_ARRAY('팀을 위해 궂은일도 마다하지 않습니다', '사용자 불편을 세심하게 파악하고 해결합니다', '꼼꼼한 QA와 엣지 케이스 처리에 강합니다', '안정적이고 예측 가능한 개발을 선호합니다'),
 '사용자 중심 안정성, 엣지 케이스와 예외 처리에 집중',
 JSON_ARRAY('QA 엔지니어', '프론트엔드 개발자', '기술 지원 개발자'),
 JSON_ARRAY('Jest', 'Selenium', 'Accessibility', 'Vue.js', 'User Testing'),
 JSON_ARRAY('ISTJ', 'ESFJ'),
 '/images/types/ISFJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ESTJ', '효율적인 조직가',
 '체계적인 프로세스와 명확한 기준으로 프로젝트를 이끄는 개발자입니다.',
 JSON_ARRAY('명확한 목표와 기준을 설정합니다', '프로세스와 규칙을 잘 정비하고 따릅니다', '팀의 생산성을 높이는 시스템을 구축합니다', '책임과 역할 분담을 명확히 합니다'),
 '표준 준수, 코딩 컨벤션과 프로세스를 엄격히 따름',
 JSON_ARRAY('프로젝트 매니저', '기술 리드', '엔터프라이즈 개발자'),
 JSON_ARRAY('Enterprise Java', 'JIRA', 'Code Standards', 'CI/CD Pipeline', 'SonarQube'),
 JSON_ARRAY('ISTJ', 'ISTP'),
 '/images/types/ESTJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ESFJ', '협력적인 조력자',
 '팀 화합을 중시하고 모두가 성장하도록 돕는 개발자입니다.',
 JSON_ARRAY('팀 분위기와 커뮤니케이션을 부드럽게 만듭니다', '새로운 팀원 온보딩을 적극적으로 돕습니다', '사용자 피드백에 민감하게 반응합니다', '협업 도구와 문서화를 적극 활용합니다'),
 '협업 친화적 개발, 리뷰 적극 참여 및 문서화 중시',
 JSON_ARRAY('프론트엔드 개발자', '스크럼 마스터', '개발 팀장'),
 JSON_ARRAY('React', 'Storybook', 'Confluence', 'Slack Bot', 'Onboarding Tools'),
 JSON_ARRAY('ISFJ', 'ENFJ'),
 '/images/types/ESFJ.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ISTP', '실용적인 문제해결사',
 '어떤 기술이든 빠르게 습득하고 실질적 문제를 해결하는 개발자입니다.',
 JSON_ARRAY('핵심만 파악하고 빠르게 실행합니다', '다양한 기술 스택을 유연하게 다룹니다', '이론보다 실제 동작하는 코드를 중시합니다', '시스템의 내부 동작 원리를 깊이 이해합니다'),
 '직접 해보며 배우는 스타일, 최소한의 코드로 최대 효과',
 JSON_ARRAY('시스템 프로그래머', 'DevOps 엔지니어', '임베디드 개발자'),
 JSON_ARRAY('C', 'C++', 'Rust', 'Linux', 'Network Programming'),
 JSON_ARRAY('ENTJ', 'ESTJ'),
 '/images/types/ISTP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ISFP', '감각적인 장인',
 '사용자 경험과 디테일에 예민한 감각을 가진 개발자입니다.',
 JSON_ARRAY('UI/UX 디테일에 예민한 감각이 있습니다', '조용하지만 품질 높은 결과물을 만들어냅니다', '현재 주어진 작업에 집중하고 완성도를 높입니다', '미적 감각과 기능성을 동시에 추구합니다'),
 '감각적인 UI 구현, 픽셀 단위 완성도 추구',
 JSON_ARRAY('UI 개발자', '크리에이티브 개발자', 'iOS/Android 개발자'),
 JSON_ARRAY('CSS', 'Figma', 'Swift', 'Flutter', 'Animation'),
 JSON_ARRAY('ENFJ', 'ESFJ'),
 '/images/types/ISFP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ESTP', '역동적인 실행가',
 '빠른 판단력과 실행력으로 현장 문제를 해결하는 개발자입니다.',
 JSON_ARRAY('빠르게 배우고 즉각 실행에 옮깁니다', '장애 상황에서 침착하게 대응합니다', '실용적인 해결책을 선호하고 행동이 먼저입니다', '다이나믹한 환경에서 오히려 능력을 발휘합니다'),
 '빠른 배포 우선, 작동하는 코드 먼저 출시 후 개선',
 JSON_ARRAY('SRE', '장애 대응 엔지니어', '스타트업 개발자'),
 JSON_ARRAY('On-call', 'Incident Response', 'Chaos Engineering', 'Hot Fix', 'Monitoring'),
 JSON_ARRAY('ISTP', 'ENTP'),
 '/images/types/ESTP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));

INSERT INTO mbti_types (mbti_code, title, description, characteristics, coding_style, suitable_roles, tech_stack, compatibility, image_url, created_at, updated_at) VALUES
('ESFP', '활기찬 팀플레이어',
 '긍정적 에너지로 팀 분위기를 이끄는 협업형 개발자입니다.',
 JSON_ARRAY('팀에 긍정적 에너지를 불어넣습니다', '현장 감각이 뛰어나고 사람과 잘 어울립니다', '실용적이고 즉각적인 피드백을 잘 반영합니다', '데모와 발표를 통해 작업물을 잘 선보입니다'),
 '빠른 피드백 반영, 시각적으로 즉각 확인 가능한 개발 선호',
 JSON_ARRAY('프론트엔드 개발자', '데모 엔지니어', '고객 대면 개발자'),
 JSON_ARRAY('React', 'Tailwind CSS', 'Storybook', 'Figma', 'User Testing'),
 JSON_ARRAY('ISFP', 'ENFP'),
 '/images/types/ESFP.png',
 DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'), DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'));
