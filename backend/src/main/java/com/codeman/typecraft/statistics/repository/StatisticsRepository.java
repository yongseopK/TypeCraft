package com.codeman.typecraft.statistics.repository;

import com.codeman.typecraft.statistics.domain.Statistics;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface StatisticsRepository {

    List<Statistics> findAll();

    void incrementCount(@Param("mbtiType") String mbtiType, @Param("updatedAt") String updatedAt);

    /** test_results 테이블에서 축별 평균 비율 계산 */
    Map<String, Object> findAxisAverages();
}
