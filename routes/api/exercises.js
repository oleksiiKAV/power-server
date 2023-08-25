const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/exercises");
const { authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAllExercises);

router.get("/bodyparts", authenticate, ctrl.getBodyParts);

router.get("/muscles", authenticate, ctrl.getMuscles);

router.get("/equipments", authenticate, ctrl.getEquipments);

module.exports = router;
