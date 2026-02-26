'use client'

// 메인 페이지 클라이언트 컴포넌트 - 검색/필터 상태 관리 [F003, F004]
// 서버 컴포넌트(page.tsx)에서 전달받은 도서 목록을 클라이언트 사이드에서 필터링
import { useState, useMemo } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { FilterSection } from '@/components/sections/filter-section'
import { BookListSection } from '@/components/sections/book-list-section'
import type { Book } from '@/lib/types'

interface HomeClientProps {
    books: Book[]
}

export function HomeClient({ books }: HomeClientProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('전체')
    const [selectedRating, setSelectedRating] = useState('all')

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const query = searchQuery.trim().toLowerCase()
            const matchesSearch =
                query === '' ||
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)

            const matchesCategory =
                selectedCategory === '전체' ||
                book.categories.includes(selectedCategory)

            const matchesRating =
                selectedRating === 'all' ||
                book.rating === parseInt(selectedRating, 10)

            return matchesSearch && matchesCategory && matchesRating
        })
    }, [books, searchQuery, selectedCategory, selectedRating])

    return (
        <main>
            <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <FilterSection
                selectedCategory={selectedCategory}
                selectedRating={selectedRating}
                onCategoryChange={setSelectedCategory}
                onRatingChange={setSelectedRating}
            />
            <BookListSection books={filteredBooks} totalCount={books.length} />
        </main>
    )
}
