const express = require("express");
const bodyParser = require("body-parser");
const { CAR_FIELDS } = require("./cars/const");
const { validate } = require("./cars/validators");

require("dotenv").config();

const {
  getCar,
  createCar,
  deleteCar,
  updateCar,
} = require("./cars/db_controllers");

const { BRAND, MODEL, PRODUCTION_YEAR, OWNER_ID, ODOMETER } = CAR_FIELDS;

const app = express();

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

app.put(`${apiPrefix}/cars/:id`, async (req, res) => {
  const validationError = validate(req.body);

  if (validationError) {
    res.status(400).json({ error: validationError });
  } else {
    const updatedCar = await updateCar(req.params.id, req.body);
    res.status(200).json(updatedCar);
  }
});

app.delete(`${apiPrefix}/cars/:id`, async (req, res) => {
  try {
    await deleteCar(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
