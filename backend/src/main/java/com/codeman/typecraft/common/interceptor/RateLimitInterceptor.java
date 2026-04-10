package com.codeman.typecraft.common.interceptor;

import com.codeman.typecraft.common.exception.ErrorCode;
import com.codeman.typecraft.common.exception.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    /** 제출 API: IP당 1시간에 최대 10회 */
    private static final int SUBMIT_LIMIT = 10;

    /** 일반 API: IP당 1분에 최대 60회 */
    private static final int GENERAL_LIMIT = 60;

    private final Cache<String, AtomicInteger> submitCache = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS)
            .maximumSize(50_000)
            .build();

    private final Cache<String, AtomicInteger> generalCache = Caffeine.newBuilder()
            .expireAfterWrite(1, TimeUnit.MINUTES)
            .maximumSize(50_000)
            .build();

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        String ip = resolveClientIp(request);
        String uri = request.getRequestURI();

        // /api/**, /actuator/health 외 경로는 즉시 404
        if (!uri.startsWith("/api/") && !uri.equals("/actuator/health")) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return false;
        }

        // 제출 엔드포인트: POST /api/results (답변 제출)
        if ("POST".equals(request.getMethod()) && uri.equals("/api/results")) {
            AtomicInteger count = submitCache.get(ip, k -> new AtomicInteger(0));
            if (count.incrementAndGet() > SUBMIT_LIMIT) {
                log.warn("Rate limit exceeded (submit) - IP: {}", ip);
                writeRateLimitResponse(response, "요청이 너무 많습니다. 1시간 후 다시 시도해주세요.");
                return false;
            }
        } else {
            // 일반 API
            AtomicInteger count = generalCache.get(ip, k -> new AtomicInteger(0));
            if (count.incrementAndGet() > GENERAL_LIMIT) {
                log.warn("Rate limit exceeded (general) - IP: {}", ip);
                writeRateLimitResponse(response, "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
                return false;
            }
        }

        return true;
    }

    /**
     * 실제 클라이언트 IP 추출
     * X-Forwarded-For 헤더 신뢰 여부는 배포 환경(리버스 프록시) 따라 조정 필요
     */
    private String resolveClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            // 첫 번째 IP만 사용 (프록시 체인에서 원본 IP)
            return xff.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private void writeRateLimitResponse(HttpServletResponse response, String message) throws Exception {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        ErrorResponse body = ErrorResponse.of(
                HttpStatus.TOO_MANY_REQUESTS.value(),
                "Too Many Requests",
                "C429",
                message,
                ""
        );
        response.getWriter().write(MAPPER.writeValueAsString(body));
    }
}
