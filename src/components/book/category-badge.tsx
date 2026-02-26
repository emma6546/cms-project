// 카테고리 배지 컴포넌트 - 도서 장르 태그 표시
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CategoryBadgeProps {
  // 카테고리 이름
  category: string
  // 배지 스타일 변형 (기본값: outline)
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
}

export function CategoryBadge({
  category,
  variant = 'outline',
  className,
}: CategoryBadgeProps) {
  return (
    <Badge variant={variant} className={cn('text-xs font-normal', className)}>
      {category}
    </Badge>
  )
}
