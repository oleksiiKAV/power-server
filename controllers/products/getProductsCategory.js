const fs = require("fs/promises");
const path = require("path");
const productsPath = path.join(
  __dirname,
  "../../data",
  "productsCategories.json"
);

const getCategories = async (req, res) => {
  const categories = await fs.readFile(productsPath);
  res.json(JSON.parse(categories));
};

module.exports = getCategories;
