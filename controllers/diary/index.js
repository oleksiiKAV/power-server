const { CtrlWrapper } = require("../../helpers");

const addProduct = require("./addProduct");
const removeProduct = require("./removeProduct");
const getDailyData = require("./getDailyData");

const addExercise = require("./addExercise");
const removeExercise = require("./removeExercise");
const deleteDailyData = require("./deleteDailyData");
 
module.exports = {
  addProduct: CtrlWrapper(addProduct),
  removeProduct: CtrlWrapper(removeProduct),
  addExercise: CtrlWrapper(addExercise),

  removeExercise: CtrlWrapper(removeExercise),
  getDailyData: CtrlWrapper(getDailyData),

  deleteDailyData: CtrlWrapper(deleteDailyData),
};
