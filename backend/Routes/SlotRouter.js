const express = require("express");
const router = express.Router();
const SlotController = require("../Controllers/SlotControllers");

router.post("/book-slot", SlotController.bookSlot);
router.get("/my-slots/:userId", SlotController.getUserSlots);
router.get("/check-status/:userId", SlotController.checkActiveStatus);

module.exports = router;
