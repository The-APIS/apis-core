#!/bin/bash

docker-compose -f docker-compose.yml run --rm \
  gateway npm test

docker-compose -f docker-compose.yml run --rm \
  ethereum-rpc npm test

docker-compose -f docker-compose.yml run --rm \
  ethereum-listener npm test

docker-compose -f docker-compose.yml run --rm \
  bitcoin-rpc npm test

docker-compose -f docker-compose.yml run --rm \
  bitcoin-listener npm test

docker-compose -f docker-compose.yml run --rm \
  e2e
