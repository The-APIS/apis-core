// const path = require('path')
// const fs = require('fs')
// const solc = require('solc')
// const ethers = require('ethers')
// const web3 = require('@/constructors/web3')
// const EthereumTx = require('ethereumjs-tx').Transaction
// const handlebars = require('handlebars')

// const prefixPrivateKey = key => key.startsWith('0x') ? key : `0x${key}`
// const removePrefixPrivateKey = key => key.startsWith('0x') ? key.substring(2) : key

// const erc20TemplateText = fs.readFileSync(path.resolve(__dirname, './contracts/ERC20-TEMPLATE.sol'), 'utf8')
// const erc20Template = handlebars.compile(erc20TemplateText);


// const createInput = ({
//   templateOptions: { token },
// }) => {
//   const content = erc20Template({ token })
//   return {
//     language: 'Solidity',
//     sources: {
//       [`${token.name}.sol`]: {
//         content,
//       }
//     },
//     settings: {
//       outputSelection: {
//         '*': {
//           '*': ['*']
//         }
//       }
//     }
//   }
// }


// function findImports(importFile) {
//   let contents
//   try {
//     contents = fs.readFileSync(`contracts/${importFile}`, 'utf8')
//     return { contents }
//   } catch (error) {
//       try {
//         contents = fs.readFileSync(path.resolve(__dirname, `../../node_modules/${importFile}`), 'utf8')
//         return { contents }
//       } catch (error) {
//         console.log(error.message)
//         return { error: 'File not found' }
//       }
//   }

// }

// const compile = ({ input }) => {
//   // New syntax (supported from 0.5.12, mandatory from 0.6.0)
//   return JSON.parse(
//     solc.compile(JSON.stringify(input), { import: findImports })
//   )
// }


// async function deployContractInternal({
//   contractJson,
//   contractConstructorArguments: [], // , 18, 10000000000 * 1e18
//   sender,
//   privateKey,
//   sendOptions,
// }) {
//   const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_HTTPS_ADDR || 'http://127.0.0.1:8545', 'rinkeby')
//   const wallet = new ethers.Wallet(privateKey, provider);
//   const factory = new ethers.ContractFactory(contractJson.abi, contractJson.evm.bytecode.object, wallet);
//   return factory.deploy()
// }

// const deployContract = (params = {
//   token: {
//     name: 'TheApis',
//     symbol: 'APIS',
//   },
//   sender: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
//   privateKey: '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
//   sendOptions: {
//     gasLimit: web3.utils.toHex(100000),
//     gasPrice: web3.utils.toHex(50e9),
//   },
// }) => {
//   console.log('params', params)
//   const input = createInput({ templateOptions: { token: params.token } });
//   const output = compile({ input })
//   return deployContractInternal({
//     contractJson: output.contracts[`${params.token.name}.sol`][params.token.name],
//     contractConstructorArguments: [params.token.name, params.token.symbol], // , 18, 10000000000 * 1e18
//     sender: params.sender,
//     privateKey: params.privateKey,
//     sendOptions: {
//       // gas: web3.utils.toHex('1500000'),
//       // gasPrice: web3.utils.toHex('30000000000000'),
//       ...params.sendOptions,
//     },
//   })
// }


// module.exports = {
//   compile,
//   deployContract,
// }
