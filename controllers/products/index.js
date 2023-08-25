const { CtrlWrapper } = require("../../helpers");
const getCategoryProducts = require("./getProductsCategory");
const getAdmissibleProduct = require("./getAdmissibleProducts");
module.exports = {
  getCategoryProducts: CtrlWrapper(getCategoryProducts),
  getAdmissibleProduct: CtrlWrapper(getAdmissibleProduct),
};
