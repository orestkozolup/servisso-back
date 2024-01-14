const { validate } = require("../../utils/validators/users");
const userModel = require("../../models/users.model");
const vehicleModel = require("../../models/vehicles.model");

async function getUser(req, res) {
  try {
    const user = await userModel.getUser(req.params.id);

    if (Object.keys(user).length === 0) {
      res.status(404).end();
    } else {
      res.status(200).json({
        ...user,
        id: req.params.id,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function createUser(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const userData = {
      ...req.body,
      created_at: new Date().toISOString(),
    };
    const user = await userModel.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function updateUser(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  try {
    const userData = {
      ...req.body,
      updated_at: new Date().toISOString(),
    };
    const updatedUser = await userModel.updateUser(req.params.id, userData);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function deleteUser(req, res) {
  try {
    await userModel.deleteUser(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getUsersVehicles(req, res) {
  try {
    const vehicles = await vehicleModel.getVehiclesByOwnerId(req.params.id);
    if (vehicles.length === 0) {
      res.status(404).end();
    } else {
      res.status(200).json(vehicles);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersVehicles,
};
