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
      // console.log('Create Block: ', block)

      // block: {
      //   difficulty: '2',
      //   extraData:
      //    '0xd88301090f846765746888676f312e31342e34856c696e7578000000000000003e74475d0b3e3625f95e893da849157928740f285e3f400dacc3d7ac060f936216b8de1da0be05a2bb04622b3d56e05685d5a712b2178562e18ecf1c623199f700',
      //   gasLimit: 10155706,
      //   gasUsed: 549608,
      //   hash:
      //    '0x2ae48996689f222c5cc4e514d915af623bfb76d07759671cbdd3c0e512e32895',
      //   logsBloom:
      //    '0x04200000000000001000000080000100000000014400000000010000000000400000100000000010000000000000000000000000080000000001000800000000040000800000000000000008080000204001000000000100000000008000000000800000160000000000000001088800000000100000088080000010040000000000000000000040004000000100200080000001000000080000004000000100000000000000000010000000080001000000000000000000000000000000000000040002000000000008000000000000000200000000001000001000000020000000000000000102000000000000000000002000000000600000180000000000',
      //   miner: '0x0000000000000000000000000000000000000000',
      //   mixHash:
      //    '0x0000000000000000000000000000000000000000000000000000000000000000',
      //   nonce: '0x0000000000000000',
      //   number: 7135771,
      //   parentHash:
      //    '0x3376bd64ac6b1abeb6bb2460400ad642165f8c4fb389383e678a285a4713d115',
      //   receiptsRoot:
      //    '0xd3b07a46ccea8d9ff787377b8e617be5b4b0264e65e0e0955346de6a86a35511',
      //   sha3Uncles:
      //    '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
      //   size: 2315,
      //   stateRoot:
      //    '0x0168434f3840bd62133144128a93e067377b24afc37f97c37b3b7cdb5a91213b',
      //   timestamp: 1599192467,
      //   totalDifficulty: '12760624',
      //   transactions:
      //    [ '0x14374b5a52ae9ebee4318fc25d08cf21a05dac2281b071878d804abb918a0c4c',
      //      '0x28e580dd1b82b85f43dfdd62af49856a6835af34c93dead4015715026dc80194',
      //      '0xbc9ca86796a6032625c7f81148da4b23b5313ca7f94d473b0b513746a3852b4a',
      //      '0xb52472fedb26e20a2453e2f173f54da6e95af45b797b179fe97dec1bbb34d147',
      //      '0x663787e03201493c04a3942e362bc2878ea178656f88f15594d0afb415ee1399',
      //      '0xeda041f94f76eff9b3f2376f2ca99f7f348670d1058883a5378ebae882f82efb',
      //      '0xba822b40166cd4746ae6bfcce1c092ecda9c3e4f89c6f28e66880b244d4a0d06',
      //      '0x34a01ad123ed78af19d04b457639963ea7c1c95916e1c87f1e0081a539ab9e3d' ],
      //   transactionsRoot:
      //    '0x0c7b91bcab29a420651ceeb46b24344fb636e2081f7c83e90f38b411caf448b8',
      //   uncles: []
      // }

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

        // console.log('CreateTransactionRecord payload: ', payload)
        // {
        //   blockHash: '0x289f3f96f6957a006270b698b3fecd1ddfadb4d7ebf77b5d68c8e1f9c1f6236b',
        //   txHash: '0x41a5ecdc047bba8904b2a982549e4196356d6dccadea6bc1fc044f6dc6e8cba7',
        //   ticker: 'ETH',
        //   platform: 'ETH',
        //   addressTo: null,
        //   addressFrom: '0x7D6c6B479b247f3DEC1eDfcC4fAf56c5Ff9A5F40',
        //   amount: 0,
        //   txFee: 0,
        //   status: 'CONFIRMED'
        // }

      })
    } catch (error) {
      console.log(error)
    }

  })
}
