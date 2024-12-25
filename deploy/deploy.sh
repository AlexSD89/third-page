#!/bin/bash

# 构建前端
npm run build

# 复制文件到服务器
scp -r build/* user@your-server:/path/to/nginx/html/

# 重启服务
ssh user@your-server "cd /path/to/app && docker-compose up -d"