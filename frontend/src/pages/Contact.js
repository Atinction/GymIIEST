import { useEffect } from "react";
import { Box } from "@mui/material";

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
                backgroundColor: darkMode ? "#1E1E1E" : "#E6E6FA",
                transition: "background-color 0.3s ease",
            }}
        />
    );
};

export default Contact;