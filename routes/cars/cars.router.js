const express = require("express");

const {
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require("./cars.controller");
const verifyAuth = require("../../middleware/auth");

const carsRouter = express.Router();
carsRouter.use(verifyAuth);

carsRouter.get("/:id", getCar);
carsRouter.post("/", createCar);
carsRouter.put("/:id", updateCar);
carsRouter.delete("/:id", deleteCar);

module.exports = carsRouter;
