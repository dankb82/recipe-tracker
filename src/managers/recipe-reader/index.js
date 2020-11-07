const { createWorker } = require("tesseract.js");

const readRecipeImage = async (image) => {
  const worker = createWorker({
    logger: (m) => console.log(m),
  });

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
  } catch (e) {
    console.log(e);
  }
};

module.exports = readRecipeImage;
