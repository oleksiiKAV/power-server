const { CtrlWrapper } = require("../../helpers");
const addProduct = require("./addProduct");
const removeProduct = require("./removeProduct");

module.exports = {
  addProduct: CtrlWrapper(addProduct),
  removeProduct: CtrlWrapper(removeProduct),
};
