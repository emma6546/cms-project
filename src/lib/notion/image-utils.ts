// Notion 이미지 URL 판별 및 프록시 URL 변환 유틸리티 [F008]

// Notion에서 제공하는 임시 이미지 URL 도메인 목록
const NOTION_IMAGE_DOMAINS = [
  'prod-files-secure.s3.us-west-2.amazonaws.com',
  'file.notion.so',
  'images.notion.so',
  's3.us-west-2.amazonaws.com',
]

// Notion 임시 이미지 URL 여부 판별
export function isNotionImageUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url)
    return NOTION_IMAGE_DOMAINS.some(
      domain => hostname === domain || hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

// Notion 이미지 URL → 프록시 URL 변환
// Notion 이미지가 아닌 경우 원본 URL 그대로 반환
export function toProxyUrl(url: string | null): string | null {
  if (!url) return null
  if (!isNotionImageUrl(url)) return url
  return `/api/notion-image?url=${encodeURIComponent(url)}`
}

// OG 태그용 절대 URL 변환 (SNS 공유 시 상대 경로는 인식되지 않음)
export function toAbsoluteProxyUrl(url: string | null): string | null {
  const proxyPath = toProxyUrl(url)
  if (!proxyPath) return null
  if (proxyPath.startsWith('http')) return proxyPath
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000')
  return `${baseUrl}${proxyPath}`
}
