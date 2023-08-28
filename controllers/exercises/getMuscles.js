const path = require("path");
const fs = require("fs/promises");
const musclesPath = path.join(__dirname, "../../data/muscles.json");

const getMuscles = async (req, res) => {
  const muscles = await fs.readFile(musclesPath);
  res.json(JSON.parse(muscles));
};

module.exports = getMuscles;
