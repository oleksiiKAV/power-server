const { CtrlWrapper } = require('../../helpers');
const addEatenProduct = require('./');
//.....

module.exports = {
  addEatenProduct: CtrlWrapper(addEatenProduct),
  //.....
};
