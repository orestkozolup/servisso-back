const express = require("express");

const {
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("./vehicles.controller");
const verifyAuth = require("../../middleware/auth");

const vehiclesRouter = express.Router();
// vehiclesRouter.use(verifyAuth);

vehiclesRouter.get("/:id", getVehicle);
vehiclesRouter.post("/", createVehicle);
vehiclesRouter.put("/:id", updateVehicle);
vehiclesRouter.delete("/:id", deleteVehicle);

module.exports = vehiclesRouter;
