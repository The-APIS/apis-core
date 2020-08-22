const subscriptionKey = 'newBlockHeaders'

module.exports = async ({ web3 }) => {
  const subscription = web3.eth.subscribe(subscriptionKey)

  subscription.subscribe(async (error, blockHeader) => {
    if (error) {
      console.error(`[Daemon][${subscriptionKey}]`, error)
    }

    console.log(`[Daemon][${subscriptionKey}] New block headers`)

    try {

      const block = await web3.eth.getBlock(blockHeader.hash)

      block.transactions.forEach(async (txHash) => {
        const tx = await web3.eth.getTransaction(txHash)

        const payload = {
          blockHash: blockHeader.hash,
          txHash,
          ticker: 'ETH',
          platform: 'ETH',
          addressTo: tx.to,
          addressFrom: tx.from,
          amount: parseFloat(tx.value),
          txFee: 0,
          status: 'CONFIRMED',
        }

        console.log('CreateTransactionRecord result: ', result)
      })
    } catch (error) {
      console.log(error)
    }

  })
}
