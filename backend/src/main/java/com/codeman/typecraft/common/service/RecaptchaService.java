package com.codeman.typecraft.common.service;

import com.codeman.typecraft.common.exception.BusinessException;
import com.codeman.typecraft.common.exception.ErrorCode;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class RecaptchaService {

    @Value("${app.recaptcha.secret-key}")
    private String secretKey;

    @Value("${app.recaptcha.verify-url}")
    private String verifyUrl;

    private static final HttpClient HTTP_CLIENT = HttpClient.newHttpClient();
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public void verify(String token) {
        if (token == null || token.isBlank()) {
            throw new BusinessException(ErrorCode.RECAPTCHA_FAILED, "reCAPTCHA 토큰이 없습니다");
        }

        try {
            String body = "secret=" + URLEncoder.encode(secretKey, StandardCharsets.UTF_8)
                    + "&response=" + URLEncoder.encode(token, StandardCharsets.UTF_8);
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(verifyUrl))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = HTTP_CLIENT.send(request, HttpResponse.BodyHandlers.ofString());
            JsonNode json = MAPPER.readTree(response.body());

            boolean success = json.path("success").asBoolean(false);
            if (!success) {
                String errorCodes = json.path("error-codes").toString();
                log.warn("reCAPTCHA verification failed: {}", errorCodes);
                throw new BusinessException(ErrorCode.RECAPTCHA_FAILED, "reCAPTCHA 검증에 실패했습니다");
            }

            // v3: 점수 기반 판단 (0.0 ~ 1.0, 낮을수록 봇 가능성 높음)
            double score = json.path("score").asDouble(-1);
            if (score >= 0 && score < 0.5) {
                log.warn("reCAPTCHA score too low: {}", score);
                throw new BusinessException(ErrorCode.RECAPTCHA_FAILED, "보안 점수가 낮습니다. 다시 시도해주세요");
            }

        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            log.error("reCAPTCHA verification error", e);
            throw new BusinessException(ErrorCode.RECAPTCHA_FAILED, "reCAPTCHA 검증 중 오류가 발생했습니다");
        }
    }
}
