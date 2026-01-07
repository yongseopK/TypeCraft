package com.codeman.typecraft.common.exception;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Builder
public class ErrorResponse {

    private final String timestamp;
    private final int status;
    private final String error;
    private final String code;
    private final String message;
    private final String path;

    public static ErrorResponse of(int status, String error, String code, String message, String path) {
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")))
                .status(status)
                .error(error)
                .code(code)
                .message(message)
                .path(path)
                .build();
    }
}