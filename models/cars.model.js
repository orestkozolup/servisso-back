const {
  collection,
  getDoc,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} = require("firebase/firestore/lite");
const db = require("../firebase_init");

async function getCar(id) {
  const carSnap = await getDoc(doc(db, "cars", id));
  return carSnap.exists() ? carSnap.data() : {};
}

async function createCar(carData) {
  const carRef = await addDoc(collection(db, "cars"), carData);
  return { ...(await getDoc(carRef)).data(), id: carRef.id };
}

async function updateCar(id, carData) {
  const carRef = doc(db, "cars", id);
  await setDoc(carRef, carData);
  return { ...(await getDoc(carRef)).data(), id: carRef.id };
}

async function deleteCar(id) {
  await deleteDoc(doc(db, "cars", id));
}

module.exports = {
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
