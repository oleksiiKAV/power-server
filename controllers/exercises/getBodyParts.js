const path = require("path");

const getBodyParts = async (req, res) => {
  const filePath = path.join(__dirname, "../../data/bodyparts.json");
  res.sendFile(filePath);
};

module.exports = getBodyParts;
