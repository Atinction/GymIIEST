const Plan = require("../Models/plan");

const savePlan = async (req, res) => {
    try {
        const {
            height,
            weight,
            gender,
            goal,
            activityLevel,
            diet,
            cuisine,
            allergens,
            calculatedNutrition,
            recommendedMeals
        } = req.body;

        const newPlan = new Plan({
            height,
            weight,
            gender,
            goal,
            activityLevel,
            diet,
            cuisine,
            allergens,
            calculatedNutrition,
            recommendedMeals
        });

        await newPlan.save();

        res.status(201).json({ message: "Plan saved successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error saving plan" });
    }
};

module.exports = { savePlan };