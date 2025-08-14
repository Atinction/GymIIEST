const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },
    googleId: {
        type: String,
    },
    mobile: {
        type: String,
        default: '',
    },
    height: {
        type: Number, // in cm
        default: 0,
    },
    weight: {
        type: Number, // in kg
        default: 0,
    },
    address: {
        type: String,
        default: '',
    },
    active: {
        type: Boolean,
        default: true,
    },
    profilePicture: {
        type: String,
        default: '', // e.g., 'uploads/default-avatar.png'
    }
}, { timestamps: true });

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;