package com.codeman.typecraft.statistics.service;

import com.codeman.typecraft.common.util.DateTimeUtil;
import com.codeman.typecraft.statistics.domain.Statistics;
import com.codeman.typecraft.statistics.dto.StatisticsResponseDTO;
import com.codeman.typecraft.statistics.repository.StatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    @Cacheable("statistics")
    public StatisticsResponseDTO getStatistics() {
        List<Statistics> all = statisticsRepository.findAll();

        long totalCount = all.stream().mapToLong(Statistics::getCount).sum();

        // 분포 리스트 (count 내림차순 정렬)
        List<StatisticsResponseDTO.DistributionItem> distribution = all.stream()
                .map(s -> {
                    double pct = totalCount == 0 ? 0.0
                            : Math.round(s.getCount() * 1000.0 / totalCount) / 10.0;
                    return new StatisticsResponseDTO.DistributionItem(s.getMbtiType(), s.getCount(), pct);
                })
                .collect(Collectors.toList());

        // Top 3
        List<String> topThree = distribution.stream()
                .sorted(Comparator.comparingInt(StatisticsResponseDTO.DistributionItem::getCount).reversed())
                .limit(3)
                .map(StatisticsResponseDTO.DistributionItem::getMbtiType)
                .collect(Collectors.toList());

        // 축별 평균
        Map<String, Object> raw = statisticsRepository.findAxisAverages();
        StatisticsResponseDTO.AxisAverages axisAverages = buildAxisAverages(raw);

        String updatedAt = all.stream()
                .map(Statistics::getUpdatedAt)
                .max(Comparator.naturalOrder())
                .orElse(DateTimeUtil.now());

        return new StatisticsResponseDTO(totalCount, distribution, axisAverages, topThree, updatedAt);
    }

    private StatisticsResponseDTO.AxisAverages buildAxisAverages(Map<String, Object> raw) {
        return new StatisticsResponseDTO.AxisAverages(
                Map.of("E", toDouble(raw.get("eAvg")), "I", toDouble(raw.get("iAvg"))),
                Map.of("S", toDouble(raw.get("sAvg")), "N", toDouble(raw.get("nAvg"))),
                Map.of("T", toDouble(raw.get("tAvg")), "F", toDouble(raw.get("fAvg"))),
                Map.of("J", toDouble(raw.get("jAvg")), "P", toDouble(raw.get("pAvg")))
        );
    }

    private double toDouble(Object val) {
        if (val == null) return 50.0;
        if (val instanceof Number) return ((Number) val).doubleValue();
        try { return Double.parseDouble(val.toString()); } catch (Exception e) { return 50.0; }
    }
}
