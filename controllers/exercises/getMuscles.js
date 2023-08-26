const path = require("path");

const getMuscles = async (req, res) => {
  const filePath = path.join(__dirname, "../../data/muscles.json");
  res.sendFile(filePath);
};

module.exports = getMuscles;
