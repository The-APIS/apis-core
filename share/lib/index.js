
module.exports.standardizeParameterString = standardizeParameterString = (s = '') => (s || '').toLowerCase().trim()

module.exports.queryStringIncludeToModelsInclude = queryStringIncludeToModelsInclude = (params = {}) => {
  let {
    chain = 'ethereum',
    models = {},
    include = null,
  } = params

  chain = standardizeParameterString(chain)

  if (!chain) chain = 'ethereum'


  if (!include) {
    include = []
  } else if (!Array.isArray(include)) {
    include = [include]
  }

  const chainPrefix = `${chain[0].toUpperCase()}${chain.substring(1).toLowerCase()}`

  if (include && include.length) {
    include = include.map(suffix => models[`${chainPrefix}${suffix}`]).filter(m => Boolean(m))
  }

  return include
}


module.exports.getRPCServiceAddress = getRPCServiceAddress = (params = {}) => {
  if (!params) return null
  let { chain, network } = params
  if (!chain) chain = 'ethereum'
  if (!network) network = 'rinkeby'
  chain = standardizeParameterString(chain)
  network = standardizeParameterString(network)
  return process.env[`${chain.toUpperCase()}_${network.toUpperCase()}_RPC_SVC_ADDR`]
}

module.exports.RPC_HANDLER_DEFAULTS = RPC_HANDLER_DEFAULTS = {
  ethereum: {
    defaults: {
      chain: "ethereum",
      network: "rinkeby",
    },
  },
  bitcoin: {
    defaults: {
      chain: "bitcoin",
      network: "testnet",
    },
  },
  binance_smart_chain: {
    defaults: {
      chain: "binance_smart_chain",
      network: "testnet",
    },
  },
};

module.exports.normalizeChain = normalizeChain = (chain = '') => {
  if (!chain || typeof chain !== 'string') return null
  switch (chain.toLowerCase()) {
    case 'eth':
    case 'ether':
    case 'ethereum': return 'ethereum'
    case 'binance_smart_chain':
    case 'binance-smart-chain':
    case 'bsc': return 'binance_smart_chain'
    case 'bitcoin':
    case 'btc': return 'bitcoin'
    default: return null
  }
}

module.exports.chainIsSupported = chainIsSupported = (chain) => Object.keys(RPC_HANDLER_DEFAULTS).indexOf(normalizeChain(chain)) !== -1
