import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Box,
    Divider,
    Paper,
    useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BMIGauge = ({ bmi }) => {
    const getNeedleAngle = (bmi) => {
        const minAngle = -90;
        const maxAngle = 90;
        const minBMI = 10;
        const maxBMI = 40;
        const clampedBMI = Math.max(minBMI, Math.min(bmi, maxBMI));
        return minAngle + ((clampedBMI - minBMI) / (maxBMI - minBMI)) * (maxAngle - minAngle);
    };

    const angle = getNeedleAngle(bmi);

    const getBMICategory = () => {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    };

    const getBMICategoryColor = () => {
        if (bmi < 18.5) return "#03a9f4";
        if (bmi < 25) return "#4caf50";
        if (bmi < 30) return "#ff9800";
        return "#f44336";
    };

    return (
        <Box mt={4} textAlign="center">
            <svg width="320" height="180" viewBox="0 0 320 160">
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#03a9f4" />
                        <stop offset="33%" stopColor="#4caf50" />
                        <stop offset="66%" stopColor="#ff9800" />
                        <stop offset="100%" stopColor="#f44336" />
                    </linearGradient>
                </defs>
                <path
                    d="M 30 150 A 120 120 0 0 1 290 150"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="22"
                    strokeLinecap="round"
                />

                <g transform={`rotate(${angle}, 160, 150)`}>
                    <line x1="160" y1="150" x2="160" y2="40" stroke="#fff" strokeWidth="4" />
                    <circle cx="160" cy="150" r="6" fill="#fff" />
                </g>

                <text x="25" y="145" fontSize="12" fill="#aaa">Underweight</text>
                <text x="110" y="60" fontSize="12" fill="#aaa">Normal</text>
                <text x="200" y="60" fontSize="12" fill="#aaa">Overweight</text>
                <text x="255" y="145" fontSize="12" fill="#aaa">Obese</text>
            </svg>

            <Typography variant="h6" mt={2} color={getBMICategoryColor()}>
                BMI = {bmi} ({getBMICategory()})
            </Typography>
        </Box>
    );
};

const BMICalculator = () => {
    const theme = useTheme();
    const [unit, setUnit] = useState("metric");
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [heightIn, setHeightIn] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const navigate = useNavigate();

    const handleUnitChange = (_, newUnit) => {
        if (newUnit !== null) {
            setUnit(newUnit);
            setBmi(null);
            setHeight("");
            setHeightIn("");
            setWeight("");
        }
    };

    const calculateBMI = () => {
        let h, w;

        if (unit === "metric") {
            h = parseFloat(height) / 100;
            w = parseFloat(weight);
        } else {
            const feet = parseFloat(height);
            const inches = parseFloat(heightIn) || 0;
            h = (feet * 12 + inches) * 0.0254;
            w = parseFloat(weight) * 0.453592;
        }

        if (!h || !w) return setBmi(null);

        const bmiCalc = w / (h * h);
        setBmi(bmiCalc.toFixed(2));
    };

    const getBMICategory = () => {
        if (bmi < 18.5) return "Underweight";
        if (bmi < 25) return "Normal";
        if (bmi < 30) return "Overweight";
        return "Obese";
    };

    return (
        <Box sx={{ bgcolor: "#111", minHeight: "100vh", py: 6 }}>
            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Paper elevation={5} sx={{ p: 4, borderRadius: 4, bgcolor: "#1c1c1e", boxShadow: "0 0 12px rgba(255, 255, 255, 0.05)" }}>
                        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#c084fc" }}>
                            BMI Calculator
                        </Typography>

                        <ToggleButtonGroup
                            value={unit}
                            exclusive
                            onChange={handleUnitChange}
                            fullWidth
                            sx={{ mb: 3, bgcolor: "#2c2c2e", borderRadius: 2 }}
                        >
                            <ToggleButton value="metric" sx={{ color: "white", flex: 1 }}>Metric</ToggleButton>
                            <ToggleButton value="us" sx={{ color: "white", flex: 1 }}>US</ToggleButton>
                        </ToggleButtonGroup>

                        <TextField
                            label="Age"
                            type="number"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            sx={{ bgcolor: "#2c2c2e", input: { color: "white" }, label: { color: "#aaa" } }}
                        />

                        <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <FormLabel component="legend" sx={{ color: "white" }}>Gender</FormLabel>
                            <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
                                <FormControlLabel value="male" control={<Radio sx={{ color: "#c084fc" }} />} label={<Typography sx={{ color: "white" }}>Male</Typography>} />
                                <FormControlLabel value="female" control={<Radio sx={{ color: "#c084fc" }} />} label={<Typography sx={{ color: "white" }}>Female</Typography>} />
                            </RadioGroup>
                        </FormControl>

                        {unit === "metric" ? (
                            <>
                                <TextField
                                    label="Height (cm)"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    sx={{ bgcolor: "#2c2c2e", input: { color: "white" }, label: { color: "#aaa" } }}
                                />
                                <TextField
                                    label="Weight (kg)"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    sx={{ bgcolor: "#2c2c2e", input: { color: "white" }, label: { color: "#aaa" } }}
                                />
                            </>
                        ) : (
                            <>
                                <Box display="flex" gap={2}>
                                    <TextField
                                        label="Height (feet)"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        fullWidth
                                        sx={{ bgcolor: "#2c2c2e", input: { color: "white" }, label: { color: "#aaa" } }}
                                    />
                                    <TextField
                                        label="Height (inches)"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                        value={heightIn}
                                        onChange={(e) => setHeightIn(e.target.value)}
                                        fullWidth
                                        sx={{ bgcolor: "#2c2c2e", input: { color: "white" }, label: { color: "#aaa" } }}
                                    />
                                </Box>
                                <TextField
                                    label="Weight (lbs)"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    sx={{ bgcolor: "#2c2c2e", input: { color: "white" }, label: { color: "#aaa" } }}
                                />
                            </>
                        )}

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, bgcolor: "#a45deb", color: "white", fontWeight: 600, boxShadow: "none", '&:hover': { bgcolor: "#9333ea" } }}
                            onClick={calculateBMI}
                        >
                            Calculate BMI
                        </Button>
                        {bmi && (
                            <>
                                <Divider sx={{ my: 4, borderColor: "#444" }} />
                                <Typography variant="h6" align="center" sx={{ color: "#eee" }}>
                                    Your BMI is:
                                </Typography>
                                <Typography
                                    variant="h4"
                                    align="center"
                                    sx={{ color: getBMICategory() === "Normal" ? theme.palette.success.main : theme.palette.error.main }}
                                >
                                    {bmi} ({getBMICategory()})
                                </Typography>
                                <Typography align="center" mt={1} sx={{ color: "#aaa" }}>
                                    Healthy range: 18.5 - 24.9
                                </Typography>
                                <BMIGauge bmi={parseFloat(bmi)} />
                            </>
                        )}

                        <Button
                            onClick={() => navigate("/")}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 4, borderColor: "#c084fc", color: "#c084fc", boxShadow: "0 0 10px #c084fc" }}
                        >
                            Back to Home
                        </Button>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default BMICalculator;