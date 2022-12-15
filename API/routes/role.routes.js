const express = require("express");
const router = express.Router();
const role = require("../controllers/role.controller.js");


router.post("/addRole", role.createRole);

router.get("/", role.findAll);


module.exports = router;