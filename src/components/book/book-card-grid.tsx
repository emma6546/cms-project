// 도서 카드 그리드 컴포넌트 - 반응형 그리드로 도서 카드 목록 배치
import { BookOpen } from 'lucide-react'
import { BookCard } from '@/components/book/book-card'
import type { Book } from '@/lib/types'

interface BookCardGridProps {
  books: Book[]
}

export function BookCardGrid({ books }: BookCardGridProps) {
  // 도서 목록이 없는 경우 결과 없음 안내 표시
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <BookOpen className="text-muted-foreground/30 h-16 w-16" />
        <div className="space-y-1">
          <p className="text-muted-foreground text-base font-medium">
            조건에 맞는 독서노트가 없습니다
          </p>
          <p className="text-muted-foreground/70 text-sm">
            다른 검색어나 필터를 시도해보세요
          </p>
        </div>
      </div>
    )
  }

  return (
    // 반응형 그리드: 모바일 1열 → sm(640px) 2열 → lg(1024px) 3열
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="도서 목록"
    >
      {books.map(book => (
        <div key={book.id} role="listitem">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  )
}
