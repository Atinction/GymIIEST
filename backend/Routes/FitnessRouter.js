const express = require('express');
const router = express.Router();
const FitnessPlan = require('../Models/FitnessPlan');

router.post('/', async (req, res) => {
    const { height, weight, gender, goal, activityLevel, physique, diet } = req.body;

    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

    const dietPlans = {
        veg: "Focus on legumes, tofu, paneer, leafy greens, and fruits.",
        nonveg: "Include lean meat, eggs, fish, along with whole grains and vegetables.",
        vegan: "Plant-based proteins like lentils, chickpeas, nuts, and soy milk.",
        keto: "High-fat low-carb foods like avocados, eggs, cheese, and leafy greens."
    };

    const workout =
        goal === 'lose'
            ? "Include HIIT, cardio (30–45 mins), and light strength training."
            : goal === 'gain'
                ? "Focus on progressive overload, heavy lifting (compound exercises), and calorie surplus."
                : "Mix of strength + cardio + flexibility (yoga, Pilates, or functional).";

    const activityTip = {
        sedentary: "Start with 20–30 min daily walks and beginner workouts.",
        moderate: "You’re on track! Push for 4–5 days of training/week.",
        active: "Great! Try split training and include recovery days."
    };

    const physiqueMap = {
        lean: "Focus on fat-burning with lean muscle gain. Keep reps high and weights moderate.",
        bulky: "Bulk with compound lifts, calorie surplus, and creatine.",
        toned: "Combination of resistance training + light cardio for muscle definition."
    };

    const plan = {
        height,
        weight,
        gender,
        goal,
        activityLevel,
        physique,
        diet,
        bmi,
        workoutPlan: workout,
        dietPlan: dietPlans[diet],
        activityAdvice: activityTip[activityLevel],
        physiqueAdvice: physiqueMap[physique],
        tips: "Ensure 7–8 hrs of sleep, hydrate well, and follow your plan consistently!"
    };

    try {
        const savedPlan = await FitnessPlan.create(plan);
        res.json({ message: "AI-Based Fitness Plan Generated!", ...savedPlan._doc });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate plan" });
    }
});

module.exports = router;
