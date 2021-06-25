const router = require('express').Router()

module.exports = ({models,...context}) => {
  router.post('/', async (req, res, next) => {
    try {
   const result = await models.APIKey.create({});
      return res.status(200).json(result)
    } catch (e) {
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
