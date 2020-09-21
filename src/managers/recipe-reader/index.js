const { createWorker } = require("tesseract.js");

const worker = createWorker({
  logger: (m) => console.log(m),
});

const readRecipeImage = async (image) => {
  try {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(image);
    const cleanedRecipe = text.substring(
      text.toLowerCase().indexOf("ingredients")
    );
    await worker.terminate();
    return cleanedRecipe;
  } catch (error) {
    console.log(error);
  }
};

module.exports = readRecipeImage;
