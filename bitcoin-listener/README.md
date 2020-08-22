# bitcoin-listener


```bash
bitcoin-cli -rpcport=18333  -regtest -rpcuser=bitcoin_rpc_user -rpcpassword=bitcoin_rpc_pass getwalletinfo
bitcoin-cli -rpcport=18333  -regtest -rpcuser=bitcoin_rpc_user -rpcpassword=bitcoin_rpc_pass generate 1
bitcoin-cli -rpcport=18333  -regtest -rpcuser=bitcoin_rpc_user -rpcpassword=bitcoin_rpc_pass getnewaddress
bitcoin-cli -rpcport=18333  -regtest -rpcuser=bitcoin_rpc_user -rpcpassword=bitcoin_rpc_pass sendtoaddress $ADDRESS
bitcoin-cli -rpcport=18333  -regtest -rpcuser=bitcoin_rpc_user -rpcpassword=bitcoin_rpc_pass generate 1
```


> Bitcoin Core distributions: https://bitcoincore.org/bin/bitcoin-core-0.17.1/
