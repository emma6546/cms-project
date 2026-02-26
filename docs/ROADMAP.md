# 독서일기 개발 로드맵

Notion CMS 기반 개인 독서 블로그 - 독서노트를 웹에 자동 발행하는 서비스

## 개요

독서일기는 독서 기록을 Notion으로 관리하고 이를 공개 웹페이지로 공유하고 싶은 1인 개발자 및 독서가를 위한 서비스로 다음 기능을 제공합니다:

- **Notion CMS 연동**: Notion 데이터베이스를 CMS로 활용하여 별도 관리자 패널 없이 콘텐츠 관리
- **도서 목록 탐색**: 카드 그리드, 장르/별점 필터링, 키워드 검색으로 독서노트 탐색
- **독서노트 상세**: Notion 블록 렌더링으로 풍부한 독서노트 본문 표시

## 개발 워크플로우

### 작업 프로세스

1. ROADMAP.md에서 현재 Phase의 미완료 Task 확인
2. Task의 구현 사항을 순서대로 진행
3. 각 구현 사항 완료 시 `-`를 `✅`로 변경
4. Task 내 모든 구현 사항 완료 시 다음 Task로 이동
5. Phase 내 모든 Task 완료 시 Phase 제목에 `✅` 추가

### 완료 기준

- `npm run check-all` 모든 검사 통과
- `npm run build` 빌드 성공
- 해당 Task의 기능이 브라우저에서 정상 동작 확인

### 상태 표시 규칙

- **Phase 제목 + ✅**: 완료된 Phase
- **Task 앞 우선순위**: `P0` (필수) / `P1` (중요) / `P2` (권장)
- **✅**: 완료된 구현 사항
- **-**: 미완료 구현 사항

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

> 전체 라우트 구조, 빈 페이지, 공통 레이아웃 골격, 기본 타입 정의를 완성합니다.
> 이 Phase가 끝나면 모든 페이지 경로가 존재하고, 빈 화면이라도 이동이 가능합니다.

#### P0 - Task 001: 프로젝트 라우팅 구조 및 공통 레이아웃 골격 구축 ✅

- ✅ `src/app/page.tsx` 메인 페이지(홈) 라우트 골격 작성 (빈 페이지 + 제목만 표시)
- ✅ `src/app/books/[id]/page.tsx` 독서노트 상세 페이지 동적 라우트 생성
- ✅ `src/components/layout/header.tsx` 헤더 컴포넌트 골격 (사이트 로고 "독서일기" + 홈 링크)
- ✅ `src/components/layout/footer.tsx` 푸터 컴포넌트 골격 (저작권 표기)
- ✅ `src/app/layout.tsx` 루트 레이아웃에 Header/Footer 통합 및 공통 메타데이터 설정
- ✅ `src/app/not-found.tsx` 404 페이지 생성

#### P0 - Task 002: TypeScript 타입 정의 및 데이터 모델 설계 ✅

- ✅ `src/lib/types/book.ts` Book 타입 정의 (id, title, status, categories, rating, author, coverImage, summary, publishedDate)
- ✅ `src/lib/types/notion.ts` NotionBlock 타입 정의 (id, type, content, children) 및 Notion API 응답 매핑 타입
- ✅ `src/lib/types/index.ts` 타입 배럴 파일 생성 (모든 타입 re-export)
- ✅ `src/lib/constants.ts` 상수 정의 (카테고리 목록, 별점 옵션, 사이트 메타데이터 등)
- ✅ `src/lib/dummy-data.ts` 개발용 더미 도서 데이터 5~8건 생성 (모든 필드 포함)

---

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅

> 더미 데이터를 사용하여 모든 페이지의 UI를 완성합니다.
> 이 Phase가 끝나면 실제 서비스와 동일한 화면이 더미 데이터로 동작합니다.

#### P0 - Task 003: 공통 UI 컴포넌트 라이브러리 구현 ✅

