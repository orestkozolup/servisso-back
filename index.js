const express = require("express");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

const apiPrefix = "/api/v1";

const mockCar = {
  brand: "Volkswagen",
  model: "Golf",
  prod_year: 2008,
  odometer: 223500,
  owner_id: "zajebisty_kierowca",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Jebac pis");
});

app.get(`${apiPrefix}/cars/:id`, (req, res) => {
  res.status(200).json({
    ...mockCar,
    car_id: req.params.id,
  });
});

app.post(`${apiPrefix}/cars`, (req, res) => {
  res.status(201).json({
    ...req.body,
    car_id: "newly_created_car",
  });
});

app.put(`${apiPrefix}/cars/:id`, (req, res) => {
  res.status(200).json({
    ...req.body,
    car_id: req.params.id,
  });
});

app.delete(`${apiPrefix}/cars/:id`, (req, res) => {
  res.status(204).end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
