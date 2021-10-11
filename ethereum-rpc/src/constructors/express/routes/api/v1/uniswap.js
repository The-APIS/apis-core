const router = require("express").Router();
const ethers = require('ethers');
const { ChainId, WETH, Fetcher, Trade, Route, TokenAmount, TradeType, Percent } = require('@uniswap/sdk')
const { query, param, validationResult } = require("express-validator");

const { UNISWAP_ROUTER_ADDRESS, UNISWAP_SUPPORTED_CHAINS, UNISWAP_SUPPORTED_NETWORKS, UNISWAP_FACTORY_ADDRESS, WETH_ADDRESS } = require('@/share/constants');

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
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAINS),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORKS),
    query("tokenFrom").custom((value, { req }) => {
      if (value === req.query.tokenTo) {
        throw new error(' tokenFrom and tokenTo cannot be same');
      }
      return true
    })
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { privateKey = "", amount = "", tokenFrom = "", tokenTo = "", tokenToAddress = "", network = "" } = { ...req.query };
        const networkType = network.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const chainIds = chainNetwork()[networkType]
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
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, UNISWAP_ROUTER_ADDRESS, sendOptions(address));
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
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAINS),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORKS),
    query("tokenFrom").custom((value, { req }) => {
      if (value === req.query.tokenTo) {
        throw new error(' tokenFrom and tokenTo cannot be same');
      }
      return true
    })
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { privateKey = "", amount = "", network = "", tokenFrom = "", tokenTo = "", tokenFromAddress = "" } = { ...req.query };
        const networkType = network.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const tokenAbi = abi.APIS_ERC20
        const chainIds = chainNetwork()[networkType]
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
        const approving = await contractInstanceToken.methods.approve(UNISWAP_ROUTER_ADDRESS, amountIn)
          .send({ from: address })
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, UNISWAP_ROUTER_ADDRESS, sendOptions(address));
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
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAINS),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORKS),
    query("tokenFrom").custom((value, { req }) => {
      if (value === req.query.tokenTo) {
        throw new error(' tokenFrom and tokenTo cannot be same');
      }
      return true
    }),
    query("tokenFromAddress").custom((value, { req }) => {
      if (value === req.query.tokenToAddress) {
        throw new error('tokenFromAddress and tokenToAddress cannot be same')
      }
      return true
    })
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { privateKey = "", amount = "", network = "", tokenFrom = "", tokenTo = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
        const networkType = network.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const tokenAbi = abi.APIS_ERC20
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
        const approving = await contractInstanceToken.methods.approve(UNISWAP_ROUTER_ADDRESS, amountIn)
          .send({ from: address })
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, UNISWAP_ROUTER_ADDRESS, sendOptions(address));
        const result = await contractInstanceRouter.methods.swapExactTokensForTokens(amountIn, amountOutMinHex, path, address, deadline)
          .send({ from: address })
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/liquidity/add", [
    param("address").trim().isString(),
    query("privateKey").trim().isString(),
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAINS),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORKS),
    query("tokenA").custom((value, { req }) => {
      if (value === req.query.tokenB) {
        throw new error(' tokenA and tokenB cannot be same');
      }
      return true
    }),
    query("tokenAAddress").custom((value, { req }) => {
      if (value === req.query.tokenBAddress) {
        throw new error('tokenAAddress and tokenBAddress cannot be same')
      }
      return true
    })
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { privateKey = "", amountA = "", amountB = "", amountAMin = "", amountBMin = "", tokenB = "", tokenAAddress = "", tokenBAddress = "" } = { ...req.query };
        const tokenBType = tokenB.toString().toUpperCase();
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const tokenAbi = abi.APIS_ERC20
        const amountAValue = web3.utils.toWei(amountA);
        const amountBValue = web3.utils.toWei(amountB);
        const amountAMinValue = web3.utils.toWei(amountAMin);
        const amountBMinValue = web3.utils.toWei(amountBMin);
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
        const wallet = userWallet(privateKey, address)
        const contractInstanceTokenA = await new web3.eth.Contract(tokenAbi, tokenAAddress, sendOptions(address));
        const approvingTokenA = await contractInstanceTokenA.methods.approve(UNISWAP_ROUTER_ADDRESS, amountAValue)
          .send({ from: address })
        if (tokenBType == "WETH" || tokenBType == "ETH") {
          const contractInstanceWeth = await new web3.eth.Contract(tokenAbi, WETH_ADDRESS, sendOptions(address));
          const approvingWeth = await contractInstanceWeth.methods.approve(UNISWAP_ROUTER_ADDRESS, amountBValue)
            .send({ from: address })
          const contractInstanceRouter = await new web3.eth.Contract(routerAbi, UNISWAP_ROUTER_ADDRESS, sendOptions(address));
          const result = await contractInstanceRouter.methods.addLiquidityETH(tokenAAddress, amountAValue, amountAMinValue, amountBMinValue, address, deadline)
            .send({ from: address, value: amountBValue })
          return res.status(200).json({ result })
        }
        const contractInstanceTokenB = await new web3.eth.Contract(tokenAbi, tokenBAddress, sendOptions(address));
        const approvingTokenB = await contractInstanceTokenB.methods.approve(UNISWAP_ROUTER_ADDRESS, amountBValue)
          .send({ from: address })
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, UNISWAP_ROUTER_ADDRESS, sendOptions(address));
        const result = await contractInstanceRouter.methods.addLiquidity(tokenAAddress, tokenBAddress, amountAValue, amountBValue, amountAMinValue, amountBMinValue, address, deadline)
          .send({ from: address })
        return res.status(200).json({ result })
      } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: [e] });
      }
    }
  );

  router.post(
    "/:address/liquidity/remove", [
    param("address").trim().isString(),
    query("privateKey").trim().isString(),
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAINS),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORKS),
    query("tokenAAddress").custom((value, { req }) => {
      if (value === req.query.tokenBAddress) {
        throw new error('tokenAAddress and tokenBAddress cannot be same')
      }
      return true
    })
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { address = "*" } = req.params;
        const { privateKey = "", lpTokenAmount = "", amountAMin = "", amountBMin = "", tokenAAddress = "", tokenBAddress = "", tokenB = "" } = { ...req.query };
        const tokenBType = tokenB.toString().toUpperCase();
        const factoryAbi = abi.UNISWAP_FACTORY;
        const routerAbi = abi.UNISWAP_ROUTER.abi
        const tokenAbi = abi.APIS_ERC20
        const lpTokenAmountValue = web3.utils.toWei(lpTokenAmount);
        const amountAMinValue = web3.utils.toWei(amountAMin);
        const amountBMinValue = web3.utils.toWei(amountBMin);
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
        const wallet = userWallet(privateKey, address)
        if (tokenBType == "WETH" || tokenBType == "ETH") {
          const contractInstanceFactory = await new web3.eth.Contract(factoryAbi, UNISWAP_FACTORY_ADDRESS, sendOptions(address));
          const lpTokenAddress = await contractInstanceFactory.methods.getPair(tokenAAddress, WETH_ADDRESS)
            .call()
          const contractInstanceLpToken = await new web3.eth.Contract(tokenAbi, lpTokenAddress, sendOptions(address));
          const approvingLpToken = await contractInstanceLpToken.methods.approve(UNISWAP_ROUTER_ADDRESS, lpTokenAmountValue)
            .send({ from: address })
          const contractInstanceRouter = await new web3.eth.Contract(routerAbi, UNISWAP_ROUTER_ADDRESS, sendOptions(address));
          const result = await contractInstanceRouter.methods.removeLiquidityETH(tokenAAddress, lpTokenAmountValue, amountAMinValue, amountBMinValue, address, deadline)
            .send({ from: address })
          return res.status(200).json({ result })
        }
        const contractInstanceFactory = await new web3.eth.Contract(factoryAbi, UNISWAP_FACTORY_ADDRESS, sendOptions(address));
        const lpTokenAddress = await contractInstanceFactory.methods.getPair(tokenAAddress, tokenBAddress)
          .call()
        const contractInstanceLpToken = await new web3.eth.Contract(tokenAbi, lpTokenAddress, sendOptions(address));
        const approvingLpToken = await contractInstanceLpToken.methods.approve(UNISWAP_ROUTER_ADDRESS, lpTokenAmountValue)
          .send({ from: address })
        const contractInstanceRouter = await new web3.eth.Contract(routerAbi, UNISWAP_ROUTER_ADDRESS, sendOptions(address));
        const result = await contractInstanceRouter.methods.removeLiquidity(tokenAAddress, tokenBAddress, lpTokenAmountValue, amountAMinValue, amountBMinValue, address, deadline)
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
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAINS),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORKS),
    query("tokenFrom").custom((value, { req }) => {
      if (value === req.query.tokenTo) {
        throw new error(' tokenFrom and tokenTo cannot be same');
      }
      return true
    }),
    query("tokenFromAddress").custom((value, { req }) => {
      if (value === req.query.tokenToAddress) {
        throw new error('tokenFromAddress and tokenToAddress cannot be same')
      }
      return true
    })
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { amount = "", tokenFrom = "", tokenTo = "", network = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
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
    query("chain").trim().isIn(UNISWAP_SUPPORTED_CHAINS),
    query("network").trim().isIn(UNISWAP_SUPPORTED_NETWORKS),
    query("tokenFrom").custom((value, { req }) => {
      if (value === req.query.tokenTo) {
        throw new error(' tokenFrom and tokenTo cannot be same');
      }
      return true
    }),
    query("tokenFromAddress").custom((value, { req }) => {
      if (value === req.query.tokenToAddress) {
        throw new error('tokenFromAddress and tokenToAddress cannot be same')
      }
      return true
    })
  ],
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { tokenFrom = "", tokenTo = "", network = "", tokenFromAddress = "", tokenToAddress = "" } = { ...req.query };
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






