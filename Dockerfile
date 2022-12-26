FROM node:16-alpine

EXPOSE 4000

WORKDIR /app
COPY . ./app

RUN corepack enable
RUN yarn run install:prod
RUN yarn run build

CMD ["yarn", "deploy"]