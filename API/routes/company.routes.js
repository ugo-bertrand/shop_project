const express = require("express");
const company = require("../controller/company.controller.js");
const router = express.Router();

//POST
router.post("/addCompany", company.createCompany);

//GET
router.get("/", company.findAll);
router.get("/:companyId", company.findById);
router.get("/name/:companyName", company.findByName);
router.get("/place/:place", company.findByPlace);
router.get("/email/:email", company.findByEmail);

//PUT

router.put("/updateCompany/:id", company.updateCompanyById);

//DELETE
router.delete("/deleteCompany/:companyId", company.deleteById);