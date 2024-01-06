const { validate } = require("../../utils/validators/cars");
const model = require("../../models/cars.model");

async function getCar(req, res) {
  try {
    const car = await model.getCar(req.params.id);

    if (Object.keys(car).length === 0) {
      res.status(404).end();
    } else {
      res.status(200).json({
        ...car,
        id: req.params.id,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function createCar(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const car = await model.createCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function updateCar(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const updatedCar = await model.updateCar(req.params.id, req.body);
    res.status(201).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error });
  }
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
