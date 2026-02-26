// Notion API 응답 → Book 타입 변환 매퍼 [F001]
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Book, BookStatus } from '@/lib/types'

// Notion 속성에서 텍스트 추출 헬퍼
function extractText(
  prop: PageObjectResponse['properties'][string] | undefined
): string {
  if (!prop) return ''
  if (prop.type === 'title') {
    return prop.title.map(t => t.plain_text).join('')
  }
  if (prop.type === 'rich_text') {
    return prop.rich_text.map(t => t.plain_text).join('')
  }
  return ''
}

// Notion 속성에서 Select 값 추출 헬퍼
function extractSelect(
  prop: PageObjectResponse['properties'][string] | undefined
): string | null {
  if (!prop || prop.type !== 'select') return null
  return prop.select?.name ?? null
}

// Notion 속성에서 Multi-select 값 배열 추출 헬퍼
function extractMultiSelect(
  prop: PageObjectResponse['properties'][string] | undefined
): string[] {
  if (!prop || prop.type !== 'multi_select') return []
  return prop.multi_select.map(item => item.name)
}

// Notion 속성에서 Date 값 추출 헬퍼
function extractDate(
  prop: PageObjectResponse['properties'][string] | undefined
): string | null {
  if (!prop || prop.type !== 'date') return null
  return prop.date?.start ?? null
}

// Notion 속성에서 파일/이미지 URL 추출 헬퍼
function extractFileUrl(
  prop: PageObjectResponse['properties'][string] | undefined
): string | null {
  if (!prop || prop.type !== 'files') return null
  const file = prop.files[0]
  if (!file) return null
  if (file.type === 'external') return file.external.url
  if (file.type === 'file') return file.file.url
  return null
}

// Notion PageObjectResponse → Book 타입으로 변환
export function mapNotionPageToBook(page: PageObjectResponse): Book {
  const props = page.properties

  const statusRaw = extractSelect(props['Status'])
  const ratingRaw = extractSelect(props['Rating'])

  return {
    id: page.id,
    title: extractText(props['Name']),
    status: (statusRaw as BookStatus) ?? 'Draft',
    categories: extractMultiSelect(props['Category']),
    rating: ratingRaw ? parseInt(ratingRaw, 10) : null,
    author: extractText(props['Author']),
    coverImage: extractFileUrl(props['CoverImage']),
    summary: extractText(props['Summary']),
    publishedDate: extractDate(props['PublishedDate']),
  }
}
