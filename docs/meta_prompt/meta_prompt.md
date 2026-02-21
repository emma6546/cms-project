# [PRD] Notion CMS 기반 북리뷰 서비스 구축 가이드
docs 디렉토리를 만들고 docs/PRD.md 파일로 Notion CMS 활용 웹 프로젝트 PRD를 작성해줘.

## 1. 프로젝트 개요:
* **프로젝트명** : 독서일기 웹페이지
* **목적** : Notion을 CMS로 활용한 개인 독서노트 페이지
* **CMS 선택 이유** : Notion에서 글 작성하면 자동으로 블로그에 반영

## 2. 기술 스택 (Technical Stack)
| 구분 | 선택 기술 | 사유 |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router) | 최신 성능 최적화(ISR, SSR) 및 SEO 강화 |
| **Language** | TypeScript | 데이터 타입 안전성 확보 및 유지보수 효율화 |
| **CMS** | Notion API | 별도 DB/어드민 구축 없이 노션에서 콘텐츠 관리 |
| **Styling** | Tailwind CSS & shadcn/ui | 빠른 UI 프로토타이핑 및 현대적인 디자인 시스템 적용 |
| **Icons** | Lucide React | 일관된 톤앤매너의 벡터 아이콘 제공 |
| **Deployment** | Vercel | Next.js 최적화 배포 및 자동 빌드 환경 제공 |

---

## 3. Notion 데이터베이스 구조 (Data Schema)
노션 DB의 속성(Properties)을 아래와 같이 구성하여 데이터 구조를 정형화합니다.

* **Title** (Title): 도서 제목
* **Status** (Select): 발행 상태 (`Draft`, `Reading`, `Published`)
* **Category** (Multi-select): 장르 (`IT`, `인문`, `경제`, `소설` 등)
* **Rating** (Select): 별점 (`1` ~ `5`)
* **Author** (Text): 저자명
* **CoverImage** (Files & Media): 도서 표지 이미지
* **Summary** (Text): 리스트 페이지용 요약 문구
* **PublishedDate** (Date): 최종 발행일

---

## 4. 화면 구성 (Information Architecture)

### 4.1 메인 페이지 (Home)
* **Hero Section**: 서비스 정체성 및 검색 바.
* **Filter/Category Section**: 장르 및 별점별 필터링 (shadcn/ui Tabs/Select).
* **Book Grid**: 도서 카드 리스트 (커버 이미지, 제목, 별점, 요약 노출).

### 4.2 상세 페이지 (Post Detail)
* **Header**: 제목, 저자, 카테고리, 읽은 기간 등 메타데이터.
* **Content Area**: 노션 본문 데이터 렌더링 (Markdown 변환 적용).
* **Navigation**: 이전 글/다음 글 이동 버튼.

---

## 5. MVP 범위 (Minimum Viable Product)
1.  **Notion DB 연동**: `Status`가 `Published`인 항목만 자동으로 웹에 리스팅.
2.  **콘텐츠 렌더링**: 노션의 텍스트, 이미지, 코드 블록 등을 웹 환경에 맞게 변환.
3.  **이미지 최적화**: 노션 임시 URL 만료 문제를 해결하는 이미지 핸들링 로직.
4.  **반응형 디자인**: 모바일, 태블릿, 데스크톱 환경 최적화 UI.
5.  **기본 SEO**: 도서별 메타 태그 및 OpenGraph 자동 생성.

---

## 6. 구현 단계 (Implementation Roadmap)

### **Step 1: 인프라 및 환경 구축 (Infrastructure)**
* Next.js 15 프로젝트 초기화 및 핵심 라이브러리(shadcn/ui, Notion SDK) 설치.
* Notion Developer Portal을 통한 통합(Integration) 생성 및 API 키/DB ID 보안 설정.

### **Step 2: 데이터 추상화 레이어 (Data Layer)**
* Notion DB의 정형 데이터를 서비스 내부 객체(TypeScript Interface)로 변환하는 매핑 로직 구축.
* `getLatestPosts`, `getPostBySlug` 등 서버 사이드 데이터 패칭 함수 구현.

### **Step 3: 코어 서비스 개발 (Feature Implementation)**
* **글 목록(Index):** `Server Component`를 활용한 데이터 페칭 및 그리드 레이아웃 구현.
* **글 상세(Detail):** Notion Block 데이터를 Markdown/HTML로 변환하여 렌더링하는 컨텐츠 엔진 구축.

### **Step 4: 스타일링 및 사용자 경험 (UI/UX)**
* `shadcn/ui` 기반 테마 시스템 적용 및 반응형 웹 디자인 최적화.
* 다크 모드 지원 및 읽기 최적화된 Typography 설정.

### **Step 5: 성능 최적화 및 배포 (Optimization & Launch)**
* **ISR (Incremental Static Regeneration):** 노션 데이터 수정 시 빌드 없이 반영되는 갱신 로직 적용.
* **Image Optimization:** 노션 이미지 만료 문제를 해결하기 위한 캐싱 전략 수립 및 Vercel 배포.