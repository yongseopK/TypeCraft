package com.codeman.typecraft.statistics.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Statistics {
    private String mbtiType;
    private int count;
    private String updatedAt;
}
