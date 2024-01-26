#!/bin/bash
ENV_LIST=("local" "dev" "stg" "prod")
SAMPLE_PATH=./env/.env.sample

for env in "${ENV_LIST[@]}"; do
  cp ${SAMPLE_PATH} ./env/.env.${env}
done