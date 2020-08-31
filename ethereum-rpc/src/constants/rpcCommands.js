// https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_newaccount

const ETH_RPC_COMMANDS = {
  // Retrieving Blocks
  eth_blockNumber: 'eth_blockNumber',
  eth_getBlockByHash: 'eth_getBlockByHash',
  eth_getBlockByNumber: 'eth_getBlockByNumber',
  // Reading Transactions
  eth_getTransactionByHash: 'eth_getTransactionByHash',
  eth_getTransactionCount: 'eth_getTransactionCount',
  eth_getTransactionReceipt: 'eth_getTransactionReceipt',
  eth_getBlockTransactionCountByHash: 'eth_getBlockTransactionCountByHash',
  eth_getBlockTransactionCountByNumber: 'eth_getBlockTransactionCountByNumber',
  eth_getTransactionByBlockHashAndIndex: 'eth_getTransactionByBlockHashAndIndex',
  eth_getTransactionByBlockNumberAndIndex: 'eth_getTransactionByBlockNumberAndIndex',
  // Writing Transactions
  eth_sendRawTransaction: 'eth_sendRawTransaction',
  // Account Information
  eth_getBalance: 'eth_getBalance',
  eth_getCode: 'eth_getCode',
  eth_getStorageAt: 'eth_getStorageAt',
  eth_accounts: 'eth_accounts',
  eth_getProof: 'eth_getProof',
  // EVM/Smart Contract Execution
  eth_call: 'eth_call',
  // Event Logs
  eth_getLogs: 'eth_getLogs',
  // Chain Information
  eth_protocolVersion: 'eth_protocolVersion',
  eth_gasPrice: 'eth_gasPrice',
  eth_estimateGas: 'eth_estimateGas',
  eth_chainId: 'eth_chainId',
  net_version: 'net_version',
  net_listening: 'net_listening',
  // Retrieving Uncles
  eth_getUncleByBlockNumberAndIndex: 'eth_getUncleByBlockNumberAndIndex',
  eth_getUncleByBlockHashAndIndex: 'eth_getUncleByBlockHashAndIndex',
  eth_getUncleCountByBlockHash: 'eth_getUncleCountByBlockHash',
  eth_getUncleCountByBlockNumber: 'eth_getUncleCountByBlockNumber',
  // Filters
  eth_getFilterChanges: 'eth_getFilterChanges',
  eth_getFilterLogs: 'eth_getFilterLogs',
  eth_newBlockFilter: 'eth_newBlockFilter',
  eth_newFilter: 'eth_newFilter',
  eth_newPendingTransactionFilter: 'eth_newPendingTransactionFilter',
  eth_uninstallFilter: 'eth_uninstallFilter',
  // Web3
  web3_clientVersion: 'web3_clientVersion',
  web3_sha3: 'web3_sha3',
  // Real Time Events
  eth_syncing: 'eth_syncing',
  eth_subscribe: 'eth_subscribe',
  eth_unsubscribe: 'eth_unsubscribe',
}


const {
  net_listening,
  ...ALOWED,
} = ETH_RPC_COMMANDS

module.exports = {
  STANDARD: {
    ...ETH_RPC_COMMANDS,
  },
  ALLOWED,
}
