const express = require("express");
const bodyParser = require("body-parser");
const { CAR_FIELDS } = require("./cars/const");
const { validate } = require("./cars/validators");

const firebaseConfig = require('./firebase_init');
const { getFirestore, collection, getDocs, getDoc, doc } = require('firebase/firestore/lite');

const { BRAND, MODEL, PRODUCTION_YEAR, OWNER_ID, ODOMETER } = CAR_FIELDS;

const app = express();
require("dotenv").config();

const apiPrefix = "/api/v1";

const mockCar = {
  BRAND: "Volkswagen",
  MODEL: "Golf",
  PRODUCTION_YEAR: 2008,
  OWNER_ID: 223500,
  ODOMETER: "zajebisty_kierowca",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const db = getFirestore(firebaseConfig);

async function getCar(id) {
  const snap = await getDoc(doc(db, 'cars', id))
  return snap.exists() ? snap.data() : {}
}

// async function getCars() {
//   const carsCol = collection(db, 'cars');
//   const carSnapshot = await getDocs(carsCol);
//   const carList = carSnapshot.docs.map(doc => doc.data());
//   return carList;
// }

app.get("/", (req, res) => {
  res.send("This is Servisso base API endpoint");
});

app.get(`${apiPrefix}/cars/:id`, async (req, res) => {
  const car = await getCar(req.params.id);

  res.status(200).json({
    ...mockCar,
    id: req.params.id,
  });
});

app.post(`${apiPrefix}/cars`, (req, res) => {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
  } else {
    res.status(201).json({
      ...req.body,
      id: "newly_created_car",
    });
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

app.delete(`${apiPrefix}/cars/:id`, (req, res) => {
  res.status(204).end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
