#!/bin/bash

concurrently \
  "npm --prefix gateway/src run test:watch" \
  "npm --prefix ethereum-rpc/src run test:watch" \
  "npm --prefix ethereum-listener/src run test:watch" \
  "npm --prefix bitcoin-rpc/src run test:watch" \
  "npm --prefix bitcoin-listener/src run test:watch"
