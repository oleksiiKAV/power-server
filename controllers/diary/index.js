const { CtrlWrapper } = require("../../helpers");
const addProduct = require("./addProduct");
//.....

module.exports = {
  addProduct: CtrlWrapper(addProduct),
  //.....
};
