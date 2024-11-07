## 소개

- RSS 피드를 통한 웹사이트 관리 프로젝트

## 기술 스택

- Next.js - 14.1.0
- Node.js - 18
- Zustand
- Tailwindcss
- Typescript
- Docker
- Storybook
- prisma
- postgresql

## 폴더 구조

```
├── env                       # 환경 변수
├── prisma                    # 프리즈마 설정
├── public                    # 정적 자원
├── src                       # 소스 코드
│   └── app                      # 라우팅되는 페이지 (App Router)
│       └── (server)                # Server Actions
│   ├── assets                   # public에 넣지 않는 정적 자원
│   ├── components               # 컴포넌트
│   ├── fetch                    # 패치 함수
│   ├── hooks                    # 리액트 커스텀 훅
│   ├── libs                     # 라이브러리, util 함수, data
│   ├── store                    # 상태관리
│   ├── stories                  # 스토리북
│   ├── styles                   # 스타일
│   └── types                    # 데이터 타입
│       └── state                   # 상태관리에서 사용하는 타입
│
├── ecosystem.config.js       # pm2 설정
├── docker-compose.yml        # 개발 환경 도커 실행
└── tailwind.config.ts        # 테일윈드 설정
```

## 설정

### 초기 환경 변수 설정

- env 폴더 안에 생성 환경별 파일 생성

  ```sh
  # 초기 환경변수 자동 생성
  sh initenv.sh
  ```

- 파일 설명

  ```sh
  # 개발 환경
  .env.local: 로컬 개발

  # 프로덕션 환경
  .env.dev: 개발 서버
  .env.stg: 스테이징 서버
  .env.prod: 프로덕션 서버
  ```

- 환경 변수 입력 예시

  ```yml
  ### .env.*

  # 서버 환경 변수
  API_VERSION=v1
  API_URL=http://localhost:3300

  # 클라이언트 환경 변수 (접두사 'NEXT_PUBLIC_' 필요)
  NEXT_PUBLIC_NEXT_SERVER=http://localhost:3000
  ```

## 프로젝트 실행

### 초기 세팅

1. 코드 다운로드

   ```
   git clone [깃 저장소]
   ```

2. 프로젝트 폴더 이동

   ```
   cd [프로젝트 경로]
   ```

3. [초기 환경 변수 설정](#초기-환경-변수-설정)

   ```sh
   # 초기 환경변수 자동 생성
   sh initenv.sh
   ```

### 개발

1. npm 패키지 설치

   ```
   npm ci
   ```

2. 개발 환경 실행

   ```
   npm run dev
   ```

## DB 세팅

> Postgresql 서버는 도커로 실행하고 Prisma로 Postgresql DB 초기 세팅

### DB 서버 실행

1. 도커 실행

2. Postgresql 도커 컨테이너 생성

   ```sh
   # 도커 직접 실행 시 docker-compose up 명령어 실행
   npm run db:run
   ```

   ```
   Options:
      -d: 백그라운드 실행
   ```

3. DB 초기 설정

   ```sh
   ## prisma/schema.prisma에 작성되어 있는 스키마를 Postgresql DB에 적용
   # 데이터를 보존하면서 schema.prisma 수정사항 적용
   npm run db:push

   # schema.prisma 수정사항(구조나 데이터)을 마이그레이션
   npm run db:migrate
   ```

### DB GUI 실행

```sh
# 브라우저로 DB GUI Tool 실행
npm run db:studio
```

### DB 서버 종료

```
docker-compose down -v
```

### DB 초기화

> DB 초기화 필요 시 db 폴더 삭제 후 docker 재실행
