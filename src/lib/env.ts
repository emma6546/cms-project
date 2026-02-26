import { z } from 'zod'

// 환경 변수 스키마 정의 (Notion API 키 및 DB ID 포함)
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NOTION_API_KEY: z.string().min(1, 'NOTION_API_KEY가 설정되지 않았습니다'),
  NOTION_DATABASE_ID: z
    .string()
    .min(1, 'NOTION_DATABASE_ID가 설정되지 않았습니다'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
})

export type Env = z.infer<typeof envSchema>
