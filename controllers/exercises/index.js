const { CtrlWrapper } = require("../../helpers");

const getAllExercises = require("./getAllExercises");
const getBodyParts = require("./getBodyParts");
const getMuscles = require("./getMuscles");
const getEquipments = require("./getEquipments");

module.exports = {
  getAllExercises: CtrlWrapper(getAllExercises),
  getBodyParts: CtrlWrapper(getBodyParts),
  getMuscles: CtrlWrapper(getMuscles),
  getEquipments: CtrlWrapper(getEquipments),
};
