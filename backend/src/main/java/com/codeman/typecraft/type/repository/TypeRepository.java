package com.codeman.typecraft.type.repository;

import com.codeman.typecraft.type.domain.Type;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TypeRepository {

    Type findByMbtiCode(String mbtiCode);

    boolean existsByMbtiCode(String mbtiCode);
}