- ✅ `src/components/book/book-card.tsx` 도서 카드 컴포넌트 (커버 이미지, 제목, 저자, 별점, 요약 문구) [F002]
- ✅ `src/components/book/book-card-grid.tsx` 도서 카드 그리드 레이아웃 (반응형 그리드 배치) [F002]
- ✅ `src/components/book/star-rating.tsx` 별점 표시 컴포넌트 (1~5점 별 아이콘 렌더링)
- ✅ `src/components/book/category-badge.tsx` 카테고리 배지 컴포넌트 (장르 태그 표시)
- ✅ `src/components/book/book-card-skeleton.tsx` 도서 카드 스켈레톤 로딩 UI
- ✅ shadcn/ui 필수 컴포넌트 추가 설치 확인 (Tabs, Select, Card, Badge, Input, Skeleton)

#### P0 - Task 004: 메인 페이지 UI 완성 (더미 데이터) ✅

- ✅ `src/components/sections/hero-section.tsx` Hero 섹션 (서비스 소개 문구 + 키워드 검색 바 UI) [F004]
- ✅ `src/components/sections/filter-section.tsx` 필터 섹션 (장르 Tabs 필터 + 별점 Select 박스 UI) [F003]
- ✅ `src/components/sections/book-list-section.tsx` 도서 목록 섹션 (BookCardGrid 통합 + 결과 없음 안내)
- ✅ `src/app/page.tsx` 메인 페이지에 Hero/Filter/BookList 섹션 통합 (더미 데이터 사용) [F001, F002]
- ✅ 클라이언트 사이드 키워드 검색 필터링 로직 구현 (제목, 저자명 기준) [F004]
- ✅ 장르(Category) 탭 필터 및 별점(Rating) 셀렉트 박스 필터링 로직 구현 [F003]
- ✅ 반응형 레이아웃 적용 (모바일/태블릿/데스크톱)

#### P0 - Task 005: 독서노트 상세 페이지 UI 완성 (더미 데이터) ✅

- ✅ `src/components/book/book-detail-header.tsx` 도서 메타데이터 헤더 (제목, 저자, 카테고리, 별점, 발행일) [F006]
- ✅ `src/components/navigation/post-navigation.tsx` 이전/다음 글 네비게이션 버튼 컴포넌트 [F007]
- ✅ `src/app/books/[id]/page.tsx` 상세 페이지에 헤더/본문/네비게이션 통합 (더미 데이터 사용) [F005, F006, F007]
- ✅ 본문 블록 타입별 렌더링 컴포넌트 설계 (paragraph, heading, image, code, quote, bulleted_list, numbered_list)
- ✅ `src/components/book/notion-block-renderer.tsx` Notion 블록 렌더러 컴포넌트 (더미 블록 데이터 기반 UI) [F005]
- ✅ 반응형 레이아웃 적용 (모바일/데스크톱 본문 가독성 최적화)

---

### Phase 3: 핵심 기능 구현

> Notion API를 연동하여 더미 데이터를 실제 데이터로 교체하고, 이미지 핸들링과 SEO를 구현합니다.
> 이 Phase가 끝나면 실제 Notion 데이터베이스의 콘텐츠가 웹에 표시됩니다.

#### P0 - Task 006: Notion API 연동 및 도서 목록 조회 구현

- `src/lib/notion/client.ts` Notion API 클라이언트 초기화 (@notionhq/client 설치 및 설정) [F001]
- `src/lib/notion/books.ts` 도서 목록 조회 함수 (Status = Published 필터, publishedDate 정렬) [F001]
- `src/lib/notion/mappers.ts` Notion API 응답을 Book 타입으로 변환하는 매퍼 함수 [F001]
- `.env.local` 환경 변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
- `src/lib/env.ts` 환경 변수 검증에 Notion 관련 변수 추가
- 메인 페이지에서 더미 데이터를 Notion API 실제 데이터로 교체 [F001]
- Playwright MCP를 활용한 도서 목록 조회 E2E 테스트 (목록 렌더링, 필터링 동작 확인)

#### P0 - Task 007: Notion 블록 렌더러 및 본문 표시 구현

