-- ============================================================
-- V4: 통계 초기화 (16개 MBTI 타입 모두 0으로)
-- ============================================================

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
