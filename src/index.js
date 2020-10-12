const express = require("express");
require("./db/mongoose");
const readRecipeImage = require("./managers/recipe-reader");
const userRouter = require("./routers/user");
const recipeRouter = require("./routers/recipe");
const homeRouter = require("./routers/home");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(recipeRouter);
app.use(homeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
