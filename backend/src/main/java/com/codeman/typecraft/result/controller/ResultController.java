package com.codeman.typecraft.result.controller;

import com.codeman.typecraft.result.dto.ResultGetRequestDTO;
import com.codeman.typecraft.result.dto.ResultGetResponseDTO;
import com.codeman.typecraft.result.dto.ResultRequestDTO;
import com.codeman.typecraft.result.dto.ResultResponseDTO;
import com.codeman.typecraft.result.service.ResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    /** POST /api/results - 답변 제출 및 MBTI 계산 */
    @PostMapping
    public ResponseEntity<ResultResponseDTO> submitAnswers(
            @Valid @RequestBody ResultRequestDTO requestDTO) {
        return ResponseEntity.ok(resultService.submitAnswers(requestDTO));
    }

    /** POST /api/results/get - share_token으로 결과 조회 */
    @PostMapping("/get")
    public ResponseEntity<ResultGetResponseDTO> getResult(
            @Valid @RequestBody ResultGetRequestDTO requestDTO) {
        return ResponseEntity.ok(resultService.getResult(requestDTO));
    }
}
