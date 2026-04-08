package com.codeman.typecraft.type.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Type {
    private String mbtiCode;
    private String title;
    private String description;
    /** JSON 배열 문자열 → 서비스에서 List<String>으로 파싱 */
    private String characteristics;
    private String codingStyle;
    private String suitableRoles;
    private String techStack;
    private String compatibility;
    private String imageUrl;
    private String createdAt;
    private String updatedAt;
}
