const { Diary } = require("../../models/diary");
const { HttpError, dateRegexp } = require("../../helpers");
const { Product } = require("../../models/product");

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
      if (product._id) {
        const fullProduct = await Product.findById(product._id).lean();
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
  data = {
    ...data,
    consumedProducts: consumedProducts,
  };
  res.json(data);
};

module.exports = getDailyData;
