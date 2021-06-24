const cors = require("cors");
const router = require("express").Router();
const {  query, validationResult } = require("express-validator");

module.exports = ({sequelize, models,...context }) => {
 const APIRouter = require("./api")(context);
 const PUBLICRouter = require("./public")(context);

 router.use("/api", 
 [query("apiKey").notEmpty().withMessage('API KEY MUST NOT BE EMPTY').trim()],
 async (req, res, next) => {
  try {
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
   const { apiKey = "*" } = req.query;
   const result = await models.APIKey.findOne({ where: { api_key: apiKey } });
   if (result === null) {
    return res.status(401).json({ error: "INVALID API KEY" });
   }
   next();
  } catch (e) {
   console.error(e);
   return res.status(401).json({ error: [e] });
  }
 });

 
 if (process.env.NODE_ENV === "development") {
  router.use("/api", cors(), APIRouter);
  router.use("/public", cors(),PUBLICRouter)
 } else {
  router.use("/api", APIRouter);
  router.use("/public", PUBLICRouter)
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
