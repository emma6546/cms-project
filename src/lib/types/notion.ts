// Notion Rich Text 어노테이션 (볼드, 이탤릭 등 서식 정보)
export interface RichTextAnnotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

// Notion Rich Text 단일 항목
export interface RichTextItem {
  type: 'text' | 'mention' | 'equation'
  plain_text: string
  href: string | null
  annotations: RichTextAnnotations
  // text 타입인 경우 링크 정보
  text?: {
    content: string
    link: { url: string } | null
  }
}

// 이미지 블록 콘텐츠
export interface ImageContent {
  url: string
  caption: RichTextItem[]
}

// 코드 블록 콘텐츠
export interface CodeContent {
  rich_text: RichTextItem[]
  language: string
  caption: RichTextItem[]
}

// 북마크 블록 콘텐츠
export interface BookmarkContent {
  url: string
  caption: RichTextItem[]
}

// 콜아웃 블록 콘텐츠
export interface CalloutContent {
  rich_text: RichTextItem[]
  icon:
    | { type: 'emoji'; emoji: string }
    | { type: 'external'; external: { url: string } }
    | null
  color: string
}

// 지원하는 Notion 블록 타입 목록
export type NotionBlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'image'
  | 'code'
  | 'quote'
  | 'bulleted_list_item'
  | 'numbered_list_item'
  | 'callout'
  | 'divider'
  | 'bookmark'

// Notion 블록 단위 데이터 (본문 렌더링 기본 단위)
export interface NotionBlock {
  // 블록 고유 ID
  id: string
  // 블록 유형
  type: NotionBlockType
  // 텍스트 기반 블록의 Rich Text 배열 (paragraph, heading 등)
  rich_text?: RichTextItem[]
  // 이미지 블록 콘텐츠
  image?: ImageContent
  // 코드 블록 콘텐츠
  code?: CodeContent
  // 북마크 블록 콘텐츠
  bookmark?: BookmarkContent
  // 콜아웃 블록 콘텐츠
  callout?: CalloutContent
  // 중첩 자식 블록 목록
  children: NotionBlock[]
}

// Notion API 데이터베이스 쿼리 결과의 페이지 속성 타입 (매퍼에서 사용)
export interface NotionPageProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
