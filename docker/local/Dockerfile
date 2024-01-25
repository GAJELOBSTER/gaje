FROM node:18-alpine

ENV PORT 3000

WORKDIR /var/services/app

COPY package*.json ./
RUN npm ci && npm install pm2 -g
COPY . .

CMD ["npm", "run", "dev"]