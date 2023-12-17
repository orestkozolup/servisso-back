const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.get("/first-api", (req, res) => {
  res.send("Jebac pis");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
