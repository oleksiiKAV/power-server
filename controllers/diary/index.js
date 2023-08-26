const { CtrlWrapper } = require("../../helpers");

const addProduct = require("./addProduct");
const removeProduct = require("./removeProduct");

const addExercise = require("./addExercise");

module.exports = {
  addProduct: CtrlWrapper(addProduct),
  removeProduct: CtrlWrapper(removeProduct),
  addExercise: CtrlWrapper(addExercise),
};
