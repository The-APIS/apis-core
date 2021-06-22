const axios = require("axios");
const router = require("express").Router();
const { body, query, param, validationResult } = require("express-validator");

const prefixPrivateKey = key => key.startsWith('0x') ? key : `0x${key}`

module.exports = ({
 models,
 ethereum: { web3, buildContract, compiler, abi },
 ...context
}) => {
 
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

  return router
}
