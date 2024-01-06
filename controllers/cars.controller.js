const { validate } = require("../cars/validators");
const model = require("../models/cars.model");

async function getCar(req, res) {
  const car = await model.getCar(req.params.id);

  res.status(200).json({
    ...car,
    id: req.params.id,
  });
}

async function createCar(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const car = await model.createCar(req.body);

  res.status(201).json(car);
}

async function updateCar(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const updatedCar = await model.updateCar(req.params.id, req.body);

  res.status(200).json(updatedCar);
}

async function deleteCar(req, res) {
  try {
    await model.deleteCar(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
