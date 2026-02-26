// 메인 페이지 로딩 UI - Suspense 스켈레톤
import { Skeleton } from '@/components/ui/skeleton'
import { BookCardSkeletonGrid } from '@/components/book/book-card-skeleton'

export default function HomeLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero 섹션 스켈레톤 */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-96 max-w-full" />
          {/* 검색 바 스켈레톤 */}
          <Skeleton className="h-12 w-full max-w-xl rounded-full" />
        </div>
      </section>

      {/* 필터 섹션 스켈레톤 */}
      <section className="border-b py-4">
        <div className="container mx-auto flex flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 장르 탭 스켈레톤 */}
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-16 rounded-md" />
            ))}
          </div>
          {/* 별점 셀렉트 스켈레톤 */}
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </section>

      {/* 도서 카드 그리드 스켈레톤 */}
      <section className="container mx-auto px-4 py-8">
        <BookCardSkeletonGrid count={6} />
      </section>
    </div>
  )
}
