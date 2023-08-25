const { Diary } = require("../../models/diary");

const addProduct = async (req, res) => {
  const { _id: id_user } = req.user;
  console.log("id_user :>> ", id_user);

  console.log("req.body :>> ", req.body);

  const { date, amount, productId, calories } = req.body;

  try {
    let diaryDate = await Diary.findOne({ date, owner: id_user });

    console.log("diaryDate :>> ", diaryDate);
    if (!diaryDate) {
      const newNote = {
        date,
        consumedCalories: calories,

        consumedProducts: [{ _id: productId, amount }],
        owner: id_user,
      };

      diaryDate = await Diary.create(newNote);
    } else {
      diaryDate.consumedCalories += calories;

      diaryDate.consumedProducts.push({ _id: productId, amount });
      console.log("diaryDate2 :>> ", diaryDate);
      await diaryDate.save();
    }

    res.json(diaryDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addProduct;
