// Notion Block API 응답 → NotionBlock 타입 변환 매퍼 [F005]
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type {
    NotionBlock,
    NotionBlockType,
    RichTextItem,
    RichTextAnnotations,
} from '@/lib/types'

// Notion API RichTextItemResponse → 앱 RichTextItem 변환
function mapRichText(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    richTextArr: any[]
): RichTextItem[] {
    return richTextArr.map(item => ({
        type: item.type ?? 'text',
        plain_text: item.plain_text ?? '',
        href: item.href ?? null,
        annotations: {
            bold: item.annotations?.bold ?? false,
            italic: item.annotations?.italic ?? false,
            strikethrough: item.annotations?.strikethrough ?? false,
            underline: item.annotations?.underline ?? false,
            code: item.annotations?.code ?? false,
            color: item.annotations?.color ?? 'default',
        } satisfies RichTextAnnotations,
        text: item.text,
    }))
}

// 지원하는 블록 타입 목록
const SUPPORTED_BLOCK_TYPES: NotionBlockType[] = [
    'paragraph',
    'heading_1',
    'heading_2',
    'heading_3',
    'image',
    'code',
    'quote',
    'bulleted_list_item',
    'numbered_list_item',
    'callout',
    'divider',
    'bookmark',
]

// Notion BlockObjectResponse → NotionBlock 변환 (지원하지 않는 타입은 null 반환)
export function mapNotionBlockToAppBlock(
    block: BlockObjectResponse
): NotionBlock | null {
    const type = block.type as NotionBlockType

    if (!SUPPORTED_BLOCK_TYPES.includes(type)) return null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blockData = (block as any)[block.type]

    const base: NotionBlock = {
        id: block.id,
        type,
        rich_text: blockData?.rich_text ? mapRichText(blockData.rich_text) : [],
        children: [],
    }

    // 블록 타입별 추가 데이터 매핑
    switch (block.type) {
        case 'image': {
            const imageData = blockData
            const url =
                imageData?.type === 'external'
                    ? imageData.external?.url
                    : imageData?.file?.url
            base.image = {
                url: url ?? '',
                caption: imageData?.caption ? mapRichText(imageData.caption) : [],
            }
            break
        }

        case 'code':
            base.code = {
                rich_text: blockData?.rich_text
                    ? mapRichText(blockData.rich_text)
                    : [],
                language: blockData?.language ?? 'plain text',
                caption: blockData?.caption ? mapRichText(blockData.caption) : [],
            }
            break

        case 'bookmark':
            base.bookmark = {
                url: blockData?.url ?? '',
                caption: blockData?.caption ? mapRichText(blockData.caption) : [],
            }
            break

        case 'callout':
            base.callout = {
                rich_text: blockData?.rich_text
                    ? mapRichText(blockData.rich_text)
                    : [],
                icon: blockData?.icon ?? null,
                color: blockData?.color ?? 'default',
            }
            break
    }

    return base
}
