'use client'

// 전역 에러 바운더리 - 예기치 않은 오류 발생 시 표시
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle
        className="text-destructive mb-4 h-12 w-12"
        aria-hidden="true"
      />

      <h1 className="mb-2 text-2xl font-bold">콘텐츠를 불러오지 못했습니다</h1>
      <p className="text-muted-foreground mb-6 max-w-sm text-sm">
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>

      {/* 에러 digest 표시 (디버깅용) */}
      {error.digest && (
        <p className="text-muted-foreground mb-6 font-mono text-xs">
          오류 코드: {error.digest}
        </p>
      )}

      <div className="flex gap-3">
        <Button onClick={reset} variant="default">
          다시 시도
        </Button>
        <Button asChild variant="outline">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </main>
  )
}
