package com.codeman.typecraft.question.repository;

import com.codeman.typecraft.question.domain.Question;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QuestionRepository {

    List<Question> findAllActive();
}
