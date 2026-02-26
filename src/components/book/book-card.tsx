// 도서 카드 컴포넌트 - 커버 이미지, 제목, 저자, 카테고리, 별점, 요약 표시
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { StarRating } from '@/components/book/star-rating'
import { CategoryBadge } from '@/components/book/category-badge'
import type { Book } from '@/lib/types'
import { cn } from '@/lib/utils'
import { toProxyUrl } from '@/lib/notion/image-utils'

interface BookCardProps {
  book: Book
  className?: string
}

export function BookCard({ book, className }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="group focus-visible:ring-ring block rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label={`${book.title} - ${book.author} 독서노트 보기`}
    >
      <Card
        className={cn(
          // hover 시 그림자 강화 및 살짝 위로 이동하는 인터랙션 효과
          'gap-0 overflow-hidden py-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md',
          className
        )}
      >
        {/* 도서 커버 이미지 영역 */}
        <div className="bg-muted relative aspect-[3/4] w-full overflow-hidden">
          {book.coverImage ? (
            <Image
              src={toProxyUrl(book.coverImage) ?? book.coverImage}
              alt={`${book.title} 표지`}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            // 커버 이미지가 없는 경우 placeholder 표시
            <div className="bg-muted flex h-full w-full flex-col items-center justify-center gap-2">
              <BookOpen className="text-muted-foreground/40 h-12 w-12" />
              <span className="text-muted-foreground/60 text-xs">
                이미지 없음
              </span>
            </div>
          )}
        </div>

        {/* 도서 정보 영역 */}
        <CardContent className="flex flex-col gap-2 p-4">
          {/* 카테고리 배지 목록 */}
          {book.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {book.categories.slice(0, 2).map(category => (
                <CategoryBadge key={category} category={category} />
              ))}
              {/* 카테고리가 3개 이상이면 +N 표시 */}
              {book.categories.length > 2 && (
                <CategoryBadge
                  category={`+${book.categories.length - 2}`}
                  variant="secondary"
                />
              )}
            </div>
          )}

          {/* 도서 제목 */}
          <h2 className="line-clamp-2 text-base leading-snug font-semibold tracking-tight">
            {book.title}
          </h2>

          {/* 저자명 */}
          <p className="text-muted-foreground text-sm">{book.author}</p>

          {/* 별점 */}
          <StarRating rating={book.rating} />

          {/* 요약 문구 */}
          <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
            {book.summary}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
