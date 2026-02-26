// 도서 카드 스켈레톤 로딩 UI - 데이터 로딩 중 표시되는 플레이스홀더
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export function BookCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* 커버 이미지 스켈레톤 */}
      <Skeleton className="aspect-[3/4] w-full rounded-none" />

      {/* 카드 정보 스켈레톤 */}
      <CardContent className="flex flex-col gap-2 p-4">
        {/* 카테고리 배지 스켈레톤 */}
        <div className="flex gap-1">
          <Skeleton className="h-5 w-12 rounded-md" />
          <Skeleton className="h-5 w-10 rounded-md" />
        </div>

        {/* 제목 스켈레톤 (2줄) */}
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* 저자명 스켈레톤 */}
        <Skeleton className="h-4 w-1/3" />

        {/* 별점 스켈레톤 */}
        <Skeleton className="h-4 w-24" />

        {/* 요약 스켈레톤 (2줄) */}
        <div className="space-y-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </CardContent>
    </Card>
  )
}

// 그리드 형태의 스켈레톤 목록 - BookListSection에서 사용
interface BookCardSkeletonGridProps {
  count?: number
}

export function BookCardSkeletonGrid({ count = 6 }: BookCardSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <BookCardSkeleton key={i} />
      ))}
    </div>
  )
}
