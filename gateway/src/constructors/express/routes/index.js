const path = require("path");
const cors = require("cors");
const router = require("express").Router();

module.exports = (context = {}) => {
 const { sequelize, models } = context;
 const APIRouter = require("./api")(context);

 router.use("/api", async (req, res, next) => {
  console.log("TODO - authenticate...");
  try {
   const { apiKey = "*" } = req.query;
   const Op = sequelize.Op;
   const result = await models.APIKey.findAll({ where: { api_key: apiKey } });
   if (result.length == 0) {
    return res.status(401).json({ error: "API KEY NOT VALID" });
   }
   next();
  } catch (e) {
   console.error(e);
   return res.status(401).json({ error: [e] });
  }
 });

 if (process.env.NODE_ENV === "development") {
  router.use("/api", cors(), APIRouter);
 } else {
  router.use("/api", APIRouter);
 }

 router.get("/api/*", (req, res) => res.status(404).send());

 router.get("/health", async (req, res) => {
  return res.status(200).send({ health: "HEALTHY" });
 });

 router.get("*", (req, res, next) => {
  res.status(404).send();
 });

 return router;
};
