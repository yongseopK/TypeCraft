package com.codeman.typecraft.type.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Type {
    /** MBTI 코드 */
    private String mbtiCode;
    /** 유형 이름 */
    private String title;
    /** 유형 설명 */
    private String description;
    /** 특징 목록 (배열) */
    private String characteristics;
    /** 코딩 스타일 요약 */
    private String codingStyle;
    /** 추천 직무 (배열) */
    private String suitableRoles;
    /** 어울리는 기술 스택 (배열) */
    private String techStack;
    /** 잘 맞는 유형 (배열) */
    private String compatibility;
    /** 대표 이미지 경로 */
    private String imageUrl;
    /** 생성일시 */
    private String createAt;
    /** 수정일시 */
    private String updateAt;
}
