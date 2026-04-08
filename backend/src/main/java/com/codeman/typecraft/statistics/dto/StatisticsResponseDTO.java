package com.codeman.typecraft.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@AllArgsConstructor
public class StatisticsResponseDTO {
    private final long totalCount;
    private final List<DistributionItem> distribution;
    private final AxisAverages axisAverages;
    private final List<String> topThree;
    private final String updatedAt;

    @Getter
    @AllArgsConstructor
    public static class DistributionItem {
        private final String mbtiType;
        private final int count;
        private final double percentage;
    }

    @Getter
    @AllArgsConstructor
    public static class AxisAverages {
        private final Map<String, Double> E_vs_I;
        private final Map<String, Double> S_vs_N;
        private final Map<String, Double> T_vs_F;
        private final Map<String, Double> J_vs_P;
    }
}
