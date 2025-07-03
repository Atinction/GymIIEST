import { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";

const Contact = ({ darkMode }) => {
    useEffect(() => {
        const scrollToBottom = () => {
            const footer = document.querySelector("footer");
            if (footer) {
                footer.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                });
            }
        };
        scrollToBottom();
    }, []);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#1a1a1a",
                color: "#ffffff",
                transition: "background-color 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "start",
                px: 2,
                pt: 6,
                pb: 6,
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ textAlign: "center", color: "#ffffff" }}
            >
                Visit Our Gym
            </Typography>
            <Box
                component="iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.6307210245254!2d88.30076557472904!3d22.555501933597927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279b63f4905b9%3A0x6852b20569e9c724!2sStudents%20Gym!5e0!3m2!1sen!2sin!4v1751465608412!5m2!1sen!2sin"
                sx={{
                    border: 0,
                    width: "90%",
                    maxWidth: "1000px",
                    height: "600px",
                    borderRadius: "12px",
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
                    mb: 6,
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            <Box sx={{ width: "100%", maxWidth: "1000px" }}>
                <Grid container spacing={6} justifyContent="center">
                    {[
                        {
                            name: "Rahul Kumar",
                            phone: "+91 9135712063",
                            title: "General Secretary",
                        },
                        {
                            name: "Karthik Chohan",
                            phone: "+91-9999999999",
                            title: "Gymnasium Trainer",
                        },
                        {
                            name: "Aryan Verma",
                            phone: "+91-9843761127",
                            title: "Coach",
                        },
                        {
                            name: "Rajat Mehra",
                            phone: "+91-8765488756",
                            title: "Coach",
                        },
                    ].map((person, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box sx={{ textAlign: "center", p: 2 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {person.name}
                                </Typography>
                                <Typography color="#cccccc">
                                    Call at: {person.phone}
                                </Typography>
                                <Typography color="#cccccc">
                                    {person.title}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Contact;
