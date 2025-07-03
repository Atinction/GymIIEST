const express = require("express");
const router = express.Router();
const GymEquipmentController = require("../Controllers/GymEquipmentController");

// Route to book a gym equipment
router.post("/book-equipment", GymEquipmentController.bookEquipment);

// Route to get all equipment booked by a specific user for a specific slot
// Example: GET /api/equipment/my-equipment/user123/slotabc
router.get("/my-equipment/:userId/:slotId", GymEquipmentController.getUserBookedEquipment);

// Route to get the availability of all gym equipment for a given date and start time
// Example: GET /api/equipment/equipment-availability?date=2024-07-03&startTime=08:00
router.get("/equipment-availability", GymEquipmentController.getEquipmentAvailability);

// Route to delete a gym equipment booking
router.delete("/delete-equipment-booking", GymEquipmentController.deleteEquipmentBooking);

module.exports = router;