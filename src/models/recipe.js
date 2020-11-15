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
          trim: true,
        },
      },
    ],
    directions: [
      {
        step: {
          instruction: {
            type: String,
          },
          ingredientMapping: {
            type: String,
          },
        },
      },
    ],
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
