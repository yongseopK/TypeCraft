package com.codeman.typecraft.common.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager();

        // 질문 목록: 무기한 캐싱 (list/raw 두 키)
        manager.registerCustomCache("questions",
                Caffeine.newBuilder().maximumSize(2).build());

        // MBTI 유형 정보: 무기한 캐싱 (16개 유형)
        manager.registerCustomCache("types",
                Caffeine.newBuilder().maximumSize(16).build());

        // 통계: 10초 TTL
        manager.registerCustomCache("statistics",
                Caffeine.newBuilder()
                        .expireAfterWrite(10, TimeUnit.SECONDS)
                        .maximumSize(1)
                        .build());

        return manager;
    }
}
