#!/bin/bash
docker run -p 6688:6688 -v "chainlink:/chainlink" -it --env-file=.env smartcontract/chainlink:latest local n

# Enter password
# Confirm password
# Enter API email
# Enter API password
