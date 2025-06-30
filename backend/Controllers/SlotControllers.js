const Slot = require("../Models/Slot");

exports.bookSlot = async (req, res) => {
  try {
    const { userId, date, startTime, endTime, gender } = req.body;

    if (!userId || !date || !startTime || !endTime || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await Slot.bookSlot(userId, date, startTime, endTime, gender);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: "Slot booked successfully!", slotId: result.insertedId });
  } catch (err) {
    console.error("Error booking slot:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserSlots = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const slots = await Slot.getUserSlots(userId);
    res.status(200).json(slots);
  } catch (err) {
    console.error("Error fetching user slots:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkActiveStatus = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const isActive = await Slot.isUserActive(userId);
    res.status(200).json({ active: isActive });
  } catch (err) {
    console.error("Error checking active status:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
