// 공통 푸터 컴포넌트 - 저작권 표기
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto flex h-14 items-center justify-center px-4">
        <p className="text-muted-foreground text-sm">
          © {currentYear} 독서일기. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
