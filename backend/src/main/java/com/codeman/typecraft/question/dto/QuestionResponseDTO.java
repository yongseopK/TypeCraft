package com.codeman.typecraft.question.dto;

import com.codeman.typecraft.question.domain.Question;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class QuestionResponseDTO {

    private final List<QuestionItem> questions;

    public QuestionResponseDTO(List<Question> questions) {
        this.questions = questions.stream()
                .map(QuestionItem::new)
                .collect(Collectors.toList());
    }

    @Getter
    public static class QuestionItem {
        private final int id;
        private final String axis;
        private final String direction;
        private final String text;
        private final String category;

        public QuestionItem(Question q) {
            this.id = q.getId();
            this.axis = q.getAxis();
            this.direction = q.getDirection();
            this.text = q.getText();
            this.category = q.getCategory();
        }
    }
}
