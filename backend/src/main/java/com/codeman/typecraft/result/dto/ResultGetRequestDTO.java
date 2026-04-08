package com.codeman.typecraft.result.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResultGetRequestDTO {

    @NotBlank(message = "shareToken은 필수입니다")
    private String shareToken;
}
