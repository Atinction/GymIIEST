import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Avatar,
} from "@mui/material";
import { Email, LinkedIn } from "@mui/icons-material";

const teamMembers = [
  {
    name: "Raunak Sarkar",
    role: "MERN-Stack Developer",
    image: "/Raunak.jpg",
    email: "mailto:raunaksarkar@gmail.com",
    linkedin: "https://www.linkedin.com/in/raunak-sarkar-424a4425b/",
  },
  {
    name: "Digwijoy Pandit",
    role: "ML Developer",
    image: "",
    email: "mailto:digwijoypandit@gmail.com",
    linkedin: "https://www.linkedin.com/in/digwijoy-p-620163253/",
  },
];

const Developers = ({ darkMode }) => {
  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content directly on top */}
      <Box
        textAlign="center"
        p={4}
        sx={{
          minHeight: "100vh",
          color: darkMode ? "#fff" : "#fff",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
          }}
        >
          Developers
        </Typography>
        <Typography
          mt={2}
          sx={{
            textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
          }}
        >
          Meet our amazing development team!!
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  width: 300,
                  height: 370,
                  mx: "auto",
                  p: 3,
                  textAlign: "center",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  transition: "0.4s",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 20px #fff",
                    border: "1px solid #fff",
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    src={member.image || "/default-avatar.jpg"}
                    alt={member.name}
                    sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                  />
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="#ccc"
                    gutterBottom
                  >
                    {member.role}
                  </Typography>

                  <Box mt={3} display="flex" justifyContent="center" gap={3}>
                    <Box
                      sx={{
                        background:
                          "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, rgb(4, 88, 157), rgb(35, 4, 157))",
                        },
                        borderRadius: "30%",
                        display: "inline-block",
                        p: 0.5,
                      }}
                    >
                      <IconButton
                        href={member.email}
                        target="_blank"
                        sx={{ color: "#fff" }}
                      >
                        <Email />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        background:
                          "linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, rgb(4, 88, 157), rgb(35, 4, 157))",
                        },
                        borderRadius: "30%",
                        display: "inline-block",
                        p: 0.5,
                      }}
                    >
                      <IconButton
                        href={member.linkedin}
                        target="_blank"
                        sx={{ color: "#FFF" }}
                      >
                        <LinkedIn />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Developers;
