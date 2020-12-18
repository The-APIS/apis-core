const subscriptionKey = 'pendingTransactions'

module.exports = async ({ web3, redis }) => {
  const subscription = web3.eth.subscribe(subscriptionKey)

  subscription.subscribe(async (error, result) => {
    if (error) {
      console.error(`[Daemon][${subscriptionKey}]`, error)
    }
  }).on('data', async (txHash) => {
    console.log(`[Daemon][${subscriptionKey}] new hash: `, txHash)
    try {
      const tx = await web3.eth.getTransaction(txHash)

      if (!tx) return

      const { input, ...values } = tx
      const hs = await redis.hsetAsync("eth-tx-pending", txHash, JSON.stringify(values));
      // const hga = await redis.hgetallAsync("eth-tx-pending");
    } catch(e) {
      console.error(e)
    }
  })
}
