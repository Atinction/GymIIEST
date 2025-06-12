import React, { useState } from 'react';
import {
    Typography,
    Avatar,
    Button,
    Switch,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Snackbar,
    IconButton,
    useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const navigate = useNavigate();
    //const theme = useTheme();

    const [profile, setProfile] = useState({
        name: 'John Doe',
        mobile: '9876543210',
        height: '175',
        weight: '70',
        address: 'Howrah, West Bengal',
        active: true,
        photo: null
    });

    const [open, setOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    const handleEditOpen = () => setOpen(true);
    const handleEditClose = () => setOpen(false);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggleActive = () => {
        setProfile((prev) => ({
            ...prev,
            active: !prev.active
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({
                    ...prev,
                    photo: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = () => {
        setLogoutOpen(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const cards = [
        {
            title: 'BMI Calculator',
            description: 'Check your BMI for good health',
            imageUrl: 'bmi.jpeg',
            route: '/bmi'
        },
        {
            title: 'Exercise Predictor',
            description: 'Making health easy, one day at a time',
            imageUrl: 'thumb__5_.jpg',
            route: '/exercise-predictor'
        },
        {
            title: 'Workout Gear',
            description: 'Everything you need for your workout',
            imageUrl: 'workout.jpg',
            route: '/gear'
        },
        {
            title: 'Gym Equipments',
            description: 'Reverse Type 2 Diabetes and Prediabetes',
            imageUrl: 'sugar.jpg',
            route: '/equipment'
        },
        {
            title: 'Fitness Planner',
            description: 'Personalized diet and workout plan',
            imageUrl: 'planner.jpg',
            route: '/fitness-planner'
        },
        {
            title: 'Slot Booking',
            description: 'Personalized diet and workout plan',
            imageUrl: 'bmi.jpg',
            route: '/dashboard'
        }
    ];


    return (
        <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                src="/bg-video.mp4"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -2
                }}
            />

            {/* Dark overlay to blend with UI */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: -1
                }}
            />

            {/* Main Content */}
            <Box
                sx={{
                    color: '#fff',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    padding: { xs: '1rem', md: '2rem' },
                    gap: { xs: '2rem', md: '2rem' }
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        sx={{
                            width: { xs: '100%', md: 280 },
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: 3
                        }}
                    >
                        <Avatar
                            src={profile.photo}
                            sx={{ width: 100, height: 100, mt: 1, mb: 2 }}
                        />
                        <input
                            accept="image/*"
                            id="upload-photo"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />
                        <label htmlFor="upload-photo">
                            <Button variant="contained" component="span" sx={{ mb: 2 }}>
                                Upload Photo
                            </Button>
                        </label>
                        <Typography fontWeight="bold">Name: {profile.name}</Typography>
                        <Typography fontWeight="bold">Mobile: {profile.mobile}</Typography>
                        <Typography fontWeight="bold">Height: {profile.height} cm</Typography>
                        <Typography fontWeight="bold">Weight: {profile.weight} kg</Typography>
                        <Typography fontWeight="bold">Address: {profile.address}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography fontWeight="bold">Active</Typography>
                            <Switch checked={profile.active} color="success" onChange={handleToggleActive} />
                        </Box>
                        <Button
                            variant="outlined"
                            sx={{ mt: 2, color: '#fff', borderColor: '#fff' }}
                            onClick={handleEditOpen}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 2, width: '100%' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ flex: 1 }}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)'
                            },
                            gap: '1.5rem',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {cards.map((card, idx) => (
                            <ProductCard
                                key={idx}
                                title={card.title}
                                description={card.description}
                                imageUrl={card.imageUrl}
                                onNext={() => navigate(card.route)}
                                glassmorphic
                            />
                        ))}
                    </Box>
                </motion.div>
            </Box>

            <Dialog open={open} onClose={handleEditClose} PaperProps={{ sx: { backgroundColor: '#1f1f1f', color: 'white' } }}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    {['name', 'mobile', 'height', 'weight', 'address'].map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            fullWidth
                            value={profile[field]}
                            onChange={handleProfileChange}
                            InputLabelProps={{ style: { color: '#bbb' } }}
                            InputProps={{ style: { color: 'white' } }}
                            sx={{ mb: 1 }}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} sx={{ color: '#bbb' }}>Cancel</Button>
                    <Button onClick={handleEditClose} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={logoutOpen}
                autoHideDuration={2000}
                onClose={() => setLogoutOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        bgcolor: '#1f1f1f',
                        color: '#0ce600',
                        border: '1px solid #0ce600',
                        borderRadius: '6px',
                        padding: '10px 20px',
                        boxShadow: 5,
                        minWidth: '300px'
                    }}
                >
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    <Typography sx={{ flex: 1 }}>Logout Successful!</Typography>
                    <IconButton size="small" onClick={() => setLogoutOpen(false)}>
                        <CloseIcon sx={{ color: '#0ce600' }} />
                    </IconButton>
                </Box>
            </Snackbar>
        </Box>
    );
};

export default Home;
