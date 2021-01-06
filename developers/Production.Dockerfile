# Build static files
FROM node:14-alpine as builder

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apk update -qq \
  && apk add --no-cache git \
  && apk add python \
  && apk add --update alpine-sdk \
  && apk add --no-cache bash

RUN mkdir /usr/share/app
ADD . ./usr/share/app
WORKDIR /usr/share/app

RUN npm i -g eslint eslint-watch
RUN npm i
RUN npm rebuild node-sass
RUN npm run build

# Configure nginx server
FROM nginx:mainline-alpine

RUN apk update -qq \
  && apk add --no-cache git \
  && apk add --update alpine-sdk \
  && apk add --no-cache bash

RUN mkdir -p /usr/share/.well-known/
RUN touch /usr/share/.well-known/security.txt
RUN touch /usr/share/.well-known/test.html

# Copy nginx config
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy static files from build
COPY --from=builder /usr/share/app/dist/ /usr/share/static/
