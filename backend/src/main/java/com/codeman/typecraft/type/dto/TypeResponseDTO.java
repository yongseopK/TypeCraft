package com.codeman.typecraft.type.dto;

import com.codeman.typecraft.type.domain.Type;
import lombok.Getter;

import java.util.List;

@Getter
public class TypeResponseDTO {
    private final String mbtiCode;
    private final String title;
    private final String description;
    private final List<String> characteristics;
    private final String codingStyle;
    private final List<String> suitableRoles;
    private final List<String> techStack;
    private final List<String> compatibility;
    private final String imageUrl;

    public TypeResponseDTO(Type type, List<String> characteristics, List<String> suitableRoles,
                           List<String> techStack, List<String> compatibility) {
        this.mbtiCode = type.getMbtiCode();
        this.title = type.getTitle();
        this.description = type.getDescription();
        this.characteristics = characteristics;
        this.codingStyle = type.getCodingStyle();
        this.suitableRoles = suitableRoles;
        this.techStack = techStack;
        this.compatibility = compatibility;
        this.imageUrl = type.getImageUrl();
    }
}
