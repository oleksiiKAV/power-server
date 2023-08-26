const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/products");
const { authenticate } = require("../../middlewares");
const { schemas } = require("../../models/product");

router.get("/", authenticate, ctrl.getCategoryProducts);

router.get("/admissible", authenticate, ctrl.getAdmissibleProduct);

module.exports = router;
