const express = require("express");
const router = express.Router();
const company = require("../controllers/company.controller.js");

router.post("/addCompany", company.createCompany);
router.get("/", company.findAll);
router.put("/update/:id", company.updateById);
router.delete("/delete/:id", company.deleteById);

module.exports = router;