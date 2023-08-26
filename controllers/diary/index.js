const { CtrlWrapper } = require("../../helpers");
const addProduct = require("./addProduct");
const addExercise = require("./addExercise");
//.....

module.exports = {
  addProduct: CtrlWrapper(addProduct),
  addExercise: CtrlWrapper(addExercise),
  //.....
};
