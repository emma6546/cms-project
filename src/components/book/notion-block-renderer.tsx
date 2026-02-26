// Notion 블록 렌더러 컴포넌트 - 블록 타입별 HTML 렌더링 [F005]
// Phase 3에서 실제 Notion API 블록 데이터로 교체 예정
import Image from 'next/image'
import { ExternalLink, Quote, AlertCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import type { NotionBlock, RichTextItem } from '@/lib/types'
import { cn } from '@/lib/utils'

// Rich Text 배열에서 plain_text를 추출하여 단순 문자열로 반환
function extractPlainText(richText?: RichTextItem[]): string {
  if (!richText || richText.length === 0) return ''
  return richText.map(item => item.plain_text).join('')
}

// Rich Text 배열을 어노테이션(볼드, 이탤릭 등)이 적용된 JSX로 렌더링
function RichTextRenderer({ richText }: { richText?: RichTextItem[] }) {
  if (!richText || richText.length === 0) return null

  return (
    <>
      {richText.map((item, i) => {
        const { bold, italic, strikethrough, underline, code } =
          item.annotations

        // 링크가 있는 경우
        if (item.href) {
          return (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'text-primary hover:text-primary/80 underline underline-offset-2',
                bold && 'font-bold',
                italic && 'italic',
                strikethrough && 'line-through',
                code && 'bg-muted rounded px-1 font-mono text-sm'
              )}
            >
              {item.plain_text}
            </a>
          )
        }

        // 코드 인라인 스타일
        if (code) {
          return (
            <code
              key={i}
              className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm"
            >
              {item.plain_text}
            </code>
          )
        }

        // 기타 어노테이션 조합 렌더링
        const hasStyle = bold || italic || strikethrough || underline
        if (hasStyle) {
          return (
            <span
              key={i}
              className={cn(
                bold && 'font-bold',
                italic && 'italic',
                strikethrough && 'line-through',
                underline && 'underline underline-offset-2'
              )}
            >
              {item.plain_text}
            </span>
          )
        }

        return <span key={i}>{item.plain_text}</span>
      })}
    </>
  )
}

