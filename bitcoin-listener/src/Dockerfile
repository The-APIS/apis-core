FROM node:10-alpine

WORKDIR /app

RUN apk add --no-cache \
  python \
  build-base \
  git \
  bash \
  gettext \
  && npm -g install node-gyp

ADD . /app

RUN npm install

CMD npm start
