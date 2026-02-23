// 개발용 더미 도서 데이터 - Phase 2 UI 작업 시 실제 Notion API 대신 사용
// Phase 3 Notion API 연동 완료 후 이 파일은 더 이상 사용하지 않습니다
import type { Book } from '@/lib/types'

export const DUMMY_BOOKS: Book[] = [
  {
    id: 'dummy-001',
    title: '클린 코드',
    status: 'Published',
    categories: ['IT'],
    rating: 5,
    author: '로버트 C. 마틴',
    coverImage: 'https://picsum.photos/seed/cleancode/300/400',
    summary:
      '읽기 좋은 코드를 작성하는 법에 대한 바이블. 네이밍, 함수, 주석 등 실무에서 바로 적용 가능한 원칙들을 담았다.',
    publishedDate: '2025-01-10',
  },
  {
    id: 'dummy-002',
    title: '사피엔스',
    status: 'Published',
    categories: ['인문', '역사'],
    rating: 5,
    author: '유발 하라리',
    coverImage: 'https://picsum.photos/seed/sapiens/300/400',
    summary:
      '인류의 역사를 거시적 관점에서 조망한 책. 호모 사피엔스가 어떻게 지구를 지배하게 되었는지를 흥미롭게 풀어낸다.',
    publishedDate: '2025-01-24',
  },
  {
    id: 'dummy-003',
    title: '죽고 싶지만 떡볶이는 먹고 싶어',
    status: 'Published',
    categories: ['인문'],
    rating: 4,
    author: '백세희',
    coverImage: 'https://picsum.photos/seed/tteokbokki/300/400',
    summary:
      '감정의 언어로 쓴 정신과 상담 기록. 일상의 무게와 미묘한 감정들을 섬세하게 포착한 에세이.',
    publishedDate: '2025-02-05',
  },
  {
    id: 'dummy-004',
    title: '부의 추월차선',
    status: 'Published',
    categories: ['경제', '자기계발'],
    rating: 4,
    author: 'MJ 드마코',
    coverImage: 'https://picsum.photos/seed/fastlane/300/400',
    summary:
      '빠른 부의 축적을 위한 사고방식 전환을 촉구하는 책. 느린 차선과 추월차선의 개념으로 재무적 자유를 설명한다.',
    publishedDate: '2025-02-14',
  },
  {
    id: 'dummy-005',
    title: '코스모스',
    status: 'Published',
    categories: ['과학'],
    rating: 5,
    author: '칼 세이건',
    coverImage: 'https://picsum.photos/seed/cosmos/300/400',
    summary:
      '우주의 광대함과 인류의 위치를 성찰하게 하는 과학 교양서. 세이건 특유의 시적인 문체로 과학에 감동을 더했다.',
    publishedDate: '2025-03-02',
  },
  {
    id: 'dummy-006',
    title: '소년이 온다',
    status: 'Published',
    categories: ['소설'],
    rating: 5,
    author: '한강',
    coverImage: 'https://picsum.photos/seed/boycoming/300/400',
    summary:
      '5·18 광주민주화운동을 배경으로 한 소설. 폭력과 상처, 그리고 인간의 존엄성에 대한 묵직한 질문을 던진다.',
    publishedDate: '2025-03-15',
  },
  {
    id: 'dummy-007',
    title: '파친코',
    status: 'Published',
    categories: ['소설', '역사'],
    rating: 4,
    author: '이민진',
    coverImage: 'https://picsum.photos/seed/pachinko/300/400',
    summary:
      '재일 한국인 4세대의 삶을 그린 대하소설. 정체성과 차별, 생존이라는 보편적 주제를 통해 깊은 울림을 준다.',
    publishedDate: '2025-03-28',
  },
  {
    id: 'dummy-008',
    title: '원씽',
    status: 'Published',
    categories: ['자기계발'],
    rating: 3,
    author: '게리 켈러',
    coverImage: 'https://picsum.photos/seed/onething/300/400',
    summary:
      '한 가지에 집중하는 것이 성공의 핵심이라는 메시지를 전달하는 자기계발서. 단순하지만 강력한 원칙을 제시한다.',
    publishedDate: '2025-04-10',
  },
]

// ID로 더미 도서 조회
export function getDummyBookById(id: string): Book | undefined {
  return DUMMY_BOOKS.find(book => book.id === id)
}

// 발행된 더미 도서만 반환 (publishedDate 기준 내림차순)
export function getPublishedDummyBooks(): Book[] {
  return DUMMY_BOOKS.filter(book => book.status === 'Published').sort(
    (a, b) => {
      if (!a.publishedDate || !b.publishedDate) return 0
      return (
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime()
      )
    }
  )
}
