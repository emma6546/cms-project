// 독서노트 상세 페이지 - 동적 라우트 [id] [F005, F006, F007]
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { BookDetailHeader } from '@/components/book/book-detail-header'
import { NotionBlockRenderer } from '@/components/book/notion-block-renderer'
import { PostNavigation } from '@/components/navigation/post-navigation'
import {
  getBookById,
  getAdjacentBooks,
  getPublishedBooks,
} from '@/lib/notion/books'
import { getPageBlocks } from '@/lib/notion/blocks'
import { toProxyUrl } from '@/lib/notion/image-utils'
import { SITE_METADATA } from '@/lib/constants'

// ISR: 1시간마다 페이지 재생성, 미리 생성되지 않은 경로도 허용
export const revalidate = 3600
export const dynamicParams = true

// 빌드 시 Published 도서 전체를 정적 페이지로 사전 생성
export async function generateStaticParams() {
  const books = await getPublishedBooks()
  return books.map(book => ({ id: book.id }))
}

// 도서별 동적 메타데이터 및 OG 태그 생성 [F009]
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const book = await getBookById(id)
  if (!book) return { title: '독서일기' }

  const pageUrl = `${SITE_METADATA.url}/books/${id}`
  const ogImage = book.coverImage
    ? (toProxyUrl(book.coverImage) ?? book.coverImage)
    : undefined

  return {
    title: book.title,
    description: book.summary,
    openGraph: {
      type: 'article',
      title: book.title,
      description: book.summary,
      url: pageUrl,
      ...(ogImage && { images: [{ url: ogImage, alt: `${book.title} 표지` }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: book.title,
      description: book.summary,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Notion API에서 도서 조회 (없으면 404)
  const book = await getBookById(id)
  if (!book) {
    notFound()
  }

  // 이전/다음 도서 및 본문 블록 병렬 조회
  const [{ prevBook, nextBook }, blocks] = await Promise.all([
    getAdjacentBooks(id),
    getPageBlocks(id),
  ])

  // JSON-LD 구조화 데이터 (도서 리뷰 스키마)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: book.title,
    description: book.summary,
    author: { '@type': 'Person', name: '독서일기' },
    itemReviewed: {
      '@type': 'Book',
      name: book.title,
      author: { '@type': 'Person', name: book.author },
    },
    ...(book.rating && {
      reviewRating: {
        '@type': 'Rating',
        ratingValue: book.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(book.publishedDate && { datePublished: book.publishedDate }),
  }

  return (
    <main>
      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 브레드크럼 - 현재 위치 컨텍스트 표시 */}
      <div className="container mx-auto px-4 pt-4">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          목록으로
        </Link>
      </div>

      {/* 도서 메타데이터 헤더 */}
      <BookDetailHeader book={book} />

      {/* 독서노트 본문 영역 */}
      <div className="container mx-auto px-4 py-8">
        <article aria-label={`${book.title} 독서노트 본문`}>
          <NotionBlockRenderer blocks={blocks} />
        </article>
      </div>

      {/* 이전/다음 글 네비게이션 */}
      <PostNavigation prevBook={prevBook} nextBook={nextBook} />
    </main>
  )
}
