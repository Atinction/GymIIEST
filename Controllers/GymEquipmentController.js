// controllers/GymEquipmentController.js
const GymEquipmentService = require("../Services/GymEquipmentService");

// Define all gym equipment names (should match frontend)
const allGymEquipmentNames = [
    'Chest Press',
    'Butterfly Machine',
    'Gym Benches',
    'Treadmill',
    'Dumbbells',
    'Spin Bike',
    'CrossCable machine',
    'Seated Leg Press'
];

exports.bookEquipment = async (req, res) => {
    try {
        const { userId, slotId, date, startTime, equipmentName } = req.body;

        if (!userId || !slotId || !date || !startTime || !equipmentName) {
            return res.status(400).json({ message: "Missing required fields for equipment booking." });
        }

        const result = await GymEquipmentService.bookEquipment(userId, slotId, date, startTime, equipmentName);

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.status(200).json({ message: result.message, bookingId: result.insertedId });
    } catch (err) {
        console.error("Error in bookEquipment controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.getUserBookedEquipment = async (req, res) => {
    try {
        const { userId, slotId } = req.params;

        if (!userId || !slotId) {
            return res.status(400).json({ message: "User ID and Slot ID are required." });
        }

        const bookedEquipment = await GymEquipmentService.getUserBookedEquipment(userId, slotId);
        res.status(200).json(bookedEquipment);
    } catch (err) {
        console.error("Error in getUserBookedEquipment controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.getAllUserEquipmentBookings = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const allBookings = await GymEquipmentService.getAllUserEquipmentBookings(userId);
        res.status(200).json(allBookings);
    } catch (err) {
        console.error("Error in getAllUserEquipmentBookings controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.getEquipmentAvailability = async (req, res) => {
    try {
        const { date, startTime } = req.query;

        if (!date || !startTime) {
            return res.status(400).json({ message: "Date and Start Time are required for availability check." });
        }

        const availability = await GymEquipmentService.getEquipmentAvailability(date, startTime, allGymEquipmentNames);
        res.status(200).json(availability);
    } catch (err) {
        console.error("Error in getEquipmentAvailability controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.deleteEquipmentBooking = async (req, res) => {
    try {
        const { bookingId, userId } = req.body;

        if (!bookingId || !userId) {
            return res.status(400).json({ message: "Booking ID and User ID are required for deletion." });
        }

        const result = await GymEquipmentService.deleteEquipmentBooking(bookingId, userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        res.status(200).json({ message: result.message });
    } catch (err) {
        console.error("Error in deleteEquipmentBooking controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};