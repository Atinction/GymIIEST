const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  gender: { type: String, required: true },
});

const SlotModel = mongoose.model("Slot", slotSchema);

// Helper: Convert "HH:MM" to total minutes from midnight
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Check if a slot lies entirely within allowed range
const isSlotWithinRange = (slotStart, slotEnd, rangeStart, rangeEnd) => {
  const slotStartMin = timeToMinutes(slotStart);
  const slotEndMin = timeToMinutes(slotEnd);
  const rangeStartMin = timeToMinutes(rangeStart);
  const rangeEndMin = timeToMinutes(rangeEnd);

  return slotStartMin >= rangeStartMin && slotEndMin <= rangeEndMin;
};

// Gym Timings per Gender
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
    const dummyDate = "2000-01-01";

    const startDateTime = new Date(`${dummyDate}T${startTime}`);
    const endDateTime = new Date(`${dummyDate}T${endTime}`);

    // Time format and ordering
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return { success: false, message: "Invalid time format. Use HH:MM format." };
    }

    if (startDateTime >= endDateTime) {
      return { success: false, message: "End time must be after start time." };
    }

    // ✅ Duration ≤ 45 minutes
    const durationInMinutes = (endDateTime - startDateTime) / 60000;
    if (durationInMinutes > 45) {
      return {
        success: false,
        message: `Slot duration cannot exceed 45 minutes. You entered ${durationInMinutes} minutes.`,
      };
    }

    // Normalize Gender
    const normalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
    const availableTimings = gymTimings[normalizedGender];

    if (!availableTimings) {
      return {
        success: false,
        message: "Invalid gender or no gym timing defined for this gender.",
      };
    }

    // Ensure slot falls within gym time
    const isAllowed = availableTimings.some((allowedSlot) =>
      isSlotWithinRange(startTime, endTime, allowedSlot.start, allowedSlot.end)
    );

    if (!isAllowed) {
      return {
        success: false,
        message: `Slot time (${startTime} - ${endTime}) is outside allowed gym timing for ${normalizedGender}.`,
      };
    }

    // Slot capacity: max 30 users overlapping
    const overlappingSlots = await SlotModel.find({
      date,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
    });

    if (overlappingSlots.length >= 30) {
      return {
        success: false,
        message: "Slot is already full or has too many overlapping bookings.",
      };
    }

    const newSlot = new SlotModel({
      userId,
      date,
      startTime,
      endTime,
      gender: normalizedGender,
    });

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
      const slotStart = new Date(`${slot.date}T${slot.startTime}`);
      const slotEnd = new Date(`${slot.date}T${slot.endTime}`);

      if (isNaN(slotStart.getTime()) || isNaN(slotEnd.getTime())) {
        console.warn(`Invalid slot date/time for slot ${slot._id}`);
        continue;
      }

      if (now >= slotStart && now <= slotEnd) {
        return true;
      }
    }
    return false;
  },

  async deleteSlot(slotId, userId) {
    const result = await SlotModel.deleteOne({ _id: slotId, userId });
    if (result.deletedCount === 0) {
      return { success: false, message: "Slot not found or unauthorized" };
    }
    return { success: true };
  },
};

module.exports = Slot;
