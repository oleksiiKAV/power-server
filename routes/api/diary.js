const express = require("express");

const ctrl = require("../../controllers/diary");

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/diary");

const router = express.Router();

router.use(authenticate);

router.post(
  "/product/add",
  validateBody(schemas.addProductSchema),
  ctrl.addProduct
);

router.post(
  "/exercise/add",
  validateBody(schemas.addExerciseSchema),
  ctrl.addExercise
);

module.exports = router;
