// 📁 services/GymEquipmentService.js
const GymEquipmentBookingModel = require('../Models/GymEquipmentBooking');

const TOTAL_EQUIPMENT_COUNT = 3;

const GymEquipmentService = {
    async bookEquipment(userId, slotId, date, startTime, equipmentName) {
        try {
            const existingBooking = await GymEquipmentBookingModel.findOne({
                userId,
                slotId,
                equipmentName
            });
            if (existingBooking) return { success: false, message: `You have already booked ${equipmentName} for this slot.` };

            const userBookedCount = await GymEquipmentBookingModel.countDocuments({ userId, slotId });
            if (userBookedCount >= 3) return { success: false, message: "You can book a maximum of 3 gym equipment per slot." };

            const currentBookingsForEquipment = await GymEquipmentBookingModel.countDocuments({ date, startTime, equipmentName });
            if (currentBookingsForEquipment >= TOTAL_EQUIPMENT_COUNT) {
                return { success: false, message: `${equipmentName} is fully booked for this slot.` };
            }

            const newBooking = new GymEquipmentBookingModel({ userId, slotId, date, startTime, equipmentName });
            const savedBooking = await newBooking.save();
            return { success: true, insertedId: savedBooking._id, message: "Equipment booked successfully!" };

        } catch (error) {
            console.error("Error booking equipment:", error);
            return { success: false, message: "Internal server error during equipment booking." };
        }
    },

    async getUserBookedEquipment(userId, slotId) {
        try {
            return await GymEquipmentBookingModel.find({ userId, slotId });
        } catch (error) {
            console.error("Error fetching user's booked equipment for slot:", error);
            return [];
        }
    },

    async getAllUserEquipmentBookings(userId) {
        try {
            return await GymEquipmentBookingModel.find({ userId }).sort({ date: 1, startTime: 1 });
        } catch (error) {
            console.error("Error fetching all user's equipment bookings:", error);
            return [];
        }
    },

    async getEquipmentAvailability(date, startTime, allEquipmentNames) {
        try {
            const availability = {};
            for (const equipmentName of allEquipmentNames) {
                const bookedCount = await GymEquipmentBookingModel.countDocuments({ date, startTime, equipmentName });
                availability[equipmentName] = TOTAL_EQUIPMENT_COUNT - bookedCount;
            }
            return availability;
        } catch (error) {
            console.error("Error fetching equipment availability:", error);
            return {};
        }
    },

    async deleteEquipmentBooking(bookingId, userId) {
        try {
            const result = await GymEquipmentBookingModel.deleteOne({ _id: bookingId, userId });
            if (result.deletedCount === 0) return { success: false, message: "Equipment booking not found or unauthorized" };
            return { success: true, message: "Equipment booking deleted successfully!" };
        } catch (error) {
            console.error("Error deleting equipment booking:", error);
            return { success: false, message: "Internal server error during equipment deletion." };
        }
    }
};

module.exports = GymEquipmentService;