const express = require("express");

const {
  getService,
} = require("./services.controller");
const verifyAuth = require("../../middleware/auth");

const servicesRouter = express.Router();
// servicesRouter.use(verifyAuth);

servicesRouter.get("/:id", getService);

module.exports = servicesRouter;
