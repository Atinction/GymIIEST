const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  gender: { type: String, required: true },
});

const SlotModel = mongoose.model("Slot", slotSchema);

const isWithinTimeRange = (start, end, target) => {
  return target >= start && target <= end;
};

const gymTimings = {
  Male: [
    { start: "07:00", end: "09:00" },
    { start: "19:00", end: "21:00" },
  ],
  Female: [
    { start: "09:30", end: "11:00" },
    { start: "17:00", end: "18:30" },
  ],
};

const Slot = {
  async bookSlot(userId, date, startTime, endTime, gender) {
    const slotsAtSameTime = await SlotModel.find({ date, startTime });

    if (slotsAtSameTime.length >= 30) {
      return { success: false, message: "Slot is full. Please choose another time." };
    }

    // Normalize gender value
    const normalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    const availableTimings = gymTimings[normalizedGender];

    if (!availableTimings) {
      return { success: false, message: "Invalid gender or no timings available for the provided gender." };
    }

    const isAllowed = availableTimings.some((slot) => {
      return isWithinTimeRange(slot.start, slot.end, startTime);
    });

    if (!isAllowed) {
      return { success: false, message: "Selected time is outside your allowed gym timing." };
    }

    const newSlot = new SlotModel({ userId, date, startTime, endTime, gender: normalizedGender });
    const savedSlot = await newSlot.save();

    return { success: true, insertedId: savedSlot._id };
  },

  async getUserSlots(userId) {
    return await SlotModel.find({ userId });
  },

  async isUserActive(userId) {
    const now = new Date();
    const userSlots = await SlotModel.find({ userId });

    for (let slot of userSlots) {
      const slotEndTime = new Date(`${slot.date}T${slot.startTime}`);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + 45);

      if (now >= new Date(`${slot.date}T${slot.startTime}`) && now <= slotEndTime) {
        return true;
      }
    }
    return false;
  },
};

module.exports = Slot;
