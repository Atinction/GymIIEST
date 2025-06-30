// src/pages/Main.js

import React from "react";
import { Box, Container, Typography, Grid, Button, Card, CardContent, CardMedia } from "@mui/material";

export default function Main() {
  return (
    <Box sx={{ bgcolor: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <Container maxWidth="xl" sx={{ py: 5 }}>

        {/* Hero Section */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" py={5}>
          <Box flex={1}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Build Your Ideal Body Fitness
            </Typography>
            <Typography variant="body1" gutterBottom>
              Keep your body fit and sharp with professional trainers and track your progress with precision.
            </Typography>
            <Box mt={3}>
              <Button variant="contained" color="error" sx={{ mr: 2 }}>Join Class</Button>
              <Button variant="outlined" color="error">Watch Video</Button>
            </Box>
          </Box>
          <Box flex={1} mt={{ xs: 5, md: 0 }}>
            <CardMedia
              component="img"
              image="/assets/hero-fitness.png"
              alt="Fitness Trainers"
              sx={{ borderRadius: "16px", boxShadow: 3 }}
            />
          </Box>
        </Box>

        {/* Training Program */}
        <Box py={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Training Program
          </Typography>
          <Grid container spacing={3}>
            {["Muscle Building", "Fat Loss Workout", "Cardio Workout", "Diet Plans", "Yoga"].map((program, i) => (
              <Grid item xs={12} md={2.4} key={i}>
                <Card sx={{ bgcolor: "#121212", color: "#fff", borderRadius: "12px", p: 2, height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{program}</Typography>
                    <Typography variant="body2">Explore training plans and start your journey.</Typography>
                  </CardContent>
                  <Box p={2}>
                    <Button variant="contained" color="error" fullWidth>Join Now</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Join Section */}
        <Box py={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Why Should Join Us?
          </Typography>
          <Grid container spacing={3}>
            {["37 Certified Trainers", "55 Weekly Classes", "85 Gym Equipments", "1k+ Active Members"].map((item, i) => (
              <Grid item xs={12} md={3} key={i}>
                <Card sx={{ bgcolor: "#121212", color: "#fff", borderRadius: "12px", p: 3 }}>
                  <Typography variant="h5" fontWeight="bold">{item}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* App Showcase */}
        <Box py={5} textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Platform to make it easier for users
          </Typography>
          <CardMedia
            component="img"
            image="/assets/mobile-app.png"
            alt="Mobile App"
            sx={{ maxWidth: "300px", mx: "auto", my: 3 }}
          />
          <Button variant="contained" color="error">Download App</Button>
        </Box>

        {/* Testimonials */}
        <Box py={5}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Excellent Service With Good Results
          </Typography>
          <Grid container spacing={3}>
            {[1, 2, 3].map((_, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ bgcolor: "#121212", color: "#fff", borderRadius: "12px", p: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    “Amazing environment and supportive trainers. Really enjoying the classes and workout plans.”
                  </Typography>
                  <Typography variant="subtitle2">- Member {i + 1}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        <Box py={5} textAlign="center" borderTop="1px solid #333">
          <Typography variant="body2">
            © 2025 Machool Fitness. All rights reserved.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
}
