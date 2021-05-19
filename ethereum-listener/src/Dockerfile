FROM node:12-alpine

WORKDIR /app

RUN apk add --no-cache \
  python \
  build-base \
  git \
  bash \
  gettext \
  && yarn global add node-gyp \
  && yarn cache clean

ADD ./ethereum-listener/src /app
ADD ./share /app/share

RUN yarn install

CMD yarn start
