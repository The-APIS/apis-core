const axios = require("axios");
const router = require("express").Router();
const { body, query, param, validationResult } = require("express-validator");

const prefixPrivateKey = key => key.startsWith('0x') ? key : `0x${key}`
const prefixContractAddress = (address) =>
 address.startsWith("0x") ? address : `0x${address}`;

module.exports = ({
 models,
 ethereum: { web3, buildContract, compiler, abi },
 ...context
}) => {
 const contractInstance = (contractAbi, tokenContractAddress, address) => {
  const instance = new web3.eth.Contract(contractAbi, tokenContractAddress, {
   from: address,
   gasLimit: web3.utils.toHex(1000000),
   gasPrice: web3.utils.toHex(50e9),
  });
  return instance;
 };

 router.post(
  "/",
  [body("type").trim().isIn(["APIS_ERC20", "APIS_ERC721"])],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const {
     network = "mainnet",
     type = "APIS_ERC20",
     amount = 0,
     sender = "",
     recipient = "",
     tokenContractAddress = "",
     privateKey = "",
     sendOptions = {
      gasLimit: web3.utils.toHex(100000),
      gasPrice: web3.utils.toHex(50e9),
     },
     token = {},
     ...body
    } = req.body;
    const privateKeyHex = prefixPrivateKey(privateKey);
    const result = await compiler.deployContract({
     token,
     type,
     sender,
     privateKeyHex,
     sendOptions,
    });
    return res.status(200).json(result.deployTransaction);
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/balance",
  [
   param("address").trim().isString(),
   query("type").trim().isIn(["erc20", "erc721"]),
   query("tokenAddress").trim().isString(),
  ],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "", type = "erc20" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const tokenType = type.toString().toUpperCase();
    if (!(tokenType == "ERC20" || tokenType == "ERC721")) {
     return res.status(500).json({ error: "invalid token type" });
    }
    const contractAbi = tokenType == "ERC20" ? abi.APIS_ERC20 : abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .balanceOf(address)
     .call()
     .then(async function (result) {
      let balance;
      if (tokenType === "ERC20") {
       balance = await web3.utils.fromWei(result, "ether");
      } else if (tokenType === "ERC721") {
       balance = result;
      }
      return res.status(200).json({ balance });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/id",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .getTokenID(address)
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/owner",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "", id = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .ownerOf(id)
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/name",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .name()
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/symbol",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .symbol()
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/supply",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .totalSupply()
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/contract",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .owner()
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.get(
  "/:address/uri",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "", id = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .tokenURI(id)
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ error: [e] });
   }
  }
 );

 router.get(
  "/:address/approved",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "", id = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .getApproved(id)
     .call()
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ error: [e] });
   }
  }
 );

 router.post(
  "/:address/mint",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let {
     tokenAddress = "",
     toAddress = "",
     id = "",
     privateKey = "",
    } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    const recieverAddress = prefixContractAddress(toAddress.toString("hex"));
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    if (!web3.utils.isAddress(toAddress)) {
     return res.status(500).json({ error: "invalid address" });
    }
    if (!web3.utils.isAddress(tokenAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const wallet = web3.eth.accounts.wallet.add({
     privateKey,
     address,
    });
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .safeMint(recieverAddress, id)
     .send({ from: address })
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.post(
  "/:address/transfer",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let {
     tokenAddress = "",
     toAddress = "",
     tokenId = "",
     privateKey = "",
    } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    const recieverAddress = prefixContractAddress(toAddress.toString("hex"));
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    if (!web3.utils.isAddress(tokenAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(recieverAddress)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const wallet = web3.eth.accounts.wallet.add({
     privateKey,
     address,
    });
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .safeTransferFrom(address, recieverAddress, tokenId)
     .send({ from: address })
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    return res.status(500).json({ errors: [e] });
   }
  }
 );

 router.post(
  "/:address/burn",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let { tokenAddress = "", id = "", privateKey = "" } = { ...req.query };
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const wallet = web3.eth.accounts.wallet.add({
     privateKey,
     address,
    });
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .burn(id)
     .send({ from: address })
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ error: [e] });
   }
  }
 );

 router.post(
  "/:address/approve",
  [param("address").trim().isString(), query("tokenAddress").trim().isString()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    let {
     tokenAddress = "",
     id = "",
     toAddress = "",
     privateKey = "",
    } = { ...req.query };
    const recieverAddress = prefixContractAddress(toAddress.toString("hex"));
    const tokenContractAddress = prefixContractAddress(
     tokenAddress.toString("hex")
    );
    if (!web3.utils.isAddress(tokenContractAddress)) {
     return res.status(500).json({ error: "invalid contract address" });
    }
    if (!web3.utils.isAddress(recieverAddress)) {
     return res.status(500).json({ error: "invalid address" });
    }
    if (!web3.utils.isAddress(address)) {
     return res.status(500).json({ error: "invalid address" });
    }
    const contractAbi = abi.APIS_ERC721;
    const wallet = web3.eth.accounts.wallet.add({
     privateKey,
     address,
    });
    const contract = await contractInstance(
     contractAbi,
     tokenContractAddress,
     address
    );
    contract.methods
     .approve(recieverAddress, id)
     .send({ from: address })
     .then((result) => {
      res.status(200).json({ result });
     });
   } catch (e) {
    console.error(e);
    return res.status(500).json({ error: [e] });
   }
  }
 );

 return router;
};
