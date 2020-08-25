module.exports = {
  rpcCommands: {
    // Retrieving Blocks
    'eth_blockNumber',
    'eth_getBlockByHash',
    'eth_getBlockByNumber',
    // Reading Transactions
    'eth_getTransactionByHash',
    'eth_getTransactionCount',
    'eth_getTransactionReceipt',
    'eth_getBlockTransactionCountByHash',
    'eth_getBlockTransactionCountByNumber',
    'eth_getTransactionByBlockHashAndIndex',
    'eth_getTransactionByBlockNumberAndIndex',
    // Writing Transactions
    'eth_sendRawTransaction',
    // Account Information
    'eth_getBalance',
    'eth_getCode',
    'eth_getStorageAt',
    'eth_accounts',
    'eth_getProof',
    // EVM/Smart Contract Execution
    'eth_call',
    // Event Logs
    'eth_getLogs',
    // Chain Information
    'eth_protocolVersion',
    'eth_gasPrice',
    'eth_estimateGas',
    'eth_chainId',
    'net_version',
    'net_listening',
    // Retrieving Uncles
    'eth_getUncleByBlockNumberAndIndex',
    'eth_getUncleByBlockHashAndIndex',
    'eth_getUncleCountByBlockHash',
    'eth_getUncleCountByBlockNumber',
    // Filters
    'eth_getFilterChanges',
    'eth_getFilterLogs',
    'eth_newBlockFilter',
    'eth_newFilter',
    'eth_newPendingTransactionFilter',
    'eth_uninstallFilter',
    // Web3
    'web3_clientVersion',
    'web3_sha3',
    // Real Time Events
    'eth_syncing',
    'eth_subscribe',
    'eth_unsubscribe',
  },
}
