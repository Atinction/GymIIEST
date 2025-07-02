import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Avatar,
  Rating,
  Grid,
  Dialog, // Import Dialog
  DialogTitle, // Import DialogTitle
  DialogContent, // Import DialogContent
  DialogActions, // Import DialogActions
  Slide // Import Slide for transition
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

// Transition for the Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Main() {
  const scrollRef = useRef();
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    feedback: ''
  });

  // State for the download app dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const { firstName, lastName, email, contactNo, feedback } = formData;
    const subject = encodeURIComponent("Feedback from Website");
    const body = encodeURIComponent(
      `First Name: ${firstName}\n` +
      `Last Name: ${lastName}\n` +
      `Email ID: ${email}\n` +
      `Contact No.: ${contactNo}\n\n` +
      `Feedback:\n${feedback}`
    );

    // Construct the mailto link
    const mailtoLink = `mailto:atinction@gmail.com?subject=${subject}&body=${body}`;

    // Open the user's default email client
    window.location.href = mailtoLink;

    // Optionally clear the form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      feedback: ''
    });
  };

  // Function to handle "Get Started" button click
  const handleGetStartedClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Function to handle "Watch Video" button click
  const handleWatchVideoClick = () => {
    window.open('https://www.youtube.com/watch?v=wIynl3at0Rs', '_blank'); // Open YouTube video in a new tab
  };

  // Function to handle "Join Now" button click (for training programs)
  const handleJoinNowClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Function to handle "Download App" button click
  const handleDownloadAppClick = () => {
    setDialogMessage("Our team is working on it! Please stay tuned.");
    setOpenDialog(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDialogMessage('');
  };

  const gradientStyle = {
    background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
    color: "#fff",
    '&:hover': {
      opacity: 0.9,
      background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))"
    }
  };

  const programData = [
    { title: "Muscle Building", desc: "This full-body plan will help maximize your gains and get you in great shape.", icon: "/icons8-treadmill-50.png" },
    { title: "Fat Loss Workout", desc: "Take your fat loss goals to the next level with workouts designed for men and women.", icon: "/icons8-gym-50.png" },
    { title: "Cardio Workout", desc: "Our database of free cardio workouts will help you burn some serious calories.", icon: "/icons8-cardio-32.png" },
    { title: "Diet Plans", desc: "Learn about different approaches to nutrition & find the best plan to suit your goals.", icon: "/list.png" },
    { title: "Yoga", desc: "Mix it up with a blend of flexibility training and mindfulness in our yoga classes.", icon: "/yoga.png" },
  ];

  // Extended testimonials data to include 6 entries
  const testimonials = [
    {
      name: "Amit Sharma",
      rating: 5,
      review: "Amazing environment and supportive trainers. Highly recommend!",
      img: "/Amit.jpg"
    },
    {
      name: "Priya Patel",
      rating: 4,
      review: "Clean space, good equipment and friendly coaches.",
      img: "/Priya.jpg"
    },
    {
      name: "Rahul Verma",
      rating: 5,
      review: "The classes are great and the mobile app is so handy.",
      img: "/Rahul.jpg"
    },
    {
      name: "Sneha Das",
      rating: 4.5,
      review: "Love the workouts here! Helped me stay consistent.",
      img: "/Sneha.jpg"
    },
    {
      name: "Alok Kumar",
      rating: 5,
      review: "Excellent facilities and personalized training plans. Achieved my goals quickly!",
      img: "/Alok.jpg"
    }
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <Container maxWidth="xl" sx={{ py: 5 }}>

        {/* Hero Section */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" py={5}>
          <Box
            flex={1}
            sx={{
              position: "relative",
              p: 3,
              backgroundImage: `linear-gradient(#333 1px, transparent 1px),
                               linear-gradient(90deg, #333 1px, transparent 1px)`,
              backgroundSize: "60px 40px",
              backgroundPosition: "center",
              borderRadius: "8px"
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Build Your Ideal Body Fitness
            </Typography>
            <Typography variant="body1" gutterBottom>
              Keep your body fit and sharp with professional trainers and track your progress with precision.
            </Typography>
            <Box mt={30}>
              <Button
                variant="contained"
                sx={{ mr: 3, ...gradientStyle }}
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                sx={{ border: "2px solid transparent", ...gradientStyle }}
                onClick={handleWatchVideoClick}
              >
                Watch Video
              </Button>
            </Box>
          </Box>
          <Box flex={1} mt={{ xs: 5, md: 0 }}>
            <CardMedia
              component="img"
              image="/rr.png"
              alt="Fitness Trainers"
              sx={{ borderRadius: "16px", boxShadow: 3 }}
            />
          </Box>
        </Box>

        {/* Training Program */}
        <Box py={5}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" fontWeight="bold">
              Our Training Program
            </Typography>
            <Box>
              <IconButton onClick={scrollLeft} sx={{ color: "#fff" }}>
                <ArrowBackIos />
              </IconButton>
              <IconButton onClick={scrollRight} sx={{ color: "#fff" }}>
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Box>

          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              py: 2,
              scrollBehavior: "smooth",
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none'
            }}
          >
            {programData.map((program, i) => (
              <Card
                key={i}
                sx={{
                  bgcolor: "#121212",
                  color: "#fff",
                  borderRadius: "12px",
                  p: 2,
                  width: "270px",
                  height: "260px",
                  flex: "0 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <CardMedia
                  component="img"
                  image={program.icon}
                  alt={program.title}
                  sx={{ width: 40, height: 40, mb: 2 }}
                />
                <CardContent sx={{ p: 0, flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>{program.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>{program.desc}</Typography>
                </CardContent>
                <Button
                  variant="contained"
                  fullWidth
                  sx={gradientStyle}
                  onClick={handleJoinNowClick}
                >
                  Join Now
                </Button>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Why Join Section */}
        <Box py={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Why Should Join Us?
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={3}>
            {["10 Certified Trainers", "21 Weekly Classes", "30+ Gym Equipments", "100+ Active Members"].map((item, i) => (
              <Card key={i} sx={{ bgcolor: "#121212", color: "#fff", borderRadius: "12px", p: 3, flex: "1 1 220px" }}>
                <Typography variant="h5" fontWeight="bold">{item}</Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* App Showcase */}
        <Box py={5} textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Platform to make it easier for users
          </Typography>
          <CardMedia
            component="img"
            image="/pngwing.com.png"
            alt="Mobile App"
            sx={{ maxWidth: "300px", mx: "auto", my: 8 }}
          />
          <Button
            variant="contained"
            sx={gradientStyle}
            onClick={handleDownloadAppClick} // Attach the new handler
          >
            Download App
          </Button>
        </Box>

        {/* Testimonials Section */}
        <Box py={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: "center", color: "#fff" }}>
            Excellent Service With Good Results
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" px={{ xs: 2, md: 0 }}>
            {testimonials.slice(0, 6).map((item, i) => (
              <Card
                key={i}
                sx={{
                  bgcolor: "#121212",
                  color: "#fff",
                  borderRadius: "12px",
                  width: { xs: "100%", sm: "45%", md: 200 },
                  height: 200,
                  p: 2,
                  boxShadow: "0 0 15px rgba(255,255,255,0.05)",
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar src={item.img} alt={item.name} sx={{ mr: 1, bgcolor: '#333' }}>
                    {item.name ? item.name.charAt(0) : ''}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">{item.name}</Typography>
                    <Rating value={item.rating} readOnly size="small" sx={{ color: 'gold' }} />
                  </Box>
                </Box>
                <Typography variant="body2">“{item.review}”</Typography>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Feedback Form Section */}
        <Box py={5} display="flex" justifyContent="center">
          <Box
            sx={{
              bgcolor: "#1e1e1e",
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              width: { xs: "85%", sm: "60%", md: 550 },
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.1)",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar
              src="/mailbox.png"
              sx={{ width: 70, height: 70, mx: "auto", mb: 2, bgcolor: 'transparent' }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "deepskyblue", mb: 1, textAlign: "center" }}
            >
              Get In Touch
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, textAlign: "center", color: "#ccc" }}>
              Email me at <a href="mailto:atinction@gmail.com" style={{ color: "#99ccff", textDecoration: 'none' }}>atinction@gmail.com</a> or use the form below
            </Typography>

            <Grid container spacing={3} sx={{ width: '88%' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="filled"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff", background: "#2a2a2a", borderRadius: '8px' } }}
                  sx={{ '& .MuiFilledInput-underline:before': { borderBottom: 'none' }, '& .MuiFilledInput-underline:after': { borderBottom: 'none' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="filled"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff", background: "#2a2a2a", borderRadius: '8px' } }}
                  sx={{ '& .MuiFilledInput-underline:before': { borderBottom: 'none' }, '& .MuiFilledInput-underline:after': { borderBottom: 'none' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email ID"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="filled"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff", background: "#2a2a2a", borderRadius: '8px' } }}
                  sx={{ '& .MuiFilledInput-underline:before': { borderBottom: 'none' }, '& .MuiFilledInput-underline:after': { borderBottom: 'none' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact No."
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  variant="filled"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff", background: "#2a2a2a", borderRadius: '8px' } }}
                  sx={{ '& .MuiFilledInput-underline:before': { borderBottom: 'none' }, '& .MuiFilledInput-underline:after': { borderBottom: 'none' } }}
                />
              </Grid>
              <Grid item xs={12} textAlign="center"> 
                <TextField
                  fullWidth
                  label="Your Feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="filled"
                  InputLabelProps={{ style: { color: "#aaa" } }}
                  InputProps={{ style: { color: "#fff", background: "#2a2a2a", borderRadius: '8px' } }}
                  sx={{ '& .MuiFilledInput-underline:before': { borderBottom: 'none' }, '& .MuiFilledInput-underline:after': { borderBottom: 'none' }, mb: 2 }} // Added margin-bottom
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    mt: 2,
                    background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                    color: "#fff",
                    fontWeight: "bold",
                    position: "relative",
                    px: 9.5,
                    py: 1.5,
                    borderRadius: '8px',
                    '&:hover': {
                      background: "linear-gradient(45deg, rgb(42, 128, 204), rgb(45, 3, 185))"
                    }
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Download App Message Dialog */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="download-app-message"
        PaperProps={{
          sx: {
            bgcolor: "#1e1e1e", // Dark background for the dialog
            color: "#fff", // White text color
            borderRadius: "12px",
            boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.1)",
            p: 2 // Padding inside the dialog
          }
        }}
      >
        <DialogTitle sx={{ color: "deepskyblue", textAlign: "center", fontWeight: "bold" }}>
          {"Download App"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "#ccc" }}>
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
              color: "#fff",
              fontWeight: "bold",
              px: 3,
              py: 1,
              borderRadius: '8px',
              '&:hover': {
                background: "linear-gradient(45deg, rgb(42, 128, 204), rgb(45, 3, 185))"
              }
            }}
          >
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
