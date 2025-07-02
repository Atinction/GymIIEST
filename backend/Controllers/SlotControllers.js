// SlotController.js (No significant changes needed here from the first version)
const Slot = require("../Models/Slot");

exports.bookSlot = async (req, res) => {
  try {
    // endTime is still expected from the request body
    const { userId, date, startTime, endTime, gender } = req.body;

    if (!userId || !date || !startTime || !endTime || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Pass endTime to the bookSlot function as it's provided by the client
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

exports.deleteSlot = async (req, res) => {
  try {
    const { slotId, userId } = req.body;
    if (!slotId || !userId) {
      return res.status(400).json({ message: "Missing slotId or userId" });
    }

    const result = await Slot.deleteSlot(slotId, userId);
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: "Slot deleted successfully!" });
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};