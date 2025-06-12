import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    IconButton
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const equipmentData = [
    {
        name: 'Chest Press',
        imageUrl: '/chestpress.jpg',
        spec: 'The chest press machine is a staple in strength training, designed to target the pectoral muscles, triceps, and anterior deltoids. This equipment mimics the motion of a bench press but offers added safety and control, making it ideal for beginners and experienced lifters alike. The user sits in an upright or slightly reclined position, grips the handles, and pushes them forward against adjustable resistance. One of the key advantages of the chest press machine is its ability to isolate the chest muscles, minimizing the involvement of stabilizing muscles. This allows users to focus on building strength and muscle mass in the chest without the complexity of balancing free weights. The machine’s adjustable settings make it suitable for people of various fitness levels and body sizes. Regular use of the chest press can enhance upper body strength, improve posture, and support other pushing movements in daily life and sports. It’s especially beneficial for those looking to increase muscle definition in the chest and arms. When incorporated into a balanced workout routine, the chest press complements other exercises like push-ups and dumbbell presses, contributing to a well-rounded upper body training program.',
    },
    {
        name: 'Butterfly Machine',
        imageUrl: '/dual_function.jpg',
        spec: 'The Butterfly Machine, also known as the Pec Deck, is a specialized strength training machine designed primarily to target the pectoralis major muscles of the chest. It simulates the motion of a dumbbell chest fly but offers more control and safety, making it an excellent choice for beginners as well as seasoned lifters. The user sits upright with their back firmly against a padded support, arms bent at a 90-degree angle or extended slightly, and grips the handles attached to weighted arms.As the handles are brought together in front of the body in a hugging motion, the chest muscles contract intensely, while the shoulders and triceps also assist as secondary muscles. The machine’s design ensures that the movement stays in a controlled, isolated plane, which reduces the risk of improper form and injury compared to free-weight alternatives.The Butterfly Machine is highly effective for developing chest muscle definition, increasing upper body strength, and improving shoulder stability. Adjustments in seat height and arm position allow users to focus on different sections of the chest. It’s commonly incorporated into upper body routines to complement pressing movements like bench presses or push-ups, providing a complete and balanced chest workout that enhances both strength and aesthetic appeal.',
    },
    {
        name: 'Gym Benches',
        imageUrl: '/gymbenches.jpg',
        spec: 'Gym benches are essential equipment in any fitness setting, providing a stable platform for a wide range of strength training exercises. Available in flat, incline, decline, and adjustable designs, gym benches support activities like bench presses, dumbbell flys, seated curls, and ab workouts. The adjustable nature of many benches allows users to target specific muscle groups by modifying the angle and position.A gym bench enhances both safety and exercise efficiency. It ensures proper form and posture, reducing the risk of injury when lifting weights or performing bodyweight exercises. The padding offers comfort while supporting the back and limbs, particularly during heavy lifts or longer sets.Incorporating gym benches into a fitness routine enables users to diversify their workouts. For example, an incline bench press targets the upper chest and shoulders, while a decline bench press emphasizes the lower chest. Beyond presses, benches serve as a base for step-ups, triceps dips, and core exercises. Their simplicity and versatility make them suitable for users of all fitness levels. When paired with free weights or machines, gym benches contribute to balanced muscle development, strength gains, and improved overall fitness, making them a fundamental piece of equipment in any gym.',
    },
    {
        name: 'Treadmill',
        imageUrl: '/trademil.jpg',
        spec: 'A treadmill is one of the most widely used pieces of cardio equipment in gyms and homes. It provides a controlled environment for walking, jogging, or running at various speeds and inclines. Most treadmills feature adjustable settings for pace, incline, and workout duration, enabling users to customize their workouts to fit specific fitness goals, whether it’s weight loss, stamina building, or rehabilitation. The treadmill’s greatest advantage lies in its versatility and accessibility. It allows users to maintain consistent cardiovascular activity regardless of outdoor weather conditions. The cushioned running surface of a treadmill reduces the impact on joints compared to running on concrete or asphalt, making it a preferred choice for individuals seeking a lower-impact alternative for cardio. Modern treadmills come equipped with features like heart rate monitors, calorie counters, pre-set workout programs, and entertainment options such as built-in speakers or screen connectivity. High-end models often include virtual running routes and fitness tracking apps. Treadmills help strengthen the heart, burn calories, and improve endurance while offering a user-friendly platform for interval training or steady-state runs. Whether for seasoned runners or beginners starting a fitness journey, treadmills provide a convenient, effective way to stay active and healthy.',
    },
    {
        name: 'Dumbbells',
        imageUrl: '/Dumbbell.webp',
        spec: 'Dumbbells are versatile, compact strength training tools found in virtually every gym and home workout space. Consisting of a short bar with weights on either end, dumbbells come in various fixed and adjustable options to suit different fitness levels and exercises. They are integral for both upper and lower body workouts, enabling movements like bicep curls, shoulder presses, chest flys, lunges, and weighted squats.One of the major benefits of dumbbells is their ability to engage stabilizer muscles. Unlike machines that guide motion, dumbbells require balance and coordination, which enhances overall muscular control and joint stability. They also allow for a full range of motion, leading to more effective muscle activation and improved flexibility.Dumbbells are perfect for unilateral training, where one side of the body works independently of the other. This helps correct muscle imbalances and improves symmetry. Their portability and variety of available weights make them suitable for beginners, intermediate, and advanced lifters alike. Additionally, dumbbells are excellent for high-repetition, light-weight endurance training or heavy, low-rep strength building. Whether for hypertrophy, toning, rehabilitation, or general fitness, dumbbells remain one of the most practical, effective, and user-friendly tools in strength and conditioning programs.',
    },
    {
        name: 'Spin Bike',
        imageUrl: '/spin_bike.jpg',
        spec: 'A spin bike is a stationary exercise bike designed to simulate the experience of outdoor cycling. Unlike regular exercise bikes, spin bikes have a heavier flywheel, which provides a smoother, more controlled ride and requires continuous pedaling, much like riding on the road. They typically come with adjustable resistance levels, allowing users to simulate flat roads, uphill climbs, and intense sprints. The handlebars and seat can usually be adjusted to accommodate different rider heights and riding positions, ensuring optimal posture and comfort.Spin bikes are a popular choice for cardio enthusiasts and those looking to burn calories quickly. A vigorous 45-minute spin session can burn up to 500–700 calories, making it one of the most effective workouts for weight loss. It also strengthens the legs, improves cardiovascular endurance, and enhances overall stamina. Many modern spin bikes include digital displays showing distance, time, calories burned, and heart rate monitoring. Whether used for high-intensity interval training (HIIT) or steady-state cardio, spin bikes offer a low-impact option that’s gentle on the joints, making them suitable for all fitness levels. Spin classes, often set to energetic music and guided by an instructor, further enhance the workout experience, boosting motivation and group camaraderie.',
    },
    {
        name: 'CrossCable machine',
        imageUrl: '/crosscable machine.webp',
        spec: 'The cross cable machine, commonly known as a cable crossover machine, is a multifunctional piece of gym equipment designed to work virtually every muscle group in the body. It consists of two adjustable pulleys connected by a crossbeam, allowing users to perform a variety of exercises from different angles and positions. Equipped with adjustable weight stacks, the resistance can be customized to match the user’s strength level and workout intensity.One of the standout features of the cross cable machine is its versatility. It’s particularly effective for chest, shoulder, and arm exercises, like cable flys, triceps pushdowns, and bicep curls. The continuous tension provided by the cables ensures constant muscle engagement throughout the entire range of motion, promoting better muscle growth and endurance.Unlike free weights, the cross cable machine offers controlled, smooth movements that reduce strain on joints and lower the risk of injury. It also allows for functional training — exercises that mimic everyday activities and athletic movements — improving balance, coordination, and flexibility. With adjustable height settings, it accommodates a range of exercises for both upper and lower body, making it an indispensable tool for comprehensive strength training routines and rehabilitation programs.',
    },
    {
        name: 'Seated Leg Press',
        imageUrl: '/seatedleg.png',
        spec: 'The seated leg press machine is a popular lower-body strength training apparatus designed to target the quadriceps, hamstrings, glutes, and calves. The user sits in a reclined or upright position and pushes a weighted platform away from their body using their legs. The adjustable seat and backrest ensure proper posture and alignment, accommodating users of different heights and body types.A key advantage of the seated leg press is its ability to isolate the leg muscles without placing excessive stress on the lower back. This makes it a safer alternative to barbell squats, especially for beginners or those recovering from injury. The adjustable resistance levels allow for gradual strength progression, making it suitable for both novice and advanced gym-goers.Regular use of the seated leg press enhances lower-body muscle development, improves bone density, and increases joint stability. It’s also beneficial for athletes looking to boost their sprint speed, jumping ability, and overall leg power. By altering foot placement on the platform, users can target different parts of the leg muscles — a narrow stance emphasizes the quadriceps, while a wider stance engages the glutes and inner thighs. The seated leg press remains a cornerstone exercise for building strong, powerful legs.',
    },
    {
        name: 'Chest Press',
        imageUrl: '/chestpress.jpg',
        spec: 'Helps in building chest muscles with pressing motion.',
    },
];

