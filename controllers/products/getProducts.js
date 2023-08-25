const product = require("../../models/product");
const { Product } = require("../../models/product");
const getCategoryProducts = async (req, res) => {
  const result = await product.categoryProducts();
  res.status(200).json(result);
};

const getAdmissibleProduct = async (req, res) => {
  const userBloodType = req.user.blood;
  const allowedProducts = await Product.find();
  res.json(allowedProducts);
};

module.exports = { getCategoryProducts, getAdmissibleProduct };
