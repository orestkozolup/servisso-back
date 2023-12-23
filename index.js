const express = require("express");
const bodyParser = require("body-parser");
const { CAR_FIELDS } = require("./cars/const");
const { validate } = require("./cars/validators");

const firebaseConfig = require('./firebase_init');
const { getFirestore, collection, getDocs, getDoc, doc, setDoc, addDoc, deleteDoc } = require('firebase/firestore/lite');

const { BRAND, MODEL, PRODUCTION_YEAR, OWNER_ID, ODOMETER } = CAR_FIELDS;

const app = express();
require("dotenv").config();

const apiPrefix = "/api/v1";

const mockCar = {
  BRAND: "Toyota",
  MODEL: "Land Cruiser 200",
  PRODUCTION_YEAR: 2018,
  OWNER_ID: "banda_zlodziej",
  ODOMETER: 176500,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = getFirestore(firebaseConfig);

async function getCar(id) {
  const snap = await getDoc(doc(db, 'cars', id))
  return snap.exists() ? snap.data() : {}
}

async function createCar(data) {
  const docRef = await addDoc(collection(db, "cars"), data);
  return {...(await getDoc(docRef)).data(), id: docRef.id};
}

async function deleteCar(id){
  await deleteDoc(doc(db, "cars", id));
}

async function getCars() {
  const carsCol = collection(db, 'cars');
  const carSnapshot = await getDocs(carsCol);
  const carList = carSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  return carList;
}

app.get("/", async (req, res) => {
  res.send("This is Servisso base API endpoint");
});

app.get(`${apiPrefix}/cars/:id`, async (req, res) => {
  const car = await getCar(req.params.id);

  res.status(200).json({
    ...car,
    id: req.params.id,
  });
});

app.post(`${apiPrefix}/cars`, async (req, res) => {
  const validationError = validate(req.body);
  const car = await createCar(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
  } else {
    res.status(201).json(car);
  }
});

app.put(`${apiPrefix}/cars/:id`, (req, res) => {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
  } else {
    res.status(200).json({
      ...req.body,
      id: req.params.id,
    });
  }
});

app.delete(`${apiPrefix}/cars/:id`, async (req, res) => {
  try {
    await deleteCar(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error })
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
