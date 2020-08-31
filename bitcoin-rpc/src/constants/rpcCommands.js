const BTC_RPC_COMMANDS = {
  // Retrieving Blocks
  getBlock: 'getblock',
  getBlockCount: 'getblockcount',
  getBlockHash: 'getblockhash',
  getBlockNumber: 'getblockcount', // getblocknumber deprecated since Bitcoin v0.5.1
  getConnectionCount: 'getconnectioncount',
  getDifficulty: 'getdifficulty',
  getGenerate: 'getgenerate',
  getHashesPerSecond: 'gethashespersec',
  getHashesPerSec: 'gethashespersec',
  getInfo: 'getinfo',
  getMemorypool: 'getmemorypool',
  getMemoryPool: 'getmemorypool',
  getMiningInfo: 'getmininginfo',
  getWork: 'getwork',
  // Reading Transactions
  getTransaction: 'gettransaction',
  listSinceBlock: 'listsinceblock',
  listTransactions: 'listtransactions',
  // Writing Transactions
  getNewAddress: 'getnewaddress',
  addMultiSigAddress: 'addmultisigaddress',
  move: 'move',
  sendFrom: 'sendfrom',
  sendMany: 'sendmany',
  sendToAddress: 'sendtoaddress',
  setAccount: 'setaccount',
  setGenerate: 'setgenerate',
  setTxFee: 'settxfee',
  signMessage: 'signmessage',
  stop: 'stop',
  // Account Information
  getAccount: 'getaccount',
  getAccountAddress: 'getaccountaddress',
  getAddressesByAccount: 'getaddressesbyaccount',
  getBalance: 'getbalance',
  getReceivedByAccount: 'getreceivedbyaccount',
  getReceivedByAddress: 'getreceivedbyaddress',
  listReceivedByAccount: 'listreceivedbyaccount',
  listReceivedByAddress: 'listreceivedbyaddress',
  // Event Logs
  // Chain Information
  // Retrieving Uncles
  // Filters
  // Real Time Events
  // ...
  // Admin
  backupWallet: 'backupwallet',
  dumpPrivKey: 'dumpprivkey',
  encryptWallet: 'encryptwallet',
  help: 'help',
  importPrivKey: 'importprivkey',
  keypoolRefill: 'keypoolrefill',
  keyPoolRefill: 'keypoolrefill',
  listAccounts: 'listaccounts',
  validateAddress: 'validateaddress',
  verifyMessage: 'verifymessage',
  walletLock: 'walletlock',
  walletPassphrase: 'walletpassphrase',
  walletPassphraseChange: 'walletpassphrasechange'
}

const {
  stop,
  backupWallet,
  keypoolRefill,
  keyPoolRefill,
  ...ALOWED,
} = BTC_RPC_COMMANDS

module.exports = {
  STANDARD: {
    ...BTC_RPC_COMMANDS,
  },
  ALLOWED,
}
