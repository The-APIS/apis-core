const axios = require('axios')
const router = require('express').Router()


module.exports = (context) => {
 const { sequelize, models } = context;
  router.post('/', async (req, res, next) => {
    try {
   const { name = "*", email = "*" } = req.query;
   console.log("model.....",models)
   
   const Op = sequelize.Op;
   const result = await models.APIKey.create({});
   console.log("result.....",result)
  
      return res.status(200).json(result)
    } catch (e) {
      return res.status(500).json({ errors: [e.message] })
    }
  })

  return router
}
