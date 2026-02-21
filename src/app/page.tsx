// 독서일기 메인 페이지 (홈)
// Notion CMS에서 발행된 독서노트를 카드 그리드로 표시합니다
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight">독서일기</h1>
                <p className="text-muted-foreground mt-4 text-lg">
                    Notion CMS 기반 개인 독서노트 블로그
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                    개발 진행 중입니다...
                </p>
            </div>
        </main>
    )
}
