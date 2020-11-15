const fs = require('fs')
const web3GetTransactionsByAccount = require('./web3GetTransactionsByAccount')
const indexedGetTransactionsByAccount = require('./indexedGetTransactionsByAccount')


module.exports = (async function benchmark() {
  const address = process.argv[2]
  const times = {
    indexed: {},
    web3: {},
  }

  console.log('Using address: ', address)

  times.indexed.start = Date.now()
  console.time('indexed')
  await indexedGetTransactionsByAccount({ address })
  times.indexed.stop = Date.now()
  console.timeEnd('indexed')

  times.web3.start = Date.now()
  console.time('web3')
  await web3GetTransactionsByAccount(address, 6500000, 7242250)
  times.web3.end = Date.now()
  console.timeEnd('web3')

  fs.writeFileSync(`./${Date.now()}.benchmark.json`, JSON.stringify({
    ...times,
  }, null, 2))

})()
