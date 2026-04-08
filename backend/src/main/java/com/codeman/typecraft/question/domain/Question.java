package com.codeman.typecraft.question.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    private int id;
    private String axis;
    private String direction;
    private String text;
    private String category;
    private int displayOrder;
    private boolean isActive;
    private String createdAt;
    private String updatedAt;
}
