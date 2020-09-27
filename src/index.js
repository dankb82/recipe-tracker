const express = require("express");
require("./db/mongoose");
const readRecipeImage = require("./managers/recipe-reader");
const User = require("./models/user");
const Recipe = require("./models/recipe");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("", (req, res) => {
  res.send("This is the homepage");
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.send(recipes);
  } catch (err) {
    console.log(err);
  }
});

app.post("/users", async (req, res) => {
  if (req.body.name && typeof req.body.name !== "string") {
    return res.status(400).send("Name must be a string");
  }

  if (req.body.username && typeof req.body.username !== "string") {
    return res.status(400).send("Username must be a string");
  }

  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/recipes", async (req, res) => {
  try {
    // const recipeFromImage = await readRecipeImage(req.body.path);
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).send(recipe);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
