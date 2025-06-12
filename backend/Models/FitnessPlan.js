const mongoose = require('mongoose');

const FitnessPlanSchema = new mongoose.Schema({
    height: Number,
    weight: Number,
    gender: String,
    goal: String,
    activityLevel: String,
    physique: String,
    diet: String,
    bmi: String,
    workoutPlan: String,
    dietPlan: String,
    activityAdvice: String,
    physiqueAdvice: String,
    tips: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('FitnessPlan', FitnessPlanSchema);
