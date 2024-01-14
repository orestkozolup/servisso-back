const { db } = require("../firebase_setup/index");

async function getUser(id) {
  const userSnap = await db.collection("users").doc(id).get();
  return userSnap.exists ? userSnap.data() : {};
}

async function createUser(userData) {
  await db.collection("users").doc(userData.id).set(userData);
  const newUserSnap = await db.collection("users").doc(userData.id).get();

  return newUserSnap.exists ? newUserSnap.data() : {};
}

async function updateUser(id, userData) {
  const updatedUserRef = db.collection("users").doc(id);
  await updatedUserRef.set(userData);
  const updatedUser = await updatedUserRef.get();

  return { ...updatedUser.data(), id: updatedUserRef.id };
}

async function deleteUser(id) {
  await db.collection("users").doc(id).delete();
}

async function assignVehicleToUser(vehicleId, userId) {
  try {
    const userSnap = await db.collection("users").doc(userId).get();

    if (!userSnap.exists) {
      throw new Error(`User ${userId} not found`);
    }
    const user = userSnap.data();

    const userWithNewVehicle = {
      ...user,
      vehicleIdList: [...user.vehicleIdList, vehicleId],
    };

    await db.collection("users").doc(userId).set(userWithNewVehicle);
  } catch (e) {
    return new Error(`Error while assigning vehicle`);
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  assignVehicleToUser,
};
