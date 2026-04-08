package com.codeman.typecraft.result.repository;

import com.codeman.typecraft.result.domain.Result;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ResultRepository {

    void save(Result result);

    Result findByShareToken(String shareToken);

    boolean existsByShareToken(String shareToken);
}
