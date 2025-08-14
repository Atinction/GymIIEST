const SlotService = require("../Services/SlotService");

exports.bookSlot = async (req, res) => {
  try {
    const { userId, date, startTime, endTime, gender } = req.body;
    if (!userId || !date || !startTime || !endTime || !gender)
      return res.status(400).json({ message: "Missing required fields" });

    const result = await SlotService.bookSlot(userId, date, startTime, endTime, gender);
    if (!result.success) return res.status(400).json({ message: result.message });

    res.status(200).json({ message: "Slot booked!", slotId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserSlots = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const slots = await SlotService.getUserSlots(userId);
    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkActiveStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const isActive = await SlotService.isUserActive(userId);
    res.status(200).json({ active: isActive });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    const { slotId, userId } = req.body;
    if (!slotId || !userId) return res.status(400).json({ message: "Missing slotId/userId" });

    const result = await SlotService.deleteSlot(slotId, userId);
    if (!result.success) return res.status(404).json({ message: result.message });

    res.status(200).json({ message: "Slot deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};