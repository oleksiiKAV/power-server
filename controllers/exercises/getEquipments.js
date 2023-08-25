const equipments = require("../../data/equipments.json");

const getEquipments = async (req, res) => {
  res.json(equipments);
};

module.exports = getEquipments;
