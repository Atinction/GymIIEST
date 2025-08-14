const User = require("../Models/User");
const Slot = require("../Models/Slot");
const GymEquipmentBooking = require("../Models/GymEquipmentBooking");

exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // Validate ObjectId format
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid user ID format." });
        }

        // Fetch user without password
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure default values to avoid frontend undefined issues
        const userProfile = {
            name: user.name || "Not Provided",
            email: user.email || "Not Provided",
            mobile: user.mobile || "Not Provided",
            height: user.height || "Not Provided",
            weight: user.weight || "Not Provided",
            address: user.address || "Not Provided",
            active: user.active !== undefined ? user.active : true,
            profilePicture: user.profilePicture || null,
            createdAt: user.createdAt || null,
            updatedAt: user.updatedAt || null,
        };

        // Fetch slot and equipment bookings
        const slotBookings = await Slot.find({ userId });
        const equipmentBookings = await GymEquipmentBooking.getAllUserEquipmentBookings(userId);

        // Debug logs (optional but useful)
        console.log("User Profile Sent:", userProfile);
        console.log("Slot Bookings:", slotBookings.length);
        console.log("Equipment Bookings:", equipmentBookings.length);

        res.status(200).json({
            ...userProfile,
            slotBookings,
            equipmentBookings,
        });
    } catch (err) {
        console.error("Error in getUserProfile:", err);
        res.status(500).json({ message: "Internal server error." });
    }
};