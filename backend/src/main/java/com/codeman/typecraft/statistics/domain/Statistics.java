package com.codeman.typecraft.statistics.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    /** MBTI 코드 */
    private String mbtiType;
    /** 해당 유형 응시자 수 */
    private int count;
    /** 수정일시 */
    private String createAt;
}
