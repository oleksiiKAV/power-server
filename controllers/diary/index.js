const { CtrlWrapper } = require("../../helpers");

const addProduct = require("./addProduct");
const removeProduct = require("./removeProduct");

const addExercise = require("./addExercise");
const removeExercise = require("./removeExercise");

module.exports = {
  addProduct: CtrlWrapper(addProduct),
  removeProduct: CtrlWrapper(removeProduct),
  addExercise: CtrlWrapper(addExercise),
  removeExercise: CtrlWrapper(removeExercise),
};
