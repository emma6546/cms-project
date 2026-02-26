// 독서노트 상세 페이지 로딩 UI - Suspense 스켈레톤
import { Skeleton } from '@/components/ui/skeleton'

export default function BookDetailLoading() {
  return (
    <main>
      {/* 브레드크럼 스켈레톤 */}
      <div className="container mx-auto px-4 pt-4">
        <Skeleton className="h-4 w-20" />
      </div>

      {/* 도서 메타데이터 헤더 스켈레톤 */}
      <div className="bg-muted/30 py-10">
        <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-start">
          {/* 커버 이미지 스켈레톤 */}
          <Skeleton className="mx-auto h-64 w-44 shrink-0 rounded-md md:mx-0" />

          {/* 메타데이터 텍스트 스켈레톤 */}
          <div className="flex flex-1 flex-col gap-4">
            {/* 카테고리 배지 스켈레톤 */}
            <div className="flex gap-2">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            {/* 제목 스켈레톤 */}
            <Skeleton className="h-8 w-3/4" />
            {/* 저자명 스켈레톤 */}
            <Skeleton className="h-5 w-1/3" />
            {/* 별점 스켈레톤 */}
            <Skeleton className="h-5 w-28" />
            {/* 발행일 스켈레톤 */}
            <Skeleton className="h-4 w-24" />
            {/* 요약 스켈레톤 */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역 스켈레톤 */}
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-4">
          {/* 본문 단락 스켈레톤 */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>

      {/* 이전/다음 글 네비게이션 스켈레톤 */}
      <div className="border-t">
        <div className="container mx-auto flex justify-between px-4 py-6">
          <Skeleton className="h-16 w-40 rounded-md" />
          <Skeleton className="h-16 w-40 rounded-md" />
        </div>
      </div>
    </main>
  )
}
