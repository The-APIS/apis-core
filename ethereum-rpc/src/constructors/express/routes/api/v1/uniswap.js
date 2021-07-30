const router = require("express").Router();
const ethers = require('ethers');
const { ChainId, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } = require('@uniswap/sdk')
const { query, param, validationResult } = require("express-validator");


module.exports = ({
  models,
  ethereum: { web3, buildContract, compiler, abi },
  ...context
}) => {

  router.post(
    "/:address/swap/eth", [
    param("address").trim().isString(),
    query("tokenFrom").trim().isIn(["eth"]),
    query("tokenTo").trim().isIn(["dai", "mkr", "uni"]),
    query("privateKey").trim().isString(),
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { privateKey = "", amount = "", tokenFrom = "", tokenTo = "" } = { ...req.query };
        const tokenType = tokenTo.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const chainIds = ChainId.RINKEBY;

        const tokenAddressRinkebyDai = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735'
        const tokenAddressRinkebyUniswap = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
        const tokenAddressRinkebyMaker = '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85';
        const tokenAddressRinkebyRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

        const DAI = await Fetcher.fetchTokenData(chainIds, tokenAddressRinkebyDai);
        const UNISWAP = await Fetcher.fetchTokenData(chainIds, tokenAddressRinkebyUniswap);
        const MAKER = await Fetcher.fetchTokenData(chainIds, tokenAddressRinkebyMaker);
        const weth = WETH[chainIds]

        let token = {}
        switch (tokenType) {
          case 'DAI':
            token = DAI;
            break;
          case 'UNI':
            token = UNISWAP;
            break;
          case 'MKR':
            token = MAKER
            break;
        }
        if (!Object.keys(token).length) {
          return res.status(500).json({ error: "token value cannot be empty" })
        }
        const pair = await Fetcher.fetchPairData(token, weth)
        const route = new Route([pair], weth)
        const amountIn = web3.utils.toWei(amount);
        const trade = new Trade(route, new TokenAmount(weth, amountIn), TradeType.EXACT_INPUT)
        const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
        const path = [weth.address, token.address]
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
        const valueInput = trade.inputAmount.raw // // needs to be converted to e.g. hex
        const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
        const value = ethers.BigNumber.from(valueInput.toString()).toHexString();
        const wallet = web3.eth.accounts.wallet.add({
          privateKey,
          address,
        });

        const contractInstance = await new web3.eth.Contract(routerAbi, tokenAddressRinkebyRouter, {
          from: address,
          gasLimit: web3.utils.toHex(10000000),
          gasPrice: web3.utils.toHex(50e9),
        });
        const result = await contractInstance.methods.swapExactETHForTokens(amountOutMinHex, path, address, deadline)
          .send({ from: address, value: value, })
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/swap/price", [
    param("address").trim().isString(),
    query("tokenFrom").trim().isIn(["eth"]),
    query("tokenTo").trim().isIn(["dai", "mkr", "uni"]),
    query("chain").trim().isIn(["ethereum"]),
    query("network").trim().isIn(["rinkeby","mainnet"]),
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { amount = "", tokenFrom = "", tokenTo = "" , network = ""} = { ...req.query };
        const tokenType = tokenTo.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const networkType = network.toString().toUpperCase();
        
        let chainIds ={}
        switch (networkType) {
          case 'MAINNET':
            chainIds = ChainId.MAINNET;
            break;
          case 'RINKEBY':
            chainIds = ChainId.RINKEBY;
            break;
        }
        let tokenAddressDai,tokenAddressUniswap,tokenAddressMaker
        if (networkType === "MAINNET"){
         tokenAddressDai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
         tokenAddressUniswap = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
         tokenAddressMaker = '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2';
         tokenAddressRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
        }
        else if ( networkType === "RINKEBY"){
         tokenAddressDai = '0xc7ad46e0b8a400bb3c915120d284aafba8fc4735'
         tokenAddressUniswap = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
         tokenAddressMaker = '0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85';
         tokenAddressRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
        }
        const DAI = await Fetcher.fetchTokenData(chainIds, tokenAddressDai);
        const UNISWAP = await Fetcher.fetchTokenData(chainIds, tokenAddressUniswap);
        const MAKER = await Fetcher.fetchTokenData(chainIds, tokenAddressMaker);
        const weth = WETH[chainIds]

        let token = {}
        switch (tokenType) {
          case 'DAI':
            token = DAI;
            break;
          case 'UNI':
            token = UNISWAP;
            break;
          case 'MKR':
            token = MAKER
            break;
        }
        if (!Object.keys(token).length) {
          return res.status(500).json({ error: "token value cannot be empty" })
        }
        const pair = await Fetcher.fetchPairData(token, weth)
        const route = new Route([pair], weth)
        const amountIn = web3.utils.toWei(amount);
        const trade = new Trade(route, new TokenAmount(weth, amountIn), TradeType.EXACT_INPUT)
        const result = {
          "Route Mid Price " : route.midPrice.toSignificant(6),
          "Route Mid Price Invert " : route.midPrice.invert().toSignificant(6),
          "Trade Execution Price " : trade.executionPrice.toSignificant(6),
          "Trade Next Mid Price " : trade.nextMidPrice.toSignificant(6)
        }
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );
  return router;
};






