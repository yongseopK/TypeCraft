-- ============================================================
-- V1: 테이블 생성
-- ============================================================

CREATE TABLE IF NOT EXISTS questions (
    id           INT PRIMARY KEY AUTO_INCREMENT,
    axis         VARCHAR(4)   NOT NULL COMMENT 'MBTI 축: E-I, S-N, T-F, J-P',
    direction    VARCHAR(1)   NOT NULL COMMENT '성향 방향: E, I, S, N, T, F, J, P',
    text         TEXT         NOT NULL COMMENT '질문 내용',
    category     VARCHAR(50)  COMMENT '질문 카테고리',
    display_order INT         NOT NULL COMMENT '화면 표시 순서 (1-28)',
    is_active    BOOLEAN      DEFAULT TRUE COMMENT '활성화 여부',
    created_at   VARCHAR(14)  NOT NULL COMMENT '생성일시 YYYYMMDDHHMMSS',
    updated_at   VARCHAR(14)  NOT NULL COMMENT '수정일시 YYYYMMDDHHMMSS',
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mbti_types (
    mbti_code      VARCHAR(4)   PRIMARY KEY COMMENT 'MBTI 코드: INTJ, ENFP 등',
    title          VARCHAR(100) NOT NULL COMMENT '유형 이름',
    description    TEXT         COMMENT '유형 설명',
    characteristics JSON        COMMENT '특징 목록 (배열)',
    coding_style   VARCHAR(200) COMMENT '코딩 스타일 요약',
    suitable_roles JSON         COMMENT '추천 직무 (배열)',
    tech_stack     JSON         COMMENT '어울리는 기술 스택 (배열)',
    compatibility  JSON         COMMENT '잘 맞는 유형 (배열)',
    image_url      VARCHAR(255) COMMENT '대표 이미지 경로',
    created_at     VARCHAR(14)  NOT NULL COMMENT '생성일시 YYYYMMDDHHMMSS',
    updated_at     VARCHAR(14)  NOT NULL COMMENT '수정일시 YYYYMMDDHHMMSS'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS test_results (
    id           BIGINT       PRIMARY KEY AUTO_INCREMENT,
    mbti_type    VARCHAR(4)   NOT NULL COMMENT 'MBTI 결과 코드',
    e_score      INT          NOT NULL COMMENT 'E 방향 점수 합',
    i_score      INT          NOT NULL COMMENT 'I 방향 점수 합',
    s_score      INT          NOT NULL COMMENT 'S 방향 점수 합',
    n_score      INT          NOT NULL COMMENT 'N 방향 점수 합',
    t_score      INT          NOT NULL COMMENT 'T 방향 점수 합',
    f_score      INT          NOT NULL COMMENT 'F 방향 점수 합',
    j_score      INT          NOT NULL COMMENT 'J 방향 점수 합',
    p_score      INT          NOT NULL COMMENT 'P 방향 점수 합',
    share_token  VARCHAR(12)  UNIQUE NOT NULL COMMENT '공유용 고유 토큰',
    created_at   VARCHAR(14)  NOT NULL COMMENT '생성일시 YYYYMMDDHHMMSS',
    FOREIGN KEY (mbti_type) REFERENCES mbti_types(mbti_code),
    UNIQUE INDEX idx_share_token (share_token),
    INDEX idx_mbti_type (mbti_type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS mbti_statistics (
    mbti_type  VARCHAR(4)  PRIMARY KEY COMMENT 'MBTI 코드',
    count      INT         DEFAULT 0 NOT NULL COMMENT '해당 유형 응시자 수',
    updated_at VARCHAR(14) NOT NULL COMMENT '수정일시 YYYYMMDDHHMMSS',
    FOREIGN KEY (mbti_type) REFERENCES mbti_types(mbti_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
