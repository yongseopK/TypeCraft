package com.codeman.typecraft.type.controller;

import com.codeman.typecraft.type.dto.TypeRequestDTO;
import com.codeman.typecraft.type.dto.TypeResponseDTO;
import com.codeman.typecraft.type.service.TypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/types")
@RequiredArgsConstructor
public class TypeController {

    private final TypeService typeService;

    /** POST /api/types/get - MBTI 유형 정보 조회 */
    @PostMapping("/get")
    public ResponseEntity<TypeResponseDTO> getType(
            @Valid @RequestBody TypeRequestDTO requestDTO) {
        return ResponseEntity.ok(typeService.findByMbtiCode(requestDTO.getMbtiCode()));
    }
}
