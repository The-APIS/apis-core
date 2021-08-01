const axios = require("axios");
const router = require("express").Router();

const {
  getRPCServiceAddress,
  RPC_HANDLER_DEFAULTS,
  normalizeChain,
  chainIsSupported,
} = require("@/share/lib");


const rpcHandler = (module.exports = ({}) => {
  router.post("/", async (req, res) => {
    const baseUrl = req.baseUrl;
    const chain = normalizeChain(baseUrl.split("/")[4]);
    if (!chainIsSupported(chain)) {
      throw new Error(`Chain value ${chain} is not supported`);
    }
    const defaults = RPC_HANDLER_DEFAULTS[chain].defaults
    const { data, status } = await axios.post(
      `${getRPCServiceAddress({
        chain: defaults.chain,
        network: req.query.network || defaults.network,
      })}/api/v1/rpc`,
      req.body
    );
    return res.status(status).json(data);
  });
  return router;
});
