package com.codeman.typecraft.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Common
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, "C001", "잘못된 입력값입니다"),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "C002", "허용되지 않은 메서드입니다"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "C003", "서버 오류가 발생했습니다"),
    INVALID_TYPE_VALUE(HttpStatus.BAD_REQUEST, "C004", "잘못된 타입입니다"),

    // Question
    QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "Q001", "질문을 찾을 수 없습니다"),
    INVALID_QUESTION_COUNT(HttpStatus.BAD_REQUEST, "Q002", "질문 개수가 올바르지 않습니다"),

    // Result
    RESULT_NOT_FOUND(HttpStatus.NOT_FOUND, "R001", "결과를 찾을 수 없습니다"),
    INVALID_SHARE_TOKEN(HttpStatus.BAD_REQUEST, "R002", "유효하지 않은 공유 토큰입니다"),
    INVALID_ANSWER_FORMAT(HttpStatus.BAD_REQUEST, "R003", "답변 형식이 올바르지 않습니다"),
    INCOMPLETE_ANSWERS(HttpStatus.BAD_REQUEST, "R004", "모든 질문에 답변해주세요"),

    // Type
    TYPE_NOT_FOUND(HttpStatus.NOT_FOUND, "T001", "MBTI 유형을 찾을 수 없습니다"),
    INVALID_MBTI_CODE(HttpStatus.BAD_REQUEST, "T002", "유효하지 않은 MBTI 코드입니다"),

    // Statistics
    STATISTICS_NOT_FOUND(HttpStatus.NOT_FOUND, "S001", "통계 정보를 찾을 수 없습니다");

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}