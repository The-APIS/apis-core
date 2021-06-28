const path = require("path");
const fs = require("fs");
const solc = require("solc");
const ethers = require("ethers");
//const web3 = require("@/constructors/web3");
const web3Connection = require('@/constructors/web3')
const {web3,bscWeb3} = web3Connection;
const EthereumTx = require("ethereumjs-tx").Transaction;
const handlebars = require("handlebars");

const prefixPrivateKey = (key) => (key.startsWith("0x") ? key : `0x${key}`);
const removePrefixPrivateKey = (key) =>
 key.startsWith("0x") ? key.substring(2) : key;

const erc20TemplateText = fs.readFileSync(
 path.resolve(__dirname, "./contracts/ERC20-TEMPLATE.sol"),
 "utf8"
);
const erc20Template = handlebars.compile(erc20TemplateText);
const apisErc20TemplateText = fs.readFileSync(
 path.resolve(__dirname, "./contracts/APIS_ERC20.sol"),
 "utf8"
);
const apisErc20Template = handlebars.compile(apisErc20TemplateText);
const apisErc721TemplateText = fs.readFileSync(
 path.resolve(__dirname, "./contracts/APIS_ERC721.sol"),
 "utf8"
);
const apisErc721Template = handlebars.compile(apisErc721TemplateText);
const apisErc20Abi = fs.readFileSync(
 path.resolve(__dirname, "./abi/APIS_ERC20.json"),
 "utf8"
);
const apisErc20Compiled = fs.readFileSync(
 path.resolve(__dirname, "./bytecode/APIS_ERC20.json"),
 "utf8"
);

const createInput = ({ templateOptions: { token }, type }) => {
 const content =
  type === "APIS_ERC20"
   ? apisErc20Template({ token })
   : apisErc721Template({ token });
 return {
  language: "Solidity",
  sources: {
   [`${token.name}.sol`]: {
    content,
   },
  },
  settings: {
   outputSelection: {
    "*": {
     "*": ["*"],
    },
   },
  },
 };
};

function findImports(importFile) {
 let contents;
 try {
  contents = fs.readFileSync(`contracts/${importFile}`, "utf8");
  return { contents };
 } catch (error) {
  try {
   contents = fs.readFileSync(
    path.resolve(__dirname, `../../node_modules/${importFile}`),
    "utf8"
   );
   return { contents };
  } catch (error) {
   console.log(error.message);
   return { error: "File not found" };
  }
 }
}
const compile = ({ input }) => {
 // New syntax (supported from 0.5.12, mandatory from 0.6.0)
 return JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
 );
};
async function deployContractInternal({
 chain,
 network,
 contractJson,
 sender,
 privateKey,
 sendOptions,
 deployArgs = [],
}) {
 
 const provider = chain === "ethereum" ? new ethers.providers.WebSocketProvider(
  process.env.ETHEREUM_WSS_ADDR,
  process.env.ETHEREUM_NETWORK || "rinkeby"
 ) : new ethers.providers.JsonRpcProvider(process.env.BINANCE_SMART_CHAIN_HTTPS_ADDR) ; 
 //let provider = new ethers.providers.JsonRpcProvider(process.env.BINANCE_SMART_CHAIN_HTTPS_ADDR)
 // const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_HTTPS_ADDR || 'http://127.0.0.1:8545', (process.env.ETHEREUM_NETWORK || 'rinkeby'))
 const wallet = new ethers.Wallet(privateKey, provider);
 const factory = new ethers.ContractFactory(
  contractJson.abi,
  contractJson.evm.bytecode.object,
  wallet
 );
 return factory.deploy(...(deployArgs || []));
}
async function deployStaticContract({
 abi,
 bytecode,
 privateKey,
 sendOptions,
 deployArgs = [],
}) {
 // const provider = new ethers.providers.WebSocketProvider(process.env.ETHEREUM_WSS_ADDR, (process.env.ETHEREUM_NETWORK || 'rinkeby'))
 const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETHEREUM_HTTPS_ADDR || "http://127.0.0.1:8545",
  process.env.ETHEREUM_NETWORK || "rinkeby"
 );
 const wallet = new ethers.Wallet(privateKey, provider);
 const factory = new ethers.ContractFactory(abi, bytecode, wallet);
 return factory.deploy(...(deployArgs || []));
}
const deployContract = (params) => {
 try {
  if (
   params.type === "APIS_ERC20" ||
   params.type === "APIS_ERC721" ||
   !params.type
  ) {
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
   let deployArgsErc20, deployArgsErc721;
   if (params.type === "APIS_ERC20") {
    deployArgsErc20 = [
     params.token.name,
     params.token.symbol,
     params.token.minter || params.token.sender,
     params.token.account || params.token.sender,
     new web3.utils.BN(params.token.initialSupply || 0).toString(),
    ];
   } else if (params.type === "APIS_ERC721") {
    deployArgsErc721 = [
     params.token.name,
     params.token.symbol,
     params.token.uri.toString(),
    ];
   }
   const input = createInput({
    templateOptions: { token: params.token },
    type: params.type,
   });
   const output = compile({ input });
   return deployContractInternal({
    contractJson:
     params.type === "APIS_ERC20"
      ? output.contracts[`${params.token.name}.sol`].ERC20
      : output.contracts[`${params.token.name}.sol`].APIS_ERC721,
    sender: params.sender,
    privateKey: params.privateKeyHex,
    chain:params.chain,
    network:params.network,
    sendOptions: {
     ...params.sendOptions,
    },
    deployArgs:
     params.type === "APIS_ERC20" ? deployArgsErc20 : deployArgsErc721,
   });
  } else {
   throw new Error("Invalid type");
  }
 } catch (e) {
  console.error(e);
  throw new Error("Invalid token type");
 }
};

module.exports = {
 compile,
 deployContract,
};
