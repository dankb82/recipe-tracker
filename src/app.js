const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("Welcome to recipe tracker");
});

app.listen(3000, () => {
  console.log("recipe tracker is running on port 3000");
});
