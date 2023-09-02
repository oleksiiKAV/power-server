const { Diary } = require("../../models/diary");
const { HttpError, dateRegexp } = require("../../helpers");

const getDailyData = async (req, res, next) => {
  const { _id } = req.user;
  const { date } = req.params;

  if (!dateRegexp.test(date)) {
    throw HttpError(400, "Date invalid");
  }

  let data = await Diary.findOne({ date, owner: _id })
    .populate({
      path: "owner",
    })
    .populate({
      path: "consumedProducts.product",
      model: "product",
    })
    .populate({
      path: "doneExercises.exercise",
      model: "exercise",
    });

  res.json(data);
};

module.exports = getDailyData;
