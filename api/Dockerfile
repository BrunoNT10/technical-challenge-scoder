FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

RUN yarn global add @nestjs/cli

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]
