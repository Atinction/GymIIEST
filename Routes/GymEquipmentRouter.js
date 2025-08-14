const express = require("express");
const router = express.Router();
const GymEquipmentController = require("../Controllers/GymEquipmentController");

// Book gym equipment
router.post("/book-equipment", GymEquipmentController.bookEquipment);

// Get all equipment booked by a user for a specific slot
// GET /api/equipment/my-equipment/:userId/:slotId
router.get("/my-equipment/:userId/:slotId", GymEquipmentController.getUserBookedEquipment);

// Get all equipment booked by a user across all slots
// GET /api/equipment/all-my-equipment/:userId
router.get("/all-my-equipment/:userId", GymEquipmentController.getAllUserEquipmentBookings);

// Get equipment availability for a specific date and time
// GET /api/equipment/equipment-availability?date=YYYY-MM-DD&startTime=HH:mm
router.get("/equipment-availability", GymEquipmentController.getEquipmentAvailability);

// Delete a specific equipment booking
router.delete("/delete-equipment-booking", GymEquipmentController.deleteEquipmentBooking);

module.exports = router;