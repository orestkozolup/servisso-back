const express = require("express");

const {
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require("./cars.controller");

const carsRouter = express.Router();

carsRouter.get("/:id", getCar);
carsRouter.post("/", createCar);
carsRouter.put("/:id", updateCar);
carsRouter.delete("/:id", deleteCar);

module.exports = carsRouter;
