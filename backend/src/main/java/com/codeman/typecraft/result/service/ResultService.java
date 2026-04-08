package com.codeman.typecraft.result.service;

import com.codeman.typecraft.common.exception.BusinessException;
import com.codeman.typecraft.common.exception.ErrorCode;
import com.codeman.typecraft.common.service.RecaptchaService;
import com.codeman.typecraft.common.util.DateTimeUtil;
import com.codeman.typecraft.common.util.TokenGenerator;
import com.codeman.typecraft.question.domain.Question;
import com.codeman.typecraft.question.service.QuestionService;
import com.codeman.typecraft.result.domain.Result;
import com.codeman.typecraft.result.dto.ResultGetRequestDTO;
import com.codeman.typecraft.result.dto.ResultGetResponseDTO;
import com.codeman.typecraft.result.dto.ResultRequestDTO;
import com.codeman.typecraft.result.dto.ResultResponseDTO;
import com.codeman.typecraft.result.repository.ResultRepository;
import com.codeman.typecraft.statistics.domain.Statistics;
import com.codeman.typecraft.statistics.repository.StatisticsRepository;
import com.codeman.typecraft.type.domain.Type;
import com.codeman.typecraft.type.service.TypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final ResultRepository resultRepository;
    private final StatisticsRepository statisticsRepository;
    private final QuestionService questionService;
    private final TypeService typeService;
    private final RecaptchaService recaptchaService;

    @Transactional
    public ResultResponseDTO submitAnswers(ResultRequestDTO requestDTO) {
        // 0. reCAPTCHA 검증
        recaptchaService.verify(requestDTO.getRecaptchaToken());

        List<ResultRequestDTO.AnswerItem> answers = requestDTO.getAnswers();

        // 1. 추가 유효성 검증 (questionId 범위 및 중복)
        validateAnswers(answers);

        // 2. 질문 목록 로드 (캐시됨)
        List<Question> questions = questionService.findAllActiveRaw();
        Map<Integer, Question> questionMap = questions.stream()
                .collect(Collectors.toMap(Question::getId, q -> q));

        // 3. 방향별 점수 합산
        Map<String, Integer> scores = new HashMap<>();
        for (String dir : Arrays.asList("E", "I", "S", "N", "T", "F", "J", "P")) {
            scores.put(dir, 0);
        }

        for (ResultRequestDTO.AnswerItem answer : answers) {
            Question q = questionMap.get(answer.getQuestionId());
            if (q == null) {
                throw new BusinessException(ErrorCode.QUESTION_NOT_FOUND,
                        "질문 ID " + answer.getQuestionId() + "을 찾을 수 없습니다");
            }
            scores.merge(q.getDirection(), answer.getScore(), Integer::sum);
        }

        // 4. 각 축별 성향 결정
        char ei = determineAxis(scores.get("E"), scores.get("I"), 'E', 'I', 'E');
        char sn = determineAxis(scores.get("S"), scores.get("N"), 'S', 'N', 'S');
        char tf = determineAxis(scores.get("T"), scores.get("F"), 'T', 'F', 'T');
        char jp = determineAxis(scores.get("J"), scores.get("P"), 'J', 'P', 'J');
        String mbtiType = "" + ei + sn + tf + jp;

        // 5. 고유 share_token 생성
        String shareToken;
        int retryCount = 0;
        do {
            if (retryCount++ > 10) {
                throw new BusinessException(ErrorCode.INTERNAL_SERVER_ERROR, "토큰 생성에 실패했습니다");
            }
            shareToken = TokenGenerator.generate(12);
        } while (resultRepository.existsByShareToken(shareToken));

        // 6. 결과 저장 + 통계 업데이트 (트랜잭션)
        String now = DateTimeUtil.now();
        Result result = new Result(0L, mbtiType,
                scores.get("E"), scores.get("I"),
                scores.get("S"), scores.get("N"),
                scores.get("T"), scores.get("F"),
                scores.get("J"), scores.get("P"),
                shareToken, now);
        resultRepository.save(result);
        statisticsRepository.incrementCount(mbtiType, now);

        return new ResultResponseDTO(mbtiType, scores, shareToken, now);
    }

    public ResultGetResponseDTO getResult(ResultGetRequestDTO requestDTO) {
        Result result = resultRepository.findByShareToken(requestDTO.getShareToken());
        if (result == null) {
            throw new BusinessException(ErrorCode.RESULT_NOT_FOUND, "해당 결과를 찾을 수 없습니다");
        }

        // 유형 정보 조회
        Type type = typeService.findRawByMbtiCode(result.getMbtiType());

        // 통계 정보 계산
        List<com.codeman.typecraft.statistics.domain.Statistics> allStats = statisticsRepository.findAll();
        long totalCount = allStats.stream().mapToLong(Statistics::getCount).sum();

        int myCount = allStats.stream()
                .filter(s -> s.getMbtiType().equals(result.getMbtiType()))
                .mapToInt(com.codeman.typecraft.statistics.domain.Statistics::getCount)
                .findFirst().orElse(0);

        double percentage = totalCount == 0 ? 0.0
                : Math.round(myCount * 1000.0 / totalCount) / 10.0;

        // 내 유형의 순위 (count 내림차순 기준)
        int rank = 1;
        for (com.codeman.typecraft.statistics.domain.Statistics s : allStats) {
            if (s.getCount() > myCount) rank++;
        }

        Map<String, Integer> scores = new LinkedHashMap<>();
        scores.put("E", result.getEScore());
        scores.put("I", result.getIScore());
        scores.put("S", result.getSScore());
        scores.put("N", result.getNScore());
        scores.put("T", result.getTScore());
        scores.put("F", result.getFScore());
        scores.put("J", result.getJScore());
        scores.put("P", result.getPScore());

        ResultGetResponseDTO.TypeInfo typeInfo = new ResultGetResponseDTO.TypeInfo(
                type.getTitle(),
                type.getDescription(),
                typeService.parseJsonArray(type.getCharacteristics()),
                type.getCodingStyle(),
                typeService.parseJsonArray(type.getSuitableRoles()),
                typeService.parseJsonArray(type.getTechStack()),
                typeService.parseJsonArray(type.getCompatibility()),
                type.getImageUrl()
        );

        return new ResultGetResponseDTO(
                result.getMbtiType(),
                scores,
                typeInfo,
                new ResultGetResponseDTO.StatisticsInfo(percentage, rank),
                result.getCreatedAt()
        );
    }

    private void validateAnswers(List<ResultRequestDTO.AnswerItem> answers) {
        Set<Integer> seen = new HashSet<>();
        for (ResultRequestDTO.AnswerItem answer : answers) {
            int qid = answer.getQuestionId();
            if (qid < 1 || qid > 28) {
                throw new BusinessException(ErrorCode.INVALID_ANSWER_FORMAT,
                        "유효하지 않은 질문 ID: " + qid);
            }
            if (!seen.add(qid)) {
                throw new BusinessException(ErrorCode.INVALID_ANSWER_FORMAT,
                        "중복된 질문 ID: " + qid);
            }
            int score = answer.getScore();
            if (score < -2 || score > 2) {
                throw new BusinessException(ErrorCode.INVALID_ANSWER_FORMAT,
                        "유효하지 않은 점수: " + score + " (허용 범위: -2 ~ 2)");
            }
        }
    }

    private char determineAxis(int scoreA, int scoreB, char dirA, char dirB, char tieBreaker) {
        int absA = Math.abs(scoreA);
        int absB = Math.abs(scoreB);
        if (absA > absB) return dirA;
        if (absB > absA) return dirB;
        return tieBreaker;
    }
}
