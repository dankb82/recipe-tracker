const express = require("express");
const axios = require("axios");

const app = express();

app.get("", (req, res) => {
  res.send("This is the homepage");
});

app.get("/colleen", (req, res) => {
  res.send("This is colleen's page");
});

app.listen(3000, () => {
  console.log("recipe tracker is running on port 3000");
});
