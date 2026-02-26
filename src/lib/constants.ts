// 프로젝트 전역 상수 정의

// 사이트 메타데이터
export const SITE_METADATA = {
  name: '행스기의 독서노트',
  description:
    'Notion을 CMS로 활용하여 독서노트를 웹에 자동 발행하는 개인 독서 블로그',
  url:
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'),
} as const

// 도서 카테고리(장르) 목록
export const CATEGORIES = [
  '전체',
  'IT',
  '인문',
  '경제',
  '소설',
  '자기계발',
  '과학',
  '역사',
] as const

export type Category = (typeof CATEGORIES)[number]

// 별점 옵션 (1~5)
export const RATING_OPTIONS = [
  { value: '1', label: '★☆☆☆☆ (1점)' },
  { value: '2', label: '★★☆☆☆ (2점)' },
  { value: '3', label: '★★★☆☆ (3점)' },
  { value: '4', label: '★★★★☆ (4점)' },
  { value: '5', label: '★★★★★ (5점)' },
] as const

// Notion 도서 발행 상태값 (Notion DB의 Status 속성 옵션과 동일해야 함)
export const BOOK_STATUS = {
  DRAFT: 'Draft',
  READING: 'Reading',
  PUBLISHED: 'Published',
} as const

// 페이지네이션 기본값 (추후 사용)
export const DEFAULT_PAGE_SIZE = 12
