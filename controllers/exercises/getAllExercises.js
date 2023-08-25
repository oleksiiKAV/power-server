const Exercise = require("../../models/exercise");

const getAllExercises = async (req, res) => {
  const { bodypart, muscles, equipment } = req.query;

  const query = {};
  bodypart && (query.bodyPart = bodypart);
  equipment && (query.equipment = equipment);
  muscles && (query.target = muscles);

  const exercises = await Exercise.find(query);
  res.json(exercises);
};

module.exports = getAllExercises;
