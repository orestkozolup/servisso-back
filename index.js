const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const vehiclesRouter = require("./routes/vehicles/vehicles.router");
const usersRouter = require("./routes/users/users.router");

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
app.use(`${apiPrefix}/vehicles`, vehiclesRouter);
app.use(`${apiPrefix}/users`, usersRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
