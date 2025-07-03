const mongoose = require("mongoose");

// Define the schema for gym equipment bookings
const gymEquipmentBookingSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // ID of the user who booked
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }, // Reference to the booked slot
    date: { type: String, required: true }, // Date of the gym slot
    startTime: { type: String, required: true }, // Start time of the gym slot
    equipmentName: { type: String, required: true }, // Name of the booked equipment
    bookedAt: { type: Date, default: Date.now }, // Timestamp of when the booking was made
});

const GymEquipmentBookingModel = mongoose.model("GymEquipmentBooking", gymEquipmentBookingSchema);

// Total number of each equipment available in the gym
// Assuming there are 3 units of each type of equipment
const TOTAL_EQUIPMENT_COUNT = 3;

const GymEquipmentBooking = {
    /**
     * Books a gym equipment for a specific user and slot.
     * Enforces limits: max 3 equipment per slot per user, no duplicate equipment in the same slot,
     * and checks overall equipment availability.
     * @param {string} userId - The ID of the user.
     * @param {string} slotId - The ID of the booked slot.
     * @param {string} date - The date of the slot (e.g., "YYYY-MM-DD").
     * @param {string} startTime - The start time of the slot (e.g., "HH:MM").
     * @param {string} equipmentName - The name of the equipment to book.
     * @returns {object} - Success status and a message.
     */
    async bookEquipment(userId, slotId, date, startTime, equipmentName) {
        try {
            // 1. Check if the user has already booked this specific equipment for this slot
            const existingBooking = await GymEquipmentBookingModel.findOne({
                userId,
                slotId,
                equipmentName
            });

            if (existingBooking) {
                return { success: false, message: `You have already booked ${equipmentName} for this slot.` };
            }

            // 2. Check how many equipment are already booked by the user for this slot
            const userBookedCount = await GymEquipmentBookingModel.countDocuments({
                userId,
                slotId
            });

            if (userBookedCount >= 3) {
                return { success: false, message: "You can book a maximum of 3 gym equipment per slot." };
            }

            // 3. Check global availability for this equipment at this specific time slot
            const currentBookingsForEquipment = await GymEquipmentBookingModel.countDocuments({
                date,
                startTime,
                equipmentName
            });

            if (currentBookingsForEquipment >= TOTAL_EQUIPMENT_COUNT) {
                return { success: false, message: `${equipmentName} is fully booked for this slot.` };
            }

            // If all checks pass, create a new equipment booking
            const newBooking = new GymEquipmentBookingModel({
                userId,
                slotId,
                date,
                startTime,
                equipmentName
            });

            const savedBooking = await newBooking.save();
            return { success: true, insertedId: savedBooking._id, message: "Equipment booked successfully!" };
        } catch (error) {
            console.error("Error booking equipment:", error);
            return { success: false, message: "Internal server error during equipment booking." };
        }
    },

    /**
     * Retrieves all equipment booked by a specific user for a given slot.
     * @param {string} userId - The ID of the user.
     * @param {string} slotId - The ID of the slot.
     * @returns {Array} - An array of booked equipment documents.
     */
    async getUserBookedEquipment(userId, slotId) {
        try {
            return await GymEquipmentBookingModel.find({ userId, slotId });
        } catch (error) {
            console.error("Error fetching user's booked equipment:", error);
            return [];
        }
    },

    /**
     * Calculates the current availability for all specified gym equipment names
     * for a given date and start time.
     * @param {string} date - The date for availability check (e.g., "YYYY-MM-DD").
     * @param {string} startTime - The start time for availability check (e.g., "HH:MM").
     * @param {Array<string>} allEquipmentNames - An array of all possible equipment names.
     * @returns {object} - An object where keys are equipment names and values are remaining counts.
     */
    async getEquipmentAvailability(date, startTime, allEquipmentNames) {
        try {
            const availability = {};
            // Iterate through all known equipment names to get their counts
            for (const equipmentName of allEquipmentNames) {
                const bookedCount = await GymEquipmentBookingModel.countDocuments({
                    date,
                    startTime,
                    equipmentName
                });
                availability[equipmentName] = TOTAL_EQUIPMENT_COUNT - bookedCount;
            }
            return availability;
        } catch (error) {
            console.error("Error fetching equipment availability:", error);
            return {};
        }
    },

    /**
     * Deletes a specific equipment booking.
     * @param {string} bookingId - The ID of the equipment booking to delete.
     * @param {string} userId - The ID of the user requesting deletion (for authorization).
     * @returns {object} - Success status and a message.
     */
    async deleteEquipmentBooking(bookingId, userId) {
        try {
            const result = await GymEquipmentBookingModel.deleteOne({ _id: bookingId, userId });
            if (result.deletedCount === 0) {
                return { success: false, message: "Equipment booking not found or unauthorized" };
            }
            return { success: true, message: "Equipment booking deleted successfully!" };
        } catch (error) {
            console.error("Error deleting equipment booking:", error);
            return { success: false, message: "Internal server error during equipment deletion." };
        }
    }
};

module.exports = GymEquipmentBooking;