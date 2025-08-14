const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  gender: { type: String, required: true },
});

module.exports = mongoose.model("Slot", slotSchema);