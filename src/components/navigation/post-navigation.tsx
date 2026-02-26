// 이전/다음 글 네비게이션 컴포넌트 [F007]
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Book } from '@/lib/types'

interface PostNavigationProps {
  // 이전 독서노트 (없으면 null)
  prevBook: Book | null
  // 다음 독서노트 (없으면 null)
  nextBook: Book | null
}

export function PostNavigation({ prevBook, nextBook }: PostNavigationProps) {
  return (
    <nav className="border-t" aria-label="이전/다음 독서노트 네비게이션">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-stretch justify-between gap-4">
          {/* 이전 글 버튼 */}
          <div className="flex-1">
            {prevBook ? (
              <Link
                href={`/books/${prevBook.id}`}
                className="group hover:bg-muted/50 focus-visible:ring-ring flex h-full flex-col gap-1 rounded-lg border p-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label={`이전 글: ${prevBook.title}`}
              >
                {/* 이전 글 레이블 */}
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  이전 글
                </span>
                {/* 이전 글 제목 */}
                <span className="group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
                  {prevBook.title}
                </span>
                {/* 저자 */}
                <span className="text-muted-foreground text-xs">
                  {prevBook.author}
                </span>
              </Link>
            ) : (
              // 이전 글이 없는 경우 비활성 상태 표시
              <div className="flex h-full cursor-not-allowed flex-col gap-1 rounded-lg border p-4 opacity-40">
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  이전 글
                </span>
                <span className="text-muted-foreground text-sm">
                  첫 번째 글입니다
                </span>
              </div>
            )}
          </div>

          {/* 홈으로 돌아가기 버튼 (중앙) */}
          <div className="flex shrink-0 items-center">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" aria-label="홈으로 돌아가기">
                목록
              </Link>
            </Button>
          </div>

          {/* 다음 글 버튼 */}
          <div className="flex-1">
            {nextBook ? (
              <Link
                href={`/books/${nextBook.id}`}
                className="group hover:bg-muted/50 focus-visible:ring-ring flex h-full flex-col items-end gap-1 rounded-lg border p-4 text-right transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-label={`다음 글: ${nextBook.title}`}
              >
                {/* 다음 글 레이블 */}
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                  다음 글
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {/* 다음 글 제목 */}
                <span className="group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
                  {nextBook.title}
                </span>
                {/* 저자 */}
                <span className="text-muted-foreground text-xs">
                  {nextBook.author}
                </span>
              </Link>
            ) : (
              // 다음 글이 없는 경우 비활성 상태 표시
              <div className="flex h-full cursor-not-allowed flex-col items-end gap-1 rounded-lg border p-4 text-right opacity-40">
                <span className="text-muted-foreground flex items-center gap-1 text-xs">
                  다음 글
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-muted-foreground text-sm">
                  마지막 글입니다
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
