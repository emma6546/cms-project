// 공통 푸터 컴포넌트 - 저작권 표기
import { SITE_METADATA } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex h-14 items-center justify-center px-4">
        <p className="text-muted-foreground text-sm">
          © {currentYear} {SITE_METADATA.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
