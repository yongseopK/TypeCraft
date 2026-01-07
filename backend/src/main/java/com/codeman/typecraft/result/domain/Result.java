package com.codeman.typecraft.result.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    /** id */
    private int id;
    /** MBTI 결과 코드 */
    private String mbtiType;
    /** E 방향 점수 합 */
    private String eScore;
    /** I 방향 점수 합 */
    private int iScore;
    /** S 방향 점수 합 */
    private int sScore;
    /** N 방향 점수 합 */
    private int nScore;
    /** T 방향 점수 합 */
    private int tScore;
    /** F 방향 점수 합 */
    private int fScore;
    /** J 방향 점수 합 */
    private int jScore;
    /** P 방향 점수 합 */
    private int pScore;
    /** 공유용 고유 토큰 */
    private String shareToken;
    /** 생성일시 */
    private String createAt;
}
