// Notion 이미지 프록시 API Route - 임시 URL 만료 문제 대응 [F008]
// GET /api/notion-image?url=<encoded_notion_image_url>
import { type NextRequest, NextResponse } from 'next/server'
import { isNotionImageUrl } from '@/lib/notion/image-utils'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const url = searchParams.get('url')

  // url 파라미터 누락
  if (!url) {
    return NextResponse.json(
      { error: 'url 파라미터가 필요합니다' },
      { status: 400 }
    )
  }

  // Notion 도메인 URL만 허용 (보안: 임의 URL 프록시 방지)
  if (!isNotionImageUrl(url)) {
    return NextResponse.json(
      { error: '허용되지 않은 이미지 URL입니다' },
      { status: 403 }
    )
  }

  try {
    const imageResponse = await fetch(url, {
      headers: {
        // Notion S3 URL 요청 시 필요한 헤더
        'User-Agent': 'Mozilla/5.0',
      },
    })

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: '이미지를 가져올 수 없습니다' },
        { status: imageResponse.status }
      )
    }

    const contentType =
      imageResponse.headers.get('content-type') ?? 'image/jpeg'
    const imageBuffer = await imageResponse.arrayBuffer()

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        // 1일 브라우저 캐싱 + CDN 캐싱 1시간
        'Cache-Control': 'public, max-age=86400, s-maxage=3600',
      },
    })
  } catch {
    return NextResponse.json(
      { error: '이미지 프록시 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
