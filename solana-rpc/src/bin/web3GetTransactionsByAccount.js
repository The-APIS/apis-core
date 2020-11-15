module.exports = async function web3GetTransactionsByAccount(myaccount, startBlockNumber = 6500000, endBlockNumber = 7242250) {

  const web3 = await require('../constructors/web3')
  const { eth } = web3

  if (endBlockNumber == null) {
    endBlockNumber = eth.blockNumber;
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1000;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }

  console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  return new Promise(async (resolve, reject) => {
    const txs = []

    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
      var block = await eth.getBlock(i, true);

      if (block != null && block.transactions != null) {
        block.transactions.forEach(tx => {
          if (myaccount == "*" || myaccount == tx.from || myaccount == tx.to) {
            txs.push(tx)
            console.log(
                "web3GetTransactionsByAccount:" + "\n"
              + "   tx.hash         : " + tx.hash + "\n"
              + "   nonce           : " + tx.nonce + "\n"
              + "   blockHash       : " + tx.blockHash + "\n"
              + "   blockNumber     : " + tx.blockNumber + "\n"
              + "   transactionIndex: " + tx.transactionIndex + "\n"
              + "   from            : " + tx.from + "\n"
              + "   to              : " + tx.to + "\n"
              + "   value           : " + tx.value + "\n"
              + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
              + "   gasPrice        : " + tx.gasPrice + "\n"
              + "   gas             : " + tx.gas + "\n"
              + "   input           : " + tx.input
            );
          }
        })
      }
    }

    return resolve(txs)

  })
}
