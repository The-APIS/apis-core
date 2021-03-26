FROM smartcontract/chainlink:latest

RUN apt-get update && apt-get install -y postgresql-client

# ENTRYPOINT /bin/bash -c psql "host=postgres port=5432 user=postgres password=password" "CREATE DATABASE IF NOT EXISTS ChainlinkEthereumRinkeby" && local n