const path = require("path");
const fs = require("fs/promises");
const equipmentsPath = path.join(__dirname, "../../data/equipments.json");

const getEquipments = async (req, res) => {
  const equipments = await fs.readFile(equipmentsPath);
  res.json(JSON.parse(equipments));
};

module.exports = getEquipments;
