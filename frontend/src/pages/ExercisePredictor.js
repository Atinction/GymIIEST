import React, { useState } from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    ToggleButtonGroup,
    ToggleButton,
    TextField,
    Button,
    Divider,
    Grid,
    Card,
    CardMedia,
    CardContent,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";


const exerciseSuggestions = {
    Underweight: {
        Back: [
            { name: "Lat Pulldown Machine", gif: "/Lever Cross Lat Pulldown.gif" },
            { name: "Seated Cable Row (Light Weight)", gif: "/Cable Seated Lats Focused Row.gif" },
            { name: "Resistance Band Row", gif: "/Resistance Band Grip.gif" },
            { name: "Bird Dog", gif: "/Sliding Leg Bird Dog.gif" }
        ],
        Chest: [
            { name: "Chest Press Machine (Lightweight)", gif: "/Lever Lying Chest Press.gif" },
            { name: "Incline Chest Press Machine", gif: "/Lever Incline Hammer Chest Press.gif" },
            { name: "Pec Deck Machine", gif: "/Lever Pec Deck Fly.gif" },
            { name: "Incline Push-Up", gif: "/Incline Push-up.gif" }
        ],
        Triceps: [
            { name: "Triceps Pushdown (Cable Machine)", gif: "/Cable Triceps Pushdown.gif" },
            { name: "Overhead Dumbbell Extension", gif: "/Dumbbell Seated Single.gif" },
            { name: "Triceps Kickback (Light Dumbbells)", gif: "/Dumbbell Incline Triceps Kickback.gif" },
            { name: "Chair Dip (Assisted)", gif: "/Dip on Floor with Chair.gif" }
        ],
        Biceps: [
            { name: "Cable Bicep Curl (Light)", gif: "/Cable Reverse Grip Biceps Curl.gif" },
            { name: "Dumbbell Bicep Curl", gif: "/Dumbbell Biceps Curl.gif" },
            { name: "Preacher Curl Machine", gif: "/Lever Reverse Grip Preacher Curl.gif" },
            { name: "Concentration Curl", gif: "/Kettlebell Concentration Curl.gif" }
        ],
        Abs: [
            { name: "Seated Crunch Machine", gif: "/Lever Seated Leg Raise Crunch (plate loaded).gif" },
            { name: "Cable Woodchopper", gif: "/Sitting Woodchopper on a Chair.gif" },
            { name: "Heel Touch Crunches", gif: "/Jack Split Crunches.gif" },
            { name: "Dead Bug", gif: "/Dead Bug.gif" }
        ],
        Legs: [
            { name: "Leg Press Machine", gif: "/Sled Glute Dominant Leg Press.gif" },
            { name: "Seated Leg Extension", gif: "/Lever Seated Leg Extension.gif" },
        ],
        Glutes: [
            { name: "Glute Bridge", gif: "/Dumbbell KAS Glute Bridge.gif" },
            { name: "Cable Glute Kickback", gif: "/Cable Kneeling Glute Kickback.gif" },
            { name: "Step-Up with Dumbbells", gif: "/Bodyweight Step-up on Stepbox.gif" },
        ],
        Shoulders: [
            { name: "Lateral Raise Machine", gif: "/Lever Lateral Raise.gif" },
            { name: "Front Raise (Light Dumbbells)", gif: "/Kettlebell Front Raise.gif" },
            { name: "Seated Shoulder Press (Machine)", gif: "/Lever Seated Shoulder Press.gif" },
            { name: "Arm Circles", gif: "/Arm Circles.gif" }
        ],
        FullBody: [
            { name: "Elliptical Machine (Low Intensity)", gif: "/Elliptical Machine Walk.gif" },
            { name: "Step & Reach", gif: "/Posterior Step to Overhead Reach.gif" }
        ]
    },
    Normal: {
        Back: [
            { name: "Pull-Up", gif: "/Rocky Pull Up Pulldown.gif" },
            { name: "Lat Pulldown", gif: "/Cable Neutral Grip Lat Pulldown.gif" },
            { name: "Dumbbell Row", gif: "/Dumbbell Bent Over Row with Chest Support.gif" },
            { name: "Bent Over Row", gif: "/ Bent Over Row .gif" },
        ],
        Chest: [
            { name: "Push-Up", gif: "/Push-up.gif" },
            { name: "Dumbbell Press", gif: "/Dumbbell Z Press.gif" },
            { name: "Chest Fly", gif: "/Lever Incline Fly.gif" },
            { name: "Cable Chest Press", gif: "/Cable Low Chest Press.gif" },
        ],
        Triceps: [
            { name: "Triceps Pushdown", gif: "/Cable Triceps Pushdown.gif" },
            { name: "Overhead Dumbbell Extension", gif: "/Triceps Extension.gif" },
            { name: "Skull Crusher", gif: "/Barbell Lying Triceps Extension Skull Crusher.gif" },
            { name: "Bench Dip", gif: "/Triceps Dip.gif" },
        ],
        Biceps: [
            { name: "Barbell Curl", gif: "/Barbell Srtict Curl.gif" },
            { name: "Preacher Curl", gif: "/Dumbbell Hammer Preacher Curl.gif" },
            { name: "Hammer Curl", gif: "/Dumbbell Alternate Hammer Srtict Curl.gif" },
            { name: "Concentration Curl", gif: "/Dumbbell Concentration Curl.gif" },
        ],
        Abs: [
            { name: "Crunches", gif: "/Jack Split Crunches.gif" },
            { name: "Plank", gif: "/Plank Jack on Elbows.gif" },
            { name: "Leg Raise", gif: "/Dumbbell Seated Military Press In Out Leg Raise on Floor.gif" },
            { name: "Russian Twist", gif: "/Russian Twist.gif" },
        ],
        Legs: [
            { name: "Bodyweight Squat", gif: "/Bodyweight Narrow Stance Squat.gif" },
            { name: "Lunges", gif: "/Dumbbell Walking Lunges.gif" },
            { name: "Leg Press", gif: "/Lever Seated Single Leg Press.gif" },
            { name: "Patrick Step", gif: "/Bodyweight Patrick Step from StepBox (female).gif" },
        ],
        Glutes: [
            { name: "Hip Thrust", gif: "/Bodyweight Frog Hip Thrust.gif" },
            { name: "Glute Kickback", gif: "/Resistance Band Standing Balance Glute Kickback.gif" },
            { name: "Bulgarian Split Squat", gif: "/Dumbbell Goblet Bulgarian Split Squat.gif" },
            { name: "Sumo Squat", gif: "/Dumbbell Goblet Sumo Squat.gif" },
        ],
        Shoulders: [
            { name: "Dumbbell Shoulder Press", gif: "/Dumbbell Z Press.gif" },
            { name: "Lateral Raise", gif: "/Dumbbell Standing Bent Arm Lateral raise.gif" },
            { name: "Front Raise", gif: "/Dumbbell Single Arm Neutral Grip Front Raise.gif" },
            { name: "Upright Row", gif: "/Barbell Shoulder Grip Upright Row.gif" },
        ],
        Wrist: [
            { name: "Wrist Curl", gif: "/Dumbbell Standing Wrist Curl.gif" },
            { name: "Reverse Wrist Curl", gif: "/Barbell Standing Wrist Reverse Curl.gif" },
            { name: "Wrist Roller", gif: "/Wrist Roller.gif" },
        ],
    },
    Overweight: {
        Back: [
            { name: "Bird Dog", gif: "/Sliding Leg Bird Dog.gif" },
            { name: "Superman", gif: "/Superman Push up.gif" },
            { name: "Resistance Band Row", gif: "/Resistance Band Renegade Row.gif" },
            { name: "Lat Pulldown (Machine)", gif: "/Lever Cross Lat Pulldown.gif" },
            { name: "Seated Cable Row", gif: "/Cable Seated Lats Focused Row.gif" },
        ],
        Chest: [
            { name: "Wall Push-Up", gif: "/Push up (wall).gif" },
            { name: "Incline Push-Up", gif: "/Incline Push-up.gif" },
            { name: "Chest Press Machine", gif: "/Lever Incline Hammer Chest Press.gif" },
            { name: "Incline Dumbbell Press", gif: "/Dumbbell Incline Twist Press.gif" },
            { name: "Cable Chest Fly", gif: "/Cable Seated Chest Fly.gif" },
        ],
        Triceps: [
            { name: "Overhead Dumbbell Extension", gif: "/Triceps Extension.gif" },
            { name: "Triceps Pushdown (Cable)", gif: "/Cable Triceps Pushdown (V bar attachment).gif" },
            { name: "Close-Grip Push-Up", gif: "/Close Grip Push up.gif" },
            { name: "Bench Dips", gif: "/Weighted Three Bench Dip.gif" },
        ],
        Biceps: [
            { name: "Resistance Band Curl", gif: "/Resistance Band Drag Curl.gif" },
            { name: "Hammer Curl", gif: "/Dumbbell Alternate Hammer Srtict Curl.gif" },
            { name: "Seated Dumbbell Curl", gif: "/Dumbbell.gif" },
            { name: "Concentration Curl", gif: "/Kettlebell Concentration Curl.gif" },
            { name: "Cable Curl", gif: "/Cable Seated Unilateral Bicep Curl.gif" },
        ],
        Legs: [
            { name: "Wall Sit", gif: "/Wall Sit.gif" },
            { name: "Bodyweight Squat", gif: "/Bodyweight Squat.gif" },
            { name: "Step-Up", gif: "/Bodyweight Step-up on Stepbox.gif" },
            { name: "Glute Bridge", gif: "/Dumbbell KAS Glute Bridge.gif" },
        ],
        Glutes: [
            { name: "Hip Thrust", gif: "/Bodyweight Frog Hip Thrust.gif" },
            { name: "Glute Kickback", gif: "/Resistance Band Standing Balance Glute Kickback.gif" },
            { name: "Sumo Squat", gif: "/Dumbbell Goblet Sumo Squat.gif" },
            { name: "Bulgarian Split Squat", gif: "/Dumbbell Goblet Bulgarian Split Squat.gif" },
        ],
        Cardio: [
            { name: "Arm Circles", gif: "/Arm Circles.gif" },
            { name: "Walking", gif: "/Walking on Incline Treadmill.gif" },
            { name: "Stationary Bike", gif: "/Stationary Bike.gif" },
            { name: "Cardio Lunge", gif: "/Cardio Lunge.gif" },
            { name: "Jack Burpee", gif: "/Jack Burpee.gif" },
        ],
        Flexibility: [
            { name: "Seated Forward Bend", gif: "/Seated Forward Bend Stretch on a Chair.gif" },
            { name: "Seated Side Bend", gif: "/Seated Side Bend on a Chair.gif" },
        ],
    },

    Obese: {
        Back: [
            { name: "Resistance Band Row", gif: "/Resistance Band Renegade Row.gif" },
            { name: "Bird Dog", gif: "/Sliding Leg Bird Dog.gif" },
            { name: "Lat Pulldown (Machine)", gif: "/Lever Cross Lat Pulldown.gif" },
            { name: "Seated Cable Row", gif: "/Cable Seated Lats Focused Row.gif" },
            { name: "Superman", gif: "/Superman Push up.gif" },
        ],
        Chest: [
            { name: "Incline Push-Up", gif: "/Incline Push-up.gif" },
            { name: "Wall Push-Up", gif: "/Push up (wall).gif" },
            { name: "Chest Press Machine", gif: "/Lever Incline Hammer Chest Press.gif" },
            { name: "Cable Chest Fly", gif: "/Cable Seated Chest Fly.gif" },
            { name: "Incline Dumbbell Press", gif: "/Dumbbell Incline Twist Press.gif" },
        ],
        Triceps: [
            { name: "Overhead Dumbbell Extension", gif: "/Triceps Extension.gif" },
            { name: "Triceps Pushdown (Cable)", gif: "/Cable Triceps Pushdown (V bar attachment).gif" },
            { name: "Bench Dips", gif: "/Weighted Three Bench Dip.gif" },
            { name: "Close-Grip Push-Up", gif: "/Close Grip Push up.gif" },
        ],
        Biceps: [
            { name: "Hammer Curl", gif: "/Dumbbell Alternate Hammer Srtict Curl.gif" },
            { name: "Resistance Band Curl", gif: "/Resistance Band Drag Curl.gif" },
            { name: "Seated Dumbbell Curl", gif: "/Dumbbell.gif" },
            { name: "Concentration Curl", gif: "/Kettlebell Concentration Curl.gif" },
            { name: "Cable Curl", gif: "/Cable Seated Unilateral Bicep Curl.gif" },
        ],
        Legs: [
            { name: "Bodyweight Squat", gif: "/Bodyweight Squat.gif" },
            { name: "Glute Bridge", gif: "/Dumbbell KAS Glute Bridge.gif" },
            { name: "Wall Sit", gif: "/Wall Sit.gif" },
            { name: "Step-Up", gif: "/Bodyweight Step-up on Stepbox.gif" },
        ],

        Glutes: [
            { name: "Hip Thrust", gif: "/Bodyweight Frog Hip Thrust.gif" },
            { name: "Glute Kickback", gif: "/Resistance Band Standing Balance Glute Kickback.gif" },
            { name: "Bulgarian Split Squat", gif: "/Dumbbell Goblet Bulgarian Split Squat.gif" },
            { name: "Sumo Squat", gif: "/Dumbbell Goblet Sumo Squat.gif" },
        ],

        Cardio: [
            { name: "Walking", gif: "/Walking on Incline Treadmill.gif" },
            { name: "Cardio Lunge", gif: "/Cardio Lunge.gif" },
            { name: "Stationary Bike", gif: "/Stationary Bike.gif" },
            { name: "Arm Circles", gif: "/Arm Circles.gif" },
            { name: "Jack Burpee", gif: "/Jack Burpee.gif" },
        ],
        Flexibility: [
            { name: "Seated Forward Bend", gif: "/Seated Forward Bend Stretch on a Chair.gif" },
            { name: "Seated Side Bend", gif: "/Seated Side Bend on a Chair.gif" },
        ],

    },

};

