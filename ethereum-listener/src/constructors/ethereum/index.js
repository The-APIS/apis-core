const fs = require('fs')
const path = require('path')
const decoder = require('abi-decoder')

const web3 = require('/app/constructors/web3')


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
  return abiFilenames.map(filename => importABI(filename))
}

const abi = requireABIs()

Object.values(abi).forEach(abi => decoder.addABI(abi))


const ethereum = module.exports = {
  web3,
  abi,
  decoder,
}
