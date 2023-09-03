const { Product } = require("../../models/product");
const { User } = require("../../models/user");

const getAdmissibleProduct = async (req, res) => {
  const { _id } = req.user;
  let { page = 1, limit = 20, filter, category } = req.query;
  const skip = (page - 1) * limit;

  const currentUser = await User.findById(_id).select("bodyData.blood");
  if (!currentUser || !currentUser.bodyData) {
    return res.status(404).json({ error: "User or bodyData not found" });
  }

  const userBloodType = currentUser.bodyData.blood;
  if (filter === "true") {
    filter = { [`groupBloodNotAllowed.${userBloodType}`]: true };
  } else if (filter === "false") {
    filter = { [`groupBloodNotAllowed.${userBloodType}`]: false };
  }

  if (category) {
    filter = { ...filter, category: category };
  }

  const allowedProducts = await Product.find(filter, "", { skip, limit });
  res.status(200).json(allowedProducts);
};

module.exports = getAdmissibleProduct;
