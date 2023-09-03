const { Diary, schemas } = require("../../models/diary");
const { HttpError } = require("../../helpers");

const removeExercise = async (req, res) => {
  const { _id: id_user } = req.user;

  const { date, exerciseId } = req.body;

  const validation = schemas.removeExerciseSchema.validate({
    date,
    exercise: exerciseId,
  });
  if (validation.error) {
    throw HttpError(400, validation.error.details[0].message);
  }

  let foundDiary = await Diary.findOne({ date, owner: id_user });

  if (!foundDiary) {
    throw HttpError(401, "No data found for this date");
  }

  const completedExercises = foundDiary.doneExercises.find(
    (doneExercise) => doneExercise._id.toString() === exerciseId
  );

  if (!completedExercises) {
    throw HttpError(401, "This exercise is not found");
  }
  const result = await Diary.findByIdAndUpdate(
    foundDiary._id,
    {
      $inc: {
        burnedCalories: -completedExercises.burnedCalories,
        timeSport: -completedExercises.time,
      },
      $pull: { doneExercises: { _id: completedExercises._id } },
    },
    { new: true }
  ).select("-createdAt -updatedAt");

  res.json(result);
};


module.exports = removeExercise;
