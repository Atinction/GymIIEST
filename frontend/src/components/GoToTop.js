import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Button
            onClick={scrollToTop}
            variant="contained"
            sx={{
                position: "fixed",
                bottom: "20px",
                right: "40px",
                background: "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                color: "#FFF",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                minWidth: "unset",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                display: isVisible ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": { backgroundColor: "#5A0A9D" }
            }}
        >
            <KeyboardArrowUpIcon fontSize="large" />
        </Button>
    );
};

export default GoToTop;
