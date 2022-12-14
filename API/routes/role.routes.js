const express = require("express");
const role = require("../controller/role.controller.js");
const router = express.Router();

//POST
router.post("/addRole", role.createRole);

//GET
router.get("/", role.findAll);
router.get("/:roleId", role.findById);
router.get("/roleName/:roleName", role.findByRoleName);

//PUT
router.put("/updateRole/:roleId", role.updateRoleById);

//DELETE
router.delete("/deleteRole/:roleId", role.deleteById);