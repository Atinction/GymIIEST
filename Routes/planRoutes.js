const express = require("express");
const router = express.Router();
const { savePlan } = require("../Controllers/planController");

router.post("/save-plan", savePlan);

module.exports = router;