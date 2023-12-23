const express = require("express");
const bodyParser = require("body-parser");
const { CAR_FIELDS } = require("./cars/const");
const { validate } = require("./cars/validators");

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

app.get("/", (req, res) => {
  res.send("This is Servisso base API endpoint");
});

app.get(`${apiPrefix}/cars/:id`, (req, res) => {
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
