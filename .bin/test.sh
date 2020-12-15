#!/bin/bash

concurrently \
  "npm --prefix gateway/src test" \
  "npm --prefix ethereum-rpc/src test" \
  "npm --prefix ethereum-listener/src test" \
  "npm --prefix bitcoin-rpc/src test" \
  "npm --prefix bitcoin-listener/src test"
