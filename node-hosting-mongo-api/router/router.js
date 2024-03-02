const express = require("express");
const router = express.Router();
const { createPaymentEntry, fetchCallBackEntry, deleteByToken } = require("../controller/paymentController");

router.post("/callbackEntry", createPaymentEntry);
router.get("/fetch/:id", fetchCallBackEntry);
router.delete("/remove/:id", deleteByToken)

module.exports = router;
