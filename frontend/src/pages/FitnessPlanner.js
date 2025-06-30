import React, { useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Paper,
    Divider
} from '@mui/material';

const FitnessPlanner = () => {
    const [form, setForm] = useState({
        height: '',
        weight: '',
        gender: '',
        goal: '',
        activityLevel: '',
        physique: '',
        diet: ''
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/predict-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error('Failed to generate plan');
            }

            const data = await res.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            alert("Something went wrong while generating your plan.");
        }
    };

    return (
        <Box sx={{ maxWidth: 700, mx: 'auto', p: 4 }}>
            <Paper elevation={5} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                    Personalized Fitness & Diet Planner
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField name="height" label="Height (cm)" type="number" fullWidth margin="normal" required onChange={handleChange} />
                    <TextField name="weight" label="Weight (kg)" type="number" fullWidth margin="normal" required onChange={handleChange} />

                    <TextField name="gender" select label="Gender" fullWidth margin="normal" required onChange={handleChange}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </TextField>

                    <TextField name="goal" select label="Fitness Goal" fullWidth margin="normal" required onChange={handleChange}>
                        <MenuItem value="lose">Lose Weight</MenuItem>
                        <MenuItem value="gain">Gain Weight</MenuItem>
                        <MenuItem value="maintain">Maintain</MenuItem>
                    </TextField>

                    <TextField name="activityLevel" select label="Activity Level" fullWidth margin="normal" required onChange={handleChange}>
                        <MenuItem value="sedentary">Sedentary</MenuItem>
                        <MenuItem value="moderate">Moderate</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                    </TextField>

                    <TextField name="physique" select label="Target Physique" fullWidth margin="normal" required onChange={handleChange}>
                        <MenuItem value="lean">Lean</MenuItem>
                        <MenuItem value="bulky">Bulky</MenuItem>
                        <MenuItem value="toned">Toned</MenuItem>
                    </TextField>

                    <TextField name="diet" select label="Diet Preference" fullWidth margin="normal" required onChange={handleChange}>
                        <MenuItem value="veg">Veg</MenuItem>
                        <MenuItem value="nonveg">Non-Veg</MenuItem>
                        <MenuItem value="vegan">Vegan</MenuItem>
                        <MenuItem value="keto">Keto</MenuItem>
                    </TextField>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.2 }}>
                        Generate Plan
                    </Button>
                </form>
            </Paper>

            {result && (
                <Paper elevation={3} sx={{ mt: 4, p: 3, bgcolor: 'linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))', borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>✨ Your Personalized Plan</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Typography><strong>BMI:</strong> {result.bmi}</Typography>
                    <Typography><strong>Workout Plan:</strong> {result.workoutPlan}</Typography>
                    <Typography><strong>Diet Plan:</strong> {result.dietPlan}</Typography>
                    <Typography><strong>Activity Advice:</strong> {result.activityAdvice}</Typography>
                    <Typography><strong>Physique Advice:</strong> {result.physiqueAdvice}</Typography>
                    <Typography><strong>Tips:</strong> {result.tips}</Typography>
                </Paper>
            )}
        </Box>
    );
};

export default FitnessPlanner;
