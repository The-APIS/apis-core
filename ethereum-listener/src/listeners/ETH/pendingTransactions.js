const subscriptionKey = 'pendingTransactions'

module.exports = async ({ web3 }) => {
  const subscription = web3.eth.subscribe(subscriptionKey)

  subscription.subscribe(async (error, result) => {
    if (error) {
      console.error(`[Daemon][${subscriptionKey}]`, error)
    }

    console.log(`[Daemon][${subscriptionKey}] New block headers`)

    try {

      // const block = await web3.eth.getBlock(result)
      // console.log('result: ', result, block)

    //   block.transactions.forEach(async (txHash) => {
    //     const tx = await web3.eth.getTransaction(txHash)

    //     const payload = {
    //       blockHash: blockHeader.hash,
    //       txHash,
    //       ticker: 'ETH',
    //       platform: 'ETH',
    //       addressTo: tx.to,
    //       addressFrom: tx.from,
    //       amount: parseFloat(tx.value),
    //       txFee: 0,
    //       status: 'CONFIRMED',
    //     }

    //     console.log('CreatePendingTransactionRecord redis, payload: ', payload)
    //     // {
    //     //   blockHash: '0x289f3f96f6957a006270b698b3fecd1ddfadb4d7ebf77b5d68c8e1f9c1f6236b',
    //     //   txHash: '0x41a5ecdc047bba8904b2a982549e4196356d6dccadea6bc1fc044f6dc6e8cba7',
    //     //   ticker: 'ETH',
    //     //   platform: 'ETH',
    //     //   addressTo: null,
    //     //   addressFrom: '0x7D6c6B479b247f3DEC1eDfcC4fAf56c5Ff9A5F40',
    //     //   amount: 0,
    //     //   txFee: 0,
    //     //   status: 'CONFIRMED'
    //     // }

    //   })
    } catch (error) {
      console.log(error)
    }

  }).on('data', transaction => {
    console.log('pending tx: ', transaction)
  })
}
