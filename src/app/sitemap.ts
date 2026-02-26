// 동적 사이트맵 생성 - 발행된 모든 도서 URL 포함 [F009]
import type { MetadataRoute } from 'next'
import { getPublishedBooks } from '@/lib/notion/books'
import { SITE_METADATA } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await getPublishedBooks()

  const bookUrls: MetadataRoute.Sitemap = books.map(book => ({
    url: `${SITE_METADATA.url}/books/${book.id}`,
    lastModified: book.publishedDate
      ? new Date(book.publishedDate)
      : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: SITE_METADATA.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...bookUrls,
  ]
}
