# 검사 신청서 애플리케이션 (Inspection Form App)

검사 센터 예약 및 키트 배송 신청을 위한 다단계 폼 애플리케이션입니다.

## 🛠️ 기술 스택

- **Frontend Framework**: React 18 + TypeScript + Vite
- **State Management**: Zustand (클라이언트 상태), React Query (서버 상태)
- **Form Handling**: React Hook Form + Zod (폼 검증)
- **Development**: ESLint + TypeScript

## 📁 프로젝트 구조

```
src/
├── app/                    # 앱 설정
│   └── queryClient.ts      # React Query 설정
├── features/               # 기능별 코드
│   ├── application/        # 신청 관련
│   │   ├── api.ts          # API (CQRS 패턴)
│   │   ├── components/
│   │   │   ├── apply/      # 신청 관련 컴포넌트
│   │   │   └── ApplyWizard.tsx
│   │   ├── hooks.ts        # React Query 훅
│   │   ├── queryKeys.ts    # Query Key 관리
│   │   ├── schemas.ts      # Zod 스키마
│   │   └── store/          # Zustand 스토어
│   ├── member/             # 회원 관련 (미구현)
│   └── voucher/            # 바우처 관련 (미구현)
├── pages/                  # 페이지 컴포넌트
│   ├── ApplyPage.tsx
│   └── SuccessPage.tsx
└── shared/                 # 공통 컴포넌트/유틸
```

## 🎯 주요 기능

### 1. 검사 유형 선택
- 센터 예약 방식
- 키트 배송 방식

### 2. 다단계 신청 폼
**공통 단계:**
- 검사 대상자 정보 입력
- 약관 동의
- 신청 내용 확인

**센터 예약:**
- 센터 선택 (광화문, 여의도)
- 날짜 선택 (공휴일 제외)
- 시간 슬롯 선택 (10:00-15:00, 6타임)

**키트 배송:**
- 수령인 정보
- 배송 주소
- 연락처

### 3. 데이터 검증 및 상태 관리
- **폼 검증**: Zod 스키마 + React Hook Form
- **공휴일 체크**: 2025년 추석 연휴 (9/11-13) 예약 불가
- **실시간 슬롯 조회**: 센터/날짜 선택시 자동 로드
- **상태 관리**: Zustand (폼 데이터) + React Query (서버 데이터)

### 4. 신청 완료 처리
- 신청 ID 생성 및 표시
- 제출된 데이터 JSON 형태로 확인
- 인쇄 및 재시작 기능

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 빌드
npm run build
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
