const express = require('express');
const router = express.Router();
const FitnessRecommendation = require('../Models/FitnessRecommendation');

router.post('/save', async (req, res) => {
    try {
        const {
            height,
            weight,
            age,
            gender,
            goal,
            intensity,
            recommendationResult
        } = req.body;

        if (!recommendationResult) {
            return res.status(400).json({
                error: "recommendationResult missing from request body"
            });
        }

        const newRecord = new FitnessRecommendation({
            height,
            weight,
            age,
            gender,
            goal,
            intensity,
            BMI_Category: recommendationResult.BMI_Category,
            Recommendations: recommendationResult.Recommendations
        });

        await newRecord.save();

        res.json({
            message: 'Saved successfully!',
            savedId: newRecord._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save recommendation' });
    }
});

module.exports = router;
