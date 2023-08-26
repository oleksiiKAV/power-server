const { Diary } = require("../../models/diary");
const { Product } = require("../../models/product");

const addProduct = async (req, res) => {
  const { _id: id_user } = req.user;

  const { date, amount, productId } = req.body;

  const product = await Product.findById(productId);

  const calories = product.calories;

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let diaryDate = await Diary.findOne({ date, owner: id_user });

  const intAmount = parseInt(req.body.amount, 10);

  if (!diaryDate) {
    const newNote = {
      date,
      consumedCalories: (calories * intAmount) / 100,
      consumedProducts: [
        { _id: productId, amount, calories: (calories * intAmount) / 100 },
      ],
      owner: id_user,
    };

    diaryDate = await Diary.create(newNote);
  } else {
    diaryDate = await Diary.findByIdAndUpdate(
      diaryDate._id,
      {
        $inc: { consumedCalories: +((calories * intAmount) / 100) },
        $push: {
          consumedProducts: {
            _id: productId,
            amount,
            calories: (calories * intAmount) / 100,
          },
        },
      },
      { new: true }
    );
  }

  res.json(diaryDate);
};

module.exports = addProduct;
