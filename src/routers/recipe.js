const express = require("express");
const router = new express.Router();
const Recipe = require("../models/recipe");

router.post("/recipes", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.send(recipes);
  } catch (err) {
    console.log(err);
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      console.log("the if");
      return res.status(404).send({ error: "Recipe not found" });
    }

    res.send(recipe);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/recipes/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["recipe", "title"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid update!" });
    }

    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!recipe) {
      return res.status(404).send();
    }

    res.send(recipe);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }

    res.send(recipe);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
