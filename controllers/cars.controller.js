const {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
} = require("firebase/firestore/lite");
const db = require("../firebase_init");
const { validate } = require("../cars/validators");

async function getCar(req, res) {
  const id = req.params.id;
  const carSnap = await getDoc(doc(db, "cars", id));
  const car = carSnap.exists() ? carSnap.data() : {};

  res.status(200).json({
    ...car,
    id,
  });
}

async function createCar(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const carRef = await addDoc(collection(db, "cars"), req.body);
  const car = { ...(await getDoc(carRef)).data(), id: carRef.id };

  res.status(201).json(car);
}

async function updateCar(req, res) {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const carRef = doc(db, "cars", req.params.id);
  await setDoc(carRef, req.body);
  const updatedCar = { ...(await getDoc(carRef)).data(), id: carRef.id };

  res.status(200).json(updatedCar);
}

async function deleteCar(req, res) {
  try {
    await deleteDoc(doc(db, "cars", req.params.id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
