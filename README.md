# 독서일기

Notion을 CMS로 활용하여 독서노트를 웹에 자동 발행하는 개인 독서 블로그입니다.

## 프로젝트 개요

**목적**: Notion을 CMS로 활용하여 별도 관리자 패널 없이 독서노트를 웹에 자동 발행하는 개인 독서 블로그 구축
**사용자**: 독서 기록을 Notion으로 관리하고 이를 공개 웹페이지로 공유하고 싶은 1인 개발자 및 독서가

## 주요 페이지

1. **메인 페이지 (홈)** - 발행된 독서노트 카드 그리드, 장르/별점 필터링, 키워드 검색
2. **독서노트 상세 페이지** - Notion 본문 렌더링, 도서 메타데이터, 이전/다음 글 네비게이션

## 핵심 기능

- **Notion DB 연동**: Status = Published 항목만 조회하여 도서 목록 표시
- **도서 카드 그리드**: 커버 이미지, 제목, 저자, 별점, 요약 카드 형태 리스팅
- **필터링 & 검색**: 장르(Category) 탭 필터, 별점(Rating) 셀렉트, 키워드 검색
- **Notion 본문 렌더링**: 텍스트, 이미지, 코드 블록 등 블록 타입별 렌더링
- **이미지 핸들링**: Notion 임시 URL 만료 문제 해결 (프록시/캐싱)
- **SEO 최적화**: 도서별 메타태그 및 OG 태그 자동 생성

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **CMS**: Notion API (@notionhq/client)
- **Deployment**: Vercel

## 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# NOTION_API_KEY, NOTION_DATABASE_ID 설정 필요

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 개발 상태

- 기본 프로젝트 구조 설정
- Notion API 연동 구현 (예정)
- 메인 페이지 (도서 카드 그리드, 필터, 검색) (예정)
- 독서노트 상세 페이지 (본문 렌더링, 메타데이터) (예정)
- SEO 및 OG 태그 자동 생성 (예정)

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 로드맵](./docs/ROADMAP.md) - 개발 계획
- [개발 가이드](./CLAUDE.md) - 개발 지침
