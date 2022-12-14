const express = require("express");
const notice = require("../controller/notice.controller.js");
const router = express.Router();

//POST
router.post("/addNotice", notice.createNotice);

//GET
router.get("/", notice.findAll);
router.get("/:id", notice.findById);
router.get("/product/:productId", notice.findByProduct);
router.get("/user/:userId", notice.findByUser);

//PUT
router.put("/updateNotice/:id", notice.updateNoticeById);

//DELETE
router.delete("/deleteNotice/:id", notice.deleteNoticeById);