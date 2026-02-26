// 독서노트 상세 페이지 헤더 컴포넌트 - 도서 메타데이터 표시 [F006]
// 반응형: 모바일(세로 레이아웃) / sm 이상(가로 레이아웃, 전체 너비 활용)
import Image from 'next/image'
import { BookOpen, Calendar } from 'lucide-react'
import { StarRating } from '@/components/book/star-rating'
import { CategoryBadge } from '@/components/book/category-badge'
import { Separator } from '@/components/ui/separator'
import type { Book } from '@/lib/types'

interface BookDetailHeaderProps {
  book: Book
}

// 발행일 포맷팅 (ISO 8601 → 한국어 날짜 형식)
function formatPublishedDate(dateString: string | null): string {
  if (!dateString) return '날짜 미지정'
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BookDetailHeader({ book }: BookDetailHeaderProps) {
  return (
    <header className="bg-muted/20 border-b">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* 반응형 레이아웃: 모바일 세로 / sm 이상 가로 (full-width) */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          {/* 좌측: 도서 커버 이미지 - 모바일 중앙 / 데스크톱 고정 폭 */}
          <div className="mx-auto shrink-0 sm:mx-0">
            <div className="bg-muted relative h-64 w-44 overflow-hidden rounded-xl shadow-lg sm:h-80 sm:w-56">
              {book.coverImage ? (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} 표지`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 176px, 224px"
                  priority
                />
              ) : (
                // 커버 이미지 없는 경우 placeholder
                <div className="bg-muted flex h-full w-full flex-col items-center justify-center gap-2">
                  <BookOpen className="text-muted-foreground/40 h-12 w-12" />
                  <span className="text-muted-foreground/60 text-xs">
                    이미지 없음
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 우측: 도서 메타데이터 - flex-1로 남은 공간 전부 차지 */}
          <div className="flex flex-1 flex-col gap-4 text-center sm:justify-center sm:text-left">
            {/* 카테고리 배지 목록 */}
            {book.categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
                {book.categories.map(category => (
                  <CategoryBadge key={category} category={category} />
                ))}
              </div>
            )}

            {/* 도서 제목 */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {book.title}
            </h1>

            {/* 저자명 */}
            <p className="text-muted-foreground text-lg">{book.author}</p>

            {/* 별점 */}
            <div className="flex justify-center sm:justify-start">
              <StarRating rating={book.rating} />
            </div>

            <Separator />

            {/* 발행일 */}
            <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm sm:justify-start">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={book.publishedDate ?? undefined}>
                {formatPublishedDate(book.publishedDate)}
              </time>
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}
