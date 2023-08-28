const { Diary } = require("../../models/diary");
const { HttpError } = require("../../helpers");

const removeExercise = async (req, res) => {
  const { _id: id_user } = req.user;

  const { date, exerciseId } = req.body;

  let foundDiary = await Diary.findOne({ date, owner: id_user });

  if (!foundDiary) {
    throw new HttpError(401, "No data found for this date");
  }

  const completedExercises = foundDiary.doneExercises.find(
    (exercise) => exercise._id.toString() === exerciseId
  );

  if (!completedExercises) {
    throw new HttpError(401, "This exercise is not found");
  }

  const result = await Diary.findByIdAndUpdate(
    foundDiary._id,
    {
      $inc: { burnedCalories: -completedExercises.calories },
      $inc: { timeSport: -completedExercises.time },
      $pull: { doneExercises: { _id: exerciseId } },
    },
    { new: true }
  ).select("-createdAt -updatedAt");

  res.json(result);
};

module.exports = removeExercise;
