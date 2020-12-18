
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
