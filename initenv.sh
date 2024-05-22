#!/bin/bash
ENV_LIST=("local" "dev" "stg" "prod")
SAMPLE_PATH=./env/.env.sample

mkdir -p env
for env in "${ENV_LIST[@]}"; do
    target_file="./env/.env.${env}"
    touch "$target_file"
    echo "API_VERSION=v1" >> "$target_file"
    echo "API_URL=http://localhost:3300" >> "$target_file"
    echo "NEXT_PUBLIC_NEXT_SERVER=http://localhost:3000" >> "$target_file"
done