const cors = require("cors");
const router = require("express").Router();
const { query, validationResult } = require("express-validator");
const axios = require('axios')

module.exports = (context = {}) => {
 const { sequelize, models } = context;
 const APIRouter = require("./api")(context);
 const PublicRouter = require("./public")(context);

 router.use(
  "/api",
  [query("apiKey").notEmpty().withMessage("API KEY MUST NOT BE EMPTY").trim()],
  async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
    const { apiKey = "*" } = req.query;
    if (apiKey.length != 36) {
     return res.status(401).json({ error: `INVALID API KEY: ${apiKey}`});
    }
    const result = await axios.get(`${process.env.APIS_PORTAL_GATEWAY}/api/v1/apikeys/${apiKey}/verify`);
    if (result.status !== 200) {
     return res.status(401).json({ message: `Unauthorized api key : ${apiKey}` });
    }
    next();
   } catch (e) {
    console.error(e);
    return res.status(401).json({ error: [e] });
   }
  }
 );

 if (process.env.NODE_ENV === "development") {
  router.use("/api", cors(), APIRouter);
  router.use("/public", cors(), PublicRouter);
 } else {
  router.use("/api", APIRouter);
  router.use("/public", PublicRouter);
 }
 router.get("/api/*", (req, res) => res.status(404).send());
 router.get("/public/*", (req, res) => res.status(404).send());
 router.get("/health", async (req, res) => {
  return res.status(200).send({ health: "HEALTHY" });
 });
 router.get("*", (req, res, next) => {
  res.status(404).send();
 });

 return router;
};
