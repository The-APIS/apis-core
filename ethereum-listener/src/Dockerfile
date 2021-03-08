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

ADD ./ethereum-listener/src /app
ADD ./share /app/share
ADD ./share/models /app/constructors/sequelize/models
ADD ./share/migrations/ethereum /app/constructors/sequelize/migrations

RUN yarn install

CMD yarn start
