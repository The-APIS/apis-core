FROM node:10-alpine

WORKDIR /app

RUN apk add --no-cache \
  python \
  build-base \
  git \
  bash \
  gettext \
  && npm -g install node-gyp

ADD ./bitcoin-rpc/src /app
ADD ./share /app/share

RUN npm install

CMD npm start
