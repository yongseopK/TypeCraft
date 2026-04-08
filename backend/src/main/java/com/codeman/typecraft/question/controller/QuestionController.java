package com.codeman.typecraft.question.controller;

import com.codeman.typecraft.question.dto.QuestionResponseDTO;
import com.codeman.typecraft.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    /** POST /api/questions/list - 전체 질문 목록 조회 */
    @PostMapping("/list")
    public ResponseEntity<QuestionResponseDTO> listQuestions() {
        return ResponseEntity.ok(questionService.findAllActive());
    }
}
