const path = require('path')
const fs = require('fs')
const solc = require('solc')
const ethers = require('ethers')
const web3 = require('@/constructors/web3')
const EthereumTx = require('ethereumjs-tx').Transaction
const handlebars = require('handlebars')

const prefixPrivateKey = key => key.startsWith('0x') ? key : `0x${key}`
const removePrefixPrivateKey = key => key.startsWith('0x') ? key.substring(2) : key

const erc20TemplateText = fs.readFileSync(path.resolve(__dirname, './contracts/ERC20-TEMPLATE.sol'), 'utf8')
const erc20Template = handlebars.compile(erc20TemplateText);
const apisErc20TemplateText = fs.readFileSync(path.resolve(__dirname, './contracts/APIS_ERC20.sol'), 'utf8')
const apisErc20Template = handlebars.compile(apisErc20TemplateText);
const apisErc20Abi = fs.readFileSync(path.resolve(__dirname, './abi/APIS_ERC20.json'), 'utf8')
const apisErc20Compiled = fs.readFileSync(path.resolve(__dirname, './bytecode/APIS_ERC20.json'), 'utf8')

const createInput = ({
  templateOptions: { token },
  type,
}) => {
  const content = type === 'APIS_ERC20' ? apisErc20Template({ token }) : erc20Template({ token })
  return {
    language: 'Solidity',
    sources: {
      [`${token.name}.sol`]: {
        content,
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }
}


function findImports(importFile) {
  let contents
  try {
    contents = fs.readFileSync(`contracts/${importFile}`, 'utf8')
    return { contents }
  } catch (error) {
      try {
        contents = fs.readFileSync(path.resolve(__dirname, `../../node_modules/${importFile}`), 'utf8')
        return { contents }
      } catch (error) {
        console.log(error.message)
        return { error: 'File not found' }
      }
  }

}

const compile = ({ input }) => {
  // New syntax (supported from 0.5.12, mandatory from 0.6.0)
  return JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  )
}


async function deployContractInternal({
  contractJson,
  sender,
  privateKey,
  sendOptions,
  deployArgs = [],
}) {
  const provider = new ethers.providers.WebSocketProvider(process.env.ETHEREUM_WSS_ADDR, (process.env.ETHEREUM_NETWORK || 'rinkeby'))
  // const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_HTTPS_ADDR || 'http://127.0.0.1:8545', (process.env.ETHEREUM_NETWORK || 'rinkeby'))
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log('contractJson.abi', contractJson.abi)
  console.log('contractJson.evm.bytecode.object', contractJson.evm.bytecode.object)
  console.log('deployArgs', deployArgs)
  const factory = new ethers.ContractFactory(contractJson.abi, contractJson.evm.bytecode.object, wallet);
  return factory.deploy(...(deployArgs || []))
}

async function deployStaticContract({
  abi,
  bytecode,
  privateKey,
  sendOptions,
  deployArgs = [],
}) {
  // const provider = new ethers.providers.WebSocketProvider(process.env.ETHEREUM_WSS_ADDR, (process.env.ETHEREUM_NETWORK || 'rinkeby'))
  const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_HTTPS_ADDR || 'http://127.0.0.1:8545', (process.env.ETHEREUM_NETWORK || 'rinkeby'))
  const wallet = new ethers.Wallet(privateKey, provider);
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  return factory.deploy(...(deployArgs || []))
}

const deployContract = (params = {
  token: {
    name: 'TheApis',
    symbol: 'APIS',
    minter: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
    account: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
    initialSupply: '100000000000000000000000',
  },
  type: 'APIS_ERC20',
  sender: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
  privateKey: '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
  sendOptions: {
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(50e9),
  },
}) => {
  console.log('params', params)
  if (params.type === 'APIS_ERC20' || !params.type) {
    // return deployStaticContract({
    //   abi: apisErc20Abi,
    //   bytecode: apisErc20Compiled.object,
    //   privateKey: params.privateKey,
    //   sendOptions: params.sendOptions,
    //   deployArgs: [
    //     params.sender,
    //     (params.minter || params.sender),
    //     (params.account || params.sender),
    //     (params.supply || false),
    //   ],
    // })
    const input = createInput({ templateOptions: { token: params.token }, type: params.type });
    console.log('input', input)
    const output = compile({ input })
    console.log('output', output)
    return deployContractInternal({
      contractJson: output.contracts[`${params.token.name}.sol`].ERC20,
      sender: params.sender,
      privateKey: params.privateKey,
      sendOptions: {
        // gas: web3.utils.toHex('1500000'),
        // gasPrice: web3.utils.toHex('30000000000000'),
        ...params.sendOptions,
      },
      deployArgs: [
        params.token.name,
        params.token.symbol,
        (params.token.minter || params.token.sender),
        (params.token.account || params.token.sender),
        (new web3.utils.BN(params.token.initialSupply || 0)).toString(),
      ],
    })
  }
}


module.exports = {
  compile,
  deployContract,
}
