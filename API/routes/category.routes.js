const express = require("express");
const router = express.Router();
const category = require("../controllers/category.controller.js");

router.post("/addCategory", category.createCategory);

router.get("/", category.findAll);

router.put("/update/:id",category.updateById);

router.delete("/delete/:id", category.deleteById);

module.exports = router;