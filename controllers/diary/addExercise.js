const { Diary } = require("../../models/diary");
const { Exercise } = require("../../models/exercise");

const addExercise = async (req, res) => {
  const { _id: id_user } = req.user;

  const { date, exercise, time } = req.body;

  const findExercise = await Exercise.findById(exercise);

  if (!findExercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  const caloriesNorm = findExercise.burnedCalories;
  const timeNorm = findExercise.time;
  const burnedCalories = parseInt((caloriesNorm / timeNorm) * time, 10);

  let diaryDate = await Diary.findOne({ date, owner: id_user });

  if (!diaryDate) {
    const newNote = {
      date,
      timeSport: time,
      burnedCalories,

      doneExercises: [{ exercise, time, burnedCalories }],
      owner: id_user,
    };

    diaryDate = await Diary.create(newNote);
  } else {
    diaryDate = await Diary.findByIdAndUpdate(
      diaryDate._id,
      {
        $inc: { timeSport: time, burnedCalories: burnedCalories },
        $push: {
          doneExercises: {
            exercise,
            time,
            burnedCalories,
          },
        },
      },
      { new: true }
    );
  }

  res.json(diaryDate);
};

module.exports = addExercise;
