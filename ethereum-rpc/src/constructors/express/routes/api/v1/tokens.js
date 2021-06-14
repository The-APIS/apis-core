const axios = require("axios");
const router = require("express").Router();

const prefixContractAddress = (address) =>
  address.startsWith("0x") ? address : `0x${address}`;

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

  router.get("/:address/balance", async (req, res, next) => {
    try {
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
      const contractAbi =
        tokenType == "ERC20" ? abi.APIS_ERC20 : abi.APIS_ERC721;
      const Contract = new web3.eth.Contract(
        contractAbi,
        tokenContractAddress,
        {
          from: address,
          gasLimit: web3.utils.toHex(100000),
          gasPrice: web3.utils.toHex(50e9),
        }
      );
      Contract.methods
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
  });

  router.get("/:address/id", async (req, res, next) => {
    try {
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
      const Contract = new web3.eth.Contract(
        contractAbi,
        tokenContractAddress,
        {
          from: address,
          gasLimit: web3.utils.toHex(100000),
          gasPrice: web3.utils.toHex(50e9),
        }
      );
      Contract.methods
        .getTokenID(address)
        .call()
        .then(async function (result) {
          let id;
          id = result;
          return res.status(200).json({ id });
        });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: [e] });
    }
  });

  router.get("/:address/owner", async (req, res, next) => {
    try {
      const { address = "*" } = req.params;
      let { tokenAddress = "", tokenId = "" } = { ...req.query };
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
      const Contract = new web3.eth.Contract(
        contractAbi,
        tokenContractAddress,
        {
          from: address,
          gasLimit: web3.utils.toHex(100000),
          gasPrice: web3.utils.toHex(50e9),
        }
      );
      Contract.methods
        .ownerOf(tokenId)
        .call()
        .then(async function (result) {
          let owner;
          owner = result;
          return res.status(200).json({ owner });
        });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ errors: [e] });
    }
  });

  router.post("/:address/mint", async (req, res, next) => {
    try {
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
      const walletList = web3.eth.accounts.wallet;
      const Contract = new web3.eth.Contract(
        contractAbi,
        tokenContractAddress,
        {
          from: address,
          gasLimit: web3.utils.toHex(1000000),
          gasPrice: web3.utils.toHex(50e9), // 10 Gwei
        }
      );
      Contract.methods
        .safeMint(recieverAddress, id)
        .send({ from: address })
        .then(async function (result) {
          return res.status(200).json({ result });
        });
    } catch (e) {
      return res.status(500).json({ errors: [e] });
    }
  });
  return router;
};
