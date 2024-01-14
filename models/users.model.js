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

async function getUsersVehicles() {
  const citiesRef = db.collection('cities');
const snapshot = await citiesRef.where('capital', '==', true).get();
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
