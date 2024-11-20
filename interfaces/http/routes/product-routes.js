const express = require("express");
const ProductController = require("../controllers/product-controller");

const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
// Rota para update, delete e getById.

module.exports = router;
