const SlotModel = require("../Models/Slot");


const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const isSlotWithinRange = (slotStart, slotEnd, rangeStart, rangeEnd) => {
    const slotStartMin = timeToMinutes(slotStart);
    const slotEndMin = timeToMinutes(slotEnd);
    const rangeStartMin = timeToMinutes(rangeStart);
    const rangeEndMin = timeToMinutes(rangeEnd);

    return slotStartMin >= rangeStartMin && slotEndMin <= rangeEndMin;
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

const SlotService = {
    async bookSlot(userId, date, startTime, endTime, gender) {
        const dummyDate = "2000-01-01";
        const startDateTime = new Date(`${dummyDate}T${startTime}`);
        const endDateTime = new Date(`${dummyDate}T${endTime}`);

        if (isNaN(startDateTime) || isNaN(endDateTime)) {
            return { success: false, message: "Invalid time format. Use HH:MM." };
        }

        if (startDateTime >= endDateTime) {
            return { success: false, message: "End time must be after start time." };
        }

        const duration = (endDateTime - startDateTime) / 60000;
        if (duration > 45) {
            return { success: false, message: "Slot duration cannot exceed 45 minutes." };
        }

        const normalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
        const allowedTimings = gymTimings[normalizedGender];

        if (!allowedTimings) {
            return { success: false, message: "Invalid gender or no timings defined." };
        }

        const isAllowed = allowedTimings.some((slot) =>
            isSlotWithinRange(startTime, endTime, slot.start, slot.end)
        );

        if (!isAllowed) {
            return {
                success: false,
                message: `Slot (${startTime} - ${endTime}) is outside allowed timing for ${normalizedGender}.`,
            };
        }

        const overlappingSlots = await SlotModel.find({
            date,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ],
        });

        if (overlappingSlots.length >= 30) {
            return { success: false, message: "Slot is full (30+ overlaps)." };
        }

        const newSlot = new SlotModel({ userId, date, startTime, endTime, gender: normalizedGender });
        const saved = await newSlot.save();
        return { success: true, insertedId: saved._id };
    },

    async getUserSlots(userId) {
        return await SlotModel.find({ userId });
    },

    async isUserActive(userId) {
        const now = new Date();
        const userSlots = await SlotModel.find({ userId });

        for (let slot of userSlots) {
            const start = new Date(`${slot.date}T${slot.startTime}`);
            const end = new Date(`${slot.date}T${slot.endTime}`);
            if (now >= start && now <= end) return true;
        }

        return false;
    },

    async deleteSlot(slotId, userId) {
        const result = await SlotModel.deleteOne({ _id: slotId, userId });
        if (!result.deletedCount) return { success: false, message: "Slot not found or unauthorized." };
        return { success: true };
    }
};

module.exports = SlotService;