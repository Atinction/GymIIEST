const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
    height: Number,
    weight: Number,
    gender: String,
    goal: String,
    activityLevel: String,
    diet: String,
    cuisine: String,
    allergens: String,
    calculatedNutrition: Object,
    recommendedMeals: Object,
}, {
    timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);