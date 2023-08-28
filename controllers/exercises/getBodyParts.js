const path = require("path");
const fs = require("fs/promises");
const bodyPartsPath = path.join(__dirname, "../../data/bodyparts.json");

const getBodyParts = async (req, res) => {
  const bodyParts = await fs.readFile(bodyPartsPath);
  res.json(JSON.parse(bodyParts));
};

module.exports = getBodyParts;
