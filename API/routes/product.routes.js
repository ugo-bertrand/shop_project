const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller.js");

router.post("/addProduct", product.createProduct);
router.get("/", product.findAll);
router.put("/update/:id", product.updateById);
router.delete("/delete/:id", product.deleteById);

module.exports = router;