import React, { useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";

const About = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <Container disableGutters maxWidth={false}>
            <Box
                mt={0}
                p={5}
                sx={{
                    backgroundColor: "#1E1E1E",
                    transition: "background-color 0.3s ease",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        gap: 5,
                        maxWidth: "1200px",
                        color: "#fff", // Ensures all nested Typography text is white
                    }}
                >
                    {/* Image Section */}
                    <Box
                        component="img"
                        src="/gym.jpeg"
                        alt="gymIIEST"
                        sx={{
                            width: { xs: "100%", md: "500px" },
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    />

                    {/* Text Section */}
                    <Box>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            About gymIIEST
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            gutterBottom
                            sx={{
                                background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            A Fully Air-Conditioned Gym for All Students
                        </Typography>

                        <Typography mt={2}>
                            gymIIEST is a modern, fully air-conditioned gymnasium located at IIEST Shibpur. It’s
                            open to both boys and girls, providing a clean, safe, and inclusive environment for
                            all students to focus on their physical fitness and well-being.
                        </Typography>

                        <Typography mt={2}>
                            Equipped with high-quality fitness equipment and facilities, gymIIEST helps students
                            stay healthy and relieve academic stress through regular physical activity. Whether
                            you're into strength training, cardio, or general fitness, gymIIEST has you covered.
                        </Typography>

                        <Typography mt={2}>
                            Managed and maintained by the students and staff, the gym is an integral part of the
                            campus's commitment to promoting holistic student development.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default About;