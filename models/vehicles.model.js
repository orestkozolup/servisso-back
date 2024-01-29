const { db } = require("../firebase_setup/index");
const { VEHICLES_COLLECTION, VEHICLE_FIELDS } = require("../const/vehicles");

async function getVehicle(id) {
  const vehicleSnap = await db.collection(VEHICLES_COLLECTION).doc(id).get();
  return vehicleSnap.exists ? vehicleSnap.data() : {};
}

async function createVehicle(vehicleData) {
  try {
    const newVehicleRef = db.collection(VEHICLES_COLLECTION).doc();
    await newVehicleRef.set(vehicleData);
    const newVehicle = await newVehicleRef.get();

    return { ...newVehicle.data(), id: newVehicleRef.id };
  } catch (e) {
    throw new Error("Error in vehicle creation");
  }
}

async function updateVehicle(id, vehicleData) {
  const updatedVehicleRef = db.collection(VEHICLES_COLLECTION).doc(id);
  await updatedVehicleRef.set(vehicleData);
  const updatedVehicle = await updatedVehicleRef.get();

  return { ...updatedVehicle.data(), id: updatedVehicleRef.id };
}

async function deleteVehicle(id) {
  await db.collection(VEHICLES_COLLECTION).doc(id).delete();
}

async function getVehiclesByOwnerId(ownerId) {
  const vehicles = [];
  const snapshot = await db
    .collection(VEHICLES_COLLECTION)
    .where(VEHICLE_FIELDS.OWNER_ID, "==", ownerId)
    .get();
  snapshot.forEach((doc) => {
    if (!snapshot.empty) {
      vehicles.push({ id: doc.id, ...doc.data() });
    }
  });

  return vehicles;
}

module.exports = {
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehiclesByOwnerId,
};
