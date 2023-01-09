const express = require("express");
const router = express.Router();
const notice = require("../controllers/notice.controller.js");

router.post("/addNotice", notice.createNotice);
router.get("/", notice.findAll);
router.put("/update/:id", notice.updateById);
router.delete("/delete/:id", notice.deleteById);

module.exports = router;