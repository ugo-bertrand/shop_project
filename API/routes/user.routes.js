const express = require("express");
const user = require("../controller/user.controller.js");
const router = express.Router();

//POST
router.post("/addUser", user.createUser);

//GET
router.get("/", user.findAll);
router.get("/:id", user.findById);
router.get("/roleName/:roleName", user.findByRoleName);
router.get("/email/:email", user.findByEmail);
router.get("/name/:name", user.findByName);

//PUT
router.put("/updateUser/:userId", user.updateUserById);

//DELETE
router.delete("/deleteUser/:userId", user.deleteById);

//LOGIN
router.post("/login", user.login);
router.get("/logout", user.logout);