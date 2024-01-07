const { db } = require("../firebase_setup/index");

async function getCar(id) {
  const carSnap = await db.collection("cars").doc(id).get();
  return carSnap.exists ? carSnap.data() : {};
}

async function createCar(carData) {
  const newCarRef = db.collection("cars").doc();
  await newCarRef.set(carData);
  const newCar = await newCarRef.get();

  return { ...newCar.data(), id: newCarRef.id };
}

async function updateCar(id, carData) {
  const updatedCarRef = db.collection("cars").doc(id);
  await updatedCarRef.set(carData);
  const updatedCar = await updatedCarRef.get();

  return { ...updatedCar.data(), id: updatedCarRef.id };
}

async function deleteCar(id) {
  await db.collection("cars").doc(id).delete();
}

module.exports = {
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
