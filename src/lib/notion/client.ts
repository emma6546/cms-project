// Notion API 클라이언트 싱글톤 - 서버 사이드 전용 [F001]
import { Client } from '@notionhq/client'
import { env } from '@/lib/env'

// 모듈 레벨 싱글톤 - 서버 컴포넌트/라우트 핸들러에서 재사용
export const notionClient = new Client({
    auth: env.NOTION_API_KEY,
})
