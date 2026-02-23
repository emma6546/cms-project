// 404 Not Found 페이지
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-muted-foreground text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 삭제되었습니다.
      </p>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </main>
  )
}
