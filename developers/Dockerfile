FROM node:14-alpine

RUN apk update -qq \
  && apk add --no-cache git \
  && apk add python \
  && apk add --update alpine-sdk \
  && apk add --no-cache bash

RUN mkdir /app

ADD . ./app

WORKDIR /app

RUN npm i -g eslint eslint-watch
RUN npm i
RUN npm rebuild node-sass

CMD npm run dev
