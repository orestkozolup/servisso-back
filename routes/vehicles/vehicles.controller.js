const { validate } = require("../../utils/validators/vehicles");
const model = require("../../models/vehicles.model");

async function getVehicle(req, res) {
  try {
    const vehicle = await model.getVehicle(req.params.id);

    if (Object.keys(vehicle).length === 0) {
      res.status(404).end();
    } else {
      res.status(200).json({
        ...vehicle,
        id: req.params.id,
      });
    }
  } catch (error) {
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
    const vehicleData = {
      ...req.body,
      created_at: new Date().toISOString(),
    };
    const vehicle = await model.createVehicle(vehicleData);
    res.status(201).json(vehicle);
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
    const vehicleData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };
    const updatedVehicle = await model.updateVehicle(req.params.id, vehicleData);
    res.status(201).json(updatedVehicle);
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
