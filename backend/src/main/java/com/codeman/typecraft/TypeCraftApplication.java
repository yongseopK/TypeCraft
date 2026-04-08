package com.codeman.typecraft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TypeCraftApplication {

    public static void main(String[] args) {
        SpringApplication.run(TypeCraftApplication.class, args);
    }

}
