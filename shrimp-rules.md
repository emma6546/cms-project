# 독서일기 프로젝트 개발 규칙 (AI Agent 전용)

## 프로젝트 개요

- **서비스명**: 독서일기 - Notion CMS 기반 개인 독서 블로그
- **핵심 흐름**: Notion DB → Next.js ISR → 웹 발행
- **라우트**: `/` (메인 목록) + `/books/[id]` (독서노트 상세)

---

## 디렉토리 구조 및 파일 배치 규칙

### 필수 디렉토리 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (Header/Footer 포함)
│   ├── page.tsx                # 메인 페이지 (도서 목록)
│   ├── not-found.tsx           # 404 페이지
│   ├── loading.tsx             # 메인 페이지 로딩 UI
│   ├── error.tsx               # 전역 에러 바운더리
│   ├── sitemap.ts              # 동적 사이트맵
│   ├── robots.ts               # robots.txt
│   ├── books/
│   │   └── [id]/
│   │       ├── page.tsx        # 독서노트 상세 페이지
│   │       └── loading.tsx     # 상세 페이지 로딩 UI
│   └── api/
│       └── notion-image/
│           └── route.ts        # Notion 이미지 프록시
├── components/
│   ├── ui/                     # shadcn/ui 컴포넌트 (수정 금지)
│   ├── layout/
│   │   ├── header.tsx          # 사이트 헤더
│   │   └── footer.tsx          # 사이트 푸터
│   ├── book/                   # 도서 관련 컴포넌트
│   │   ├── book-card.tsx
│   │   ├── book-card-grid.tsx
│   │   ├── book-card-skeleton.tsx
│   │   ├── book-detail-header.tsx
│   │   ├── book-content.tsx
│   │   ├── notion-block-renderer.tsx
│   │   ├── star-rating.tsx
│   │   └── category-badge.tsx
│   ├── navigation/
│   │   └── post-navigation.tsx # 이전/다음 글 버튼
│   ├── sections/               # 메인 페이지 섹션
│   │   ├── hero-section.tsx
│   │   ├── filter-section.tsx
│   │   └── book-list-section.tsx
│   └── providers/
│       └── theme-provider.tsx  # 수정 시 주의
└── lib/
    ├── env.ts                  # 환경변수 검증 (Zod)
    ├── utils.ts                # cn() 등 공통 유틸
    ├── constants.ts            # 카테고리, 별점 등 상수
    ├── dummy-data.ts           # 개발용 더미 데이터
    ├── types/
    │   ├── book.ts             # Book 타입
    │   ├── notion.ts           # NotionBlock 타입
    │   └── index.ts            # 배럴 export
    └── notion/
        ├── client.ts           # Notion API 클라이언트
        ├── books.ts            # 도서 목록 조회
        ├── blocks.ts           # 블록 조회
        ├── mappers.ts          # Notion → Book 변환
        ├── block-mappers.ts    # Notion → NotionBlock 변환
        └── image-utils.ts      # Notion 이미지 URL 처리
