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
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;