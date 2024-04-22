## 소개

- Next.js 14 boiler-plate 프로젝트

## 기술 스택

- Next.js - 14.1.0
- Node.js - 18
- Zustand
- Tailwindcss
- Typescript
- Docker
- Storybook
- Openapi-generator

## 폴더 구조

```
├── env                       # 환경 변수
├── public                    # 정적 자원
├── docker                    # 도커 이미지 생성을 위한 파일
│   ├── deploy                   # 프로덕션용 도커 이미지 생성 스크립트
│   └── local                    # 개발환경용 도커 이미지 생성 스크립트
├── src                       # 소스 코드
│   └── app                      # 라우팅되는 페이지 (App Router)
│       ├── (server)                # Server Actions
│       └── [locale]                # 다국어 라우팅 페이지
│   ├── assets                   # public에 넣지 않는 정적 자원
│   ├── components               # 컴포넌트
│   ├── fetch                    # 패치 함수
│   ├── hooks                    # 리액트 커스텀 훅
│   ├── i18n                     # 다국어
│   ├── libs                     # 라이브러리, util 함수, data
│   ├── store                    # 상태관리
│   ├── stories                  # 스토리북
│   ├── styles                   # 스타일
│   └── types                    # 데이터 타입
│       ├── oag                     # openapi-generator로 생성한 타입
│       └── state                   # 상태관리에서 사용하는 타입
│
├── ecosystem.config.js       # pm2 설정
├── docker-compose.yml        # 개발 환경 도커 실행
├── docker-compose-deploy.yml # 프로덕션 환경 도커 실행
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

  API_VERSION=v1
  API_URL=localhost:3000
  ```

### 환경변수 추가 및 포트 변경 필요 시

- 환경변수 추가

  1. .env.\* 파일에 추가된 환경 변수 입력

     ```yml
     ### .env.*

     API_VERSION=v1
     API_URL=localhost:3000
     NEW_ENV=sample # 추가된 환경변수
     ```

  2. docker에 추가된 환경변수 등록

     ```yml
     ### docker-compose.yml
     ### docker-compose-deploy.yml

     # .env.* 파일에 등록된 변수와 일치해야함
     environment:
       - API_VERSION=${API_VERSION}
       - API_URL=${API_URL}
       - NEW_ENV=${NEW_ENV} # 추가된 환경변수
     ```

- 포트 변경

  - host(공개 포트) -> docker container(컨테이너 내부 포트)
  - 공개 포트 변경 필요 시 앞의 포트번호 변경

    ```yml
    ### docker-compose.yml
    ### docker-compose-deploy.yml

    # 기본 설정
    ports:
      - "3000:3000" # {호스트 포트}:{컨테이너 내부 포트}

    # 변경 예시
    ports:
      - "8080:3000"
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

- 호스트 환경

  1. npm 패키지 설치

     ```
     npm ci
     ```

  2. 개발 환경 실행

     ```
     npm run dev
     ```

- 도커 환경

  1. 도커 실행

  2. 도커 컨테이너 로컬 환경으로 실행

     ```
     sh run.sh
     ```

  3. 종료 시

     ```
     ctrl + c
     sh down.sh
     ```

### 배포

- 도커 환경

  1. 도커 실행

  2. 도커 컨테이너 배포 환경으로 실행

     ```
     sh deploy.sh
     ```

  3. 배포 후 변경된 코드 배포 시

     ```
     sh redeploy.sh
     ```

  4. 종료

     ```
     sh down.sh
     ```

### 주의 사항

> 도커 환경에서 코드 수정 시 호스트 환경에는 npm 패키지들이 설치되어있지 않기 때문에 도커 환경 내부에서 코드 에디터를 실행해야 함

```sh
# 예시) VSCode에서 컨테이너 내부 환경으로 에디터 실행하는 법
VSCode -> extensions -> Remote SSH -> 개발 컨테이너 -> 컨테이너 내부 환경의 프로젝트 폴더 열기
```

## Docker

### 컨테이너 목록 확인

```
docker ps
```

```
Options:
  -a: 멈춘 컨테이너까지 모두 반환
```

### 컨테이너 내부 접속

```
docker exec -it [컨테이너명] /bin/sh
```

## OpenAPI Generator

> OAS로 작성된 문서를 기반으로 API 요청, 응답에 사용되는 데이터의 TS 타입 자동 생성

> 서버에서 OAS 기반의 문서를 작성해준 경우 사용 가능

### OpenAPI Generator 생성

```sh
# OAS 파일 경로에 맞게 파일 내용 수정하여 사용
sh oag.sh
```

```
Options:
  -rm: 컨테이너 종료 시 자동 삭제
  -v: [호스트 경로]:[컨테이너 내부 경로]
  -i: Input으로 들어올 OAS 파일 경로
  -g: generator 지정
  -o: Output 경로 지정(컨테이너 내부)
```
