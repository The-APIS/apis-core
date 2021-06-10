const axios = require("axios");
const router = require("express").Router();


const prefixContractAddress = address => address.startsWith('0x') ? address : `0x${address}`

module.exports = ({
  models,
  ethereum: { web3, buildContract, compiler, abi },
  ...context
}) => {
  router.post("/", async (req, res, next) => {
    try {
      const {
        network = "mainnet",
        type = "UNISWAP",
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

      const result = await compiler.deployContract({
        token,
        type,
        sender,
        privateKey,
        sendOptions,
      });

      console.log("result", result);

      return res.status(200).json(result.deployTransaction);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: [e] });
    }
  });

  // balance functionality for erc20 and erc721

  router.get("/balance/:address", async (req, res, next) => {
    try {
      const { address = "*" } = req.params;
      let { tokenAddress = "", type = "erc20" } = { ...req.query };
      const tokenContractAddress = prefixContractAddress(
        tokenAddress.toString("hex")
      );
      if (tokenAddress.length < 42 || tokenAddress.length > 42) {
        return res.status(500).json({ error: "invalid contract address" });
      }
      let tokenType = type.toString();

      if (!(tokenType == "erc20" || tokenType == "erc721")) {
        return res.status(500).json({ error: "invalid token type" });
      }
      const contractAbi = tokenType == "erc20" ? abi.APIS_ : abi.NFT_7;
      const Contract = new web3.eth.Contract(
        contractAbi,
        tokenContractAddress,
        {
          from: address, // default from address
          gasLimit: web3.utils.toHex(100000),
          gasPrice: web3.utils.toHex(50e9), // 10 Gwei
        }
      );

      Contract.methods
        .balanceOf(address)
        .call()
        .then(async function (result) {
          let balance;
          if (tokenType === "erc20") {
            balance = await web3.utils.fromWei(result, "ether");
            console.log("balance.....", balance);
          } else if (tokenType === "erc721") {
            balance = result;
          }

          return res.status(200).json({ Balance: balance });
        });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: [e] });
    }
  });

  //  get Token id functionality

  router.get("/tokenid/:address", async (req, res, next) => {
    try {
      const { address = "*" } = req.params;
      let { tokenAddress = "" } = { ...req.query };
      const tokenContractAddress = prefixContractAddress(
        tokenAddress.toString("hex")
      );

      if (tokenAddress.length < 42 || tokenAddress.length > 42) {
        return res.status(500).json({ error: "invalid contract address" });
      }

      const contractAbi = abi.NFT_7;
      const Contract = new web3.eth.Contract(
        contractAbi,
        tokenContractAddress,
        {
          from: address, // default from address
          gasLimit: web3.utils.toHex(100000),
          gasPrice: web3.utils.toHex(50e9), // 10 Gwei
        }
      );

      Contract.methods
        .getTokenID(address)
        .call()
        .then(async function (result) {
          let tokenID;
          tokenID = result;
          return res.status(200).json({ TokenId: tokenID });
        });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: [e] });
    }
  });

  //get ownerAddress
  // address is request sender address

  router.get("/owner/:address", async (req, res, next) => {
    try {
      const { address = "*" } = req.params;
      let { tokenAddress = "", tokenId = "" } = { ...req.query };
      const tokenContractAddress = prefixContractAddress(
        tokenAddress.toString("hex")
      );

      if (tokenAddress.length < 42 || tokenAddress.length > 42) {
        return res.status(500).json({ error: "invalid contract address" });
      }

      const contractAbi = abi.NFT_7;

      const Contract = new web3.eth.Contract(
        contractAbi,
        tokenContractAddress,
        {
          from: address, // default from address
          gasLimit: web3.utils.toHex(100000),
          gasPrice: web3.utils.toHex(50e9), // 10 Gwei
        }
      );

      Contract.methods
        .ownerOf(tokenId)
        .call()
        .then(async function (result) {
          let owner;

          owner = result;

          return res.status(200).json({ Owner: owner });
        });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: [e] });
    }
  });

  return router;
};
