
module.exports.queryStringIncludeToModelsInclude = queryStringIncludeToModelsInclude = ({ models = [], include = null }) => {
  if (!include) {
    include = []
  } else if (!Array.isArray(include)) {
    include = [include]
  }

  if (include && include.length) {
    include = include.map(suffix => models[`Ethereum${suffix}`])
  }

  return include
}
