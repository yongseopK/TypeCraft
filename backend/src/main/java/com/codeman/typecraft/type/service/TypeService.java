package com.codeman.typecraft.type.service;

import com.codeman.typecraft.common.exception.BusinessException;
import com.codeman.typecraft.common.exception.ErrorCode;
import com.codeman.typecraft.type.domain.Type;
import com.codeman.typecraft.type.dto.TypeResponseDTO;
import com.codeman.typecraft.type.repository.TypeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TypeService {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final TypeRepository typeRepository;

    @Cacheable(value = "types", key = "#mbtiCode")
    public TypeResponseDTO findByMbtiCode(String mbtiCode) {
        String upperCode = mbtiCode.toUpperCase();
        if (!isValidMbtiCode(upperCode)) {
            throw new BusinessException(ErrorCode.INVALID_MBTI_CODE,
                    "유효하지 않은 MBTI 코드입니다: " + mbtiCode);
        }

        Type type = typeRepository.findByMbtiCode(upperCode);
        if (type == null) {
            throw new BusinessException(ErrorCode.TYPE_NOT_FOUND,
                    "MBTI 코드 " + upperCode + "는 존재하지 않습니다");
        }

        return new TypeResponseDTO(
                type,
                parseJsonArray(type.getCharacteristics()),
                parseJsonArray(type.getSuitableRoles()),
                parseJsonArray(type.getTechStack()),
                parseJsonArray(type.getCompatibility())
        );
    }

    /** 결과 조회 시 TypeInfo 구성용 */
    public Type findRawByMbtiCode(String mbtiCode) {
        return typeRepository.findByMbtiCode(mbtiCode);
    }

    private boolean isValidMbtiCode(String code) {
        if (code == null || code.length() != 4) return false;
        return "EI".indexOf(code.charAt(0)) >= 0
                && "SN".indexOf(code.charAt(1)) >= 0
                && "TF".indexOf(code.charAt(2)) >= 0
                && "JP".indexOf(code.charAt(3)) >= 0;
    }

    public List<String> parseJsonArray(String json) {
        if (json == null || json.isBlank()) return Collections.emptyList();
        try {
            return OBJECT_MAPPER.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            log.warn("JSON 파싱 실패: {}", json);
            return Collections.emptyList();
        }
    }
}
