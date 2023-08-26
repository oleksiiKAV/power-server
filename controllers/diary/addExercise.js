const { Diary } = require("../../models/diary");

const addExercise = async (req, res) => {
  const { _id: id_user } = req.user;
  console.log("id_user :>> ", id_user);

  console.log("req.body :>> ", req.body);

  const { date, exerciseId, time, calories } = req.body;

  try {
    let diaryDate = await Diary.findOne({ date, owner: id_user });

    console.log("diaryDate :>> ", diaryDate);
    if (!diaryDate) {
      const newNote = {
        date,
        burnedCalories: calories,

        doneExercises: [{ _id: exerciseId, time }],
        owner: id_user,
      };

      diaryDate = await Diary.create(newNote);
    } else {
      diaryDate.burnedCalories += calories;

      diaryDate.doneExercises.push({ _id: exerciseId, time });
      console.log("diaryDate2 :>> ", diaryDate);
      await diaryDate.save();
    }

    res.json(diaryDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addExercise;
