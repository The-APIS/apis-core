const fs = require('fs')
const path = require('path')
const checksum = require('ethereum-checksum-address')
// const decoder = require('abi-decoder')

const web3Connection = require('@/constructors/web3')
const {web3,bscWeb3} = web3Connection;
const compiler = require('./compiler')


const readABIFilenamesFromPath = (dirPath) => (
  fs
    .readdirSync(dirPath)
    .filter(file =>
      (file.indexOf('.') !== 0) &&
      (file !==  path.basename(module.filename)) &&
      (file.slice(-5) === '.json')
    )
)

const requireABIs = () => {
  const abiPath = path.resolve(__dirname, './abi')
  const importABI = (filename) => require(path.resolve(abiPath, filename))
  const abiFilenames = readABIFilenamesFromPath(abiPath)
  return abiFilenames.reduce((acc, filename) => ({
    ...acc,
    [filename.slice(0,-5)]: importABI(filename),
  }), {})
}

const abi = requireABIs()

// Object.values(abi).forEach(abi => decoder.addABI(abi)) // TODO - changed from array to map


const ethereum = module.exports = {
  web3,
  bscWeb3,
  abi,
  // decoder,
  checksum,
  compiler,
  buildContract: ({
    type,
    address,
    options = {},
  }) => {
    return new web3.eth.Contract(abi[type], address, {
      // from: '0x1234567890123456789012345678901234567891', // default from address
      // gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
      ...options,
    })
  }
}
