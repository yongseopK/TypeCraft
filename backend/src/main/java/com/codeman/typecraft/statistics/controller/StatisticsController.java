package com.codeman.typecraft.statistics.controller;

import com.codeman.typecraft.statistics.dto.StatisticsResponseDTO;
import com.codeman.typecraft.statistics.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    /** POST /api/statistics/get - 전체 통계 조회 (10초 캐싱) */
    @PostMapping("/get")
    public ResponseEntity<StatisticsResponseDTO> getStatistics() {
        return ResponseEntity.ok(statisticsService.getStatistics());
    }
}
