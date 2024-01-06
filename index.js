const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const carsRouter = require("./routes/cars/cars.router");

// Setup
const app = express();
const apiPrefix = "/api/v1";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.get("/", async (req, res) => {
  res.send("This is Servisso base API endpoint");
});
app.use(`${apiPrefix}/cars`, carsRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
