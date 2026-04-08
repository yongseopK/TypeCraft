package com.codeman.typecraft.result.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;

/** POST /api/results/get 응답 */
@Getter
@AllArgsConstructor
public class ResultGetResponseDTO {
    private final String mbtiType;
    private final Map<String, Integer> scores;
    private final TypeInfo typeInfo;
    private final StatisticsInfo statistics;
    private final String createdAt;

    @Getter
    @AllArgsConstructor
    public static class TypeInfo {
        private final String title;
        private final String description;
        private final List<String> characteristics;
        private final String codingStyle;
        private final List<String> suitableRoles;
        private final List<String> techStack;
        private final List<String> compatibility;
        private final String imageUrl;
    }

    @Getter
    @AllArgsConstructor
    public static class StatisticsInfo {
        private final double percentage;
        private final int rank;
    }
}
