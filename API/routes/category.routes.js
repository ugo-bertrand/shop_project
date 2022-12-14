const express = require("express");
const category = require("../controller/category.controller.js");
const router = express.Router();

//POST
router.post("/addCategory", category.createCategory);

//POST
router.get("/", category.findAll);
router.get("/:categoryId", category.findById);
router.get("/category/:categoryName", category.findByCategoryName);

//PUT
router.put("/updateCategory/:categoryId", category.updateCategoryById);

//DELETE
router.delete("/deleteCategory/:categoryId", category.deleteById);
