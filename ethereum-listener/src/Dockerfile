FROM node:10-alpine

WORKDIR /app

RUN apk add --no-cache \
  python \
  build-base \
  git \
  bash \
  gettext \
  && yarn global add node-gyp \
  && yarn cache clean

ADD . /app

RUN yarn install

CMD yarn start
