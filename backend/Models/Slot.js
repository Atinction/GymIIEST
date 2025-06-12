const { getDB } = require("./db");

const Slot = {
  // Book a slot after checking total slot count for that time
  async bookSlot(userId, date, startTime, endTime) {
    const db = getDB();

    // Count how many students have already booked this specific date+time slot
    const slotCount = await db.collection("slots").countDocuments({
      date,
      startTime,
      endTime,
    });

    if (slotCount >= 30) {
      return { success: false, message: "Maximum slot capacity reached for this slot" };
    }

    // Book slot (store userId as string)
    const result = await db.collection("slots").insertOne({
      userId, // string — no ObjectId()
      date,
      startTime,
      endTime,
      createdAt: new Date(),
    });

    return { success: true, insertedId: result.insertedId };
  },

  // Fetch slots booked by a user
  async getUserSlots(userId) {
    const db = getDB();
    const slots = await db.collection("slots").find({ userId }).toArray();
    return slots;
  },

  // Check if user is currently active in gym
  async isUserActive(userId) {
    const db = getDB();
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().substring(0, 5);

    const slot = await db.collection("slots").findOne({
      userId,
      date: dateStr,
      startTime: { $lte: timeStr },
      endTime: { $gte: timeStr },
    });

    return !!slot;
  },
};

module.exports = Slot;
