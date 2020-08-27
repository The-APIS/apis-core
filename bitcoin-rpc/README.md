# bitcoin-rpc

```bash
curl --user "bitcoin_rpc_user:bitcoin_rpc_pass" --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' https://my-bitcoin-rpc-addr

curl -d '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' http://127.0.0.1:8102/api/v1/rpc

```
