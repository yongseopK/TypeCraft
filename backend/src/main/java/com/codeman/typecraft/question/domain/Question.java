package com.codeman.typecraft.question.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    /** id */
    private int id;
    /** MBTI 축: E-I, S-N, T-F, J-P */
    private String axis;
    /** 어느 쪽 성향: E, I, S, N, T, F, J, P */
    private String direction;
    /** 질문 내용 */
    private String text;
    /** 질문 카테고리 (협업, 문제해결 등) */
    private String category;
    /** 화면 표시 순서 (1-28) */
    private String displayOrder;
    /** 활성화 여부 */
    private String isActive;
    /** 생성일시 */
    private String createAt;
    /** 수정일시 */
    private String updateAt;

}
