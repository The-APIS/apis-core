const router = require("express").Router();
const ethers = require('ethers');
const { ChainId, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } = require('@uniswap/sdk')
const { query, param, validationResult } = require("express-validator");

const { UNISWAP_ROUTER_ADDRESS } = require('@/share/constants');
const { UNISWAP_SUPPORTED_CHAIN } = require('@/share/constants');
const { UNISWAP_SUPPORTED_NETWORK } = require('@/share/constants');

module.exports = ({
  models,
  ethereum: { web3, buildContract, compiler, abi },
  ...context
}) => {

  router.get(
    "/:address/swap/price", [
    param("address").trim().isString(),
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAIN),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORK),
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { amount = "", tokenFrom = "", tokenTo = "", network = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
        if (tokenFrom === tokenTo) {
          res.status(500).json({ error: "tokenFrom and tokenTo cannot be same" })
        }
        if (tokenFromAddress === tokenToAddress) {
          res.status(500).json({ error: "tokenFromAddress and tokenToAddress cannot be same" })
        }
        const networkType = network.toString().toUpperCase();
        const chainIdValue = {
          MAINNET: ChainId.MAINNET,
          RINKEBY: ChainId.RINKEBY
        }
        const chainIds = chainIdValue[networkType]
        const tokenFromInstance = await Fetcher.fetchTokenData(chainIds, tokenFromAddress);
        const tokenToInstance = await Fetcher.fetchTokenData(chainIds, tokenToAddress);
        if (!Object.keys(tokenFromInstance).length) {
          return res.status(500).json({ error: "token cannot be empty" })
        }
        if (!Object.keys(tokenToInstance).length) {
          return res.status(500).json({ error: "token cannot be empty" })
        }
        const pair = await Fetcher.fetchPairData(tokenFromInstance, tokenToInstance)
        const route = new Route([pair], tokenFromInstance)
        const amountIn = web3.utils.toWei(amount);
        const slippageTolerance = new Percent('50', '10000')
        const trade = new Trade(route, new TokenAmount(tokenFromInstance, amountIn), TradeType.EXACT_INPUT)
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
        const result = {
          "Route Mid Price ": route.midPrice.toSignificant(6),
          "Route Mid Price Invert ": route.midPrice.invert().toSignificant(6),
          "Trade Execution Price ": trade.executionPrice.toSignificant(6),
          "Trade Next Mid Price ": trade.nextMidPrice.toSignificant(6),
          "Mininum Amount Out ": trade.minimumAmountOut(slippageTolerance).toSignificant(6)
        }
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/:address/swap/pair", [
    param("address").trim().isString(),
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAIN),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORK),
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { tokenFrom = "", tokenTo = "", network = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
        if (tokenFrom === tokenTo) {
          res.status(500).json({ error: "tokenFrom and tokenTo cannot be same" })
        }
        if (tokenFromAddress === tokenToAddress) {
          res.status(500).json({ error: "tokenFromAddress and tokenToAddress cannot be same" })
        }
        const networkType = network.toString().toUpperCase();
        const chainIdValue = {
          MAINNET: ChainId.MAINNET,
          RINKEBY: ChainId.RINKEBY
        }
        const chainIds = chainIdValue[networkType]
        const tokenFromInstance = await Fetcher.fetchTokenData(chainIds, tokenFromAddress);
        const tokenToInstance = await Fetcher.fetchTokenData(chainIds, tokenToAddress);
        if (!Object.keys(tokenFromInstance).length) {
          return res.status(500).json({ error: "token cannot be empty" })
        }
        if (!Object.keys(tokenToInstance).length) {
          return res.status(500).json({ error: "token cannot be empty" })
        }
        const pair = await Fetcher.fetchPairData(tokenFromInstance, tokenToInstance)
        return res.status(200).json({ pair })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  return router;
};






