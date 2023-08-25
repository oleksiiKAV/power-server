const { CtrlWrapper } = require("../../helpers");
const { getCategoryProducts, getAdmissibleProduct } = require("./getProducts");
//....

module.exports = {
  getCategoryProducts: CtrlWrapper(getCategoryProducts),
  getAdmissibleProduct: CtrlWrapper(getAdmissibleProduct),
  //.....
};