export default function ExercisePredictor() {
    const [tab, setTab] = useState(0);
    const [unit, setUnit] = useState("metric");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState("");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const calculateBMI = () => {
        if (!height || !weight) return;
        let h = parseFloat(height);
        let w = parseFloat(weight);
        let bmiValue = 0;

        if (unit === "metric") {
            h = h / 100;
            bmiValue = w / (h * h);
        } else {
            bmiValue = (703 * w) / (h * h);
        }

        bmiValue = parseFloat(bmiValue.toFixed(2));
        let cat = "";
        if (bmiValue < 18.5) cat = "Underweight";
        else if (bmiValue < 24.9) cat = "Normal";
        else if (bmiValue < 29.9) cat = "Overweight";
        else cat = "Obese";

        setBmi(bmiValue);
        setCategory(cat);
    };

    return (
        <Box
            sx={{
                backgroundColor: "#0e0e0e",
                minHeight: "100vh",
                py: 4,
                px: { xs: 2, md: 6 },
                fontFamily: "Inter, sans-serif",
            }}
        >
            <Box
                sx={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    backgroundColor: "#1c1c1e",
                    borderRadius: 6,
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.08)",
                    p: { xs: 3, md: 5 },
                }}
            >
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
               sx={{
                background: "linear-gradient(65deg,rgb(81, 156, 223), rgb(59, 4, 255))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold"
                   }}
            >
                  Exercise Predictor
               </Typography>


                <Tabs
                   value={tab}
                   onChange={(e, newValue) => setTab(newValue)}
                   centered
                   indicatorColor="primary"
                    sx={{
                        mb: 3,
                         '& .MuiTab-root': { color: 'white' },
                         '& .Mui-selected': { color: 'white' },
                        '& .MuiTabs-indicator': { backgroundColor: 'white' }
                       }}
                    >
                 <Tab label="BMI Calculator" />
                 </Tabs>


                <Box mb={3} display="flex" justifyContent="center">
                    <ToggleButtonGroup
                        value={unit}
                        exclusive
                        onChange={(e, newUnit) => newUnit && setUnit(newUnit)}
                        sx={{
                            backgroundColor: "#2a2a2e",
                            borderRadius: 4,
                            "& .MuiToggleButton-root": {
                                color: "#fff",
                                border: "none",
                                "&.Mui-selected": {
                                    backgroundColor: "#82d8d8",
                                    color: "#000",
                                },
                            },
                        }}
                    >
                        <ToggleButton value="metric">Metric</ToggleButton>
                        <ToggleButton value="us">US</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box mb={3}>
                    <TextField
                        label={unit === "metric" ? "Height (cm)" : "Height (inches)"}
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            style: { color: "#fff", background: "#2a2a2e" },
                        }}
                        InputLabelProps={{ style: { color: "#aaa" } }}
                    />
                    <TextField
                        label={unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            style: { color: "#fff", background: "#2a2a2e" },
                        }}
                        InputLabelProps={{ style: { color: "#aaa" } }}
                    />
                </Box>

               <Button
                   variant="contained"
                   fullWidth
                   size="large"
                   onClick={calculateBMI}
                   sx={{
                      background: "linear-gradient(65deg, rgb(81, 156, 223), rgb(59, 4, 255))",
                      color: "#000",
                      fontWeight: "bold",
                      borderRadius: 3,
                     ":hover": {
                       background: "linear-gradient(65deg, rgb(50, 120, 190), rgb(40, 0, 200))"
                 }
                   }}
                   >
                     Calculate BMI
               </Button>


                {bmi && (
                    <Typography
                        variant="h6"
                        align="center"
                        mt={4}
                        sx={{ color: "#fff" }}
                    >
                        BMI: <strong>{bmi}</strong> ({category})
                    </Typography>
                )}

                {category && exerciseSuggestions[category] && (
                    <>
                        <Typography
                            variant="h5"
                            mt={6}
                            mb={3}
                            align="center"
                            sx={{ color: "#82d8d8", fontWeight: "bold" }}
                        >
                            Exercises for {category}
                        </Typography>

                        {Object.entries(exerciseSuggestions[category]).map(
                            ([muscleGroup, exercises], groupIdx) => (
                                <Box key={muscleGroup} mb={5}>
                                    <Divider sx={{ mb: 2, backgroundColor: "#333" }} />
                                    <Typography
                                        variant="h6"
                                        sx={{ color: "#f48fb1", mb: 2 }}
                                    >
                                        {groupIdx + 1}. {muscleGroup}
                                    </Typography>

                                    <Grid container spacing={3}>
                                        {exercises.map((exercise, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <motion.div
                                                    whileHover={{ scale: 1.03 }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 15,
                                                    }}
                                                    style={{
                                                        borderRadius: 16,
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <Card
                                                        sx={{
                                                            borderRadius: 4,
                                                            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
                                                            backgroundColor: "#1c1c1e",
                                                            color: "#fff",
                                                            border: "none",
                                                        }}
                                                    >
                                                        <CardMedia
                                                            component="img"
                                                            image={exercise.gif}
                                                            alt={exercise.name}
                                                            height="240"
                                                            sx={{
                                                                objectFit: "cover",
                                                                borderTopLeftRadius: 16,
                                                                borderTopRightRadius: 16,
                                                            }}
                                                        />
                                                        <CardContent sx={{ textAlign: "center", py: 2 }}>
                                                            <Typography
                                                                variant="body1"
                                                                fontWeight={500}
                                                            >
                                                                {exercise.name}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}