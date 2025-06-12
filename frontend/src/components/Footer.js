import React, { useState } from "react";
import { Container, Grid, Typography, TextField, IconButton, Box } from "@mui/material";
import { Facebook, GitHub, YouTube, LinkedIn, Send } from "@mui/icons-material";

const Footer = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = () => {
        if (email.trim() === "") {
            setMessage("Please enter a valid email.");
        } else {
            setMessage("Subscribed successfully!! 🎉");
            setEmail("");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    return (
        <Box sx={{ bgcolor: "black", padding: "40px 0", mt: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} justifyContent="space-between" alignItems="flex-start">
                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            sx={{
                                fontSize: "1.2rem",
                                background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}
                        >
                            gymIIest - IIEST Shibpur's Gym Hub
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
                            A free air-conditioned gym hub for Boys and Girls.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                            Contact
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
                            Location: Howrah, West Bengal, India
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
                            <b>Email:</b> support@iiest-gymkhana.com
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff" }}>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#fff", mt: 1 }}>
                            Subscribe for updates
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, mt: 1 }}>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: 1,
                                    flex: 1,
                                    maxWidth: "200px"
                                }}
                            />
                            <IconButton
                                onClick={handleSubscribe}
                                sx={{
                                    background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                    color: "#fff",
                                    ml: 1
                                }}
                            >
                                <Send />
                            </IconButton>
                        </Box>
                        {message && (
                            <Typography variant="body2" sx={{ color: "#00FF00", mt: 1, fontWeight: "bold" }}>
                                {message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ textAlign: { xs: "center", md: "right" } }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff", mb: 1 }}>
                            Follow Us
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, gap: 1.5 }}>
                            {[Facebook, GitHub, YouTube, LinkedIn].map((Icon, idx) => (
                                <IconButton key={idx} sx={{
                                    background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                    color: "#fff"
                                }}>
                                    <Icon />
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ textAlign: "center", color: "#fff", mt: 4, fontWeight: "bold" }}>
                    &copy; 2025, gymIIest. Made with ❤️ by Raunak, Digwijoy. All Rights Reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;