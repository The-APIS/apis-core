# gateway


```bash
# Test Ethereum RPC call
curl \
  --location \
  --request POST 'http://127.0.0.1:8100/api/v1/rpc/ethereum' \
  --header 'Content-Type: application/json' \
  --data-raw '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'

# Test Bitcoin RPC call
curl \
  --location \
  --request POST 'http://127.0.0.1:8100/api/v1/rpc/bitcoin' \
  --header 'Content-Type: application/json' \
  --data-raw '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }'
```
