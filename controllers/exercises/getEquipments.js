const path = require("path");

const getEquipments = async (req, res) => {
  const filePath = path.join(__dirname, "../../data/equipments.json");
  res.sendFile(filePath);
};

module.exports = getEquipments;
