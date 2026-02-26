// Hero 섹션 컴포넌트 - 서비스 소개 문구 및 키워드 검색 바 [F004]
import { Input } from '@/components/ui/input'
import { SITE_METADATA } from '@/lib/constants'
import { Search } from 'lucide-react'

interface HeroSectionProps {
  // 현재 검색어 상태
  searchQuery: string
  // 검색어 변경 핸들러
  onSearchChange: (value: string) => void
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section
      className="from-background via-muted/30 to-background relative overflow-hidden bg-gradient-to-br py-16 sm:py-20"
      aria-label="서비스 소개 및 검색"
    >
      {/* 배경 장식 요소 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      >
        <div className="bg-primary/5 absolute top-8 left-1/4 h-48 w-48 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute right-1/4 bottom-8 h-64 w-64 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          {/* 서비스 제목 */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {SITE_METADATA.name}
          </h1>

          {/* 서비스 부제 */}
          <p className="text-muted-foreground mt-4 text-lg sm:text-xl">
            Notion연동 페이지 테스트ㅋ
          </p>

          {/* 키워드 검색 바 */}
          <div className="relative mt-8">
            <Search
              className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="책 제목 또는 저자를 검색하세요"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="h-12 pr-4 pl-10 text-base shadow-sm"
              aria-label="도서 검색"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
