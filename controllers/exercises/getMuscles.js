const muscles = require("../../data/muscles.json");

const getMuscles = async (req, res) => {
  res.json(muscles);
};

module.exports = getMuscles;
