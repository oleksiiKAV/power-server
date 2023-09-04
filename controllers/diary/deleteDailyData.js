const { Diary } = require("../../models/diary");
const { HttpError, dateRegexp } = require("../../helpers");

const deleteDailyData = async (req, res, next) => {
  const { _id } = req.user;
  const { date } = req.params;

  if (!dateRegexp.test(date)) {
    throw HttpError(400, "Date invalid");
  }
  try {
    const diaryEntry = await Diary.findOne({ date, owner: _id });
    if (!diaryEntry) {
      throw HttpError(404, "Daily data not found");
    }
    await diaryEntry.remove();

    res.json({ message: "Daily data deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteDailyData;
