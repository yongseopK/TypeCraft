package com.codeman.typecraft.result.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

/** POST /api/results 응답 */
@Getter
@AllArgsConstructor
public class ResultResponseDTO {
    private final String mbtiType;
    private final Map<String, Integer> scores;
    private final String shareToken;
    private final String createdAt;
}
