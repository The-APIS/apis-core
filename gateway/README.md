# gateway


## RPC
```bash

# Test Ethereum RPC call
curl \
  --location \
  --request POST 'http://127.0.0.1:8100/api/v1/rpc/ethereum/{{MY_API_KEY}}' \
  --header 'Content-Type: application/json' \
  --data-raw '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}'

# Test Bitcoin RPC call
curl \
  --location \
  --request POST 'http://127.0.0.1:8100/api/v1/rpc/bitcoin/{{MY_API_KEY}}' \
  --header 'Content-Type: application/json' \
  --data-raw '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }'

```

## REST

```bash

POST {{apiscorehost}}/api/v1/wallets
Authorization: Bearer {{MY_API_KEY}}
{
  "chain": "BITCOIN", # required @string: BITCOIN | ETHEREUM
  "network": "regtest", # required @string: mainnet | regtest | rinkeby | ...
  "options": { # optional @obj: [ ... ]
    "label": null, # BTC optional: @string
    "address_type": null, # BTC optional: @string "legacy" | "p2sh-segwit" | "bech32"
    "passphrase": null # ETH optional: @string
  }
}

returns:

{
  "address": "0x5e97870f263700f46aa00d967821199b9bc5a120",
  "privateKey": "0x5e97870f263700f46aa00d967821199b9bc5a1200x5e97870f263700f46aa00d967821199b9bc5a120"
}

400 BAD REQUEST
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT FOUND
500 INTERNAL SERVER ERROR
10000 INVALID CHAIN
10001 INVALID NETWORK

```

# Migration History

```bash
./node_modules/.bin/sequelize model:generate \
  --name Tx --attributes tx_id:string,chain:enum

./node_modules/.bin/sequelize model:generate \
  --name EthereumTx --attributes transactionIndex:string,input:string,gasPrice:string,gas:string,blockNumber:integer,txHash:string,v:string,r:string,contractAddress:string,cumulativeGasUsed:string,gasUsed:string,logs:string,logsBloom:string,status:string,sender:string,recipient:string,value:string,nonce:integer,blockNumber:integer,txHash:string,balanceTo:string,balanceFrom:string,blockHash:string

./node_modules/.bin/sequelize model:generate \
  --name EthereumBlock --attributes transactionIndex:string,input:string,gasPrice:string,gas:string,blockNumber:integer,txHash:string,v:string,r:string,contractAddress:string,cumulativeGasUsed:string,gasUsed:string,logs:string,logsBloom:string,status:string,sender:string,recipient:string,value:string,nonce:integer,blockNumber:integer,txHash:string,balanceTo:string,balanceFrom:string,blockHash:string

./node_modules/.bin/sequelize model:generate \
  --name EthereumBlock --attributes difficulty:integer,extraData:string,gasLimit:string,blockGasUsed:string,blockHash:string,blockLogsBloom:string,miner:string,mixHash:string,blockNonce:integer,blockNumber:integer,parentHash:string,receiptsRoot:string,sha3Uncles:string,size:integer,stateRoot:string,timestamp:date,totalDifficulty:string,transactionsRoot:string,uncles:JSONB
# (transactions:rel)
./node_modules/.bin/sequelize model:generate \
  --name BitcoinTx --attributes version:string,locktime:string,txHash:string,blockHash:string
# ins:rel
# outs:rel
./node_modules/.bin/sequelize model:generate \
  --name BitcoinTxIn --attributes hash:string,index:string,script:string,sequence:string,witness:string

./node_modules/.bin/sequelize model:generate \
  --name BitcoinTxOut --attributes txHash:string,value:string,sequence:string,script:string

./node_modules/.bin/sequelize model:generate \
  --name BitcoinBlock --attributes version:integer,prevHash:string,merkleRoot:string,timestamp:date,bits:string,nonce:integer


```
