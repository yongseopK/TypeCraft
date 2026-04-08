package com.codeman.typecraft.type.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TypeRequestDTO {

    @NotBlank(message = "mbtiCode는 필수입니다")
    private String mbtiCode;
}
