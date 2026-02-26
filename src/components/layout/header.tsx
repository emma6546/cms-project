// 공통 헤더 컴포넌트 - 사이트 로고 및 홈 링크
import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { SITE_METADATA } from '@/lib/constants'

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold transition-opacity hover:opacity-80"
        >
          <BookOpen className="h-6 w-6" />
          <span>{SITE_METADATA.name}</span>
        </Link>
      </div>
    </header>
  )
}
