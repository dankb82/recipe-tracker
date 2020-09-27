const mongoose = require("mongoose");

const Recipe = mongoose.model("Recipe", {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  recipe: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Recipe;
