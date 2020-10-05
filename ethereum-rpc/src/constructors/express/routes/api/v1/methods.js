const axios = require('axios')
const router = require('express').Router()


const queryStringIncludeToModelsInclude = ({ models = [], include = null }) => {
  if (!include) {
    include = []
  } else if (!Array.isArray(include)) {
    include = [include]
  }

  if (include && include.length) {
    include = include.map(suffix => models[`Ethereum${suffix}`])
  }

  console.log('include', include)
  return include
}

module.exports = ({ models, ...context }) => {

  router.get('/', async (req, res, next) => {
    try {
      let {
        limit = 100,
        offset = 0,
        include,
        ...query
      } = { ...req.query }

      const methods = await models.EthereumMethod.findAll({
        where: {
          ...query,
        },
        limit: Math.min(limit, 1000),
        offset,
        include: queryStringIncludeToModelsInclude({ models, include }),
      })

      return res.status(200).json({
        data: methods,
      })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ errors: [e] })
    }
  })

  return router
}
