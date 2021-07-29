const router = require("express").Router();
const ethers = require('ethers');
const {ChainId, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } = require('@uniswap/sdk')
const { query, param, validationResult } = require("express-validator");


module.exports = ({
 models,
 ethereum: { web3, buildContract, compiler, abi },
 ...context
}) => {
 
 router.post(
  "/:address/swap/eth",[
   param("address").trim().isString(),
   query("tokenA").trim().isIn(["eth"]),
   query("tokenB").trim().isIn(["dai", "mkr","uni"]),
   query("privateKey").trim().isString(),
  ],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { address = "*" } = req.params;
    const { privateKey = "" , amount = "" , tokenA = "" , tokenB = ""} = { ...req.query };
    const tokenType = tokenB.toString().toUpperCase();
    const uniAbi = abi.UNISWAP_ROUTER.abi
    const chainIds = ChainId.RINKEBY;

    const tokenAddressRinkebyDai = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'
    const tokenAddressRinkebyRouter = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

    const DAI = await Fetcher.fetchTokenData(chainIds, tokenAddressRinkebyDai) ;
    const weth = WETH[chainIds]

    let token = DAI
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
    
    const contractInstance = await new web3.eth.Contract(uniAbi, tokenAddressRinkebyRouter, {
     from: address,
     gasLimit:  web3.utils.toHex(10000000),
     gasPrice:  web3.utils.toHex(50e9),
    });
    const result = await contractInstance.methods.swapExactETHForTokens( amountOutMinHex ,  path, address,  deadline)
    .send({ from: address , value:value, })
     return res.status(200).json({ result})  
   } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: [e] });
   }
  }
 );
 return router;
};






