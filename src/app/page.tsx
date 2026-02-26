'use client'

// 독서일기 메인 페이지 (홈) - 더미 데이터 기반 UI [F001, F002, F003, F004]
// Phase 3에서 getPublishedDummyBooks()를 실제 Notion API 호출로 교체 예정
import { useState, useMemo } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { FilterSection } from '@/components/sections/filter-section'
import { BookListSection } from '@/components/sections/book-list-section'
import { getPublishedDummyBooks } from '@/lib/dummy-data'

export default function Home() {
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState('')
  // 선택된 카테고리 상태 (기본값: '전체')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  // 선택된 별점 상태 ('all' = 전체)
  const [selectedRating, setSelectedRating] = useState('all')

  // 더미 도서 목록 (publishedDate 내림차순 정렬)
  const allBooks = useMemo(() => getPublishedDummyBooks(), [])

  // 클라이언트 사이드 필터링: 검색어 + 카테고리 + 별점 조건을 모두 충족하는 도서만 반환 [F003, F004]
  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      // 검색어 필터: 제목 또는 저자명에 검색어 포함 여부 (대소문자 무시)
      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        query === '' ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)

      // 카테고리 필터: '전체'이면 모두 통과, 아니면 해당 카테고리 포함 여부 확인
      const matchesCategory =
        selectedCategory === '전체' ||
        book.categories.includes(selectedCategory)

      // 별점 필터: 'all'이면 모두 통과, 아니면 해당 별점과 일치 여부 확인
      const matchesRating =
        selectedRating === 'all' || book.rating === parseInt(selectedRating, 10)

      return matchesSearch && matchesCategory && matchesRating
    })
  }, [allBooks, searchQuery, selectedCategory, selectedRating])

  return (
    <main>
      {/* Hero 섹션: 서비스 소개 + 검색 바 */}
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* 필터 섹션: 카테고리 탭 + 별점 셀렉트 */}
      <FilterSection
        selectedCategory={selectedCategory}
        selectedRating={selectedRating}
        onCategoryChange={setSelectedCategory}
        onRatingChange={setSelectedRating}
      />

      {/* 도서 목록 섹션: 필터링된 도서 카드 그리드 */}
      <BookListSection books={filteredBooks} totalCount={allBooks.length} />
    </main>
  )
}
