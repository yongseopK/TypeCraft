package com.codeman.typecraft.result.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Result {
    private long id;
    private String mbtiType;
    private int eScore;
    private int iScore;
    private int sScore;
    private int nScore;
    private int tScore;
    private int fScore;
    private int jScore;
    private int pScore;
    private String shareToken;
    private String createdAt;
}
