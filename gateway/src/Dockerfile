FROM node:10-alpine

WORKDIR /app

RUN apk add --no-cache \
  python \
  build-base \
  git \
  bash \
  gettext \
  && npm -g install node-gyp

ADD ./gateway/src /app
ADD ./share /app/share
ADD ./share/models /app/constructors/sequelize/models
ADD ./share/sequelize/migrations/client /app/constructors/sequelize/migrations


RUN npm install

CMD npm start
