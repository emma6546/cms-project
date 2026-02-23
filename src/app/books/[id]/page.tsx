// 독서노트 상세 페이지 - 동적 라우트 [id]
// Notion 페이지 ID를 기반으로 특정 독서노트를 표시합니다
export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="container mx-auto px-4 py-8">
      <p className="text-muted-foreground text-sm">독서노트 상세 페이지</p>
      <p className="text-muted-foreground mt-1 text-xs">ID: {id}</p>
    </main>
  )
}
