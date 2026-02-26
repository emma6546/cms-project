// 독서일기 메인 페이지 (홈) - 서버 컴포넌트 [F001, F002, F003, F004, F009]
// Notion API에서 Published 도서 목록을 조회하여 클라이언트 컴포넌트에 전달
import type { Metadata } from 'next'
import { getPublishedBooks } from '@/lib/notion/books'
import { HomeClient } from '@/app/_components/home-client'
import { SITE_METADATA } from '@/lib/constants'

// ISR: 1시간마다 페이지 재생성
export const revalidate = 3600

export const metadata: Metadata = {
  title: SITE_METADATA.name,
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.name,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
  },
}

export default async function Home() {
  // 서버 사이드에서 Notion API 호출
  const books = await getPublishedBooks()

  return <HomeClient books={books} />
}
