const router = require("express").Router();
const ethers = require('ethers');
const { ChainId, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } = require('@uniswap/sdk')
const { query, param, validationResult } = require("express-validator");

const { UNISWAP_ROUTER_ADDRESS, UNISWAP_SUPPORTED_CHAIN, UNISWAP_SUPPORTED_NETWORK } = require('@/share/constants');

module.exports = ({
  models,
  ethereum: { web3, buildContract, compiler, abi },
  ...context
}) => {
  const chainNetwork = () => {
    const chainIdValue = {
      MAINNET: ChainId.MAINNET,
      RINKEBY: ChainId.RINKEBY
    }
    return chainIdValue
  }
  const userWallet = (privateKey, address) => {
    const wallet = web3.eth.accounts.wallet.add({
      privateKey,
      address,
    });
    return wallet
  }
  const sendOptions = (address) => {
    const options = {
      from: address,
      gasLimit: web3.utils.toHex(10000000),
      gasPrice: web3.utils.toHex(50e9)
    }
    return options
  }
  
  router.post(
    "/:address/swap/eth", [
    param("address").trim().isString(),
    query("privateKey").trim().isString(),
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
        const { privateKey = "", amount = "", tokenFrom = "", tokenTo = "", tokenToAddress = "", network = "" } = { ...req.query };
        if (tokenFrom === tokenTo) {
          res.status(500).json({ error: "tokenFrom and tokenTo cannot be same" })
        }
        const networkType = network.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const chainIds = chainNetwork()[networkType]
        const tokenAddressRouter = UNISWAP_ROUTER_ADDRESS
        const weth = WETH[chainIds]
        const tokenToInstance = await Fetcher.fetchTokenData(chainIds, tokenToAddress);
        if (!Object.keys(tokenToInstance).length) {
          return res.status(500).json({ error: "token cannot be empty" })
        }
        const pair = await Fetcher.fetchPairData(tokenToInstance, weth)
        const route = new Route([pair], weth)
        const amountIn = web3.utils.toWei(amount);
        const trade = new Trade(route, new TokenAmount(weth, amountIn), TradeType.EXACT_INPUT)
        const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
        const path = [weth.address, tokenToInstance.address]
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20 // 20 minutes from the current Unix time
        const valueInput = trade.inputAmount.raw // needs to be converted to e.g. hex
        const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
        const value = ethers.BigNumber.from(valueInput.toString()).toHexString();

        const wallet = userWallet(privateKey, address)
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, tokenAddressRouter, sendOptions(address));
        const result = await contractInstanceRouter.methods.swapExactETHForTokens(amountOutMinHex, path, address, deadline)
          .send({ from: address, value: value, })
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/swap/token", [
    param("address").trim().isString(),
    query("privateKey").trim().isString(),
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
        const { privateKey = "", amount = "", network = "", tokenFrom = "", tokenTo = "", tokenFromAddress = "" } = { ...req.query };
        if (tokenFrom === tokenTo) {
          res.status(500).json({ error: "tokenFrom and tokenTo cannot be same" })
        }
        const networkType = network.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const tokenAbi = abi.APIS_ERC20
        const chainIds = chainNetwork()[networkType]
        const tokenAddressRouter = UNISWAP_ROUTER_ADDRESS
        const weth = WETH[chainIds]
        const tokenFromInstance = await Fetcher.fetchTokenData(chainIds, tokenFromAddress);
        if (!Object.keys(tokenFromInstance).length) {
          return res.status(500).json({ error: "token cannot be empty" })
        }

        const pair = await Fetcher.fetchPairData(tokenFromInstance, weth)
        const route = new Route([pair], tokenFromInstance)
        const amountIn = web3.utils.toWei(amount);
        const trade = new Trade(route, new TokenAmount(tokenFromInstance, amountIn), TradeType.EXACT_INPUT)
        const slippageTolerance = new Percent('50', '10000')
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
        const path = [tokenFromInstance.address, weth.address]
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20
        const valueInput = trade.inputAmount.raw
        const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
        const value = ethers.BigNumber.from(valueInput.toString()).toHexString();
        const wallet = userWallet(privateKey, address)

        const contractInstanceToken = await new web3.eth.Contract(tokenAbi, tokenFromInstance.address, sendOptions(address));
        const transferring = await contractInstanceToken.methods.transfer(tokenFromInstance.address, amountIn)
          .send({ from: address })
        const approving = await contractInstanceToken.methods.approve(tokenAddressRouter, amountIn)
          .send({ from: address })
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, tokenAddressRouter, sendOptions(address));
        const result = await contractInstanceRouter.methods.swapExactTokensForETH(amountIn, amountOutMinHex, path, address, deadline)
          .send({ from: address })
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/swap", [
    param("address").trim().isString(),
    query("privateKey").trim().isString(),
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
        const { privateKey = "", amount = "", network = "", tokenFrom = "", tokenTo = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
        if (tokenFrom === tokenTo) {
          res.status(500).json({ error: "tokenFrom and tokenTo cannot be same" })
        }
        if (tokenFromAddress === tokenToAddress) {
          res.status(500).json({ error: "tokenFromAddress and tokenToAddress cannot be same" })
        }
        const networkType = network.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const tokenAbi = abi.APIS_ERC20
        const chainIds = chainNetwork()[networkType]
        const tokenAddressRouter = UNISWAP_ROUTER_ADDRESS
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
        const trade = new Trade(route, new TokenAmount(tokenFromInstance, amountIn), TradeType.EXACT_INPUT)
        const slippageTolerance = new Percent('50', '10000')
        const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw
        const path = [tokenFromInstance.address, tokenToInstance.address]
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20
        const valueInput = trade.inputAmount.raw
        const amountOutMinHex = ethers.BigNumber.from(amountOutMin.toString()).toHexString();
        const value = ethers.BigNumber.from(valueInput.toString()).toHexString();
        const wallet = userWallet(privateKey, address)
        const contractInstanceToken = await new web3.eth.Contract(tokenAbi, tokenFromInstance.address, sendOptions(address));
        const transferring = await contractInstanceToken.methods.transfer(tokenFromInstance.address, amountIn)
          .send({ from: address })
        const approving = await contractInstanceToken.methods.approve(tokenAddressRouter, amountIn)
          .send({ from: address })
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, tokenAddressRouter, sendOptions(address));
        const result = await contractInstanceRouter.methods.swapExactTokensForTokens(amountIn, amountOutMinHex, path, address, deadline)
          .send({ from: address })
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.get(
    "/price", [
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAIN),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORK),
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { amount = "", tokenFrom = "", tokenTo = "", network = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
        if (tokenFrom === tokenTo) {
          res.status(500).json({ error: "tokenFrom and tokenTo cannot be same" })
        }
        if (tokenFromAddress === tokenToAddress) {
          res.status(500).json({ error: "tokenFromAddress and tokenToAddress cannot be same" })
        }
        const networkType = network.toString().toUpperCase();
        const chainIds = chainNetwork()[networkType]
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
    "/pair", [
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAIN),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORK),
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { tokenFrom = "", tokenTo = "", network = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
        if (tokenFrom === tokenTo) {
          res.status(500).json({ error: "tokenFrom and tokenTo cannot be same" })
        }
        if (tokenFromAddress === tokenToAddress) {
          res.status(500).json({ error: "tokenFromAddress and tokenToAddress cannot be same" })
        }
        const networkType = network.toString().toUpperCase();
        const chainIds = chainNetwork()[networkType]
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






