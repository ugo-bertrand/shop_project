const express = require("express");
const product = require("../controller/product.controller.js");
const router = express.Router();

//POST
router.post("/addProduct", product.createProduct);

//GET
router.get("/", product.findAll);
router.get("/:id", product.findById);
router.get("/productName/:name", product.findByName);
router.get("/price/:price", product.findByPrice);
router.get("/company/:companyName", product.findByCompany);
router.get("/category/:categoryName", product.findByCategory);

//PUT
router.put("/updateProduct/:productId", product.updateProductById);

//DELETE
router.delete("/deleteProduct/:productId", product.deleteProductById);