const express = require("express");
const router = new express.Router();

router.get("/", async (req, res) => {
  res.send("Welcome to your recipe tracker");
});

module.exports = router;
