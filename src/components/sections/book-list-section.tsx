// 도서 목록 섹션 컴포넌트 - BookCardGrid 통합 및 로딩/결과 없음 상태 처리
import { BookCardGrid } from '@/components/book/book-card-grid'
import { BookCardSkeletonGrid } from '@/components/book/book-card-skeleton'
import type { Book } from '@/lib/types'

interface BookListSectionProps {
  books: Book[]
  // 로딩 중 여부 (true이면 스켈레톤 표시)
  isLoading?: boolean
  // 전체 도서 수 (필터 전) - 결과 없음 메시지 표시에 활용
  totalCount?: number
}

export function BookListSection({
  books,
  isLoading = false,
  totalCount,
}: BookListSectionProps) {
  return (
    <section className="container mx-auto px-4 py-8" aria-label="도서 목록">
      {/* 결과 카운트 표시 */}
      {!isLoading && totalCount !== undefined && (
        <p className="text-muted-foreground mb-6 text-sm">
          {books.length === totalCount ? (
            <span>총 {totalCount}권의 독서노트</span>
          ) : (
            <span>
              {totalCount}권 중{' '}
              <span className="text-foreground font-medium">
                {books.length}권
              </span>{' '}
              표시
            </span>
          )}
        </p>
      )}

      {/* 로딩 중: 스켈레톤 6개 표시 */}
      {isLoading ? (
        <BookCardSkeletonGrid count={6} />
      ) : (
        /* 정상: 도서 카드 그리드 표시 (빈 배열이면 BookCardGrid 내부에서 결과 없음 안내) */
        <BookCardGrid books={books} />
      )}
    </section>
  )
}
