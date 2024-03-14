#!/bin/bash
docker exec -it nextjs-container /bin/sh -c "npm run build && pm2 reload all"