#!/bin/bash
docker run --rm \
  -v ./:/local openapitools/openapi-generator-cli generate \
  -i https://platform-base.cnai.ai/api/doc/json \
  -g typescript-fetch \
  -o /local/src/types/oag \
