const { Diary } = require("../../models/diary");
const { HttpError } = require("../../helpers");

const removeProduct = async (req, res) => {
  const { _id: id_user } = req.user;
  const { date, productId } = req.body;

  let foundDiary = await Diary.findOne({ date, owner: id_user });

  if (!foundDiary) {
    throw HttpError(401, "No data found for this date");
  }

  const eatenProduct = foundDiary.consumedProducts.find((consumedProduct) => {
    return consumedProduct._id.toString() === productId;
  });

  console.log("date>>", date);
  console.log("productId>>", productId);

  if (!eatenProduct) {
    throw HttpError(401, "This product not found");
  }

  const result = await Diary.findByIdAndUpdate(
    foundDiary._id,
    {
      $inc: { consumedCalories: -eatenProduct.calories },
      $pull: { consumedProducts: { _id: eatenProduct._id } },
    },
    { new: true }
  ).select("-createdAt -updatedAt");

  res.json(result);
};

module.exports = removeProduct;
