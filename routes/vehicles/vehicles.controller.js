const { validate } = require("../../utils/validators/cars");
const model = require("../../models/vehicles.model");

async function getVehicle(req, res) {
  try {
    const car = await model.getVehicle(req.params.id);

    if (Object.keys(car).length === 0) {
      res.status(404).end();
    } else {
      res.status(200).json({
        ...car,
        id: req.params.id,
      });
    }
  } catch (error) {
    console.log('EEEEEEEEEEEEEEEEEEEEEE', error)
    res.status(500).json({ error });
  }
}

async function createVehicle(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const carData = {
      ...req.body,
      created_at: new Date().toISOString(),
    };
    const car = await model.createVehicle(carData);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function updateVehicle(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const carData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };
    const updatedCar = await model.updateVehicle(req.params.id, carData);
    res.status(201).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function deleteVehicle(req, res) {
  try {
    await model.deleteVehicle(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
