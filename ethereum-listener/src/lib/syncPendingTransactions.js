module.exports = async ({
  redis,
  web3,
}) => {
  try {
    const pendingTxs = await web3.eth.getPendingTransactions()
    const result = await redis.multi(pendingTxs.map((tx) => (['hset', 'eth-tx-pending', tx.hash, JSON.stringify(tx)]))).exec()
    // const hga = await redis.hgetallAsync("eth-tx-pending");
  } catch (e) {
    console.error(e)
  }
}
