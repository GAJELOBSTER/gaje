#!/bin/bash
build_options=("yes" "no")

echo "현재 소스코드로 빌드 파일을 생성하시겠습니까?"
select build_choice in "${build_options[@]}"; do
  if [ -n "$build_choice" ]; then
    if [ "$build_choice" == "yes" ]; then
      docker exec -it nextjs-frontend /bin/sh -c "npm run build && pm2 reload all"
    else
      docker exec -it nextjs-frontend /bin/sh -c "pm2 reload all"
    fi
    break
  else
    echo "유효하지 않은 선택입니다. 다시 선택해주세요."
  fi
done