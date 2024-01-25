## 소개

- Next.js 14 boiler-plate 프로젝트

## 기술 스택

- Next.js - 14.1.0
- Node.js - 18
- Recoil
- Tailwindcss
- Typescript
- Docker

## 폴더 구조

```
├── src                       # 소스 코드
│   ├── app                     # 라우팅되는 페이지 (App Router)
│   ├── assets                  # public에 넣지 않는 정적 자원
│   ├── components              # 컴포넌트
│   ├── lib                     # 라이브러리, util 함수, data
│   ├── recoil                  # 상태관리
│   └── styles                  # 스타일
├── docker                    # 도커 이미지 생성을 위한 파일
│   ├── deploy                  # 프로덕션용 도커 이미지 생성 스크립트
│   └── local                   # 개발환경용 도커 이미지 생성 스크립트
├── env                       # 환경 변수
├── public                    # 정적 자원
├── ecosystem.config.js       # pm2 설정
├── docker-compose.yml        # 개발 환경 도커 실행
├── docker-compose-deploy.yml # 프로덕션 환경 도커 실행
└── tailwind.config.ts        # 테일윈드 설정
```

## 설정

### 최초 작성

1.  env 폴더 안에 생성 환경별 파일 생성

    ```
    .env.local: 로컬 개발 환경
    .env.dev: 개발 서버
    .env.staging: 스테이징 서버
    .env.prod: 프로덕션 서버
    ```

2.  환경변수 입력

    ```yml
    ### .env.*

    # Example
    NEXT_ENV=local
    API_URL=localhost:3000
    ```

### 환경변수 추가 및 포트 변경 필요 시

- 환경변수 추가

  1. .env.\* 파일에 환경 변수 추가 입력

     ```yml
     ### .env.*

     NEXT_ENV=local
     API_URL=localhost:3000
     NEW_ENV=sample # 추가된 환경변수
     ```

  2. docker 환경변수 등록

     ```yml
     ### docker-compose.yml
     ### docker-compose-deploy.yml

     # .env 파일에 등록된 변수와 일치해야함
     environment:
       - API_URL=${API_URL}
       - NEXT_ENV=${NEXT_ENV}
       - NEW_ENV=${NEW_ENV} # 추가된 환경변수
     ```

- Port

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

```bash
# 코드 다운로드
git clone

# npm 패키지 다운로드
npm ci

# 도커 실행
```

### 개발

```bash
# 개발환경 실행
sh run.sh

# 종료
crtl + c
sh down.sh
```

### 배포

```bash
# 배포환경 실행
sh deploy.sh

# 배포 후 변경된 코드 배포
npm run restart

# 종료
sh down.sh
```

## Docker

### 컨테이너 목록 확인

```
docker ps
```

```
Options:
  - a: 멈춘 컨테이너까지 모두 반환
```

### 컨테이너 내부 접속

```
docker exec -it [컨테이너명] /bin/sh
```
