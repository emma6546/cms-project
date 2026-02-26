// 독서노트 상세 페이지 - 동적 라우트 [id] [F005, F006, F007]
// Phase 3에서 실제 Notion API 데이터로 교체 예정
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { BookDetailHeader } from '@/components/book/book-detail-header'
import { NotionBlockRenderer } from '@/components/book/notion-block-renderer'
import { PostNavigation } from '@/components/navigation/post-navigation'
import {
  getDummyBookById,
  getAdjacentDummyBooks,
  DUMMY_BLOCKS,
} from '@/lib/dummy-data'

// 브라우저 탭 제목을 책 이름으로 동적 설정 [F009]
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const book = getDummyBookById(id)
  if (!book) return { title: '독서일기' }
  return {
    title: `${book.title} | 독서일기`,
    description: book.summary,
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // 더미 데이터에서 도서 조회 (없으면 404)
  const book = getDummyBookById(id)
  if (!book) {
    notFound()
  }

  // 이전/다음 도서 조회 (publishedDate 기준)
  const { prevBook, nextBook } = getAdjacentDummyBooks(id)

  return (
    <main>
      {/* 브레드크럼 - 현재 위치 컨텍스트 표시 */}
      <div className="container mx-auto px-4 pt-4">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          목록으로
        </Link>
      </div>

      {/* 도서 메타데이터 헤더 */}
      <BookDetailHeader book={book} />

      {/* 독서노트 본문 영역 */}
      <div className="container mx-auto px-4 py-8">
        <article aria-label={`${book.title} 독서노트 본문`}>
          {/* TODO: Phase 3에서 실제 Notion 블록 데이터로 교체 */}
          <NotionBlockRenderer blocks={DUMMY_BLOCKS} />
        </article>
      </div>

      {/* 이전/다음 글 네비게이션 */}
      <PostNavigation prevBook={prevBook} nextBook={nextBook} />
    </main>
  )
}
