const Exercise = require("../../models/exercise");

const getAllExercises = async (req, res) => {
  const exercises = await Exercise.find();
  if (!exercises) {
    throw HttpError(404, "Not found");
  }
  res.json(exercises);
};

module.exports = getAllExercises;
