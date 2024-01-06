const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const {
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require("./controllers/cars.controller");

const app = express();

const apiPrefix = "/api/v1";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("This is Servisso base API endpoint");
});

app.get(`${apiPrefix}/cars/:id`, getCar);
app.post(`${apiPrefix}/cars`, createCar);
app.put(`${apiPrefix}/cars/:id`, updateCar);
app.delete(`${apiPrefix}/cars/:id`, deleteCar);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
