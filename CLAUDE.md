# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TypeCraft is a Developer MBTI personality assessment service. Users answer 28 questions (7 per axis: E-I, S-N, T-F, J-P) to get their developer personality type from 16 MBTI categories. Results can be shared via unique tokens.

## Commands

### Backend (Spring Boot + Maven)

```bash
cd backend

# Run development server (http://localhost:8080)
./mvnw spring-boot:run          # Linux/Mac
mvnw.cmd spring-boot:run        # Windows

# Build
./mvnw clean package

# Run all tests
./mvnw test

# Run a single test class
./mvnw test -Dtest=TypeCraftApplicationTests
```

### Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

## Architecture

### Stack
- **Frontend**: Next.js (Pages Router), React, Tailwind CSS 4 — deployed to Vercel
- **Backend**: Spring Boot 4, Java 17, MyBatis (XML mappers), MariaDB
- **Build**: Maven Wrapper (mvnw)

### Backend Domain Structure

```
com.codeman.typecraft/
├── common/          # WebConfig (CORS), GlobalExceptionHandler, ErrorCode, utilities
├── question/        # 28-question quiz content
├── result/          # User results, MBTI scores, share tokens
├── statistics/      # Aggregated analytics
└── type/            # 16 MBTI type definitions
```

Each domain follows: `controller/ → service/ → repository/ → domain/ + dto/`

### MyBatis SQL Mapping

SQL is in XML files, not annotations:
- `backend/src/main/resources/mapper/**/*.xml`

MyBatis is configured with snake_case → camelCase auto-conversion. Type aliases are registered under `com.typecraft.**.domain`.

### API & CORS

- Backend API base: `http://localhost:8080/api/**`
- CORS is configured in `WebConfig.java` — currently allows only `http://localhost:3000`
- Credentials are enabled, max age 3600s

### Database

MariaDB — connection configured in `application.yml`:
- URL: `jdbc:mariadb://localhost:3306/typeCraft`
- See `application-example.yml` for the credential template (actual credentials are in `application.yml`, not committed as example)

### Key Design Points

- Results use a **unique share token** (generated at result creation) for social sharing links
- Scoring uses a **5-point scale** per question; tie-breaking rules are documented in `docs/SCORING.md`
- Questions and type definitions live in the DB (not hardcoded)
- `docs/` contains PRD, question set, and scoring algorithm specs
