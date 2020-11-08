const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  chef: {
    type: String,
    required: true,
    trim: true,
  },
  recipe: {
    ingredients: [
      {
        ingredient: {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          measurement: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            requires: true,
            trim: true,
          },
        },
      },
    ],
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
