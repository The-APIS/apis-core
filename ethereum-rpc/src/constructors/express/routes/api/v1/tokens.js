const axios = require("axios");
const router = require("express").Router();
const { body, query, param, validationResult } = require("express-validator");


const prefixPrivateKey = (key) => (key.startsWith("0x") ? key : `0x${key}`);
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

  const validateParamAddress = ({ key }) => param(key).custom((value, { req }) => {
    if (!web3.utils.isAddress(value)) {
      throw new error(`invalid ${key}`);
    }
    return true
  })

  const validateQueryAddress = ({ key }) => query(key).custom((value, { req }) => {
    if (!web3.utils.isAddress(value)) {
      throw new error(`invalid ${key}`);
    }
    return true
  })

  router.post(
    "/",
    [
      body("type").trim().isIn(["APIS_ERC20", "APIS_ERC721", "APIS_ERC1155"]),
      body("chain").trim().isIn(["ethereum", "binance_smart_chain"]),
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {
          chain = "ethereum",
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
          chain,
          network,
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
      validateParamAddress({ key: "address" }),
      validateQueryAddress({ key : "tokenAddress"})
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
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/owner",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/name",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/symbol",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
           return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/supply",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/contract",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/uri",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
           return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: [e] });
      }
    }
  );

  router.get(
    "/:address/approved",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
           return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: [e] });
      }
    }
  );
  router.get(
    "/:address/collection",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
        const contractAbi = abi.APIS_ERC721;
        const contract = await contractInstance(
          contractAbi,
          tokenContractAddress,
          address
        );
        const balance = await contract.methods.balanceOf(address).call()
        if (balance == 0){
          return res.status(500).json({ error : "token balance zero"})
        }
        const index = Number(balance) - 1
        const tokenId = await contract.methods.tokenOfOwnerByIndex(address, index).call()
        const id = Number(tokenId)
        const uri = await contract.methods.tokenURI(id).call()
        const collection = []
        for (i = 0; i < balance; i++) {
          let tokenObtained = await contract.methods.tokenOfOwnerByIndex(address, i).call()
          collection.push(tokenObtained)
        }
        const result = {
          tokenURI: uri,
          tokenCollection: collection
        }
        return res.status(200).json({ result });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );
  router.post(
    "/:address/mint",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    validateQueryAddress({ key : "toAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/transfer",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    validateQueryAddress({ key : "toAddress"})
    ],
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
           return res.status(200).json({ result });
          });
      } catch (e) {
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/burn",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: [e] });
      }
    }
  );

  router.post(
    "/:address/approve",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    validateQueryAddress({ key : "toAddress"})
    ],
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
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: [e] });
      }
    }
  );

  router.get(
    "/:address/erc1155/balance",
    [
      param("address").trim().isString(),
      query("type").trim().isIn(["erc1155"]),
      query("tokenAddress").trim().isString(),
      validateParamAddress({ key: "address" }),
      validateQueryAddress({ key : "tokenAddress"})
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        let { tokenAddress = "", type = "erc1155", id = "" } = { ...req.query };
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const tokenType = type.toString().toUpperCase();
        if (!(tokenType === "ERC1155")) {
          return res.status(500).json({ error: "invalid token type" });
        }
        const contractAbi = abi.APIS_ERC1155;
        const contract = await contractInstance(
          contractAbi,
          tokenContractAddress,
          address
        );
        contract.methods
          .balanceOf(address, id)
          .call()
          .then(async function (result) {
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/erc1155/contract",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    ],
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
        const contractAbi = abi.APIS_ERC1155;
        const contract = await contractInstance(
          contractAbi,
          tokenContractAddress,
          address
        );
        contract.methods
          .owner()
          .call()
          .then((result) => {
           return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/erc1155/uri",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
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
        const contractAbi = abi.APIS_ERC1155;
        const contract = await contractInstance(
          contractAbi,
          tokenContractAddress,
          address
        );
        contract.methods
          .uri(id)
          .call()
          .then((result) => {
            return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: [e] });
      }
    }
  );

  router.post(
    "/:address/erc1155/mint",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    validateQueryAddress({ key : "toAddress"})
    ],
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
          data = "",
          amount = "",
        } = { ...req.query };
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const recieverAddress = prefixContractAddress(toAddress.toString("hex"));
        const bytesData = web3.utils.asciiToHex(data);
        const contractAbi = abi.APIS_ERC1155;
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
          .mint(recieverAddress, id, amount, bytesData)
          .send({ from: address })
          .then((result) => {
            return res.status(200).json({ result });
          });
      } catch (e) {
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/erc1155/mint/batch",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    validateQueryAddress({ key : "toAddress"})
    ],
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
          ids = "",
          privateKey = "",
          data = "",
          amounts = "",
        } = { ...req.query };

        const amountArray = amounts.split(",").map(Number);
        const idArray = ids.split(",").map(Number);
        if (amountArray.length != idArray.length) {
          return res
            .status(500)
            .json({ error: "NO: OF ID's NOT EQUAL TO NO OF AMOUNTS" });
        }
        for (i = 0; i < amountArray.length; i++) {
          if (amountArray[i] == "") {
            return res.status(500).json({ error: "AMOUNT CANNOT BE NULL" });
          }
        }
        for (i = 0; i < idArray.length; i++) {
          if (idArray[i] == "") {
            return res.status(500).json({ error: "ID CANNOT BE NULL" });
          }
        }
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const recieverAddress = prefixContractAddress(toAddress.toString("hex"));
        const bytesData = web3.utils.asciiToHex(data);
        const contractAbi = abi.APIS_ERC1155;
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
          .mintBatch(recieverAddress, idArray, amountArray, bytesData)
          .send({ from: address })
          .then((result) => {
            return res.status(200).json({ result });
          });
      } catch (e) {
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/erc1155/transfer",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    validateQueryAddress({ key : "toAddress"})
    ],
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
          privateKey = "",
          id = "",
          amount = "",
          data = "",
        } = { ...req.query };
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const recieverAddress = prefixContractAddress(toAddress.toString("hex"));
        const bytesData = web3.utils.asciiToHex(data);
        const contractAbi = abi.APIS_ERC1155;
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
          .safeTransferFrom(address, recieverAddress, id, amount, bytesData)
          .send({ from: address })
          .then((result) => {
           return res.status(200).json({ result });
          });
      } catch (e) {
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/erc1155/transfer/batch",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"}),
    validateQueryAddress({ key : "toAddress"})
    ],
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
          privateKey = "",
          ids = "",
          amounts = "",
          data = "",
        } = { ...req.query };
        const amountArray = amounts.split(",").map(Number);
        const idArray = ids.split(",").map(Number);
        if (amountArray.length != idArray.length) {
          return res.status(500).json({ error: "NO: OF ID's NOT EQUAL TO NO OF AMOUNTS" })
        }
        for (i = 0; i < amountArray.length; i++) {
          if (amountArray[i] == "") {
            return res.status(500).json({ error: "AMOUNT CANNOT BE NULL" })
          }
        }
        for (i = 0; i < idArray.length; i++) {
          if (idArray[i] == "") {
            return res.status(500).json({ error: "ID CANNOT BE NULL" })
          }
        }
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const recieverAddress = prefixContractAddress(toAddress.toString("hex"));
        const contractAbi = abi.APIS_ERC1155;
        const wallet = web3.eth.accounts.wallet.add({
          privateKey,
          address,
        });
        const bytesData = web3.utils.asciiToHex(data);
        const contract = await contractInstance(
          contractAbi,
          tokenContractAddress,
          address
        );
        contract.methods
          .safeBatchTransferFrom(address, recieverAddress, idArray, amountArray, bytesData)
          .send({ from: address })
          .then((result) => {
            return res.status(200).json({ result });
          });
      } catch (e) {
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/erc1155/burn",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        let { tokenAddress = "", id = "", privateKey = "", value = " " } = { ...req.query };
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const contractAbi = abi.APIS_ERC1155;
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
          .burn(address, id, value)
          .send({ from: address })
          .then((result) => {
           return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: [e] });
      }
    }
  );


  router.post(
    "/:address/erc1155/burn/batch",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        let { tokenAddress = "", ids = "", privateKey = "", values = " " } = { ...req.query };
        const valueArray = values.split(",").map(Number);
        const idArray = ids.split(",").map(Number);
        if (valueArray.length != idArray.length) {
          return res.status(500).json({ error: "NO: OF ID's NOT EQUAL TO NO OF VALUES" })
        }
        for (i = 0; i < valueArray.length; i++) {
          if (valueArray[i] == "") {
            return res.status(500).json({ error: "AMOUNT CANNOT BE NULL" })
          }
        }
        for (i = 0; i < idArray.length; i++) {
          if (idArray[i] == "") {
            return res.status(500).json({ error: "ID CANNOT BE NULL" })
          }
        }
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const contractAbi = abi.APIS_ERC1155;
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
          .burnBatch(address, idArray, valueArray)
          .send({ from: address })
          .then((result) => {
           return res.status(200).json({ result });
          });
      } catch (e) {
        console.error(e);
        return res.status(500).json({ error: [e] });
      }
    }
  );

  router.post(
    "/:address/erc1155/uri",
    [param("address").trim().isString(), query("tokenAddress").trim().isString(),
    validateParamAddress({ key: "address" }),
    validateQueryAddress({ key : "tokenAddress"})
    ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        let {
          tokenAddress = "",
          uri = "",
          privateKey = ""
        } = { ...req.query };
        const tokenContractAddress = prefixContractAddress(
          tokenAddress.toString("hex")
        );
        const contractAbi = abi.APIS_ERC1155;
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
          .setURI(uri)
          .send({ from: address })
          .then((result) => {
            return res.status(200).json({ result });
          });
      } catch (e) {
        return res.status(500).json({ errors: [e] });
      }
    }
  );
  return router;
};
