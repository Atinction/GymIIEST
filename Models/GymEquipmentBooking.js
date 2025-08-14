
const mongoose = require("mongoose");

const gymEquipmentBookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    slotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    equipmentName: {
        type: String,
        required: true
    },
    bookedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("GymEquipmentBooking", gymEquipmentBookingSchema);