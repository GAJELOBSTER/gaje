#!/bin/bash
options=("dev" "stg" "prod")

echo "배포하는 서버를 선택해주세요:"
select choice in "${options[@]}"; do
  if [ -n "$choice" ]; then
    echo "$choice 서버를 선택하셨습니다"; 
    docker-compose --env-file ./env/.env.$choice -f docker-compose-deploy.yml up --build -d
    break
  else
    echo "유효하지 않은 선택입니다. 다시 선택해주세요."
  fi
done