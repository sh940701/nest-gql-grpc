FROM public.ecr.aws/docker/library/node:21-alpine AS base

RUN apk add --no-cache bash
RUN corepack enable

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

ARG APP
ARG PORT

FROM base AS build

ENV APP=$APP
ENV PORT=$PORT

COPY apps ./apps
COPY wait-for-it.sh ./

RUN pnpm install --frozen-lockfile
RUN pnpm build $APP

ENV APP_MAIN_FILE=/usr/src/app/dist/apps/$APP/main

EXPOSE $PORT

CMD node $APP_MAIN_FILE


