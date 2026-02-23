// 도서 발행 상태 타입
export type BookStatus = 'Draft' | 'Reading' | 'Published'

// Notion DB의 도서 항목을 매핑하는 핵심 타입
export interface Book {
  // Notion 페이지 고유 ID
  id: string
  // 도서 제목
  title: string
  // 발행 상태
  status: BookStatus
  // 장르 목록 (IT, 인문, 경제, 소설 등 복수 선택 가능)
  categories: string[]
  // 별점 (1~5), 미입력 시 null
  rating: number | null
  // 저자명
  author: string
  // 도서 표지 이미지 URL, 없으면 null
  coverImage: string | null
  // 목록 페이지용 한줄 요약
  summary: string
  // 발행일 (ISO 8601 날짜 문자열), 미입력 시 null
  publishedDate: string | null
}
