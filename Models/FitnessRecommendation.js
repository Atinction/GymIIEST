const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    Exercise: String,
    Equipment: String,
    Intensity: String,
    Reps: Number,
    Sets: Number,
    Calories_Burned_30min: Number,
    MuscleGain_kg_month: Number
});

const FitnessRecommendationSchema = new mongoose.Schema({
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    goal: String,
    intensity: String,
    BMI_Category: String,
    Recommendations: {
        type: Map,
        of: [ExerciseSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FitnessRecommendation', FitnessRecommendationSchema);
