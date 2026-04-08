package com.codeman.typecraft.question.service;

import com.codeman.typecraft.question.domain.Question;
import com.codeman.typecraft.question.dto.QuestionResponseDTO;
import com.codeman.typecraft.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    /** API 응답용 - 캐시 */
    @Cacheable(value = "questions", key = "'list'")
    public QuestionResponseDTO findAllActive() {
        return new QuestionResponseDTO(questionRepository.findAllActive());
    }

    /** 점수 계산용 - 캐시 */
    @Cacheable(value = "questions", key = "'raw'")
    public List<Question> findAllActiveRaw() {
        return questionRepository.findAllActive();
    }
}
