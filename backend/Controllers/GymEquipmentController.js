const GymEquipmentBooking = require("../Models/GymEquipmentBooking");

// Define all possible gym equipment names. This list should match the equipmentData in your frontend.
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

/**
 * Controller function to handle booking a gym equipment.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.bookEquipment = async (req, res) => {
    try {
        const { userId, slotId, date, startTime, equipmentName } = req.body;

        // Validate required fields
        if (!userId || !slotId || !date || !startTime || !equipmentName) {
            return res.status(400).json({ message: "Missing required fields for equipment booking." });
        }

        // Call the model function to book the equipment
        const result = await GymEquipmentBooking.bookEquipment(userId, slotId, date, startTime, equipmentName);

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        res.status(200).json({ message: result.message, bookingId: result.insertedId });
    } catch (err) {
        console.error("Error in bookEquipment controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * Controller function to get all equipment booked by a user for a specific slot.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.getUserBookedEquipment = async (req, res) => {
    try {
        const { userId, slotId } = req.params; // Using req.params for route parameters

        // Validate required fields
        if (!userId || !slotId) {
            return res.status(400).json({ message: "User ID and Slot ID are required." });
        }

        // Call the model function to get user's booked equipment
        const bookedEquipment = await GymEquipmentBooking.getUserBookedEquipment(userId, slotId);
        res.status(200).json(bookedEquipment);
    } catch (err) {
        console.error("Error in getUserBookedEquipment controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * Controller function to get the current availability of all gym equipment
 * for a given date and start time.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.getEquipmentAvailability = async (req, res) => {
    try {
        const { date, startTime } = req.query; // Using req.query for GET parameters

        // Validate required fields
        if (!date || !startTime) {
            return res.status(400).json({ message: "Date and Start Time are required for availability check." });
        }

        // Call the model function to get equipment availability
        const availability = await GymEquipmentBooking.getEquipmentAvailability(date, startTime, allGymEquipmentNames);
        res.status(200).json(availability);
    } catch (err) {
        console.error("Error in getEquipmentAvailability controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};

/**
 * Controller function to handle deleting a gym equipment booking.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
exports.deleteEquipmentBooking = async (req, res) => {
    try {
        const { bookingId, userId } = req.body; // Using req.body for DELETE with payload

        // Validate required fields
        if (!bookingId || !userId) {
            return res.status(400).json({ message: "Booking ID and User ID are required for deletion." });
        }

        // Call the model function to delete the equipment booking
        const result = await GymEquipmentBooking.deleteEquipmentBooking(bookingId, userId);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        res.status(200).json({ message: result.message });
    } catch (err) {
        console.error("Error in deleteEquipmentBooking controller:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};