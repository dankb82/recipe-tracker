const express = require("express");
require("./db/mongoose");
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("", (req, res) => {
  res.send("This is the homepage");
});

app.get("/colleen", (req, res) => {
  res.send("This is colleen's page");
});

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
