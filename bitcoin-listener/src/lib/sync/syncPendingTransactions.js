const client = require('@/constructors/bitcoin-core')


module.exports = async ({
  host,
  port,
  network,
  sequelize,
  Sequelize,
  models,
  redis,
}) => {
  try {
    const txIdsInMemPool = await client.getRawMempool()

    console.log('txIdsInMemPool: ', txIdsInMemPool)

    const cachedTxIds = await redis.hkeysAsync("btc-tx-pending");
    console.log(`[Daemon][syncPendingTransactions] cachedTxIds: `, cachedTxIds)
    const txIdsInCacheNotInMemPool = cachedTxIds.filter(cachedTxId => txIdsInMemPool.indexOf(cachedTxId) !== -1)
    console.log(`[Daemon][syncPendingTransactions] txIdsInCacheNotInMemPool: `, txIdsInCacheNotInMemPool)

    if (txIdsInCacheNotInMemPool.length) {
      const hdelResult = await redis.multi(txIdsInCacheNotInMemPool.map(k => (['hdel', 'eth-tx-pending', k]))).exec()
      console.log(`[Daemon][syncPendingTransactions] hdelResult: `, hdelResult)
    }

    const pendingTxIdsNotInCache = txIdsInMemPool.filter(txId => cachedTxIds.indexOf(txId) === -1)
    console.log(`[Daemon][syncPendingTransactions] pendingTxIdsNotInCache: `, pendingTxIdsNotInCache)

    if (pendingTxIdsNotInCache.length) {
      // TODO -- handle large batches
      const rawTxsInMemPool = await client.command(pendingTxIdsNotInCache.map(txId => ({ method: 'getrawtransaction', parameters: [ txId, true ] })))
      console.log(`[Daemon][syncPendingTransactions] rawTxsInMemPool: `, rawTxsInMemPool)
      const hSetResult = await redis.multi(rawTxsInMemPool.map((tx) => (['hset', 'btc-tx-pending', tx.txid, JSON.stringify(tx)]))).exec()
      console.log(`[Daemon][syncPendingTransactions] hSetResult: `, hSetResult)
    }

    // const hga = await redis.hgetallAsync("eth-tx-pending"); // TODO
    // console.log(`[Daemon][syncPendingTransactions] hga: `, hga)
  } catch (e) {
    console.error(e)
  }

}
