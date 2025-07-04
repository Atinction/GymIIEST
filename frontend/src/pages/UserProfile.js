// src/pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Avatar,
  Switch,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import StraightenIcon from '@mui/icons-material/Straighten'; // Height
import ScaleIcon from '@mui/icons-material/Scale'; // Weight
import HomeIcon from '@mui/icons-material/Home'; // Address
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // For BMI icon
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; // Slot Bookings icon
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics'; // Equipment Bookings icon
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    mobile: '',
    height: '',
    weight: '',
    address: '',
    active: true,
    profilePicture: null,
    slotBookings: [],
    equipmentBookings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [editedProfile, setEditedProfile] = useState({});
  const [newProfilePicFile, setNewProfilePicFile] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setLoading(false);
      setError("User not logged in.");
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/profile/${userId}`);
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setSnackbar({ open: true, message: "Logging out...", severity: "success" });
    setTimeout(() => navigate('/login'), 1500);
  };

  const handleEditOpen = () => {
    setEditedProfile({ ...profile });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setNewProfilePicFile(null);
  };

  const handleEditedProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      for (const key in editedProfile) {
        if (!['profilePicture', 'slotBookings', 'equipmentBookings'].includes(key)) {
          formData.append(key, editedProfile[key]);
        }
      }
      if (newProfilePicFile) {
        formData.append('profilePicture', newProfilePicFile);
      }

      const response = await axios.put(`http://localhost:8080/api/profile/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(response.data);
      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
      handleEditClose();
    } catch (err) {
      console.error("Error updating profile:", err);
      setSnackbar({ open: true, message: "Failed to update profile.", severity: "error" });
    }
  };

  const calculateBMI = () => {
    if (profile.weight && profile.height) {
      const heightInMeters = parseFloat(profile.height) / 100;
      return (parseFloat(profile.weight) / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return 'N/A';
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#1a1a2e',
        color: '#ffffff'
      }}>
        <CircularProgress sx={{ color: '#6a0dad' }} /> {/* Reverted to purple */}
        <Typography variant="h6" sx={{ ml: 2 }}>Loading profile...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#1a1a2e',
        color: '#ffffff'
      }}>
        <ErrorIcon color="error" sx={{ fontSize: 60 }} />
        <Typography variant="h6" sx={{ mt: 2 }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      bgcolor: '#1a1a1a',
      minHeight: '100vh',
      p: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      <Grid container spacing={3} sx={{ maxWidth: 'lg', width: '100%' }}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              bgcolor: '#1f1f1f',
              borderRadius: '10px',
              p: 3,
              textAlign: 'center',
              boxShadow: '0px 0px 15px  rgb(47, 137, 216)', // Reverted to purple glow
              border: '1px solid rgb(59, 4, 255)', // Reverted to purple border
              color: '#ffffff',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {/* Edit Profile Button/Icon */}
            <IconButton
              onClick={handleEditOpen}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: ' rgb(59, 4, 255)', // Reverted to purple color for the edit icon
                zIndex: 1,
                '&:hover': {
                  bgcolor: 'rgba(35, 36, 37, 0.1)', // Subtle hover effect
                }
              }}
              aria-label="edit profile"
            >
              <EditIcon />
            </IconButton>

            <Box>
              <Avatar
                src={profile.profilePicture ? `/${profile.profilePicture}` : "/default-avatar.png"}
                alt="Profile"
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  bgcolor: '#bdbdbd', // Changed to light gray for avatar background
                  color: '#424242', // Darker color for icon on gray
                  fontSize: '3rem',
                  mx: 'auto',
                  border: '5px solid #007bff', // Added thick purple border for avatar
                }}
              >
                {!profile.profilePicture && <PersonIcon sx={{ fontSize: '3rem' }} />}
              </Avatar>
              <Typography
                variant="h5"
                sx={{
                  color: '#007bff',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                {profile.name}
              </Typography>
            </Box>

            <List sx={{ width: '100%', mt: 2 }}>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <PhoneIcon sx={{ mr: 1, color: '#bdbdbd' }} />
                <ListItemText primary={<Typography sx={{ color: '#bdbdbd' }}>Mobile: {profile.mobile}</Typography>} />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <StraightenIcon sx={{ mr: 1, color: '#bdbdbd' }} />
                <ListItemText primary={<Typography sx={{ color: '#bdbdbd' }}>Height: {profile.height} cm</Typography>} />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ScaleIcon sx={{ mr: 1, color: '#bdbdbd' }} />
                <ListItemText primary={<Typography sx={{ color: '#bdbdbd' }}>Weight: {profile.weight} kg</Typography>} />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <FitnessCenterIcon sx={{ mr: 1, color: '#bdbdbd' }} />
                <ListItemText primary={<Typography sx={{ color: '#bdbdbd', fontWeight: 'bold' }}>BMI: {calculateBMI()}</Typography>} />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <HomeIcon sx={{ mr: 1, color: '#bdbdbd' }} />
                <ListItemText primary={<Typography sx={{ color: '#bdbdbd' }}>Address: {profile.address}</Typography>} />
              </ListItem>
            </List>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              mt: 2,
              p: 1,
              bgcolor: profile.active ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
              borderRadius: '5px'
            }}>
              <Typography sx={{ color: profile.active ? '#0ce600' : '#ff0000', fontWeight: 'bold' }}>
                Account Active
              </Typography>
              <Switch
                checked={profile.active}
                onChange={() => setProfile(prev => ({ ...prev, active: !prev.active }))}
                inputProps={{ 'aria-label': 'account active switch' }}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#0ce600',
                    '& + .MuiSwitch-track': {
                      backgroundColor: '#0ce600',
                    },
                  },
                  '& .MuiSwitch-switchBase': {
                    color: '#ff0000',
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: '#ff0000',
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Bookings Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Slot Bookings Card */}
            <Grid item xs={12}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                sx={{
                  bgcolor: '#1f1f1f',
                  borderRadius: '10px',
                  p: 3,
                  boxShadow: '0px 0px 15px  rgb(47, 137, 216)', // Reverted to purple glow
                  border: '1px solid rgb(59, 4, 255)', // Reverted to purple border
                  color: '#ffffff',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventAvailableIcon sx={{ color: '#0ce600', fontSize: 30, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                    Your Slot Bookings
                  </Typography>
                </Box>
                {profile.slotBookings?.length > 0 ? (
                  <List>
                    {profile.slotBookings.map((slot, i) => (
                      <ListItem key={i} sx={{ borderBottom: '1px solid #333', '&:last-child': { borderBottom: 'none' } }}>
                        <ListItemText
                          primary={<Typography sx={{ color: '#bdbdbd' }}>{`${slot.date} at ${slot.time}`}</Typography>}
                          secondary={<Typography sx={{ color: '#888' }}>{slot.purpose}</Typography>}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography sx={{ color: '#bdbdbd', mt: 1 }}>No slot bookings yet. Time to hit the gym!</Typography>
                )}
              </Box>
            </Grid>

            {/* Equipment Bookings Card */}
            <Grid item xs={12}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                sx={{
                  bgcolor: '#1f1f1f',
                  borderRadius: '10px',
                  p: 3,
                  boxShadow: '0px 0px 15px  rgb(47, 137, 216)', // Reverted to purple glow
                  border: '1px solid rgb(59, 4, 255)', // Reverted to purple border
                  color: '#ffffff',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SportsGymnasticsIcon sx={{ color: '#0ce600', fontSize: 30, mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                    Your Equipment Bookings
                  </Typography>
                </Box>
                {profile.equipmentBookings?.length > 0 ? (
                  <List>
                    {profile.equipmentBookings.map((eq, i) => (
                      <ListItem key={i} sx={{ borderBottom: '1px solid #333', '&:last-child': { borderBottom: 'none' } }}>
                        <ListItemText
                          primary={<Typography sx={{ color: '#bdbdbd' }}>{`${eq.name} (${eq.quantity})`}</Typography>}
                          secondary={<Typography sx={{ color: '#888' }}>{`${eq.startTime} - ${eq.endTime}`}</Typography>}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography sx={{ color: '#bdbdbd', mt: 1 }}>No equipment bookings yet. Grab some gear!</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClose}
        PaperProps={{
          sx: {
            bgcolor: '#2a2a3e',
            color: '#ffffff',
            borderRadius: '10px',
            border: 'linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))',
          }
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>Edit Profile</DialogTitle>
        <DialogContent>
          {['name', 'mobile', 'height', 'weight', 'address'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              value={editedProfile[field] || ''}
              onChange={handleEditedProfileChange}
              sx={{
                '& .MuiInputLabel-root': { color: '#bdbdbd' },
                '& .MuiInputBase-input': { color: '#ffffff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#6a0dad' }, // Reverted to purple border color
                  '&:hover fieldset': { borderColor: '#9c27b0' }, // Reverted to a lighter purple hover border color
                  '&.Mui-focused fieldset': { borderColor: '#0ce600' }, // Kept green for focus
                },
                mt: 2
              }}
            />
          ))}
          <input
            type="file"
            onChange={handlePhotoUpload}
            accept="image/*"
            style={{ marginTop: 15, color: '#bdbdbd' }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <IconButton onClick={handleEditClose} sx={{ color: '#ff0000' }}>Cancel</IconButton>
          <IconButton onClick={handleSaveChanges} sx={{ color: '#0ce600' }}>Save</IconButton>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          bgcolor: snackbar.severity === 'success' ? '#1f1f1f' : '#331f1f',
          color: snackbar.severity === 'success' ? '#0ce600' : '#ff0000',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
          border: `1px solid ${snackbar.severity === 'success' ? '#0ce600' : '#ff0000'}`
        }}>
          {snackbar.severity === 'success' ? <CheckCircleIcon sx={{ mr: 1 }} /> : <ErrorIcon sx={{ mr: 1 }} />}
          <Typography sx={{ flex: 1 }}>{snackbar.message}</Typography>
          <IconButton size="small" onClick={() => setSnackbar({ ...snackbar, open: false })}>
            <CloseIcon sx={{ color: snackbar.severity === 'success' ? '#0ce600' : '#ff0000' }} />
          </IconButton>
        </Box>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;