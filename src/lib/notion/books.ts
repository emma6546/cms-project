// Notion 데이터베이스에서 도서 목록/단건 조회 함수 [F001]
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { isFullPage } from '@notionhq/client'
import { unstable_cache } from 'next/cache'
import { notionClient } from '@/lib/notion/client'
import { mapNotionPageToBook } from '@/lib/notion/mappers'
import { env } from '@/lib/env'
import type { Book } from '@/lib/types'

// Status = Published 인 도서 전체 조회 (publishedDate 내림차순) - 1시간 캐싱
export const getPublishedBooks = unstable_cache(
  async (): Promise<Book[]> => {
    const response = await notionClient.dataSources.query({
      data_source_id: env.NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'PublishedDate',
          direction: 'descending',
        },
      ],
    })

    return response.results
      .filter(isFullPage)
      .map(page => mapNotionPageToBook(page as PageObjectResponse))
  },
  ['published-books'],
  { revalidate: 3600, tags: ['books'] }
)

// 단건 도서 조회 (ID 기반) - 1시간 캐싱
export const getBookById = unstable_cache(
  async (id: string): Promise<Book | null> => {
    try {
      const page = await notionClient.pages.retrieve({ page_id: id })
      if (!isFullPage(page)) return null
      return mapNotionPageToBook(page as PageObjectResponse)
    } catch {
      return null
    }
  },
  ['book'],
  { revalidate: 3600, tags: ['books'] }
)

// 이전/다음 도서 조회 (publishedDate 기준 정렬된 목록에서 인접 항목)
export async function getAdjacentBooks(
  id: string
): Promise<{ prevBook: Book | null; nextBook: Book | null }> {
  const books = await getPublishedBooks()
  const currentIndex = books.findIndex(book => book.id === id)

  if (currentIndex === -1) return { prevBook: null, nextBook: null }

  // 내림차순 정렬: 인덱스 +1 = 이전 글, 인덱스 -1 = 다음 글
  return {
    prevBook: books[currentIndex + 1] ?? null,
    nextBook: books[currentIndex - 1] ?? null,
  }
}
