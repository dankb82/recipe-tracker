const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

router.post("/users", async (req, res) => {
  if (req.body.name && typeof req.body.name !== "string") {
    return res.status(400).send("Name must be a string");
  }

  if (req.body.username && typeof req.body.username !== "string") {
    return res.status(400).send("Username must be a string");
  }

  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const username = req.body.username || req.body.email;
    const user = await User.findByCredentials(username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/users/profile", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid update!" });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
