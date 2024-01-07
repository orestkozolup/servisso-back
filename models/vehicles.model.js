const { db } = require("../firebase_setup/index");

async function getVehicle(id) {
  const carSnap = await db.collection("cars").doc(id).get();
  return carSnap.exists ? carSnap.data() : {};
}

async function createVehicle(carData) {
  const newCarRef = db.collection("cars").doc();
  await newCarRef.set(carData);
  const newCar = await newCarRef.get();

  return { ...newCar.data(), id: newCarRef.id };
}

async function updateVehicle(id, carData) {
  const updatedCarRef = db.collection("cars").doc(id);
  await updatedCarRef.set(carData);
  const updatedCar = await updatedCarRef.get();

  return { ...updatedCar.data(), id: updatedCarRef.id };
}

async function deleteVehicle(id) {
  await db.collection("cars").doc(id).delete();
}

module.exports = {
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
