// 별점 표시 컴포넌트 - 1~5점을 채워진/빈 별 아이콘으로 렌더링
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  // 별점 값 (1~5), null이면 별점 없음 표시
  rating: number | null
  // 최대 별점 (기본값: 5)
  max?: number
  // 별 아이콘 크기 클래스 (기본값: w-4 h-4)
  className?: string
}

export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  // 별점이 없는 경우 빈 상태 표시
  if (rating === null) {
    return (
      <div className={cn('flex items-center gap-0.5', className)}>
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className="text-muted-foreground/30 h-4 w-4"
            aria-hidden="true"
          />
        ))}
        <span className="text-muted-foreground ml-1 text-xs">미평가</span>
      </div>
    )
  }

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      aria-label={`별점 ${rating}점 / ${max}점`}
      role="img"
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            // 현재 인덱스가 별점 미만이면 채워진 별, 아니면 빈 별
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground/30'
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
