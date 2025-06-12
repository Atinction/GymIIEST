import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "black", padding: "8px" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="/IIEST.png" alt="Logo" style={{ height: "40px" }} />
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            backgroundImage: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        gymIIest
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                    <Button component={Link} to="/" sx={{ color: "#fff", fontWeight: "bold" }}>Home</Button>
                    <Button component={Link} to="/about" sx={{ color: "#fff", fontWeight: "bold" }}>About</Button>
                    <Button component={Link} to="/contact" sx={{ color: "#fff", fontWeight: "bold" }}>Contact</Button>
                    <Button component={Link} to="/developers" sx={{ color: "#fff", fontWeight: "bold" }}>Developers</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;