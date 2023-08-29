const { Diary } = require("../../models/diary");
const { HttpError, dateRegexp } = require("../../helpers");
const { Product } = require("../../models/product");
const { Exercise } = require("../../models/exercise");

const getDailyData = async (req, res, next) => {
  const { _id } = req.user;
  const { date } = req.params;

  if (!dateRegexp.test(date)) {
    throw HttpError(400, "Date invalid");
  }

  let data = await Diary.findOne({ date, owner: _id })
    .populate({
      path: "owner",
      select:
        "bodyData consumedCalories burnedCalories timeSport doneExersices",
    })
    .select("-createdAt -updatedAt")
    .lean();

  const consumedProducts = await Promise.all(
    data.consumedProducts.map(async (product) => {
      if (product.product) {
        const fullProduct = await Product.findById(product.product).lean();
        if (fullProduct) {
          return {
            ...product,
            product: fullProduct,
          };
        }
      }
      return product;
    })
  );

  const doneExercises = await Promise.all(
    data.doneExercises.map(async (exercise) => {
      if (exercise._id) {
        const fullExercise = await Exercise.findById(exercise._id).lean();
        if (fullExercise) {
          return {
            ...exercise,
            exercise: fullExercise,
          };
        }
      }
      return exercise;
    })
  );

  data = {
    ...data,
    consumedProducts: consumedProducts,
    doneExercises: doneExercises,
  };
  res.json(data);
};

module.exports = getDailyData;
