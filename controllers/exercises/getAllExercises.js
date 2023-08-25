const Exercise = require("../../models/exercise");

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find().lean();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getAllExercises;
