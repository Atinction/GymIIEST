const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const User = require('../Models/User');
const Slot = require('../Models/Slot');
const GymEquipmentBooking = require('../Models/GymEquipmentBooking');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log(`Backend: Creating uploads directory at: ${uploadsDir}`);
    fs.mkdirSync(uploadsDir);
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log(`Backend: Received GET request for user ID: ${userId}`);

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const slotBookings = await Slot.find({ userId });
        const validSlotIds = slotBookings.map(slot => slot._id.toString());

        const rawEquipmentBookings = await GymEquipmentBooking.find({ userId });
        const filteredEquipmentBookings = rawEquipmentBookings.filter(booking =>
            validSlotIds.includes(booking.slotId.toString())
        );

        res.json({
            ...user.toObject(),
            slotBookings,
            equipmentBookings: filteredEquipmentBookings,
        });
    } catch (err) {
        console.error('Backend: Error fetching user profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ PUT update profile with filtered equipment bookings
router.put('/:userId', upload.single('profilePicture'), async (req, res) => {
    try {
        const { name, mobile, height, weight, address, active } = req.body;
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name ?? user.name;
        user.mobile = mobile ?? user.mobile;
        user.height = height ?? user.height;
        user.weight = weight ?? user.weight;
        user.address = address ?? user.address;
        if (typeof active !== 'undefined') {
            user.active = (active === 'true' || active === true);
        }

        // Handle profile picture update
        if (req.file) {
            if (
                user.profilePicture &&
                user.profilePicture !== 'default-avatar.png' &&
                user.profilePicture.startsWith('uploads/')
            ) {
                const oldPath = path.join(__dirname, '../../', user.profilePicture);
                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, (err) => {
                        if (err) console.error('Backend: Error deleting old picture:', err);
                        else console.log(`Backend: Deleted old profile picture at: ${oldPath}`);
                    });
                }
            }
            user.profilePicture = `uploads/${req.file.filename}`;
        }

        await user.save();

        const updatedUser = await User.findById(userId).select('-password');
        const slotBookings = await Slot.find({ userId });
        const validSlotIds = slotBookings.map(slot => slot._id.toString());

        const rawEquipmentBookings = await GymEquipmentBooking.find({ userId });
        const filteredEquipmentBookings = rawEquipmentBookings.filter(booking =>
            validSlotIds.includes(booking.slotId.toString())
        );

        res.json({
            ...updatedUser.toObject(),
            slotBookings,
            equipmentBookings: filteredEquipmentBookings,
        });
    } catch (err) {
        console.error('Backend: Error updating user profile:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;