- `src/lib/notion/blocks.ts` Notion 페이지 블록 조회 함수 (재귀적 children 블록 포함) [F005]
- `src/lib/notion/block-mappers.ts` Notion 블록 응답을 NotionBlock 타입으로 변환하는 매퍼 [F005]
- `src/components/book/notion-block-renderer.tsx` Notion 블록 렌더러 실제 구현 (더미 기반 UI를 실제 데이터로 교체) [F005]
- 지원 블록 타입: paragraph, heading_1/2/3, image, code, quote, bulleted_list_item, numbered_list_item, callout, divider, bookmark
- Rich Text 렌더링 (볼드, 이탤릭, 취소선, 코드, 링크 등 어노테이션 처리)
- 독서노트 상세 페이지에서 더미 데이터를 실제 Notion 블록 데이터로 교체 [F005]
- Playwright MCP를 활용한 본문 렌더링 E2E 테스트 (블록 타입별 표시 확인)

#### P1 - Task 008: 이미지 프록시 및 Notion 이미지 핸들링

- `src/app/api/notion-image/route.ts` Notion 이미지 프록시 API Route 생성 (임시 URL 만료 대응) [F008]
- `src/lib/notion/image-utils.ts` Notion 이미지 URL 판별 및 프록시 URL 변환 유틸리티 [F008]
- `next.config.ts` Notion 이미지 도메인 허용 설정 (remotePatterns) [F008]
- 도서 카드 커버 이미지에 Next.js Image 컴포넌트 + 프록시 적용 [F008]
- 본문 내 이미지 블록에 프록시 URL 적용 [F008]
- 이미지 로딩 실패 시 폴백 이미지 표시 처리

#### P1 - Task 009: SEO 최적화 및 OG 태그 자동 생성

- `src/app/layout.tsx` 전역 메타데이터 설정 (사이트 제목, 설명, 기본 OG 이미지) [F009]
- `src/app/page.tsx` 메인 페이지 메타데이터 설정 (generateMetadata) [F009]
- `src/app/books/[id]/page.tsx` 도서별 동적 메타데이터 생성 (제목, 요약, 커버 이미지를 OG 태그로 활용) [F009]
- `src/app/sitemap.ts` 동적 사이트맵 생성 (발행된 모든 도서 URL 포함) [F009]
- `src/app/robots.ts` robots.txt 생성 [F009]
- JSON-LD 구조화 데이터 추가 (도서 리뷰 스키마)

---

### Phase 4: 고급 기능 및 최적화

> 성능 최적화, 캐싱 전략을 적용하고 Vercel에 배포합니다.
> 이 Phase가 끝나면 프로덕션 환경에서 안정적으로 서비스가 운영됩니다.

#### P1 - Task 010: 성능 최적화 (ISR, 캐싱) 및 Vercel 배포

- 메인 페이지 ISR 적용 (revalidate 설정으로 주기적 데이터 갱신) [F001]
- 독서노트 상세 페이지 ISR 적용 + generateStaticParams로 빌드 시 사전 생성 [F005]
- Notion API 응답 캐싱 전략 구현 (unstable_cache 또는 fetch cache 활용)
- `src/app/loading.tsx` 메인 페이지 스켈레톤 로딩 UI 적용
- `src/app/books/[id]/loading.tsx` 상세 페이지 스켈레톤 로딩 UI 적용
- `src/app/error.tsx` 전역 에러 바운더리 구현
- Vercel 프로젝트 생성 및 환경 변수 설정 (NOTION_API_KEY, NOTION_DATABASE_ID)
- Vercel 배포 및 프로덕션 환경 동작 확인

---

## 기능-Task 매핑표

| 기능 ID | 기능명                      | 관련 Task                    |
| ------- | --------------------------- | ---------------------------- |
| F001    | Notion DB 연동 및 목록 조회 | Task 002, Task 004, Task 006 |
| F002    | 도서 카드 그리드 표시       | Task 003, Task 004           |
| F003    | 장르 및 별점 필터링         | Task 004                     |
| F004    | 키워드 검색                 | Task 004                     |
| F005    | 독서노트 본문 렌더링        | Task 005, Task 007           |
| F006    | 도서 메타데이터 표시        | Task 005                     |
| F007    | 이전/다음 글 네비게이션     | Task 005                     |
| F008    | 노션 이미지 핸들링          | Task 008                     |
| F009    | SEO 및 OG 태그 자동 생성    | Task 009                     |
