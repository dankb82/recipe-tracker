const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("Welcome to recipe tracker. Raw turkey is disgusting");
});

app.get("/colleen", (req, res) => {
  res.send("This is colleen's page");
});

app.listen(3000, () => {
  console.log("recipe tracker is running on port 3000");
});