// 단일 블록 렌더링
function BlockRenderer({ block }: { block: NotionBlock }) {
  switch (block.type) {
    // 일반 문단
    case 'paragraph':
      return (
        <p className="text-foreground/90 text-base leading-relaxed empty:min-h-[1.5rem]">
          <RichTextRenderer richText={block.rich_text} />
        </p>
      )

    // 제목 1 (최상위)
    case 'heading_1':
      return (
        <h2 className="mt-8 mb-3 text-2xl font-bold tracking-tight">
          <RichTextRenderer richText={block.rich_text} />
        </h2>
      )

    // 제목 2
    case 'heading_2':
      return (
        <h3 className="mt-6 mb-2 text-xl font-semibold tracking-tight">
          <RichTextRenderer richText={block.rich_text} />
        </h3>
      )

    // 제목 3
    case 'heading_3':
      return (
        <h4 className="mt-4 mb-1.5 text-lg font-semibold">
          <RichTextRenderer richText={block.rich_text} />
        </h4>
      )

    // 이미지
    case 'image': {
      if (!block.image) return null
      const captionText = extractPlainText(block.image.caption)
      return (
        <figure className="my-6">
          <div className="bg-muted relative w-full overflow-hidden rounded-lg">
            <Image
              src={block.image.url}
              alt={captionText || '독서노트 이미지'}
              width={800}
              height={500}
              className="h-auto w-full object-contain"
            />
          </div>
          {captionText && (
            <figcaption className="text-muted-foreground mt-2 text-center text-sm">
              {captionText}
            </figcaption>
          )}
        </figure>
      )
    }

    // 코드 블록
    case 'code': {
      if (!block.code) return null
      const codeText = extractPlainText(block.code.rich_text)
      const captionText = extractPlainText(block.code.caption)
      return (
        <div className="my-4">
          {captionText && (
            <p className="text-muted-foreground mb-1 text-xs">{captionText}</p>
          )}
          <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
            <code className="text-foreground/90 font-mono">{codeText}</code>
          </pre>
          {block.code.language && block.code.language !== 'plain text' && (
            <p className="text-muted-foreground mt-1 text-right text-xs">
              {block.code.language}
            </p>
          )}
        </div>
      )
    }

    // 인용구
    case 'quote':
      return (
        <blockquote className="border-primary/50 bg-muted/40 my-4 flex gap-3 rounded-r-lg border-l-4 py-3 pr-4 pl-4">
          <Quote
            className="text-primary/50 mt-0.5 h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <p className="text-foreground/80 text-base leading-relaxed italic">
            <RichTextRenderer richText={block.rich_text} />
          </p>
        </blockquote>
      )

    // 불릿 리스트 항목
    case 'bulleted_list_item':
      return (
        <li className="text-foreground/90 marker:text-muted-foreground ml-4 list-disc text-base leading-relaxed">
          <RichTextRenderer richText={block.rich_text} />
          {/* 중첩 블록 렌더링 */}
          {block.children.length > 0 && (
            <ul className="mt-1 space-y-1">
              {block.children.map(child => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </ul>
          )}
        </li>
      )

    // 번호 리스트 항목
    case 'numbered_list_item':
      return (
        <li className="text-foreground/90 marker:text-muted-foreground ml-4 list-decimal text-base leading-relaxed">
          <RichTextRenderer richText={block.rich_text} />
          {/* 중첩 블록 렌더링 */}
          {block.children.length > 0 && (
            <ol className="mt-1 space-y-1">
              {block.children.map(child => (
                <BlockRenderer key={child.id} block={child} />
              ))}
            </ol>
          )}
        </li>
      )

    // 콜아웃 박스
    case 'callout': {
      if (!block.callout) return null
      const icon = block.callout.icon
      const emojiIcon = icon?.type === 'emoji' ? icon.emoji : null
      return (
        <div className="bg-muted/50 my-4 flex gap-3 rounded-lg border p-4">
          {/* 이모지 아이콘 또는 기본 아이콘 */}
          <span className="mt-0.5 shrink-0 text-lg" aria-hidden="true">
            {emojiIcon ?? (
              <AlertCircle className="text-muted-foreground h-5 w-5" />
            )}
          </span>
          <p className="text-foreground/90 text-base leading-relaxed">
            <RichTextRenderer richText={block.callout.rich_text} />
          </p>
        </div>
      )
    }

    // 구분선
    case 'divider':
      return <Separator className="my-6" />

    // 북마크 링크 카드
    case 'bookmark': {
      if (!block.bookmark) return null
      const captionText = extractPlainText(block.bookmark.caption)
      return (
        <a
          href={block.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-muted/50 group my-4 flex items-center gap-3 rounded-lg border p-4 transition-colors"
          aria-label={captionText || block.bookmark.url}
        >
          <ExternalLink
            className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            {captionText && (
              <p className="truncate text-sm font-medium">{captionText}</p>
            )}
            <p className="text-muted-foreground truncate text-xs">
              {block.bookmark.url}
            </p>
          </div>
        </a>
      )
    }

    // 지원하지 않는 블록 타입 (개발 중 확인용)
    default:
      return null
  }
}

// 연속된 리스트 항목을 ul/ol 태그로 묶는 헬퍼 함수
function groupListItems(
  blocks: NotionBlock[]
): Array<
  NotionBlock | { type: 'ul_group' | 'ol_group'; items: NotionBlock[] }
> {
  const result: Array<
    NotionBlock | { type: 'ul_group' | 'ol_group'; items: NotionBlock[] }
  > = []
  let i = 0

  while (i < blocks.length) {
    const block = blocks[i]

    // 불릿 리스트 그룹화
    if (block.type === 'bulleted_list_item') {
      const group: NotionBlock[] = []
      while (i < blocks.length && blocks[i].type === 'bulleted_list_item') {
        group.push(blocks[i])
        i++
      }
      result.push({ type: 'ul_group', items: group })
      continue
    }

    // 번호 리스트 그룹화
    if (block.type === 'numbered_list_item') {
      const group: NotionBlock[] = []
      while (i < blocks.length && blocks[i].type === 'numbered_list_item') {
        group.push(blocks[i])
        i++
      }
      result.push({ type: 'ol_group', items: group })
      continue
    }

    result.push(block)
    i++
  }

  return result
}

interface NotionBlockRendererProps {
  blocks: NotionBlock[]
}

export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  // 리스트 항목을 그룹화하여 올바른 ul/ol 구조로 렌더링
  const groupedBlocks = groupListItems(blocks)

  return (
    <div className="space-y-4 text-base leading-relaxed">
      {groupedBlocks.map((item, index) => {
        // 불릿 리스트 그룹
        if (item.type === 'ul_group') {
          return (
            <ul key={`ul-${index}`} className="space-y-1 pl-2">
              {item.items.map(block => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ul>
          )
        }

        // 번호 리스트 그룹
        if (item.type === 'ol_group') {
          return (
            <ol key={`ol-${index}`} className="space-y-1 pl-2">
              {item.items.map(block => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ol>
          )
        }

        // 일반 블록 - ul_group/ol_group이 아닌 경우이므로 NotionBlock으로 단언
        const notionBlock = item as NotionBlock
        return <BlockRenderer key={notionBlock.id} block={notionBlock} />
      })}
    </div>
  )
}