```

### 파일 배치 결정 규칙

- 도서/Notion 관련 컴포넌트 → `src/components/book/`
- 메인 페이지 섹션 → `src/components/sections/`
- Notion API 관련 로직 → `src/lib/notion/`
- TypeScript 타입 → `src/lib/types/`
- 새 환경변수 추가 → `src/lib/env.ts`의 `envSchema`에 반드시 추가

---

## Notion 관련 구현 규칙

### 환경변수

- `NOTION_API_KEY`, `NOTION_DATABASE_ID`는 `src/lib/env.ts`에서 검증 후 `env` 객체로 사용
- **절대 `process.env.XXX`를 직접 코드에서 접근하지 말 것** → 반드시 `import { env } from '@/lib/env'` 사용

### 도서 조회 필터

- Notion DB에서 `Status = Published` 항목만 조회
- 정렬: `publishedDate` 내림차순

### 이미지 처리

- Notion 이미지 URL은 만료됨 → `/api/notion-image` 프록시를 통해 제공
- 커버 이미지: Next.js `<Image>` 컴포넌트 사용 (img 태그 금지)
- `next.config.ts`의 `remotePatterns`에 Notion 이미지 도메인 추가 필요

### 블록 렌더링 지원 타입

- 지원: `paragraph`, `heading_1`, `heading_2`, `heading_3`, `image`, `code`, `quote`, `bulleted_list_item`, `numbered_list_item`, `callout`, `divider`, `bookmark`
- 미지원 타입은 무시하거나 fallback으로 처리

---

## 컴포넌트 작성 규칙

### Server vs Client 판단 기준

| 상황                   | 지시                              |
| ---------------------- | --------------------------------- |
| Notion API 데이터 패칭 | Server Component (async/await)    |
| 필터/검색 상태 관리    | Client Component (`'use client'`) |
| 순수 UI 표시           | Server Component (기본값)         |
| 이벤트 핸들러 필요     | Client Component                  |

- `'use client'`는 최소화 → 인터랙티브 최하위 컴포넌트에만 적용

### shadcn/ui 사용 규칙

- `src/components/ui/` 파일은 **직접 수정 금지**
- 새 컴포넌트 추가: `npx shadcn@latest add [name]`
- 기존 컴포넌트 커스터마이징: `cn()` + `className` prop으로 확장
- 이미 설치된 컴포넌트: `alert`, `avatar`, `badge`, `button`, `card`, `checkbox`, `dialog`, `dropdown-menu`, `form`, `input`, `label`, `navigation-menu`, `progress`, `select`, `separator`, `sheet`, `skeleton`, `sonner`

### 스타일링 규칙

- TailwindCSS 유틸리티 클래스 사용 (`cn()` 함수로 조합)
- 시맨틱 색상 변수 사용: `bg-background`, `text-foreground`, `text-muted-foreground` 등
- 인라인 `style={}` 금지
- 하드코딩 색상 금지 (`bg-gray-100`, `text-black` 등)
- 모바일 우선 반응형: `sm:` → `md:` → `lg:` 순서

---

## 타입 시스템 규칙

### Book 타입 (src/lib/types/book.ts)

```typescript
interface Book {
  id: string // Notion 페이지 ID
  title: string // 도서 제목
  status: 'Draft' | 'Reading' | 'Published'
  categories: string[] // 장르 목록
  rating: number | null // 1~5 별점
  author: string // 저자명
  coverImage: string | null // 커버 이미지 URL
  summary: string // 요약 문구
  publishedDate: string | null // ISO 날짜 문자열
}
```

### NotionBlock 타입 (src/lib/types/notion.ts)

```typescript
interface NotionBlock {
  id: string
  type: string
  content: unknown // 블록 타입별 데이터
  children: NotionBlock[]
}
```

### 타입 사용 규칙

- 모든 타입은 `src/lib/types/index.ts`에서 re-export
- 컴포넌트에서는 `import type { Book } from '@/lib/types'` 형태로 import
- `any` 타입 사용 금지 → `unknown` 또는 구체적 타입 사용

---

## 멀티파일 동기화 규칙

### 새 환경변수 추가 시

동시에 수정해야 하는 파일:

1. `.env.local` - 실제 값 추가
2. `.env.example` - 예시값 추가 (빈 값)
3. `src/lib/env.ts` - envSchema에 추가

### Notion 클라이언트 사용 시

- `src/lib/notion/client.ts`에서 싱글톤 클라이언트 초기화
- `src/lib/notion/books.ts`, `src/lib/notion/blocks.ts`에서 클라이언트 import
- **페이지 컴포넌트에서 직접 Notion API 호출 금지** → 반드시 `src/lib/notion/` 함수 경유

### next.config.ts 수정 시

- Notion 이미지 도메인 추가: `images.notion.so`, `prod-files-secure.s3.us-west-2.amazonaws.com`

### ROADMAP.md 업데이트 규칙

- 구현 사항 완료 시: 해당 항목의 `-`를 `✅`로 변경
- Task 내 모든 항목 완료 시: Task 제목의 완료 표시 추가
- **작업 완료 후 반드시 ROADMAP.md 업데이트 수행**

---

## 개발 워크플로우 규칙

### 작업 시작 전

1. `docs/ROADMAP.md`에서 현재 Phase의 미완료 Task 확인
2. Task 구현 사항을 상단부터 순서대로 진행

### 작업 완료 기준 (모두 통과해야 함)

```bash
npm run check-all   # typecheck + lint + format:check
npm run build       # 빌드 성공
```

### 더미 데이터 사용 규칙

- Phase 2까지는 `src/lib/dummy-data.ts` 더미 데이터 사용
- Phase 3 Task 006에서 실제 Notion API 데이터로 교체
- 더미 데이터는 실제 Book 타입과 동일한 구조 유지

---

## 금지 사항

- `src/components/ui/` 파일 직접 수정 금지
- `process.env.XXX` 직접 접근 금지 → `env` 객체 사용
- `img` 태그 사용 금지 → Next.js `<Image>` 컴포넌트 사용
- 인라인 `style={}` 속성 사용 금지
- 하드코딩 색상 클래스 사용 금지
- 페이지 컴포넌트에서 직접 Notion API 호출 금지
- `any` 타입 사용 금지
- `Status !== Published` 항목을 목록에 표시 금지
- 다크모드 토글 구현 금지 (MVP 범위 외, next-themes는 이미 설치되어 있음)
- 페이지네이션 구현 금지 (MVP 범위 외, 전체 목록 표시)
- 댓글/방명록 기능 구현 금지 (MVP 범위 외)
