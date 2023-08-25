const bodyParts = require("../../data/bodyparts.json");

const getBodyParts = async (req, res) => {
  res.json(bodyParts);
};

module.exports = getBodyParts;
