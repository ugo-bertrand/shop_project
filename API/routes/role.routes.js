const express = require("express");
const router = express.Router();
const role = require("../controllers/role.controller.js");


router.post("/addRole", role.createRole);

router.get("/", role.findAll);

router.get("/name/:name", role.findByRoleName);

router.put("/update/:id", role.updateById);

router.delete("/delete/:id", role.deleteById);

module.exports = router;