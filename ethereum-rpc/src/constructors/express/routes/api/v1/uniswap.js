const axios = require("axios");
const router = require("express").Router();
const ethers = require('ethers');
const {ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } = require('@uniswap/sdk')
const { body, query, param, validationResult } = require("express-validator");



module.exports = ({
 models,
 ethereum: { web3, buildContract, compiler, abi },
 ...context
}) => {
 
 router.post(
  "/:address/swap",
  async (req, res, next) => {
   try {
    const { address = "*" } = req.params;
    const { privateKey = "" , amountIn = "" , toAddress = ""} = { ...req.query };
    const uniAbi = abi.UNISWAP_ROUTER.abi
    const chainIds = ChainId.RINKEBY;
    const tokenAddressRinkebyDai = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea'
    const tokenAddressRinkebyRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    const DAI = new Token(chainIds, tokenAddressRinkebyDai, 18)
    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])
    const route = new Route([pair], WETH[DAI.chainId])
    const wallet = web3.eth.accounts.wallet.add({
     privateKey,
     address,
    });
    const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%
    const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], amountIn), TradeType.EXACT_INPUT)
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
    const path = [WETH[DAI.chainId].address, DAI.address]
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
    const valueInput = trade.inputAmount.raw  // needs to be converted to e.g. hex
    const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
   const value = ethers.BigNumber.from(valueInput.toString()).toHexString();
   const contractInstance = await new web3.eth.Contract(uniAbi, tokenAddressRinkebyRouter, {
    from: address,
    gasLimit:  web3.utils.toHex(10000000),
    gasPrice:  web3.utils.toHex(50e9),
   });
   const result = await contractInstance.methods.swapExactETHForTokens( amountOutMinHex ,  path, toAddress,  deadline)
        .send({ from: address , value:value })
   return res.status(200).json({ result})  
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );
 return router;
};






