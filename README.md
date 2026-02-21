# 독서일기

Notion을 CMS로 활용한 개인 독서노트 웹페이지입니다.
Notion에서 작성한 독서 기록이 자동으로 웹에 반영됩니다.

## 기술 스택

| 구분 | 기술 |
| :--- | :--- |
| **Framework** | Next.js 15.5.3 (App Router + Turbopack) |
| **Runtime** | React 19.1.0 + TypeScript 5 |
| **CMS** | Notion API |
| **Styling** | TailwindCSS v4 + shadcn/ui |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 주요 기능

- Notion DB 연동 (Published 상태 자동 리스팅)
- 장르 및 별점별 필터링
- 키워드 검색
- Notion 블록 기반 본문 렌더링
- 이전/다음 글 네비게이션
- 반응형 디자인 (모바일/태블릿/데스크톱)
- SEO 메타 태그 및 OpenGraph 자동 생성

## 시작하기

### 환경변수 설정

`.env.local` 파일을 생성하고 Notion API 키와 DB ID를 설정합니다.

```bash
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
```

### 개발 서버 실행

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 주요 스크립트

```bash
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 모든 검사 통합 실행 (lint, typecheck, format)
```

## 프로젝트 문서

- [PRD (요구사항 명세)](docs/PRD.md)
- [프로젝트 구조 가이드](docs/guides/project-structure.md)
- [스타일링 가이드](docs/guides/styling-guide.md)
- [컴포넌트 패턴](docs/guides/component-patterns.md)
- [Next.js 15 가이드](docs/guides/nextjs-15.md)

## 배포

Vercel에 배포합니다. 환경변수를 Vercel 프로젝트 설정에 추가하세요.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
