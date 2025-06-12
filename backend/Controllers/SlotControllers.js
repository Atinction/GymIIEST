const Slot = require("../Models/Slot");

exports.bookSlot = async (req, res) => {
  try {
    const { userId, date, startTime, endTime } = req.body;
    const result = await Slot.bookSlot(userId, date, startTime, endTime);
    res.status(200).json({ message: "Slot booked successfully!", slotId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Error booking slot" });
  }
};

exports.getUserSlots = async (req, res) => {
  try {
    const userId = req.params.userId;
    const slots = await Slot.getUserSlots(userId);
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching slots" });
  }
};

exports.checkActiveStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const isActive = await Slot.isUserActive(userId);
    res.status(200).json({ active: isActive });
  } catch (err) {
    res.status(500).json({ message: "Error checking status" });
  }
};