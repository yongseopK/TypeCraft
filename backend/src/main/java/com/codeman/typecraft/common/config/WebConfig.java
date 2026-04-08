package com.codeman.typecraft.common.config;

import com.codeman.typecraft.common.interceptor.RateLimitInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final RateLimitInterceptor rateLimitInterceptor;

    /**
     * 허용 Origin 목록 — 쉼표 구분
     * 예) ALLOWED_ORIGINS=https://typecraft.vercel.app,http://localhost:3000
     */
    @Value("${app.cors.allowed-origins:http://localhost:3000}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = allowedOrigins.split(",");
        registry.addMapping("/api/**")
                .allowedOrigins(origins)
                .allowedMethods("POST", "OPTIONS")   // GET 불필요 (모든 API가 POST)
                .allowedHeaders("Content-Type")      // 필요한 헤더만 허용
                .allowCredentials(false)              // 쿠키/세션 없으므로 false
                .maxAge(3600);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/api/**");
    }
}
