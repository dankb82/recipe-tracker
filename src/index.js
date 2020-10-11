const express = require("express");
require("./db/mongoose");
const readRecipeImage = require("./managers/recipe-reader");
const userRouter = require("./routers/user");
const Recipe = require("./models/recipe");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
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

app.get("/recipes/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      title: req.params.title,
    }).exec();
    res.send(recipe);
  } catch (err) {
    console.log(err);
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
