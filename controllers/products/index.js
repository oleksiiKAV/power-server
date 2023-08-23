const { CtrlWrapper } = require('../../helpers');
const getProducts = require('./');
//....

module.exports = {
  getProducts: CtrlWrapper(getProducts),
  //.....
};
