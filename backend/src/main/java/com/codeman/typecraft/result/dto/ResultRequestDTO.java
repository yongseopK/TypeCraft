package com.codeman.typecraft.result.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResultRequestDTO {

    @NotBlank(message = "recaptchaToken은 필수입니다")
    private String recaptchaToken;

    @NotNull(message = "answers는 필수입니다")
    @Size(min = 28, max = 28, message = "답변은 정확히 28개여야 합니다")
    @Valid
    private List<AnswerItem> answers;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class AnswerItem {

        @NotNull(message = "questionId는 필수입니다")
        @Min(value = 1, message = "questionId는 1 이상이어야 합니다")
        @Max(value = 28, message = "questionId는 28 이하이어야 합니다")
        private Integer questionId;

        @NotNull(message = "score는 필수입니다")
        @Min(value = -2, message = "score는 -2 이상이어야 합니다")
        @Max(value = 2, message = "score는 2 이하이어야 합니다")
        private Integer score;
    }
}
