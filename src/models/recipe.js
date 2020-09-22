const mongoose = require("mongoose");

const Recipe = mongoose.model("Recipe", {
  recipe: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Recipe;