const GymEquipments = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleSelect = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter') {
            handleSelect(index);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: '#1E1E1E',
                py: 5,
                px: 2,
            }}
        >
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}
            >
                Gym Equipments
            </Typography>

            <Grid container spacing={2} direction="column">
                {equipmentData.map((equip, index) => (
                    <Grid item xs={12} key={index}>
                        <Card
                            onClick={() => handleSelect(index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            tabIndex={0}
                            sx={{
                                backgroundColor: '#121212',
                                color: 'white',
                                borderRadius: 2,
                                boxShadow: 3,
                                cursor: 'pointer',
                                outline: 'none',
                                '&:hover': {
                                    backgroundColor: '#1e1e1e',
                                },
                                '&:focus': {
                                    border: '2px solid #fff',
                                },
                            }}
                        >
                            {/* Title row */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    px: 3,
                                    py: 2,
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold">
                                    {equip.name}
                                </Typography>

                                {/* Consistent IconButton */}
                                <IconButton
                                    sx={{
                                        color: 'white',
                                        p: 0,
                                        minWidth: '36px',
                                        minHeight: '36px',
                                    }}
                                >
                                    {expandedIndex === index ? (
                                        <ExpandMoreIcon fontSize="medium" />
                                    ) : (
                                        <ArrowForwardIosIcon fontSize="medium" />
                                    )}
                                </IconButton>
                            </Box>

                            {/* Expanded content */}
                            {expandedIndex === index && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        px: 3,
                                        pb: 3,
                                        gap: 3,
                                        alignItems: 'center',
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={equip.imageUrl}
                                        alt={equip.name}
                                        sx={{ width: 300, borderRadius: 2 }}
                                    />
                                    <CardContent sx={{ color: 'white', p: 0 }}>
                                        <Typography variant="body1">{equip.spec}</Typography>
                                    </CardContent>
                                </Box>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default GymEquipments;
