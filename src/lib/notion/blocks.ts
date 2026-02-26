// Notion 페이지 블록 조회 함수 - 재귀적 children 포함 [F005]
import { isFullBlock } from '@notionhq/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { notionClient } from '@/lib/notion/client'
import { mapNotionBlockToAppBlock } from '@/lib/notion/block-mappers'
import type { NotionBlock } from '@/lib/types'

// 페이지의 전체 블록 목록 조회 (페이지네이션 처리 포함)
async function listAllBlocks(blockId: string): Promise<BlockObjectResponse[]> {
    const blocks: BlockObjectResponse[] = []
    let cursor: string | undefined = undefined

    do {
        const response = await notionClient.blocks.children.list({
            block_id: blockId,
            start_cursor: cursor,
            page_size: 100,
        })

        for (const block of response.results) {
            if (isFullBlock(block)) {
                blocks.push(block)
            }
        }

        cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)

    return blocks
}

// 블록 재귀 조회 (children 블록 포함, 최대 2단계)
async function fetchBlocksRecursive(
    blockId: string,
    depth: number = 0
): Promise<NotionBlock[]> {
    if (depth > 1) return [] // 최대 2단계 깊이 제한

    const rawBlocks = await listAllBlocks(blockId)
    const result: NotionBlock[] = []

    for (const raw of rawBlocks) {
        const mapped = mapNotionBlockToAppBlock(raw)
        if (!mapped) continue

        // children이 있는 블록은 재귀 조회
        if (raw.has_children) {
            mapped.children = await fetchBlocksRecursive(raw.id, depth + 1)
        }

        result.push(mapped)
    }

    return result
}

// 페이지 블록 전체 조회 (외부 호출용)
export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
    return fetchBlocksRecursive(pageId)
}
