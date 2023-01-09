const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller.js");

router.post("/addUser", user.createUser);
router.get("/", user.findAll);
router.put("/update/:id", user.updateById);
router.delete("/delete/:id", user.deleteById);
router.post("/login", user.login);
router.get("/logout", user.logout);

module.exports = router;