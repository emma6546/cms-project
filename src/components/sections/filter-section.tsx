// 필터 섹션 컴포넌트 - 장르 탭 필터 및 별점 셀렉트 박스 [F003]
import { cn } from '@/lib/utils'
import { CATEGORIES, RATING_OPTIONS } from '@/lib/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterSectionProps {
  // 현재 선택된 카테고리 (기본값: '전체')
  selectedCategory: string
  // 현재 선택된 별점 ('all' = 전체)
  selectedRating: string
  // 카테고리 변경 핸들러
  onCategoryChange: (value: string) => void
  // 별점 변경 핸들러
  onRatingChange: (value: string) => void
}

export function FilterSection({
  selectedCategory,
  selectedRating,
  onCategoryChange,
  onRatingChange,
}: FilterSectionProps) {
  return (
    <section
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b backdrop-blur"
      aria-label="도서 목록 필터"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* 장르 탭 필터 - shadcn Tabs 대신 버튼 기반 커스텀 탭 구현 */}
          <div
            className="flex flex-wrap gap-1.5"
            role="tablist"
            aria-label="장르 필터"
          >
            {CATEGORIES.map(category => (
              <button
                key={category}
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  // 기본 탭 버튼 스타일
                  'focus-visible:ring-ring rounded-full px-3 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                  // 선택된 탭과 미선택 탭 스타일 분기
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 별점 셀렉트 박스 */}
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-muted-foreground text-sm whitespace-nowrap">
              별점
            </span>
            <Select value={selectedRating} onValueChange={onRatingChange}>
              <SelectTrigger className="h-9 w-40" aria-label="별점으로 필터링">
                <SelectValue placeholder="전체" />
              </SelectTrigger>
              <SelectContent>
                {/* 전체 옵션 */}
                <SelectItem value="all">전체 별점</SelectItem>
                {RATING_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  )
}
