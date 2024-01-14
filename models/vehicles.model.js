const { db } = require("../firebase_setup/index");

async function getVehicle(id) {
  const vehicleSnap = await db.collection("vehicles").doc(id).get();
  return vehicleSnap.exists ? vehicleSnap.data() : {};
}

async function createVehicle(vehicleData) {
  try {
    const newVehicleRef = db.collection("vehicles").doc();
    await newVehicleRef.set(vehicleData);
    const newVehicle = await newVehicleRef.get();

    return { ...newVehicle.data(), id: newVehicleRef.id };
  } catch (e) {
    throw new Error('Error in vehicle creation');
  }
}

async function updateVehicle(id, vehicleData) {
  const updatedVehicleRef = db.collection("vehicles").doc(id);
  await updatedVehicleRef.set(vehicleData);
  const updatedVehicle = await updatedVehicleRef.get();

  return { ...updatedVehicle.data(), id: updatedVehicleRef.id };
}

async function deleteVehicle(id) {
  await db.collection("vehicles").doc(id).delete();
}

module.exports = {
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
